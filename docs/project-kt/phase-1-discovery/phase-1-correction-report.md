# Phase 1 Discovery: Correction and Verification Report

**Target Project**: `/var/www/html/egov-backend`  
**Backend Branch**: `animesh-leo-clean`  
**Backend Commit SHA**: `269c125e3f1fd2f4888321f28528579c59c1e303`  
**Investigation Scope**: Property Tax, Trade License, Water Management, and Shared Workflow Architecture  
**Execution Pass**: Phase 1 – Correction & Verification Pass (Reconciled)  
**Date**: November 3, 2026  
**Operating Mode**: STRICT READ-ONLY MODE (Zero code, database, package, or configuration modifications)  

> [!NOTE]
> **Superseding Reconciliation Notice**:  
> This document records the technical investigation and corrections performed across Phase 1 discovery. Preliminary classifications in earlier iterations (which grouped all 15 untraced routes generically as "defects" or claimed 22 Property route overwrites) have been formally audited and reconciled. The authoritative, cross-referenced findings are finalized in [`final-verification-matrix.md`](final-verification-matrix.md), [`final-security-and-risk-register.md`](final-security-and-risk-register.md), and [`phase-1-final-review.md`](phase-1-final-review.md).

---

## 1. Verified Route Totals & Reconciliation

Every route registered in Laravel's active routing table has been cross-referenced against physical route definition files (`routes/property.php`, `routes/trade.php`, `routes/water.php`, `routes/api.php`) and resolved via `php artisan route:list --json`:

| Module Scope | Discovered Routes | Statically Verified Routes | Confirmed Code Defects | Intentionally Unsupported | Obsolete / Not in Use | Runtime Registration Verified | Runtime Endpoint Tested |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Property Module** | **528** | 526 | 2 | 0 | 0 | 528 (100%) | **0 (0%)** |
| **Trade Module** | **88** | 87 | 0 | 0 | 1 | 88 (100%) | **0 (0%)** |
| **Water Module** | **142** | 130 | 2 | 6 | 4 | 142 (100%) | **0 (0%)** |
| **TOTALS** | **758** | **743 (98.02%)** | **4 (0.53%)** | **6 (0.79%)** | **5 (0.66%)** | **758 (100%)** | **0 (0%)** |

### Reconciliation Explanations:
1. **Property Route Count (528)**:
   - 527 routes originate from `routes/property.php`.
   - 1 route originates exclusively from `routes/api.php:250` (`GET|POST|HEAD api/property/citizens/applied-applications` -> `CitizenController@getAllAppliedApplications`).
   - **Correction on Route Overwrites**: Earlier drafts asserted that 22 reference endpoints in `routes/api.php` were overwritten by `routes/property.php`. Source and routing collection inspection shows that `routes/api.php:444-462` defines unversioned routes (`api/property/*`) while `routes/property.php:466-484` defines versioned routes (`api/property/v1/*`). Because their URIs are distinct, both sets coexist without overwriting. True route overwriting occurs only in Trade (line 131 vs 208).
2. **Trade Route Count (88)**:
   - All 88 routes originate from `routes/trade.php`.
   - 1 route (`api/trade/application-search/get-owner-details`) is declared twice inside `routes/trade.php` (lines 131 and 208), causing the unauthenticated declaration to overwrite the authenticated one in Laravel's compiled route table.
3. **Water Route Count (142)**:
   - 139 routes originate from `routes/water.php`.
   - 3 routes originate from `routes/api.php`:
     * `POST api/water/caretaker-otp` (`routes/api.php:368` -> `CaretakerController@waterCaretakerOtp`)
     * `POST api/water/caretaker-consumer-tagging` (`routes/api.php:369` -> `CaretakerController@caretakerConsumerTag`)
     * `POST api/water-connection` (`routes/api.php:470` -> `DemoController@waterConnection`)
   - Notice: 141 routes have prefix `api/water/`, and 1 route has URI `api/water-connection`.
4. **Controller Count Reconciliation (43 vs 44)**:
   - **43 Class-Based Targets**: 42 standard controllers in `app/Http/Controllers/` + 1 concrete repository class (`App\Repository\Water\Concrete\WaterNewConnection`) directly bound as a route target in `routes/water.php:292`.
   - **1 Closure Pseudo-Target**: Handles 5 anonymous closures across `api/property/api-test`, `api/property/health-check`, `api/trade/health-check`, `api/water/health-check`, `api/water/apply-new-connection`.
   - **Total**: 43 class targets + 1 Closure target = **44 total action targets** in Laravel's route collection.

---

## 2. Route Registration Anomalies

