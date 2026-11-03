# Phase 1 Discovery: Shared Dependencies & Cross-Cutting Infrastructure

## 1. Executive Summary

While Property, Trade, and Water represent distinct municipal revenue streams with dedicated database connections (`pgsql`, `pgsql_trade`, `pgsql_water`), they converge on a shared architectural core. This document maps and analyzes every shared system component, database table, helper, and integration point connecting the three modules.

```mermaid
graph TD
    subgraph Core Shared Infrastructure
        WF[Centralized Workflow Engine<br/>wf_masters, wf_workflows, wf_roles, wf_tracks]
        AUTH[Identity & Gateway Hydration<br/>AuthMaker, User, ActiveCitizen]
        ULB[Multi-Tenancy & Wards<br/>UlbFilter, UlbWardMaster, WardPermission]
        PAY[Payment & Reconciliation<br/>Razorpay, CashVerification, BankReconciliation]
        DOC[Document Management Microservice<br/>DocUpload, DocUrl, Presigned S3/Local Storage]
        NOTIF[Multi-Channel Notifications<br/>AddNotification, sms_helper, whatsapp_helper]
        REF[Master Data & Utility<br/>ReferenceController, utility_helper]
    end

    PROP[Property Module<br/>SAF, Holding Tax, Objections, Bifurcation] --> WF
    PROP --> AUTH
    PROP --> ULB
    PROP --> PAY
    PROP --> DOC
    PROP --> NOTIF
    PROP --> REF

    TRADE[Trade Module<br/>License, Renewals, Denial Notices, MDM] --> WF
    TRADE --> AUTH
    TRADE --> ULB
    TRADE --> PAY
    TRADE --> DOC
    TRADE --> NOTIF
    TRADE --> REF

    WATER[Water Module<br/>New Connections, Meters, Consumer Demands] --> WF
    WATER --> AUTH
    WATER --> ULB
    WATER --> PAY
    WATER --> DOC
    WATER --> NOTIF
    WATER --> REF
```

---

## 2. Shared Workflow State Machine (`app/Repository/Workflow/`)

The workflow engine governs state transitions, approval hierarchies, and audit logging across all three modules:

### A. Shared Workflow Database Schema
- `wf_masters`: Module definitions (`1 = Property`, `2 = Trade`, `3 = Water`).
- `wf_workflows`: Workflows within a module (e.g., SAF Workflow ID `10`, Trade Workflow ID `20`, Water New Connection ID `30`).
- `wf_roles`: Standard municipal designations:
  - Role `1`: Dealing Assistant (DA) - Initial document screening.
  - Role `2`: Tax Collector (TC) / Junior Engineer (JE) - Physical field inspection.
  - Role `3`: Section Officer / Revenue Inspector (RI) - Verification & demand approval.
  - Role `4`: Executive Officer (EO) / Municipal Commissioner - Final approval/rejection.
- `wf_workflowrolemaps`: Graph transition rules (e.g., Role 1 can forward to Role 2; Role 2 can forward to Role 3 or backward to Citizen).
- `wf_roleusermaps`: User-to-Role assignments partitioned by `ulb_id`.
- `wf_tracks`: Unified audit log of every action taken on an application across all modules:
  - Columns: `workflow_id`, `ref_table_id`, `ref_table_name_id`, `sender_role_id`, `receiver_role_id`, `verification_status`, `comment`, `forward_date`, `ulb_id`.

### B. Shared Controller & Trait Integration
- `App\Traits\Workflow\Workflow`: Implements `getRoleList()`, `getWorkflowTracks()`, `stepForward()`, `stepBackward()`.
- Used by `ActiveSafController`, `TradeApplication`, `NewConnectionController`, and `WaterConsumerWfController`.

---

## 3. Shared Identity & User Authentication

| Component | Shared Role across Property, Trade, Water |
|---|---|
| `AuthMaker` Middleware | Central entry point converting upstream Gateway auth headers into authenticated session instances. |
| `App\Models\User` | Municipal staff performing assessments, site inspections, and approvals across Property, Trade, and Water. |
| `App\Models\ActiveCitizen` | Taxpayers applying for SAF, Trade Licenses, or Water Connections using their verified mobile phone number. |
| `CaretakerController` | Special operational role allowing designated caretakers to manage properties, trade licenses, or water connections on behalf of owners. Shared routes exist in both `property.php` and `api.php`. |

---

## 4. Multi-Tenancy & Spatial Mapping (ULBs & Wards)

Every municipal application requires strict jurisdictional binding:

### A. ULB Hierarchy
1. State Government (`states`)
2. District (`districts`)
3. Urban Local Body (`ulb_masters`): Contains ULB code, name, district ID, municipal logo URL, and contact details.
4. Municipal Wards (`ulb_ward_masters`): Geographic sub-divisions within a ULB.

### B. Shared Cross-Module Logic
- **Holding Verification in Trade**: When applying for a Trade License, the applicant must provide a Property Holding Number. `TradeApplication::validateHoldingNo()` queries `prop_properties` across database connections to verify holding validity and check for outstanding property tax arrears before issuing a trade license!
- **Holding Verification in Water**: When applying for a Water Connection, `NewConnectionController::getSafHoldingDetails()` queries `prop_properties` and `prop_active_safs` to confirm property ownership and connection eligibility!
- **`UlbFilter` Trait**: Injects `WHERE table.ulb_id = ?` across all models in all 3 databases.

