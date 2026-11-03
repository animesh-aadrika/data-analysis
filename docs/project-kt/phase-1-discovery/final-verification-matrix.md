# Phase 1 Discovery: Final Verification Matrix

**Project**: eGov Backend Technical Discovery — Property, Trade, and Water Modules  
**Repository**: `egov-backend` (`animesh-leo-clean`)  
**Documentation Repository**: `animesh-aadrika/data-analysis` (`main`)  
**Investigation Mode**: STRICT READ-ONLY MODE (Zero code, database, package, or configuration modifications)  
**Date**: November 3, 2026  

---

## 1. Verification Framework & Methodology

To avoid imprecise assertions such as "fully working" or "production verified" without runtime test execution, every route and component in this discovery pass has been evaluated across nine independent verification dimensions.

### 1.1 Verification Dimensions

| Dimension | Description | Verification Method |
|---|---|---|
| **Route Registered** | Route exists in Laravel's active routing table | Runtime CLI (`php artisan route:list --json`) |
| **Target Class Exists** | Target Controller, Repository, or Closure exists in codebase | Static AST & Autoload inspection |
| **Target Method Exists** | Declared action method exists in class, parent, or imported traits | Static Reflection / Source grep |
| **Validation Traced** | Request rules (`FormRequest`, `$request->validate()`, `Validator::make()`) verified | Source code inspection |
| **Business Logic Traced** | Controller, BLL, or Service workflow logic verified | Source code path tracing |
| **Database Operations Traced** | Eloquent models, repositories, raw queries, and connections identified | Source code inspection |
| **Authorization Traced** | Gateway payload, middleware, user/role gates, and tenant scoping checked | Source code inspection |
| **Runtime Tested** | Safe execution test via simulated HTTP client or endpoint invocation | **NOT PERFORMED** (Read-Only Safety Rule) |
| **Runtime Result** | Execution result under live request handling | **NOT TESTED AT RUNTIME** |

### 1.2 Status Classification Taxonomies

- **`VERIFIED STATICALLY`**: Route is confirmed registered, target class and method exist, validation rules, business logic, models, and authorization checks are traced in source code.
- **`CONFIRMED DEFECT`**: Route is registered, but target method does not exist or target class is misrouted, resulting in an immediate 500 `BadMethodCallException` if invoked.
- **`INTENTIONALLY UNSUPPORTED`**: Route generated automatically by `Route::resource()` where standard REST verbs are superseded by custom RPC actions.
- **`OBSOLETE / NOT IN USE`**: Route explicitly commented out in controller, tagged as dead code, or located in an obsolete block.
- **`NOT TESTED AT RUNTIME`**: Route execution cannot be verified without performing state-mutating database writes or triggering unverified external integrations.

---

## 2. Master Route Reconciliation by Module

Every route has been cross-referenced between physical route files (`routes/property.php`, `routes/trade.php`, `routes/water.php`, `routes/api.php`) and Laravel's compiled route collection:

| Module Scope | Total Discovered | Verified Statically | Confirmed Defects | Intentionally Unsupported | Obsolete / Not in Use | Runtime Tested |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| **Property Module** | **528** | 526 | 2 | 0 | 0 | 0 (Not Tested) |
| **Trade Module** | **88** | 87 | 0 | 0 | 1 | 0 (Not Tested) |
| **Water Module** | **142** | 130 | 2 | 6 | 4 | 0 (Not Tested) |
| **TOTALS** | **758** | **743** | **4** | **6** | **5** | **0** |

$$\text{Static Verification Rate} = \frac{743}{758} \times 100 = \mathbf{98.02\%}$$

$$\text{Confirmed Defective / Unreachable Rate} = \frac{15}{758} \times 100 = \mathbf{1.98\%}$$

$$\text{Runtime Execution Testing Rate} = \mathbf{0.00\%} \quad \text{(Strict Read-Only Mode Applied)}$$

---

## 3. Discrepancy Reconciliation & Origin Audit

