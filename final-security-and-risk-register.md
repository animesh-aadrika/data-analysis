# Phase 1 Discovery: Final Security and Risk Register

**Project**: eGov Backend Technical Discovery — Property, Trade, and Water Modules  
**Backend Repository**: `egov-backend`  
**Backend Branch**: `animesh-leo-clean`  
**Backend Commit SHA**: `269c125e3f1fd2f4888321f28528579c59c1e303`  
**Documentation Repository**: `animesh-aadrika/data-analysis` (`main`)  
**Inspection Date**: November 3, 2026  
**Operating Mode**: STRICT READ-ONLY MODE (Static source inspection only; no live exploitation or penetration testing)  

---

## 1. Executive Summary

During the Phase 1 static discovery pass, eight security, architectural, and operational findings were identified across the Property, Trade, and Water modules of `egov-backend`.

Every finding in this register is strictly grounded in source-code inspection of route declarations, middleware configuration, controller logic, and multi-tenancy traits. In adherence to read-only safety rules, no live penetration testing, vulnerability exploitation, or state-mutating requests were executed.

### Severity Summary

| Severity | Count | Finding IDs |
|---|:---:|---|
| **CRITICAL** | 1 | SEC-007 (Architectural Trust Boundary) |
| **HIGH** | 4 | SEC-002, SEC-003, SEC-004, SEC-005 |
| **MEDIUM** | 3 | SEC-001, SEC-006, SEC-008 |
| **LOW / INFORMATIONAL** | 0 | — |
| **TOTAL** | **8** | SEC-001 through SEC-008 |

---

## 2. Reclassified Master Risk Register Table

