# Phase 1 Discovery: Final Security and Risk Register

**Project**: eGov Backend Technical Discovery — Property, Trade, and Water Modules  
**Repository**: `egov-backend` (`animesh-leo-clean`)  
**Documentation Repository**: `animesh-aadrika/data-analysis` (`main`)  
**Investigation Mode**: STRICT READ-ONLY MODE (Zero code, database, package, or configuration modifications)  
**Date**: November 3, 2026  

---

## 1. Executive Summary

During the Phase 1 static discovery and source-code verification pass across the Property, Trade, and Water modules of `egov-backend`, eight significant security vulnerabilities, architectural dependencies, and operational defects were identified.

Every finding documented in this register is grounded in direct source-code inspection of route definitions, middleware stacks, controller methods, and data filtering traits. No live penetration testing, active exploitation, or unauthorized execution was performed.

### Severity Summary

| Severity | Count | Finding IDs |
|---|:---:|---|
| **CRITICAL** | 1 | SEC-007 |
| **HIGH** | 4 | SEC-002, SEC-003, SEC-004, SEC-005 |
| **MEDIUM** | 3 | SEC-001, SEC-006, SEC-008 |
| **LOW** | 0 | — |
| **INFORMATIONAL** | 0 | — |
| **TOTAL** | **8** | SEC-001 through SEC-008 |

---

## 2. Master Security and Risk Register Table

| ID | Module | Finding | Severity | Status | Source Evidence | Impact | Existing Control | Limitation | Recommendation | Phase |
|---|---|---|:---:|:---:|---|---|---|---|---|:---:|
| **SEC-001** | Water | Rate-limiter / Throttle bypass on all Water routes | **MEDIUM** | CONFIRMED | `app/Providers/RouteServiceProvider.php:58-61` | All 139 water routes operate without API rate limiting (`throttle:api`), exposing endpoints to brute force or DoS. | Routes inside group still have `auth_maker` and `json.response`. | Runtime load testing not performed. | Remove redundant route loading block at lines 58-61; retain only lines 53-56 with `api` middleware. | Phase 1 Finding / Phase 2 Fix |
| **SEC-002** | Trade | Trade license owner PII exposed via unprotected duplicate route | **HIGH** | CONFIRMED | `routes/trade.php:208`, `app/Http/Controllers/Trade/TradeCitizenController.php:1330-1365` | Anyone can query full trade owner details (name, phone, address) with arbitrary `licenseNo` or `applicationNo` without authentication. | Input validation restricts `filterBy` to enum values and checks parameter presence. | Whether frontend consumes duplicate endpoint or original at line 131 not tested. | Remove duplicate route at line 208; enforce authenticated citizen ownership check in controller. | Phase 1 Finding / Phase 2 Fix |
| **SEC-003** | Water | Unauthenticated arbitrary document upload to Document Management System (DMS) | **HIGH** | CONFIRMED | `routes/water.php:296`, `app/Http/Controllers/Water/NewConnectionController.php:3689-3730` | External actors can upload files directly to DMS without any authentication, user identity, or ULB validation. | MIME validation (`pdf,jpeg,png,jpg,webp`) and max file size (2048 KB). | Internal behavior and authorization of external DMS API was not inspected. | Wrap route in `auth_maker` group; enforce active user/citizen session before DMS dispatch. | Phase 1 Finding / Phase 2 Fix |
| **SEC-004** | Water | Water consumer PII data disclosure via unauthenticated search | **HIGH** | CONFIRMED | `routes/water.php:272`, `app/Http/Controllers/Water/WaterConsumer.php:2529-2565` | Anyone can query water consumer PII (owner name, mobile, address, meter/connection specs) without authentication. | Controller validates `filterBy` (`consumerNo`, `applicationNo`). | Impact on third-party payment integrations unknown. | Apply `auth_maker` or restrict return payload to non-sensitive billing metadata. | Phase 1 Finding / Phase 2 Fix |
| **SEC-005** | Trade | Potential Insecure Direct Object Reference (IDOR) on trade certificates and receipts | **HIGH** | POTENTIAL | `routes/trade.php:194-198`, `app/Http/Controllers/Trade/TradeApplication.php:1151-1200` | Unauthenticated callers can download trade certificates and payment receipts for any sequential integer ID. | Controller validates integer format of ID. | Repository PDF generation queries were not dynamically executed. | Enforce citizen token verification or temporary signed URLs for certificate downloads. | Phase 1 Finding / Phase 2 Fix |
| **SEC-006** | Water | Hardcoded `dd()` dump statement in production route | **MEDIUM** | CONFIRMED | `routes/water.php:33` | Any HTTP request to `POST api/water/apply-new-connection` immediately halts execution and returns a raw debug dump string. | None on this specific route. | Only affects `POST api/water/apply-new-connection`; resource route at line 40 is separate. | Remove obsolete closure route or redirect to `NewConnectionController@store`. | Phase 1 Finding / Phase 2 Fix |
| **SEC-007** | Shared | Absence of independent token validation in backend (Pass-Through Architecture) | **CRITICAL** | ARCHITECTURAL | `app/Http/Middleware/AuthMaker.php:17-41` | If gateway is bypassed or direct backend access is exposed, attackers can forge `$request->auth` JSON payloads with arbitrary roles/ULBs. | Upstream gateway (`Authorisation-Service`) enforces Sanctum authentication. | Infrastructure network firewalls and port exposure between gateway and backend not verified. | Verify strict network isolation; implement shared HMAC secret or mTLS between gateway and backend. | Phase 1 Finding / Architecture Decision |
| **SEC-008** | Shared | Multi-tenancy filter bypass risk on models lacking `ulb_id` and complex raw SQL | **MEDIUM** | POTENTIAL | `app/Traits/UlbFilter.php:219-580` | Queries on models without a `ulb_id` column or complex raw SQL joins failing regex rewriting bypass tenant isolation. | Schema-aware column detection via `InternalUlbScope` and AST-like SQL parsing. | Specific list of all master/pivot tables lacking `ulb_id` requires full Phase 2 DB schema extraction. | Enforce explicit `ulb_id` foreign keys on all business tables; audit raw SQL query patterns in repositories. | Phase 1 Finding / Phase 2 Audit |

