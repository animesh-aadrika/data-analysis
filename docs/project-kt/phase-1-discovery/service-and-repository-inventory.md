# Phase 1 Discovery: Service and Repository Inventory

## 1. Architectural Overview

The `egov-backend` application decomposes business and data logic into distinct layers:
1. **Business Logic Layer (BLL)** (`app/BLL/`): Encapsulates complex domain workflows, state transitions, yearly tax batch runs, and approval triggers.
2. **Domain Calculation Entities** (`app/EloquentClass/`): Pure arithmetic and rate matrix evaluators for property tax, penalties, and rebates.
3. **Repository Layer** (`app/Repository/`): Strict Interface + Concrete implementation pattern isolating database querying, multi-table joins, and transaction management.
4. **Microservices Clients & Generators** (`app/MicroServices/`): Standalone utility services for document upload orchestration and sequential ID/holding number generation.
5. **Query Pipelines** (`app/Pipelines/`): Pipeline design pattern implementations for composable query filtering across inboxes and search screens.

---

## 2. Business Logic Layer (BLL) Inventory

| Class Name | Location | Primary Responsibility | Downstream Models & Repositories |
|---|---|---|---|
| `AddNotification` | `app/BLL/AddNotification.php` | Dispatches in-app, SMS, and WhatsApp alerts for application status changes | `MirrorUserNotification, sms_helper` |
| `DocUrl` | `app/BLL/DocUrl.php` | Resolves public and pre-signed URLs for documents uploaded to DMS microservice | `DocUpload microservice` |
| `CalculatePropById` | `app/BLL/Property/CalculatePropById.php` | Recalculates property tax, current dues, and arrears for established properties | `PropProperty, PropFloor, InsertTax` |
| `CalculateSafById` | `app/BLL/Property/CalculateSafById.php` | Evaluates self-assessment tax for unapproved SAFs using formula: ARV * Rate | `PropActiveSaf, PropActiveSafFloor, SafCalculation` |
| `CalculationByUlbTc` | `app/BLL/Property/CalculationByUlbTc.php` | Re-evaluates tax demands following field verification by Tax Collector | `PropActiveSafFloor, TcVerificationDemandAdjust` |
| `DeactivateTran` | `app/BLL/Property/DeactivateTran.php` | Reverses transaction ledgers and cancels demands when a property is deactivated | `PropTran, PropTranDetail, PropDemand` |
| `EditSafBll` | `app/BLL/Property/EditSafBll.php` | Recomputes tax demands and updates floor snapshots when SAF is edited by user | `PropActiveSaf, PropActiveSafFloor, UpdateSafDemand` |
| `GenerateSafApplyDemandResponse` | `app/BLL/Property/GenerateSafApplyDemandResponse.php` | Builds upfront payment demand payload upon SAF form submission | `PropActiveSafDemand, PropActiveSafTax` |
| `PaymentReceiptHelper` | `app/BLL/Property/PaymentReceiptHelper.php` | Formats transaction receipts and generates printable HTML/PDF views | `PropTran, PropProperty, Barcode/Qrcode` |
| `PostRazorPayPenaltyRebate` | `app/BLL/Property/PostRazorPayPenaltyRebate.php` | Updates transaction adjustments and reconciles penalty/rebate upon Razorpay webhook | `PropActiveSafTax, PropActiveSaf` |
| `PostSafPropTaxes` | `app/BLL/Property/PostSafPropTaxes.php` | Persists quarterly tax installments into active saf tax tables | `PropActiveSafTax` |
| `PreviousHoldingDeactivation` | `app/BLL/Property/PreviousHoldingDeactivation.php` | Deactivates predecessor holding upon final approval of reassessment/bifurcation | `PropProperty, PropDeactiveHolding` |
| `SafApprovalBll` | `app/BLL/Property/SafApprovalBll.php` | Executes final approval: transitions PropActiveSaf -> PropProperty and generates Holding Number | `PropProperty, PropFloor, HoldingNoGenerator, PropOwner` |
| `TcVerificationDemandAdjust` | `app/BLL/Property/TcVerificationDemandAdjust.php` | Computes tax variance between citizen self-declaration and TC physical inspection | `PropActiveSafFloor, PropTcVerification` |
| `UpdateSafDemand` | `app/BLL/Property/UpdateSafDemand.php` | Updates quarterly and annual demand ledgers | `PropActiveSafDemand` |
| `YearlyDemandGeneration` | `app/BLL/Property/YearlyDemandGeneration.php` | Batch scheduled command logic generating new financial year tax demands for all properties | `PropProperty, PropDemand, PropFloor` |
| `WaterTranDeactivate` | `app/BLL/Water/WaterTranDeactivate.php` | Reverses water billing transactions and cancels meter demands on connection deactivation | `WaterTran, WaterConsumerDemand` |