| ID | Module | Finding | Severity | Finding Status | Evidence Confidence | Verified Impact | Unverified Assumptions | Existing Protection | Required Follow-up | Phase |
|---|---|---|:---:|:---:|:---:|---|---|---|---|:---:|
| **SEC-001** | Water | Rate-limiter / Throttle bypass on all Water routes | **MEDIUM** | **CONFIRMED ROUTE CONFIGURATION DEFECT** | **HIGH** | Duplicate registration in `RouteServiceProvider` causes all 139 routes in `routes/water.php` to lack the global `api` middleware group, omitting `throttle:api` (60 req/min). | Whether upstream gateway or reverse proxy enforces external rate limiting was not verified. | Authenticated water routes still execute `AuthMaker` and `ForceJsonResponse`. | Remove duplicate route inclusion at lines 58-61; retain only lines 53-56 with `->middleware('api')`. | Phase 1 Finding / Phase 2 Fix |
| **SEC-002** | Trade | Trade license owner PII exposed via unprotected duplicate route | **HIGH** | **CONFIRMED UNPROTECTED ROUTE** | **HIGH** | Route declared twice (`routes/trade.php:131, 208`). The duplicate declaration at line 208 is unauthenticated and overwrites line 131 in the routing table. `TradeCitizenController@getOwnerDetailsInfo` returns owner name, mobile, and address without authentication. | Whether the production frontend consumes the duplicate route or another endpoint was not tested at runtime. | Controller validates `filterBy` (`licenseNo`, `applicationNo`) and requires string `filterValue`. | Remove duplicate declaration at line 208; add authenticated user check in controller. | Phase 1 Finding / Phase 2 Fix |
| **SEC-003** | Water | Unauthenticated document upload route | **HIGH** | **UNPROTECTED UPLOAD ROUTE / UNVERIFIED DMS IMPACT** | **HIGH (Route) / LOW (DMS Impact)** | `POST api/water/simple-upload-document` is declared with empty middleware `[]`. It accepts files and calls `DocUpload::checkDoc($req)`. | Unrestricted storage or file execution on the server is NOT proven; internal authorization and storage isolation of the external DMS were not verified. | Validates MIME type (`pdf,jpeg,png,jpg,webp`) and maximum file size (2048 KB). | Wrap route in `auth_maker` middleware; verify external DMS credentials and access controls. | Phase 1 Finding / Phase 2 Audit |
| **SEC-004** | Water | Water consumer PII search route without authentication | **HIGH** | **CONFIRMED UNPROTECTED ROUTE** | **HIGH** | `POST api/water/consumer/get-owner-details` is declared with empty middleware `[]`. `WaterConsumer@getOwnerDetailsInfo` returns applicant and consumer records without requiring authentication. | Impact on external public billing portals was not verified at runtime. | Validates `filterBy` (`consumerNo`, `applicationNo`) and parameter presence. | Add `auth_maker` middleware or restrict return payload to non-sensitive billing metadata. | Phase 1 Finding / Phase 2 Fix |
| **SEC-005** | Trade | Potential Insecure Direct Object Reference (IDOR) on certificates and receipts | **HIGH** | **POTENTIAL IDOR** | **MEDIUM** | `GET license-certificate/{id}`, `provisional-certificate/{id}`, and `payment-receipt/{id}/{transectionId}` are declared in unauthenticated group (`routes/trade.php:194-198`). Controller validates only integer IDs. | Whether downstream repository methods (`Trade@licenceCertificate`, etc.) enforce ownership via session data was not fully traced under execution. | Input validation restricts `{id}` to integer format (`digits_between:1,...`). | Keep status as POTENTIAL; trace repository query constraints in Phase 2; enforce signed URLs or citizen tokens. | Phase 1 Finding / Phase 2 Audit |
| **SEC-006** | Water | Hardcoded `dd()` debug string in production route | **MEDIUM** | **CONFIRMED OPERATIONAL DEFECT** | **HIGH** | `POST api/water/apply-new-connection` executes an anonymous closure containing `dd('Welcome to simple Water route file')`, immediately terminating request execution. | No secret disclosure or environment variable leakage observed in code; dumps only the literal string. | Route `application/apply-new-connection` (resource) exists separately at line 40. | Remove dead closure route at line 33 to prevent application submission failures. | Phase 1 Finding / Phase 2 Fix |
| **SEC-007** | Shared | Missing independent token validation in backend (Pass-Through Architecture) | **CRITICAL** | **ARCHITECTURAL TRUST BOUNDARY / NEEDS INFRASTRUCTURE VALIDATION** | **HIGH (Code) / NOT ESTABLISHED (Network)** | `AuthMaker` trusts `$request->auth` and `$request->currentAccessToken` without cryptographic signature verification. If `$request->auth` is null, it passes requests through without returning HTTP 401. | Arbitrary administrative access is NOT a confirmed exploit; it requires direct backend network access bypassing the gateway, which has not been established. | Upstream gateway (`Authorisation-Service`) enforces `auth:sanctum` before proxying requests. | Audit network firewalls, Docker port bindings, and ingress controllers; implement shared HMAC signing between gateway and backend. | Phase 1 Finding / Architecture Action |
| **SEC-008** | Shared | Multi-tenancy filter bypass risk on models lacking `ulb_id` and complex SQL | **MEDIUM** | **POTENTIAL MULTI-TENANCY RISK** | **MEDIUM** | `InternalUlbScope` automatically skips models whose database tables lack an `ulb_id` column. Regex rewriting in `UlbFilter` falls back to unfiltered query execution upon parsing errors. | Concrete cross-ULB data exposure has NOT been confirmed; specific affected models/queries require complete database schema extraction. | Schema-aware column checking via `Schema::hasColumn()` and regex SQL rewriting for `DB::select`. | Perform full audit of all database table schemas in Phase 2; verify `ulb_id` foreign keys on all transaction tables. | Phase 1 Finding / Phase 2 Audit |

---

## 3. In-Depth Technical Analysis of Findings