---

## 3. In-Depth Technical Analysis of Vulnerabilities

### SEC-001: Rate-Limiter / Throttle Bypass on All Water Routes
- **Vulnerability Type**: Rate Limiting / Configuration Defect (CWE-770)
- **Source Code Reference**: `app/Providers/RouteServiceProvider.php:53-61`
```php
// Lines 53-56: First registration with 'api' middleware group
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
  In Laravel, when route files are loaded multiple times under the same URI prefix, routes registered later overwrite earlier routes in the route collection. Because lines 58-61 register `routes/water.php` without `->middleware('api')`, all routes defined in `water.php` are stripped of the global `api` middleware group, which includes `throttle:api` (60 requests per minute).
- **Evidence from Route Collection**:
  `php artisan route:list` confirms that every water route inside the group has middleware `['App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']`, completely omitting `throttle:api`.
- **Operational Impact**: An attacker can send unbounded requests to water calculation engines, demand computation routines, and search endpoints, leading to resource exhaustion, CPU spikes, and potential denial of service.

---

### SEC-002: Trade License Owner PII Exposure via Duplicate Route
- **Vulnerability Type**: Broken Authentication / Information Disclosure (CWE-306, CWE-200)
- **Source Code Reference**: `routes/trade.php:131, 208` & `TradeCitizenController.php:1330-1365`
```php
// routes/trade.php:131 (Inside protected group: ['json.response', 'auth_maker'])
Route::post('application-search/get-owner-details', "getOwnerDetailsInfo"); #api_id = 012123