---

## 3. Repository Layer Portfolio

### A. Property Module Repositories (`app/Repository/Property/`)

| Interface | Concrete Implementation | Primary Methods & Responsibilities |
|---|---|---|
| `iSafRepository` | `SafRepository` | `applySaf()`, `inbox()`, `outbox()`, `postNextLevel()`, `approvalRejection()`, `editSaf()` |
| `iSafReassessRepo` | `SafReassessRepo` | `applyReassessment()`, `inbox()`, `postNextLevel()`, `approvalRejection()` |
| `iObjectionRepository` | `ObjectionRepository` | `applyObjection()`, `inbox()`, `outbox()`, `verifyDocument()`, `scheduleHearing()` |
| `iConcessionRepository` | `ConcessionRepository` | `applyConcession()`, `inbox()`, `outbox()`, `verifyDocument()`, `approveReject()` |
| `IPropertyDeactivate` | `PropertyDeactivate` | `applyDeactivation()`, `inbox()`, `outbox()`, `postNextLevel()`, `approvalRejection()` |
| `IPropertyBifurcation` | `PropertyBifurcation` | `applyBifurcation()`, `inbox()`, `outbox()`, `postNextLevel()`, `approvalRejection()` |
| `iPropertyDetailsRepo` | `PropertyDetailsRepo` | `getPropertyDetails()`, `getHoldingDetails()`, `getUserDetails()`, `getDemand()` |
| `iCalculatorRepository` | `CalculatorRepository` | `calculatePropertyTax()`, `calculateDemand()`, `getRebatePenalty()` |
| `iDocumentOperationRepo`| `DocumentOperationRepo`| `getUploadDocuments()`, `verifyRejectDocument()`, `uploadDocument()` |
| `IReport` | `Report` | `collectionReport()`, `wardWiseDCB()`, `mplReport()`, `teamSummary()`, `dailyCollection()` |
| `PropertyRepository` | `EloquentProperty` | Core property query builder, owner relationship mapping, and legacy property lookups |

### B. Trade Module Repositories (`app/Repository/Trade/`)

| Interface | Concrete Implementation | Primary Methods & Responsibilities |
|---|---|---|
| `ITrade` | `Trade` | `applyApplication()`, `inbox()`, `outbox()`, `postNextLevel()`, `approveReject()`, `paymentCounter()` |
| `ITradeCitizen` | `TradeCitizen` | `citizenApplication()`, `handeRazorPay()`, `conformRazorPayTran()`, `renewalList()`, `surrenderList()` |
| `ITradeNotice` | `TradeNotice` | `applyDenial()`, `inbox()`, `outbox()`, `postNextLevel()`, `approveReject()`, `denialView()` |
| `IReport` | `Report` | `tradeDashboard()`, `collectionPerformance()`, `valideAndExpired()`, `levelWisePending()` |

### C. Water Module Repositories (`app/Repository/Water/`)

| Interface | Concrete Implementation | Primary Methods & Responsibilities |
|---|---|---|
| `iNewConnection` | `NewConnectionRepository` | `waterInbox()`, `waterOutbox()`, `postNextLevel()`, `approvalRejectionWater()`, `siteInspection()` |
| `IConsumer` | `Consumer` | `getConsumerDetails()`, `consumerDemand()`, `meterReading()`, `waterPayment()`, `deactivateConsumer()` |
| `IWaterNewConnection` | `WaterNewConnection` | Direct calculation and payment webhook callbacks (`razorPayResponse()`) |

### D. Shared Cross-Cutting Repositories