### SEC-001: Rate-Limiter / Throttle Bypass on All Water Routes
- **Vulnerability Category**: Configuration Defect / Denial of Service Risk (CWE-770)
- **Source Reference**: `app/Providers/RouteServiceProvider.php:53-61`
```php
// Lines 53-56: First registration WITH 'api' middleware group
Route::prefix('api/water')
    ->middleware('api')
    ->namespace($this->namespace)
    ->group(base_path('routes/water.php'));

// Lines 58-61: Redundant second registration WITHOUT 'api' middleware group
Route::prefix('api/water')
    ->namespace($this->namespace)
    ->group(base_path('routes/water.php'));
```
- **Technical Mechanism**:
  In Laravel, registering the same route file under the same prefix twice causes routes registered in the second pass to overwrite earlier registrations in the compiled `RouteCollection`. Because lines 58-61 omit `->middleware('api')`, all 139 routes in `water.php` are stripped of the global `api` middleware group, which provides `throttle:api` (60 requests per minute).
- **Verified Impact**: All 139 water routes operate without application-level rate limiting.
- **Unverified Assumptions**: Whether external reverse proxies (Nginx, Cloudflare) or API gateways enforce rate limiting before traffic reaches Laravel is unverified.

---

### SEC-002: Trade License Owner PII Exposed via Duplicate Route
- **Vulnerability Category**: Information Disclosure / Broken Authentication (CWE-306, CWE-200)
- **Source Reference**: `routes/trade.php:131, 208` & `TradeCitizenController.php:1330-1365`
```php
// routes/trade.php:131 (Inside protected group)
Route::post('application-search/get-owner-details', "getOwnerDetailsInfo");

// routes/trade.php:208 (Outside protected group, under plain controller group)
Route::controller(TradeCitizenController::class)->group(function () {
    Route::post('application-search/get-owner-details', "getOwnerDetailsInfo");
});
```
- **Technical Mechanism**:
  The duplicate route declaration at line 208 overwrites line 131 in Laravel's route collection, registering with `middleware: ['api']` and omitting `auth_maker`. Inspection of `TradeCitizenController::getOwnerDetailsInfo` reveals no internal user or token checks:
```php
public function getOwnerDetailsInfo(Request $request)
{
    $request->validate([
        'filterBy' => "required|string|in:licenseNo,applicationNo",
        'filterValue' => "required|string",
    ]);
    ...
    $tradeOwnerDtls = new TradeLicence();
    switch ($key) {
        case 'licenseNo':
            $data = $tradeOwnerDtls->getOwnerDetails($parameter, 'trade_licences.license_no')->get();
            break;
        case 'applicationNo':
            $data = $tradeOwnerDtls->getOwnerDetails($parameter, 'trade_licences.application_no')->get();
            break;
    }
    return responseMsgs(true, "Application Details", remove_null($data), ...);
}
```
- **Verified Impact**: Unauthenticated callers can retrieve trade establishment owner personal details (names, mobile numbers, business addresses) using an application or license number.
- **Unverified Assumptions**: Whether the primary citizen portal frontend consumes this specific duplicate route or another endpoint was not tested at runtime.

---

### SEC-003: Unauthenticated Document Upload Route
- **Vulnerability Category**: Missing Authentication on Upload Endpoint (CWE-306)
- **Source Reference**: `routes/water.php:296` & `NewConnectionController.php:3689-3730`
```php
// routes/water.php:296 (Declared outside any middleware group)
Route::controller(NewConnectionController::class)->group(function () {
    Route::post('simple-upload-document', 'testUploadDocument');
});
```
- **Technical Mechanism**:
  `testUploadDocument` validates file MIME type and file size, then instantiates `DocUpload` and passes `$req` to `checkDoc($req)`:
```php
public function testUploadDocument(Request $req)
{
    $validated = Validator::make($req->all(), [
        "document" => "required|mimes:pdf,jpeg,png,jpg,webp|max:2048",
        "ulb_id" => "nullable|integer",
        "module_id" => "nullable|integer",
        "is_global_master" => "nullable|in:true,false",
    ]);
    if ($validated->fails()) return validationError($validated);

    $docUpload = new DocUpload();
    $docDetail = $docUpload->checkDoc($req);
    ...
}
```
- **Verified Impact**: An unauthenticated user can invoke this endpoint and trigger the upload handler in `DocUpload`.
- **Unverified Assumptions**: Arbitrary file upload or unrestricted DMS compromise is **NOT confirmed**. The internal access controls, authentication headers, storage paths, and virus scanning of the external Document Management System (DMS) were not inspected from this repository.