### 3.1 Property Module (528 Routes)
- **527 Routes** declared in `routes/property.php`.
- **1 Route** declared uniquely in `routes/api.php:121` (`GET|POST|HEAD api/property/citizens/applied-applications` -> `CitizenController@getAllAppliedApplications`).
- **22 Route Overwrites**: Endpoints defined in `routes/api.php:377-400` under `api/property/*` are duplicated in `routes/property.php:464-490`; Laravel's route compiler overwrote the initial registrations with identical handlers.
- **Controller Targets**: 22 Controller classes + 1 Closure pseudo-target (`api/property/api-test`, `api/property/health-check`).

### 3.2 Trade Module (88 Routes)
- **88 Routes** declared in `routes/trade.php`.
- **1 Overwrite Anomaly**: `POST api/trade/application-search/get-owner-details` is declared at line 131 (protected by `auth_maker` and `json.response`) and duplicated at line 208 (unprotected under plain controller group). The unprotected declaration overwrites the protected one in Laravel's route collection.
- **Controller Targets**: 6 Controller classes + 1 Closure pseudo-target (`api/trade/health-check`).

### 3.3 Water Module (142 Routes)
- **139 Routes** declared in `routes/water.php`.
- **3 Routes** declared uniquely in `routes/api.php`:
  * `POST api/water/caretaker-otp` (`routes/api.php:368` -> `CaretakerController@waterCaretakerOtp`)
  * `POST api/water/caretaker-consumer-tagging` (`routes/api.php:369` -> `CaretakerController@caretakerConsumerTag`)
  * `POST api/water-connection` (`routes/api.php:470` -> `DemoController@waterConnection`)
- **Controller Targets**: 14 Controller classes + 1 Concrete Repository (`App\Repository\Water\Concrete\WaterNewConnection`) + 1 Closure pseudo-target (`api/water/health-check`, `api/water/apply-new-connection`).

---

## 4. Comprehensive Audit of the 15 Unresolved Routes

The 15 routes flagged as untraced or defective in initial discovery passes have been verified against current source code:

| # | Module | HTTP Method & URI | Declared Action Target | Status | Source-Code Evidence & Root Cause |
|---|---|---|---|:---:|---|
| 1 | **Property** | `POST api/property/cluster/property-by-cluster` | `ClusterController@propertyByCluster` | **CONFIRMED DEFECT** | `routes/property.php:1270`. Method `propertyByCluster` does not exist in `ClusterController`, parent `Controller`, or imported traits. Results in runtime 500 error. |
| 2 | **Property** | `POST api/property/reports/mpl2` | `ReportController@mplReport2` | **CONFIRMED DEFECT** | `routes/property.php:1120`. Method `mplReport2` does not exist in `ReportController`. Existing methods are `mplReport` (line 669) and `mplReportCollectionNew` (line 1026). |
| 3 | **Trade** | `POST api/trade/application/notice-summary` | `ReportController@noticeSummary` | **OBSOLETE / NOT IN USE** | `routes/trade.php:204`. Declared inside an explicit `//not in use` comment header block (line 201). Method `noticeSummary` does not exist in `Trade\ReportController`. |
| 4 | **Water** | `GET api/water/application/apply-new-connection` | `NewConnectionController@index` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource('application/apply-new-connection', NewConnectionController::class)` at `routes/water.php:40`. Controller only implements `store` (line 176); custom RPC routes handle inbox/details. |
| 5 | **Water** | `GET api/water/application/apply-new-connection/create` | `NewConnectionController@create` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource()` at `routes/water.php:40`. Frontend renders form directly; backend HTML creation form verb is not implemented. |
| 6 | **Water** | `GET api/water/application/apply-new-connection/{id}` | `NewConnectionController@show` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource()` at `routes/water.php:40`. Superseded by `POST api/water/admin/application/application-details` (line 52). |
| 7 | **Water** | `PUT/PATCH api/water/application/apply-new-connection/{id}` | `NewConnectionController@update` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource()` at `routes/water.php:40`. Application updates are processed through workflow step actions rather than RESTful PUT. |
| 8 | **Water** | `DELETE api/water/application/apply-new-connection/{id}` | `NewConnectionController@destroy` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource()` at `routes/water.php:40`. Direct deletion is prohibited; applications undergo formal workflow rejection. |
| 9 | **Water** | `GET api/water/application/apply-new-connection/{id}/edit` | `NewConnectionController@edit` | **INTENTIONALLY UNSUPPORTED** | Generated by `Route::resource()` at `routes/water.php:40`. Edit workflow handled by `POST api/water/admin/application/edit-application` (line 1294). |
| 10 | **Water** | `POST api/water/consumer/get-rejected-appl-details` | `WaterConsumerWfController@getRejectedApplicationDetails` | **CONFIRMED DEFECT** | `routes/water.php:260`. Method `getRejectedApplicationDetails` does not exist in `WaterConsumerWfController`. Implemented methods are `getRejectedDocumentsList` (line 2655) and `getRejectedDocumentsOnly` (line 2691). |
| 11 | **Water** | `POST api/water/consumer/req/doc-verify-reject` | `WaterConsumerWfController@consumerDocVerifyReject` | **OBSOLETE / NOT IN USE** | `routes/water.php:280`. Method was commented out / refactored into workflow engine repository. Route remains in unauthenticated block. |
| 12 | **Water** | `POST api/water/consumer/req/get-upload-documents` | `WaterConsumerWfController@getConsumerDocs` | **OBSOLETE / NOT IN USE** | `routes/water.php:281`. Replaced by document management service call `getConsumerDocsByAppNo` in workflow repository. |
| 13 | **Water** | `POST api/water/consumer/req/list-req-docs` | `WaterConsumerWfController@listDocToUpload` | **OBSOLETE / NOT IN USE** | `routes/water.php:282`. Superseded by generic document requirement engine; controller method not present. |
| 14 | **Water** | `POST api/water/consumerChargeCal` | `WaterApplication@calConsumerDemand` | **CONFIRMED DEFECT** | `routes/water.php:290`. Misrouted controller target. Method `calConsumerDemand` does NOT exist in `WaterApplication`, but DOES exist in `WaterConsumer` (line 123). Calling route results in 500 error. |
| 15 | **Water** | `POST api/water/update-applications` | `WaterApplication@updateWaterApplication` | **OBSOLETE / NOT IN USE** | `routes/water.php:289`. Method does not exist in `WaterApplication`. Route remains from abandoned direct update mechanism. |

---

## 5. Controller, Repository, and Closure Reconciliation

The initial discovery phase reported 43 versus 44 controllers. The exact technical composition is reconciled as follows:

| Category | Count | Itemized Identifiers | Notes |
|---|:---:|---|---|
| **Standard Property Controllers** | **22** | `ApplySafController`, `CalculatorController`, `ClusterController`, `ConcessionController`, `DeactivationController`, `EditSafController`, `FormIndexController`, `HoldingDeactivationController`, `MasterController`, `MediaController`, `NoticeController`, `ObjectionController`, `PaymentController`, `PetRegistrationController`, `PropertyController`, `PropReportController`, `PropWorkflowController`, `ReportController`, `ReverificationController`, `SafWorkflowController`, `TagController`, `CitizenController` | Located in `app/Http/Controllers/Property/` and shared citizen directories |
| **Standard Trade Controllers** | **6** | `TradeApplication`, `TradeCitizenController`, `TradeDocumentController`, `TradePaymentController`, `TradeReportController`, `ReportController` | Located in `app/Http/Controllers/Trade/` |
| **Standard Water Controllers** | **14** | `NewConnectionController`, `WaterApplication`, `WaterCalculationController`, `WaterCitizenController`, `WaterConsumer`, `WaterConsumerWfController`, `WaterDocController`, `WaterMasterController`, `WaterPaymentController`, `WaterPetRegistrationController`, `WaterReportController`, `WaterWorkflowController`, `CaretakerController`, `DemoController` | Located in `app/Http/Controllers/Water/` and shared namespaces |
| **Subtotal Standard Controllers** | **42** | All reside in `app/Http/Controllers/` | Valid controller classes extending base `Controller` |
| **Direct Repository Target** | **1** | `App\Repository\Water\Concrete\WaterNewConnection` | Directly invoked as route controller in `routes/water.php:292` (`POST api/water/test`) |
| **Total Class-Based Targets** | **43** | 42 Controllers + 1 Repository | All 43 resolve to loadable PHP classes |
| **Closure Pseudo-Target** | **1** | Anonymous Closures handling 5 routes: `api/property/api-test`, `api/property/health-check`, `api/trade/health-check`, `api/water/health-check`, `api/water/apply-new-connection` | Counted as 1 action target in Laravel router |
| **GRAND TOTAL ACTION TARGETS** | **44** | 43 Class Targets + 1 Closure Target | **100% reconciled against `php artisan route:list`** |

---

## 6. Middleware and Route Protection Distribution

Analysis of effective middleware compiled across all 758 routes:

| Middleware Stack | Property (528) | Trade (88) | Water (142) | Total Routes | Security Implication |
|---|:---:|:---:|:---:|:---:|---|
| **`['api', 'json.response', 'auth_maker']`** | 210 | 82 | 0 | **292** | Full standard protection (JSON response, Auth injection, global API middleware) |
| **`['json.response', 'auth_maker']`** | 0 | 0 | 130 | **130** | **Missing `api` group** due to `RouteServiceProvider.php:58-61` overwrite anomaly. Bypasses `throttle:api`. |
| **`['api', 'ApiKeyMiddleware']`** | 1 | 0 | 0 | **1** | Protected by API Key header validation (`api-test`) |
| **`['api']` Only (No AuthMaker)** | 317 | 6 | 1 | **324** | **Unauthenticated endpoints** (Public citizen search, OTPs, master lists, callbacks, reports) |
| **Empty Middleware `[]`** | 0 | 0 | 11 | **11** | **Completely unprotected** (No JSON force, no AuthMaker, no throttle, no bindings) |
| **TOTALS** | **528** | **88** | **142** | **758** | Reconciled across entire backend |

---

## 7. Multi-Tier Authorization Architecture Verification

The security posture of the backend depends on 5 distinct layers, each with specific behaviors and verified constraints:

```
[Client / Citizen / Mobile]
          │
          ▼