| Interface | Concrete Implementation | Module & Responsibility |
|---|---|---|
| `iWorkflowRepository` | `WorkflowRepository` / `EloquentWorkflowRepository` | Centralized state engine: transitions, user-role mapping, and audit logging (`wf_tracks`) |
| `iPayment` | `PaymentRepository` | Unified Razorpay orders, webhook verification, payment status updates across modules |
| `ICommonFunction` | `CommonFunction` | Shared ULB parameter resolution, ward retrieval, financial year boundary helpers |

---

## 4. Domain Calculation Engines (`app/EloquentClass/`)

1. **`SafCalculation`** (`app/EloquentClass/Property/SafCalculation.php`):
   - Computes Annual Rental Value (ARV) per floor: `ARV = Builtup_Area * Unit_Rate * (1 + Usage_Factor) * (1 + Occupancy_Factor) * (1 + Construction_Factor)`.
   - Evaluates quarterly holding tax: `Tax = ARV * Holding_Tax_Percentage`.
   - Adds Latrine Tax (if applicable) and Water Tax (if within municipal supply range).
2. **`InsertTax`** (`app/EloquentClass/Property/InsertTax.php`):
   - Breaks annual demands into 4 financial quarters.
   - Computes early-bird rebate (e.g., 5% rebate if paid in Q1) and compounding late payment interest (1% per month).
3. **`PenaltyRebateCalculation`** (`app/EloquentClass/Property/PenaltyRebateCalculation.php`):
   - Computes adjustment penalties for unauthorized construction, missing occupancy certificates, or delayed declarations.

---

## 5. MicroServices & Generator Clients (`app/MicroServices/`)

1. **`DocUpload`** (`app/MicroServices/DocUpload.php`):
   - HTTP client integrating with external DMS / File Storage API.
   - Methods: `uploadDocument($file, $refNo, $ulbId)`, `getDocumentUrl($docPath)`.
2. **`IdGeneration`** (`app/MicroServices/IdGeneration.php`):
   - Formats unique application and license identifiers.
3. **`HoldingNoGenerator`** (`app/MicroServices/IdGenerator/HoldingNoGenerator.php`):
   - Generates sequential, collision-free Holding Numbers formatted as `{ULB_CODE}-{WARD_NO}-{INCREMENTAL_INT}`.
4. **`PrefixIdGenerator`** (`app/MicroServices/IdGenerator/PrefixIdGenerator.php`):
   - Prefix-driven sequence generator implementing `iIdGenerator`.
5. **`PropIdGenerator`** (`app/MicroServices/IdGenerator/PropIdGenerator.php`):
   - Generates unique Property Identification Numbers (PTN / PIN).

---

## 6. Query Pipelines Portfolio (`app/Pipelines/`)

Implements the Pipeline pattern via `Illuminate\Pipeline\Pipeline`:

```php
$applications = app(Pipeline::class)
    ->send(PropActiveSaf::query())
    ->through([
        SearchByApplicationNo::class,
        SearchByName::class,
        SearchByMobileNo::class,
    ])
    ->thenReturn()
    ->paginate($request->perPage);
```

| Pipeline Group | Pipeline Stages | Purpose |
|---|---|---|
| **SAF Inbox / Outbox** | `SearchByApplicationNo`, `SearchByName`, `SearchByMobileNo` | Filter SAF applications by applicant name, phone, or application number |
| **Government Buildings** | `GbSafByApplicationNo`, `GbSafByName`, `GbSafByMobileNo` | Filter Government building SAF applications |
| **Objections** | `ObjectionByApplicationNo`, `ObjectionByName` | Filter property dispute and objection hearings |
| **Concessions** | `ConcessionByApplicationNo`, `ConcessionByName` | Filter senior citizen / disability tax concession requests |
| **Rainwater Harvesting**| `HarvestingByApplicationNo`, `HarvestingByName` | Filter rainwater harvesting rebate verification requests |
| **Caretakers** | `CareTakeProperty`, `CareTakerTrade`, `TagProperty`, `TagTrade` | Filter caretaker property and trade license assignments |
| **Water Workflow** | `WaterInbox` | Dynamic search on consumer water connection requests |