// routes/trade.php:208 (Outside protected group: no middleware)
Route::controller(TradeCitizenController::class)->group(function () {
    Route::post('application-search/get-owner-details', "getOwnerDetailsInfo");
});
```
- **Technical Mechanism**:
  The route `POST api/trade/application-search/get-owner-details` is defined twice. The second declaration at line 208 is placed in an unauthenticated group at the bottom of the file. It overwrites the protected registration at line 131.
  Inspection of `TradeCitizenController::getOwnerDetailsInfo` confirms that there is NO internal authentication check:
```php
public function getOwnerDetailsInfo(Request $request)
{
    $request->validate([
        'filterBy' => "required|string|in:licenseNo,applicationNo",
        'filterValue' => "required|string",
    ]);

    try {
        $key = $request->filterBy;
        $parameter = $request->filterValue;
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
    } ...
}
```
- **Operational Impact**: An unauthenticated attacker can enumerate trade licenses and harvest owner names, mobile numbers, business addresses, and trade classifications across the entire municipality.

---

### SEC-003: Unauthenticated Arbitrary File Upload to DMS
- **Vulnerability Type**: Unrestricted File Upload / Missing Authentication (CWE-434, CWE-306)
- **Source Code Reference**: `routes/water.php:296` & `NewConnectionController.php:3689-3730`
```php
// routes/water.php:296 (Outside any middleware group)
Route::controller(NewConnectionController::class)->group(function () {
    Route::post('simple-upload-document', 'testUploadDocument');
});
```
- **Technical Mechanism**:
  `testUploadDocument` accepts multipart document uploads with parameters `document`, `ulb_id`, `module_id`, and `is_global_master`. It performs MIME type validation (`pdf,jpeg,png,jpg,webp`) and size limits (`max:2048`), but performs ZERO authentication or session checks:
```php
public function testUploadDocument(Request $req)
{
    $validated = Validator::make($req->all(), [
        "document" => "required|mimes:pdf,jpeg,png,jpg,webp|max:2048",
        "ulb_id" => "nullable|integer",
        "module_id" => "nullable|integer",
        "is_global_master" => "nullable|in:true,false",
    ]);
    ...
    $docUpload = new DocUpload();
    $docDetail = $docUpload->checkDoc($req); // Dispatches to external Document Management System
    ...
}
```
- **Operational Impact**: External malicious actors can flood the municipality's Document Management System (DMS) with unauthenticated documents, consume storage quotas, or upload offensive/illegal media without accountability.

---

### SEC-004: Water Consumer PII Data Disclosure
- **Vulnerability Type**: Broken Authentication / Information Disclosure (CWE-306, CWE-200)
- **Source Code Reference**: `routes/water.php:272` & `WaterConsumer.php:2529-2565`
```php
// routes/water.php:272 (Outside any middleware group)
Route::controller(WaterConsumer::class)->group(function () {
    Route::post('consumer/get-owner-details', 'getOwnerDetailsInfo');
});
```
- **Technical Mechanism**:
  Identical pattern to SEC-002. Endpoint takes `consumerNo` or `applicationNo` and returns applicant and consumer records directly from `water_water_consumers` and `water_approval_application_details` without requiring authentication or verifying whether the caller owns the property or connection.
- **Operational Impact**: Citizen consumer records, property relationships, connection dimensions, and mobile numbers can be programmatically scraped.

---

### SEC-005: Potential Insecure Direct Object Reference (IDOR) on Trade Certificates
- **Vulnerability Type**: Insecure Direct Object Reference (CWE-639)
- **Source Code Reference**: `routes/trade.php:194-198` & `TradeApplication.php:1151-1200`
```php
Route::controller(TradeApplication::class)->group(function () {
    Route::get('license-certificate/{id}', 'licenceCertificate');
    Route::get('provisional-certificate/{id}', 'provisionalCertificate');
    Route::get('payment-receipt/{id}/{transectionId}', 'paymentReceipt');
});
```
- **Technical Mechanism**:
  Endpoints are placed outside the `auth_maker` middleware group. The controller validates only that `{id}` and `{transectionId}` are integers (`digits_between:1,9223372036854775807`). The repository loads the corresponding record by primary key and renders a PDF download without verifying caller identity or tenancy authorization.
- **Operational Impact**: Any user knowing or guessing a sequential integer ID can download certificates, license documents, and financial payment receipts of other businesses.

---

### SEC-006: Hardcoded `dd()` Debug Statement in Production Route
- **Vulnerability Type**: Debug Code in Production / DoS (CWE-489)
- **Source Code Reference**: `routes/water.php:33`
```php
Route::post('apply-new-connection', function () {
    dd('Welcome to simple Water route file');
});
```
- **Technical Mechanism**:
  The route `POST api/water/apply-new-connection` contains an anonymous closure that calls Symfony's `dd()` (Dump and Die). In production, this aborts request execution, exposes framework debug headers, and breaks any frontend client attempting to submit a new connection through this endpoint.
- **Operational Impact**: Application submissions sent to this endpoint fail immediately with a dump string.

---

### SEC-007: Absence of Independent Token Validation (Pass-Through Architecture)
- **Vulnerability Type**: Broken Authentication Architecture / Trust Boundary Violation (CWE-287, CWE-345)
- **Source Code Reference**: `app/Http/Middleware/AuthMaker.php:17-41`
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
  1. `AuthMaker` assumes that an upstream API Gateway (`Authorisation-Service`) has validated a Laravel Sanctum bearer token.
  2. `AuthMaker` does NOT perform cryptographic validation, signature verification, or database lookup of the token. It instantiates a user object directly from the `$request->auth` JSON array.
  3. **Critical Pass-Through Behavior**: If `$request->auth` is absent or null, the `if` condition evaluates to false, and `AuthMaker` simply executes `$next($request)`. It NEVER halts a request with HTTP 401 Unauthorized.
  4. If `egov-backend` is accessible directly over the network (e.g., misconfigured port binding, internal Docker network pivoting, or direct ingress), an attacker can supply an arbitrary JSON payload:
     `{"auth": {"id": 1, "name": "Super Admin", "user_type": "Admin"}, "currentAccessToken": {"tokenable_type": "App\\Models\\Auth\\User"}}`
     and gain full administrative access without any credentials.
- **Label**: `EXTERNAL DEPENDENCY — NOT VERIFIED FROM THIS REPOSITORY`.

---

### SEC-008: Multi-Tenancy Filter Bypass on Models Lacking `ulb_id` & Complex SQL
- **Vulnerability Type**: Insecure Multi-Tenancy / Scope Bypass (CWE-284)
- **Source Code Reference**: `app/Traits/UlbFilter.php:219-580`
- **Technical Mechanism**:
  1. `UlbFilter` registers `InternalUlbScope` on Eloquent models dynamically.
  2. `InternalUlbScope::apply()` checks `Schema::connection($conn)->hasColumn($table, 'ulb_id')`. If the table does not have a `ulb_id` column, the scope silently skips applying any tenant filter.
  3. For raw queries (`DB::select`), `UlbFilter` uses regex string matching (`findTopLevelKeyword`, `rewriteQuery`) to inject `WHERE ulb_id = ?`. If a query contains nested subqueries, unusual whitespace, unions, or raw expressions that do not conform to the regex parser, the method catches the `Throwable` and silently falls back to executing the original unfiltered query.
- **Operational Impact**: Cross-tenant data leakage between Urban Local Bodies if master or transaction tables lack `ulb_id` or if custom reports utilize non-standard raw SQL queries.

---

## 4. Remediation Roadmap for Phase 2 Implementation

```
┌────────────────────────────────────────────────────────────────────────┐
│                   PHASE 2 SECURITY REMEDIATION PLAN                    │
├────────────────────────────────────────────────────────────────────────┤
│ Immediate Priority (Before Functional Testing):                        │
│ 1. Fix RouteServiceProvider duplicate registration (SEC-001)           │
│ 2. Remove duplicate unauthenticated trade route (SEC-002)              │
│ 3. Secure simple-upload-document & consumer search (SEC-003, SEC-004)  │
│ 4. Remove debug dd() statement in water.php (SEC-006)                  │
├────────────────────────────────────────────────────────────────────────┤
│ Architecture Priority (Infrastructure & Gateway):                      │
│ 5. Enforce network firewall / mutual authentication between            │
│    Authorisation-Service and egov-backend (SEC-007)                    │
│ 6. Implement HMAC signature verification in AuthMaker (SEC-007)        │
├────────────────────────────────────────────────────────────────────────┤
│ Data Model Priority (Phase 2 Schema Modeling):                         │
│ 7. Audit all 400+ database tables for 'ulb_id' columns (SEC-008)       │
│ 8. Audit trade certificate download authorizations (SEC-005)           │
└────────────────────────────────────────────────────────────────────────┘
```