### Anomaly 1: Water Route Duplicate Loading & Throttle Bypass
- **Source**: `app/Providers/RouteServiceProvider.php:53-61`
- **Code**:
  ```php
  Route::prefix('api/water')
      ->middleware('api')
      ->namespace($this->namespace)
      ->group(base_path('routes/water.php'));

  Route::prefix('api/water')
      ->namespace($this->namespace)
      ->group(base_path('routes/water.php'));
  ```
- **Verification Status**: `CONFIRMED ROUTE CONFIGURATION DEFECT (SEC-001)`
- **Mechanism**: The file is imported twice. The second pass lacks `->middleware('api')`. In Laravel's `RouteCollection`, the second pass overwrites matching endpoints from the first pass.
- **Actual Effect**: All 139 routes in `routes/water.php` run **without the `'api'` middleware group** (`EnsureFrontendRequestsAreStateful`, `throttle:api`, `SubstituteBindings`). Global API rate limiting is disabled for the Water module at the framework level.

### Anomaly 2: Trade Owner Lookup Unauthenticated Overwrite
- **Source**: `routes/trade.php:131` and `routes/trade.php:208`
- **Code**:
  ```php
  // Line 131 (inside authenticated group)
  Route::post('application-search/get-owner-details', "getOwnerDetailsInfo");

  // Line 208 (at bottom of file, outside any middleware group)
  Route::controller(TradeCitizenController::class)->group(function () {
      Route::post('application-search/get-owner-details', "getOwnerDetailsInfo");
  });
  ```
- **Verification Status**: `CONFIRMED UNPROTECTED ROUTE (SEC-002)`
- **Actual Effect**: Line 208 overwrites line 131 in the routing table, stripping `auth_maker` and `json.response`. The endpoint runs with only `middleware: ['api']`, allowing unauthenticated public callers to query trade license owner personal details.

### Anomaly 3: Completely Empty Middleware Routes (11 Endpoints)
- **Source**: `routes/water.php` (declared outside the inner `json.response` group)
- **Verification Status**: `CONFIRMED UNPROTECTED ROUTES`
- **Endpoints**:
  - `POST api/water/apply-new-connection` (Closure calling `dd()`)
  - `POST api/water/cargeCal` (`WaterApplication@calWaterConCharge`)
  - `POST api/water/consumer/get-owner-details` (`WaterConsumer@getOwnerDetailsInfo`)
  - `POST api/water/consumer/req/doc-verify-reject` (`WaterConsumerWfController@consumerDocVerifyReject`)
  - `POST api/water/consumer/req/get-upload-documents` (`WaterConsumerWfController@getConsumerDocs`)
  - `POST api/water/consumer/req/list-req-docs` (`WaterConsumerWfController@listDocToUpload`)
  - `POST api/water/consumerChargeCal` (`WaterApplication@calConsumerDemand`)
  - `GET|HEAD api/water/health-check` (Closure)
  - `POST api/water/simple-upload-document` (`NewConnectionController@testUploadDocument`)
  - `POST api/water/test` (`WaterNewConnection@razorPayResponse`)
  - `POST api/water/update-applications` (`WaterApplication@updateWaterApplication`)

---

## 3. Reconciled Audit of the 15 Unresolved Routes

The 15 untraced routes have been re-evaluated and categorized into three distinct, evidence-based classifications:

### Group A: Confirmed Code Defects (4 Routes)
These endpoints are registered in Laravel, but their target methods are missing or misrouted, resulting in an immediate HTTP 500 `BadMethodCallException` if invoked:

| # | Module | Method & URI | Target Action | Source Reference | Defect Description |
|---|---|---|---|---|---|
| 1 | Property | `POST api/property/cluster/property-by-cluster` | `ClusterController@propertyByCluster` | `routes/property.php:1270` | Method `propertyByCluster` does not exist in `ClusterController.php` or its traits. |
| 2 | Property | `POST api/property/reports/mpl2` | `ReportController@mplReport2` | `routes/property.php:1120` | Method `mplReport2` does not exist in Property `ReportController.php` (only `mplReport` exists). |
| 3 | Water | `POST api/water/consumer/get-rejected-appl-details` | `WaterConsumerWfController@getRejectedApplicationDetails` | `routes/water.php:260` | Method `getRejectedApplicationDetails` does not exist in `WaterConsumerWfController.php`. |
| 4 | Water | `POST api/water/consumerChargeCal` | `WaterApplication@calConsumerDemand` | `routes/water.php:290` | Misrouted target: Method `calConsumerDemand` exists in `WaterConsumer.php` (line 123), but route points to `WaterApplication`. |