---

### SEC-004: Water Consumer PII Search Route Without Authentication
- **Vulnerability Category**: Information Disclosure / Broken Authentication (CWE-306, CWE-200)
- **Source Reference**: `routes/water.php:272` & `WaterConsumer.php:2529-2565`
```php
// routes/water.php:272 (Declared outside any middleware group)
Route::controller(WaterConsumer::class)->group(function () {
    Route::post('consumer/get-owner-details', 'getOwnerDetailsInfo');
});
```
- **Technical Mechanism**:
  Identical pattern to SEC-002. Endpoint takes `consumerNo` or `applicationNo` and returns consumer personal and connection records directly from `water_water_consumers` and `water_approval_application_details` without authentication.
- **Verified Impact**: Public callers can query water consumer records and associated property identifiers.
- **Unverified Assumptions**: Whether third-party payment collection kiosks or bill fetch portals deliberately require unauthenticated consumer lookup was not verified.

---

### SEC-005: Potential Insecure Direct Object Reference (IDOR) on Certificates
- **Vulnerability Category**: Potential Insecure Direct Object Reference (CWE-639)
- **Source Reference**: `routes/trade.php:194-198` & `TradeApplication.php:1151-1200`
```php
Route::controller(TradeApplication::class)->group(function () {
    Route::get('license-certificate/{id}', 'licenceCertificate');
    Route::get('provisional-certificate/{id}', 'provisionalCertificate');
    Route::get('payment-receipt/{id}/{transectionId}', 'paymentReceipt');
});
```
- **Technical Mechanism**:
  Routes are registered outside `auth_maker`. The controller validates only that `{id}` and `{transectionId}` are valid integers, then delegates to `$this->_REPOSITORY->licenceCertificate($id)` or `readPaymentReceipt($id, $transectionId)`.
- **Verified Impact**: Endpoints can be requested without authentication headers and with arbitrary sequential integer IDs.
- **Unverified Assumptions**: Kept as **POTENTIAL IDOR**. Whether downstream repository methods or PDF generators enforce tenant isolation, hash checking, or session scoping was not verified under live execution.

---

### SEC-006: Hardcoded `dd()` Debug String in Production Route
- **Vulnerability Category**: Operational Defect / Denial of Service (CWE-489)
- **Source Reference**: `routes/water.php:33`
```php
Route::post('apply-new-connection', function () {
    dd('Welcome to simple Water route file');
});
```
- **Technical Mechanism**:
  `POST api/water/apply-new-connection` executes an anonymous closure containing Symfony's `dd()` (Dump and Die), aborting request execution and returning the string `'Welcome to simple Water route file'`.
- **Verified Impact**: Any client posting to this endpoint fails immediately.
- **Unverified Assumptions**: No environment variable disclosure, API key exposure, or stack trace leakage was observed in code; the call dumps only a hardcoded string literal.

---