┌────────────────────────────────────────────────────────┐
│ Layer 1: Upstream Gateway (Authorisation-Service)      │
│ - Sanctum Token Verification (auth:sanctum)            │
│ - Injects 'auth', 'currentAccessToken', 'ipAddress'    │
│ [EXTERNAL DEPENDENCY - NOT VERIFIED FROM THIS REPO]    │
└─────────────────────────┬──────────────────────────────┘
                          │ (HTTP via Guzzle)
                          ▼
┌────────────────────────────────────────────────────────┐
│ Layer 2: Route Middleware (AuthMaker / ApiKey)         │
│ - Reads $request->auth & $request->currentAccessToken  │
│ - Calls Auth::login() with injected user attributes    │
│ - PASS-THROUGH: Does NOT reject requests if auth null  │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│ Layer 3: Controller / Repository Authorization Checks  │
│ - Explicit checks: checkUsersWithtocken("citizens")   │
│ - WardPermission checks via Redis cache                │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│ Layer 4: Multi-Tenancy Scoping (UlbFilter)             │
│ - Activated in Controller::callAction()                │
│ - Adds InternalUlbScope to Eloquent models             │
│ - Regex-based SQL query rewriting for raw DB queries   │
│ - LIMITATION: Does NOT protect models without ulb_id   │
└─────────────────────────┬──────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────┐
│ Layer 5: Database Connection & Schema Isolation        │
│ - pgsql (Application Data) vs pgsql_master (Masters)   │
└────────────────────────────────────────────────────────┘
```

---

## 8. Summary of Identified Security and Operational Risks

Eight security and operational findings have been identified and classified:

| Finding ID | Module | Finding Summary | Severity | Status | Primary Source Reference |
|---|---|---|:---:|:---:|---|
| **SEC-001** | Water | Rate-Limiter / Throttle Bypass on All Water Routes | **MEDIUM** | CONFIRMED | `app/Providers/RouteServiceProvider.php:58-61` |
| **SEC-002** | Trade | Trade License Owner Data Exposure via Unprotected Duplicate Route | **HIGH** | CONFIRMED | `routes/trade.php:208`, `TradeCitizenController:1330` |
| **SEC-003** | Water | Unauthenticated Arbitrary File Upload to DMS | **HIGH** | CONFIRMED | `routes/water.php:296`, `NewConnectionController:3689` |
| **SEC-004** | Water | Unauthenticated Water Consumer PII Data Disclosure | **HIGH** | CONFIRMED | `routes/water.php:272`, `WaterConsumer:2529` |
| **SEC-005** | Trade | Potential Insecure Direct Object Reference (IDOR) on Certificates | **HIGH** | POTENTIAL | `routes/trade.php:194-198`, `TradeApplication:1151` |
| **SEC-006** | Water | Hardcoded `dd()` Debug Termination in Production Route | **MEDIUM** | CONFIRMED | `routes/water.php:33` |
| **SEC-007** | Shared | Absence of Independent Token Validation (Gateway Pass-Through) | **CRITICAL** | ARCHITECTURAL | `app/Http/Middleware/AuthMaker.php:17-41` |
| **SEC-008** | Shared | Multi-Tenancy Filter Bypass on Models Lacking `ulb_id` & Complex SQL | **MEDIUM** | POTENTIAL | `app/Traits/UlbFilter.php:219-580` |

---

## 9. Representative API Execution Flow Verification

Ten representative API execution flows documented in `api-execution-flows.md` have been verified across all architectural boundaries:

| Flow ID | Module | Endpoint / Operation | Controller & Action | Code-Path Verification Level | Database Models & Tables Verified |
|---|---|---|---|:---:|---|
| **P-01** | Property | `POST api/property/saf/apply-saf` | `ApplySafController@applySaf` | **SOURCE VERIFIED** | `PropProperty`, `PropFloor`, `PropOwner`, `WfActiveDocument` |
| **P-02** | Property | `POST api/property/saf/calculate-by-holding` | `CalculatorController@calculateByHolding` | **SOURCE VERIFIED** | `PropProperty`, `PropTaxRateMaster`, `PropHoldingTax` |
| **P-03** | Property | `POST api/property/saf/tax-collector-verification` | `SafWorkflowController@taxCollectorVerification` | **SOURCE VERIFIED** | `PropProperty`, `WfActiveWorkflow`, `WfWorkflowTrack` |
| **P-04** | Property | `POST api/property/saf/approval-rejection-saf` | `SafWorkflowController@approvalRejectionSaf` | **SOURCE VERIFIED** | Dual DB (`pgsql` + `pgsql_master`): `PropProperty`, `PropApprovedSaf` |
| **T-01** | Trade | `POST api/trade/apply-license` | `TradeApplication@applyApplication` | **SOURCE VERIFIED** | `TradeLicence`, `TradeOwner`, `TradeItem`, `TradeWorkflow` |
| **T-02** | Trade | `POST api/trade/view-payment-receipt` | `TradePaymentController@viewPaymentReceipt` | **SOURCE VERIFIED** | `TradeTran`, `TradeLicence`, `UlbMaster` |
| **T-03** | Trade | `POST api/trade/inbox` | `TradeApplication@tradeInbox` | **SOURCE VERIFIED** | `TradeWorkflow`, `TradeLicence`, `WfRoleUser` |
| **W-01** | Water | `POST api/water/application/apply-new-connection` | `NewConnectionController@store` | **SOURCE VERIFIED** | `WaterApplication`, `WaterApplicant`, `WaterConnectionCharge` |
| **W-02** | Water | `POST api/water/admin/application/field-inspection` | `WaterWorkflowController@fieldInspection` | **SOURCE VERIFIED** | `WaterApplication`, `WaterSiteInspection`, `WfWorkflowTrack` |
| **W-03** | Water | `POST api/water/admin/consumer/save-connection-meter` | `WaterConsumer@saveUpdateMeterDetails` | **SOURCE VERIFIED** | `WaterConsumer`, `WaterMeterReading`, `WaterConsumerDemand` |

*Note: All 10 execution flows are verified statically across their full call stacks; none have been executed at runtime in accordance with read-only safety restrictions.*