---

## 5. Unified Payment Infrastructure

All revenue collection flows converge into a standardized payment architecture:

### A. Payment Channels Supported
1. **Online Citizen Gateway**: Integrated with Razorpay SDK (`razorpay/razorpay`).
   - Order creation: `RazorpayPaymentController::generateOrderId()`.
   - Webhook & transaction confirmation: Updates module transaction records (`prop_trans`, `trade_transactions`, `water_trans`).
2. **Cash Counter Payments**: Handled by Tax Collectors (TC) via Android POS or Web POS.
   - `CashVerificationController`: Collects physical cash, generates immediate thermal receipt, places transaction in "unverified" cash ledger.
   - End-of-Day Bank Deposit: Municipal cashier physically counts cash, matches TC collections, and approves via `CashVerificationController::cashVerify()`.
3. **Cheque / Demand Draft Clearing**:
   - `BankReconcillationController`: Records instrument number, bank branch, clearing date. Tracks dishonored/bounced cheques and automatically re-applies canceled tax demands with a cheque-bounce penalty.

### B. Shared Payment Tables
- `payment_gateway_masters`: Active gateway configurations per ULB.
- `payment_transactions`: Unified transaction ledger recording transaction ID, order ID, payment mode, amount, module ID, and payment status (`SUCCESS`, `PENDING`, `FAILED`).

---

## 6. Document Upload Microservice (`DocUpload.php`)

All document storage (identity proofs, title deeds, building plans, electricity bills, site inspection photographs) is decoupled from the main database:

```text
Controller / Repository
   │  (Receives multipart/form-data)
   ▼
DocUpload::uploadDocument() [app/MicroServices/DocUpload.php]
   │  (Dispatches HTTP POST via Guzzle to Document Microservice)
   ▼
[Document Microservice / Cloud Bucket]
   │  (Saves file, returns relative document path / hash)
   ▼
Database Persistence
   ├── Property: prop_active_saf_docs
   ├── Trade: active_trade_documents
   └── Water: water_applicant_docs
   │
   ▼
DocUrl::getDocumentUrl() [app/BLL/DocUrl.php]
   └── Generates signed, tamper-proof viewing URL for verification screens
```

---

## 7. Multi-Channel Notification Infrastructure

When an application moves through workflow stages, automated alerts are broadcast:

1. **`app/BLL/AddNotification.php`**: Dispatches system-wide alerts based on event triggers:
   - Application Submitted
   - Sent Back To Citizen (BTC) for missing documents
   - Demand Notice Generated
   - Application Approved / License Issued
2. **`sms_helper.php`**: Integrated with DLT-compliant Indian telecom SMS gateways (CDAC / JAPIT gateway). Sends template-registered SMS messages containing application numbers and tracking URLs.
3. **`whatsapp_helper.php`**: Integrated with official WhatsApp Business API endpoints for interactive notifications, bill PDF delivery, and chatbot holding lookups.
4. **`MirrorUserNotification`**: In-app notification center displayed on the citizen and employee portals.

---

## 8. Shared Utilities & Reference Masters

1. **`utility_helper.php`**:
   - `responseMsgs($status, $msg, $data, $apiId, $version, $responseTime)`: Unified API response contract returning standard JSON schemas.
   - `getFinancialYear($date)`: Calculates Indian financial year string (e.g., `2024-2025`).
   - `amountInWords($number)`: Converts numerical currency amounts into English prose for printed receipts.
   - `carbonToDate($carbon)`: Timestamp formatting.
2. **`ReferenceController`**:
   - Shared lookup endpoints powering frontend dropdown menus: road types, construction types, occupancy types, trade categories, water connection sizes.

---

## 9. Dependency Matrix Summary

| Dependency Component | Property | Trade | Water | Inter-Module Interaction |
|---|:---:|:---:|:---:|---|
| **Workflow Engine (`wf_*`)** | Yes | Yes | Yes | Shared database tables, shared audit log (`wf_tracks`) |
| **`AuthMaker` Middleware** | Yes | Yes | Yes | Shared user session hydration |
| **`UlbFilter` Multi-Tenancy** | Yes | Yes | Yes | Shared database scoping across 3 distinct DB connections |
| **`WardPermission`** | Yes | Yes | Yes | Shared Redis permission caching |
| **Razorpay Payment Gateway** | Yes | Yes | Yes | Shared order generation & webhook reconciliation |
| **Cash Verification** | Yes | Yes | Yes | Centralized municipal cashier ledger |
| **Cheque Reconciliation** | Yes | Yes | Yes | Shared bank clearance and bounce penalty logic |
| **`DocUpload` Microservice**| Yes | Yes | Yes | Centralized storage endpoint for all uploaded PDFs & images |
| **`DocUrl` BLL** | Yes | Yes | Yes | Shared URL resolution engine |
| **`AddNotification`** | Yes | Yes | Yes | Unified SMS and WhatsApp delivery |
| **Property Holding Lookup** | Self | **Cross-DB** | **Cross-DB** | Trade and Water validate holding numbers against Property |
| **`utility_helper.php`** | Yes | Yes | Yes | Shared standard JSON response format |

