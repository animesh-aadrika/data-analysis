# Phase 1 Discovery: Middleware, Authentication & Authorization Architecture (Verified & Corrected)

## 1. Executive Summary

In `egov-backend`, authentication and authorization are structured around an API Gateway model:
- **Upstream Gateway**: The client communicates through an authentication gateway (`Authorisation-Service`), which validates credentials, generates or verifies JWT/Sanctum tokens, and proxies requests to `egov-backend` with serialized user identity payloads (`$request->auth` and `$request->currentAccessToken`).
- **Domain Hydration ([`AuthMaker`](file:///var/www/html/egov-backend/app/Http/Middleware/AuthMaker.php#L19-L43))**: The `AuthMaker` middleware unpacks `$request->auth`, instantiates either an employee/official user ([`App\Models\User`](file:///var/www/html/egov-backend/app/Models/User.php)) or a citizen ([`App\Models\ActiveCitizen`](file:///var/www/html/egov-backend/app/Models/ActiveCitizen.php)), and logs them into Laravel's session state (`Auth::login()`).
- **Multi-Tenant Scoping ([`UlbFilter`](file:///var/www/html/egov-backend/app/Traits/UlbFilter.php#L31-L120))**: All queries are automatically scoped by Urban Local Body (`ulb_id`) using an Eloquent Global Scope (`InternalUlbScope`).
- **Workflow & Ward Authorization ([`WardPermission`](file:///var/www/html/egov-backend/app/Traits/Property/WardPermission.php#L22-L78))**: Fine-grained role permissions and ward restrictions are enforced at the repository and controller levels using Redis-backed role caching (`wf_roleusermaps`, `wf_workflowrolemaps`, `ulb_ward_masters`).
- **Verification Status**: `VERIFIED`

---

## 2. Complete Middleware Portfolio & Aliases

Registered across global, group, and route-specific stacks in [`app/Http/Kernel.php:14-87`](file:///var/www/html/egov-backend/app/Http/Kernel.php#L14-L87):

| Middleware Class | Alias / Group | Source Path | Function & Execution Mechanics | Verification Status |
|---|---|---|---|:---:|
| `ForceJsonResponse` | `json.response` | `app/Http/Middleware/ForceJsonResponse.php` | Enforces `Accept: application/json` HTTP header on `api/*` requests. | `VERIFIED` |
| `AuthMaker` | `auth_maker` | `app/Http/Middleware/AuthMaker.php` | Unpacks `$request->auth` and `$request->currentAccessToken`. Hydrates and authenticates `User` or `ActiveCitizen`. | `VERIFIED` |
| `ApiLogger` | `apilogger` | `app/Http/Middleware/ApiLogger.php` | Times request execution. Logs failures and successes to Monolog channel `apilogs`. | `VERIFIED` |
| `ApiKeyMiddleware` | `api.key` | `app/Http/Middleware/ApiKeyMiddleware.php` | Verifies `API-KEY` header against `config('module-constants.API_KEY')`. Validates `PersonalAccessToken`. | `VERIFIED` |
| `ExpireBearerToken` | `expireBearerToken`| `app/Http/Middleware/ExpireBearerToken.php` | Checks bearer token expiration timestamps. | `VERIFIED` |
| `HandleDateFormatMiddleware` | `handleDateFormat`| `app/Http/Middleware/HandleDateFormatMiddleware.php` | Sanitizes incoming dates to `Y-m-d`. | `VERIFIED` |
| `ApiLogRequests` | `request_logger` | `app/Http/Middleware/ApiLogRequests.php` | Legacy payload logger. | `VERIFIED` |
| `XssSanitizer` | `XssSanitizer` | `app/Http/Middleware/XssSanitizer.php` | Strips dangerous script tags and XSS payloads. | `VERIFIED` |
| `HandleCors` | Global / `cors` | `vendor/fruitcake/laravel-cors` | CORS headers and pre-flight handling. | `VERIFIED` |
| `PreventRequestsDuringMaintenance` | Global | Framework | 503 maintenance mode check. | `VERIFIED` |
| `TrimStrings` | Global | Framework | Trims whitespace on string inputs. | `VERIFIED` |
| `ConvertEmptyStringsToNull` | Global | Framework | Converts `""` to `null`. | `VERIFIED` |
| `ValidatePostSize` | Global | Framework | Enforces `post_max_size`. | `VERIFIED` |
| `TrustProxies` | Global | Framework | Resolves client IP behind reverse proxy / Docker. | `VERIFIED` |

---

## 3. Deep-Dive: Authentication Hydration (`AuthMaker.php:19-43`)

```php
public function handle(Request $request, Closure $next)
{
    if (!Auth()->user() && $request->auth)
    {
        if (!is_array($request->auth)) {
            $request->merge(["auth" => json_decode($request->auth, true)]);
        }
        if (!is_array($request->currentAccessToken)) {
            $request->merge(["currentAccessToken" => json_decode($request->currentAccessToken, true)]);
        }
        switch ($request->currentAccessToken["tokenable_type"])
        {
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

### Architectural Implications:
1. **Stateless Gateway Identity**: The backend does not query a users table on every request. Identity is hydrated directly from the Gateway's JSON payload.
2. **Dual Model Differentiation**:
   - `App\Models\User`: Municipal officials, Tax Collectors, Junior Engineers, Executive Officers.
   - `App\Models\ActiveCitizen`: Property owners, trade applicants, and water consumers.
3. **Status**: `VERIFIED`

---

## 4. Multi-Tenant Scoping (`UlbFilter.php:31-120`)

Urban Local Bodies (ULBs) represent individual municipal corporations. Multi-tenancy is enforced transparently:

1. **`InternalUlbScope`** (`app/Traits/UlbFilter.php:143-188`):
   - Implements `Illuminate\Database\Eloquent\Scope`.
   - Checks an in-memory schema cache (`$hasUlbColumn`). If the table contains `ulb_id`, automatically injects `$builder->where($table . '.ulb_id', $ulbId)`.
2. **`UlbFilter::withoutUlb()`** (`app/Traits/UlbFilter.php:80-92`):
   - Scope bypass used exclusively by state-level aggregated dashboards to query across all municipal corporations.
3. **Status**: `VERIFIED`

---

## 5. Security Vulnerability & Risk Analysis

### A. Critical Security Risks (`SECURITY RISK`)

| Vulnerability Type | Endpoint / Source Location | Defect Mechanism | Security Impact | Status |
|---|---|---|---|:---:|
| **Unauthenticated Data Exposure** | `POST api/trade/application-search/get-owner-details` (`routes/trade.php:206`) | Line 206 declaration outside middleware group overwrites line 112 declaration. Effective middleware is `['api']`. | Any unauthenticated caller can query trade owner names, mobile numbers, and business addresses by passing license number or application number. | `SECURITY RISK` |
| **Unauthenticated Data Exposure** | `POST api/water/consumer/get-owner-details` (`routes/water.php:272`) | Declared outside middleware group; effective middleware is completely empty `[]`. | Unauthenticated public callers can query water consumer owner personal particulars. | `SECURITY RISK` |
| **Unauthenticated Document Upload** | `POST api/water/simple-upload-document` (`routes/water.php:296`) | Declared outside middleware group with `middleware: []`. Mapped to `NewConnectionController@testUploadDocument`. | Allows unrestricted, unauthenticated file uploads directly to the server or DMS microservice. | `SECURITY RISK` |
| **Global Rate Limiting Bypass** | All 139 routes in `routes/water.php` (`RouteServiceProvider.php:46-56`) | Duplicate route file registration without `->middleware('api')` overwrites the middlewared pass. | Global rate limiter (`throttle:api`) is inactive across the entire Water module. Susceptible to DoS. | `SECURITY RISK` |
| **Insecure Direct Object Reference (IDOR)** | `GET api/trade/license-certificate/{id}` (`routes/trade.php:197`) | Declared in unauthenticated group; takes raw integer `$id`. | Any caller can iterate sequential integer IDs to download official trade license certificates of other businesses. | `SECURITY RISK` |
| **Insecure Direct Object Reference (IDOR)** | `GET api/trade/payment-receipt/{id}/{transectionId}` (`routes/trade.php:195`) | Declared in unauthenticated group; takes raw integer IDs. | Exposes financial transaction receipts across businesses. | `SECURITY RISK` |
| **Dead Debug Route in Production** | `POST api/water/apply-new-connection` (`routes/water.php:33`) | Closure executes `dd('Welcome to simple Water route file')`. | Exposes internal Laravel debug screen and server configuration if invoked. | `SECURITY RISK` |

---

## 6. Workflow Authorization & Role Mapping (`WardPermission.php:22-78`)

Role-Based Access Control (RBAC) in `egov-backend` is tied to the municipal workflow state machine:
- **Redis Permission Caching**:
  - `workflow_candidate:{user_id}`: Verifies whether the user is an active candidate in the ULB.
  - `WardPermission:{user_id}`: Array of ward IDs (`ulb_ward_id`) assigned to the officer.
  - `WorkFlowRoles:{user_id}:{workflow_id}`: Forwarding graph for the user.
- **Citizen vs Official Boundary**:
  - Citizens have no records in `wf_roleusermaps`. Any call to `postNextLevel` or `approvalRejection` aborts with `"You Are Not Authorized"`.
  - Official controllers query workflows matching the user's role: `whereIn('current_role', $roleIds)`.
- **Status**: `VERIFIED`