### Group B: Intentionally Unsupported Resource Actions (6 Routes)
Generated automatically by `Route::resource('application/apply-new-connection', NewConnectionController::class)` at `routes/water.php:40`. The controller only implements `store` (line 176); the remaining REST verbs are superseded by custom RPC endpoints:

| # | Method & URI | Target Action | Status | Functional Alternative |
|---|---|---|:---:|---|
| 5 | `GET api/water/application/apply-new-connection` | `NewConnectionController@index` | `INTENTIONALLY UNSUPPORTED` | Handled via custom RPC `waterInbox` / `waterOutbox` routes |
| 6 | `GET api/water/application/apply-new-connection/create` | `NewConnectionController@create` | `INTENTIONALLY UNSUPPORTED` | Frontend SPA renders application form directly |
| 7 | `GET api/water/application/apply-new-connection/{id}` | `NewConnectionController@show` | `INTENTIONALLY UNSUPPORTED` | Handled via `POST api/water/admin/application/application-details` |
| 8 | `PUT/PATCH api/water/application/apply-new-connection/{id}` | `NewConnectionController@update` | `INTENTIONALLY UNSUPPORTED` | Application modifications follow workflow approval actions |
| 9 | `DELETE api/water/application/apply-new-connection/{id}` | `NewConnectionController@destroy` | `INTENTIONALLY UNSUPPORTED` | Direct deletion prohibited; formal rejection workflow used |
| 10 | `GET api/water/application/apply-new-connection/{id}/edit` | `NewConnectionController@edit` | `INTENTIONALLY UNSUPPORTED` | Handled via `POST api/water/admin/application/edit-application` |

### Group C: Obsolete / Not-In-Use Routes (5 Routes)
Routes declared in commented-out blocks or pointing to methods deprecated during prior refactoring:

| # | Module | Method & URI | Target Action | Source Reference | Status Description |
|---|---|---|---|---|---|
| 11 | Trade | `POST api/trade/application/notice-summary` | `ReportController@noticeSummary` | `routes/trade.php:204` | Declared inside explicit `//not in use` comment block (line 201). Method does not exist. |
| 12 | Water | `POST api/water/consumer/req/doc-verify-reject` | `WaterConsumerWfController@consumerDocVerifyReject` | `routes/water.php:280` | Method commented out in controller; logic moved to workflow repository. |
| 13 | Water | `POST api/water/consumer/req/get-upload-documents` | `WaterConsumerWfController@getConsumerDocs` | `routes/water.php:281` | Method commented out in controller; replaced by DMS workflow helper. |
| 14 | Water | `POST api/water/consumer/req/list-req-docs` | `WaterConsumerWfController@listDocToUpload` | `routes/water.php:282` | Method commented out in controller; superseded by document requirement engine. |
| 15 | Water | `POST api/water/update-applications` | `WaterApplication@updateWaterApplication` | `routes/water.php:289` | Method missing in `WaterApplication.php`. Abandoned legacy route declaration. |

---

## 4. Authentication & Authorization Findings

1. **Gateway Identity Hydration (`AuthMaker.php:17-41`)**:
   - `AuthMaker` executes on protected routes, decoding `$request->auth` and `$request->currentAccessToken`.
   - If `tokenable_type == 'App\Models\Auth\User'`, it authenticates `new \App\Models\User($request->auth)`.
   - Otherwise, it authenticates `new \App\Models\ActiveCitizen($request->auth)`.
   - **Architectural Pass-Through**: If `$request->auth` is null, `AuthMaker` executes `$next($request)` without returning HTTP 401. It relies entirely on the upstream gateway for token enforcement.
2. **Multi-Tenancy Scoping (`UlbFilter.php:219-580`)**:
   - `InternalUlbScope` intercepts Eloquent queries and dynamically appends `WHERE table.ulb_id = ?` based on authenticated user claims.
   - **Limitation**: The scope automatically skips tables that lack an `ulb_id` column. Raw SQL queries rely on regex rewriting, falling back to unfiltered execution on error.
3. **Role & Ward Permissions (`WardPermission.php:22-78`)**:
   - Official permissions and ward lists are cached in Redis (`workflow_candidate:{user_id}`, `WardPermission:{user_id}`).

---

## 5. Reconciled Security Findings & Risk Summary