### SEC-007: Missing Independent Token Validation (Pass-Through Architecture)
- **Vulnerability Category**: Architectural Trust Boundary Violation (CWE-287, CWE-345)
- **Source Reference**: `app/Http/Middleware/AuthMaker.php:17-41`
```php
public function handle(Request $request, Closure $next)
{
    if(!Auth()->user() && $request->auth)
    {
        if(!is_array($request->auth)) {
            $request->merge(["auth"=>json_decode($request->auth,true)]);
        }
        if(!is_array($request->currentAccessToken)) {
            $request->merge(["currentAccessToken"=>json_decode($request->currentAccessToken,true)]);
        }
        switch($request->currentAccessToken["tokenable_type"]) {
            case "App\\Models\\Auth\\User": 
                Auth::login(new \App\Models\User($request->auth));
                break;
            default: 
                Auth::login(new \App\Models\ActiveCitizen($request->auth));
                break;
        }
        collect($request->auth)->map(function ($val, $key) {
            Auth()->user()->$key = $val;
        });
    }
    return $next($request);
}
```
- **Technical Mechanism**:
  1. The backend application assumes that an upstream API Gateway (`Authorisation-Service`) has validated a Laravel Sanctum bearer token and forwarded user claims via `$request->auth`.
  2. `AuthMaker` performs NO cryptographic verification, token lookup, or signature validation. It hydrates an authenticated user directly from the JSON body.
  3. **Pass-Through Behavior**: If `$request->auth` is absent or null, `AuthMaker` simply executes `$next($request)` without rejecting the request with HTTP 401.
- **Verified Impact**: The backend has zero independent authentication enforcement; it is entirely dependent on upstream gateway behavior.
- **Unverified Assumptions**: Arbitrary administrative access is **NOT a confirmed exploit**. Direct access to the backend port bypassing the gateway has NOT been established; network firewalls, Docker network isolation, or Kubernetes ingress controls may prevent direct external access.
- **Status Classification**: `ARCHITECTURAL TRUST BOUNDARY / NEEDS INFRASTRUCTURE VALIDATION`.

---

### SEC-008: Multi-Tenancy Filter Bypass Risk on Models Lacking `ulb_id` & Complex SQL
- **Vulnerability Category**: Multi-Tenancy Scoping Limitation (CWE-284)
- **Source Reference**: `app/Traits/UlbFilter.php:219-580`
- **Technical Mechanism**:
  1. `UlbFilter` registers `InternalUlbScope` on Eloquent models dynamically via `Controller::callAction()`.
  2. `InternalUlbScope::apply()` checks `Schema::hasColumn($table, 'ulb_id')`. If the table does not have an `ulb_id` column, the scope silently skips applying tenant filters.
  3. For raw SQL queries (`DB::select`), `UlbFilter` attempts regex rewriting to inject `WHERE ulb_id = ?`. If a query contains complex joins, subqueries, or unusual syntax that causes rewriting to fail, it catches the exception and falls back to executing the original unfiltered query.
- **Verified Impact**: Tables without `ulb_id` columns and raw SQL queries failing regex rewriting are executed without tenant scoping.
- **Unverified Assumptions**: Concrete cross-ULB data exposure is **NOT confirmed**. Establishing which specific transaction or master tables lack `ulb_id` requires complete database schema extraction in Phase 2.
- **Status Classification**: `POTENTIAL MULTI-TENANCY RISK`.

---

## 4. Phase 2 Remediation & Investigation Roadmap

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PHASE 2 SECURITY REMEDIATION PLAN                    │
├────────────────────────────────────────────────────────────────────────┤
│ Immediate Route Configuration Fixes:                                   │
│ 1. Fix RouteServiceProvider duplicate registration (SEC-001)           │
│ 2. Remove duplicate unauthenticated trade route (SEC-002)              │
│ 3. Remove dead dd() closure route in water.php (SEC-006)               │
├────────────────────────────────────────────────────────────────────────┤
│ Authentication & Gateway Hardening:                                    │
│ 4. Wrap simple-upload-document & consumer search in auth (SEC-003, 004)│
│ 5. Validate network firewall between gateway and backend (SEC-007)     │
│ 6. Implement shared HMAC signature validation in AuthMaker (SEC-007)   │
├────────────────────────────────────────────────────────────────────────┤
│ Multi-Tenancy & Data Scoping Audit:                                    │
│ 7. Audit all database tables for 'ulb_id' columns in Phase 2 (SEC-008) │
│ 8. Audit trade certificate download authorization logic (SEC-005)      │
└────────────────────────────────────────────────────────────────────────┘
```