| Finding ID | Module | Finding Summary | Severity | Status | Source Reference |
|---|---|---|:---:|:---:|---|
| **SEC-001** | Water | Rate-limiter / Throttle bypass on all Water routes | **MEDIUM** | CONFIRMED ROUTE CONFIGURATION DEFECT | `RouteServiceProvider.php:58-61` |
| **SEC-002** | Trade | Trade license owner PII exposed via unprotected duplicate route | **HIGH** | CONFIRMED UNPROTECTED ROUTE | `routes/trade.php:208`, `TradeCitizenController:1330` |
| **SEC-003** | Water | Unauthenticated document upload route | **HIGH** | UNPROTECTED UPLOAD ROUTE / UNVERIFIED DMS IMPACT | `routes/water.php:296`, `NewConnectionController:3689` |
| **SEC-004** | Water | Water consumer PII search route without authentication | **HIGH** | CONFIRMED UNPROTECTED ROUTE | `routes/water.php:272`, `WaterConsumer:2529` |
| **SEC-005** | Trade | Potential Insecure Direct Object Reference (IDOR) on certificates | **HIGH** | POTENTIAL IDOR | `routes/trade.php:194-198`, `TradeApplication:1151` |
| **SEC-006** | Water | Hardcoded `dd()` debug string in production route | **MEDIUM** | CONFIRMED OPERATIONAL DEFECT | `routes/water.php:33` |
| **SEC-007** | Shared | Missing independent token validation in backend (Pass-Through) | **CRITICAL** | ARCHITECTURAL TRUST BOUNDARY / NEEDS INFRASTRUCTURE VALIDATION | `AuthMaker.php:17-41` |
| **SEC-008** | Shared | Multi-tenancy filter bypass risk on models lacking `ulb_id` & complex SQL | **MEDIUM** | POTENTIAL MULTI-TENANCY RISK | `UlbFilter.php:219-580` |

---

## 6. Execution Flow Verification Summary

Ten representative API execution flows documented in `api-execution-flows.md` have been fully traced across their static call stacks:
- **P-01 (Apply SAF)**: `ApplySafController@applySaf` (DB transaction, `PropProperty`, `PropFloor`, `PropOwner`, DMS upload)
- **P-02 (Calculate by Holding)**: `CalculatorController@calculateByHolding` (`PropTaxRateMaster`, rebate/penalty calculation)
- **P-03 (TC Verification)**: `SafWorkflowController@taxCollectorVerification` (`WfActiveWorkflow`, `WfWorkflowTrack`)
- **P-04 (SAF Approval)**: `SafWorkflowController@approvalRejectionSaf` (Dual DB: `pgsql` + `pgsql_master`, `PropApprovedSaf`)
- **T-01 (Apply Trade License)**: `TradeApplication@applyApplication` (`Trade@addRecord()`, `TradeLicence`, `TradeOwner`)
- **T-02 (Trade Payment Receipt)**: `TradePaymentController@viewPaymentReceipt` (`TradeTran`, `TradeLicence`, `UlbMaster`)
- **T-03 (Trade Inbox)**: `TradeApplication@tradeInbox` (`TradeWorkflow`, role filtering, ward scoping)
- **W-01 (Apply Water Connection)**: `NewConnectionController@store` (`WaterApplication`, `WaterApplicant`, connection charge computation)
- **W-02 (Water Field Inspection)**: `WaterWorkflowController@fieldInspection` (`WaterSiteInspection`, fee updates)
- **W-03 (Water Meter Details)**: `WaterConsumer@saveUpdateMeterDetails` (`WaterConsumer`, `WaterMeterReading`, demand recalculation)

*All 10 flows are labeled `SOURCE VERIFIED` across static code paths; **0 live endpoints were executed**.*

---

## 7. Phase 1 Completion Statistics

$$\text{Static Code-Path Verification Rate} = \frac{743 \text{ Statically Verified Routes}}{758 \text{ Total Routes}} \times 100 = \mathbf{98.02\%}$$

$$\text{Confirmed Defective / Misrouted Rate} = \frac{4}{758} \times 100 = \mathbf{0.53\%}$$

$$\text{Intentionally Unsupported Resource Verbs Rate} = \frac{6}{758} \times 100 = \mathbf{0.79\%}$$

$$\text{Obsolete / Abandoned Routes Rate} = \frac{5}{758} \times 100 = \mathbf{0.66\%}$$

$$\text{Runtime Endpoint Execution Testing Rate} = \mathbf{0.00\%} \quad \text{(0 Endpoint Tests Performed)}$$

- **743 routes (98.02%)** are verified statically across their code paths (resolving to existing controllers, valid methods, request validations, and database models), but remain **NOT TESTED AT RUNTIME**.
- **15 routes (1.98%)** have confirmed code defects, intentionally unsupported resource scaffolding, or obsolete declarations.
