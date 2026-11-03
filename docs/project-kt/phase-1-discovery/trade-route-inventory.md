# Trade Module: Complete Route Inventory (Verified & Corrected)

## 1. Inventory Summary

- **Total Registered Trade Routes**: 88
- **Verified Working Routes**: **86 routes** (`VERIFIED`)
- **Security Vulnerability Routes**: **1 route** (`SECURITY RISK`: `api/trade/application-search/get-owner-details`)
- **Blocked / Missing Method Routes**: **1 route** (`BLOCKED`: `api/trade/application/notice-summary`)
- **Total Unique Controller Targets**: 6 (5 domain controllers + 1 closure)

### Route Distribution by Controller

| Controller | Source File | Route Count | Verification Status |
|---|---|---|---|
| `TradeController` | `app/Http/Controllers/Mdm/TradeController.php` | 12 | `VERIFIED` |
| `ReportController` | `app/Http/Controllers/Trade/ReportController.php` | 20 | `VERIFIED` |
| `TradeApplication` | `app/Http/Controllers/Trade/TradeApplication.php` | 30 | `VERIFIED` |
| `TradeCitizenController` | `app/Http/Controllers/Trade/TradeCitizenController.php` | 18 | `VERIFIED` |
| `TradeNoticeController` | `app/Http/Controllers/Trade/TradeNoticeController.php` | 7 | `VERIFIED` |
| `Closure` | `Closure` | 1 | `VERIFIED` |

---

## 2. Route Registration Anomalies & Security Risks

### A. Unauthenticated Route Overwrite (`SECURITY RISK`)
- **Route**: `POST api/trade/application-search/get-owner-details`
- **Controller Action**: `App\Http\Controllers\Trade\TradeCitizenController@getOwnerDetailsInfo`
- **Evidence**:
  - Line 112 of `routes/trade.php` declares the route inside `Route::group(['middleware' => ['json.response', 'auth_maker']], ...)`.
  - Line 206 of `routes/trade.php` declares the exact same route outside any middleware group.
  - In Laravel's routing table, the second declaration overwrites the first. The effective middleware is `['api']`.
- **Security Implication**: Unauthenticated public callers can query trade license owner personal details (names, mobile numbers, guardian names, addresses) by passing `filterBy=licenseNo` or `filterBy=applicationNo`. **IDOR / Data Exposure Risk**.
- **Status**: `SECURITY RISK`

### B. Missing Controller Method (`BLOCKED`)
- **Route**: `POST api/trade/application/notice-summary`
- **Controller Action**: `App\Http\Controllers\Trade\ReportController@noticeSummary`
- **Evidence**: Line 203 of `routes/trade.php` declares this route inside a `//not in use` comment block, but the route is not commented out. Method `noticeSummary` does not exist in `app/Http/Controllers/Trade/ReportController.php`. Will throw `BadMethodCallException` if invoked.
- **Status**: `BLOCKED`

---

## 3. Comprehensive Route Inventory Table

| # | Method | URI | Route Name | Effective Middleware | Controller | Method | Authentication | Authorization | Verification Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `POST` | `api/trade/application-search/get-owner-details` | `N/A` | `api` | `TradeCitizenController` | `getOwnerDetailsInfo` | None (Overwritten) | None | `SECURITY RISK` |
| 2 | `POST` | `api/trade/application-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `applicationType` | AuthMaker | Role / ULB | `VERIFIED` |
| 3 | `POST` | `api/trade/application-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `applicationTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 4 | `POST` | `api/trade/application/add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `applyApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 5 | `POST` | `api/trade/application/amendable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `amendmentList` | AuthMaker | Role / ULB | `VERIFIED` |
| 6 | `POST` | `api/trade/application/application-agent-notice` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationAgentNotice` | AuthMaker | Role / ULB | `VERIFIED` |
| 7 | `POST` | `api/trade/application/application-status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationStatus` | AuthMaker | Role / ULB | `VERIFIED` |
| 8 | `POST` | `api/trade/application/approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `approveReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 9 | `POST` | `api/trade/application/approved-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `approvedApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 10 | `POST` | `api/trade/application/attached-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readAtachedLicenseDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 11 | `POST` | `api/trade/application/btc` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 12 | `POST` | `api/trade/application/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `btcInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 13 | `POST` | `api/trade/application/bulk-payment-recipt` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `bulkPaymentRecipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 14 | `POST` | `api/trade/application/citizen-add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `applyApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 15 | `POST` | `api/trade/application/citizen-application` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 16 | `POST` | `api/trade/application/citizen-application-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplicationByCitizenId` | AuthMaker | Role / ULB | `VERIFIED` |
| 17 | `POST` | `api/trade/application/citizen-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readCitizenLicenceDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 18 | `POST` | `api/trade/application/citizen-by-licence` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readCitizenLicenceDtbylicences` | AuthMaker | Role / ULB | `VERIFIED` |
| 19 | `POST` | `api/trade/application/citizen-history` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenHistory` | AuthMaker | Role / ULB | `VERIFIED` |
| 20 | `POST` | `api/trade/application/citizen-ward-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `getWardList` | AuthMaker | Role / ULB | `VERIFIED` |
| 21 | `POST` | `api/trade/application/collection-reports` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `CollectionReports` | AuthMaker | Role / ULB | `VERIFIED` |
| 22 | `POST` | `api/trade/application/collection-summary` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `CollectionSummary` | AuthMaker | Role / ULB | `VERIFIED` |
| 23 | `POST` | `api/trade/application/conform-razorpay-tran` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `conformRazorPayTran` | AuthMaker | Role / ULB | `VERIFIED` |
| 24 | `POST` | `api/trade/application/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 25 | `POST` | `api/trade/application/document-verify` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `documentVerify` | AuthMaker | Role / ULB | `VERIFIED` |
| 26 | `POST` | `api/trade/application/dtl-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getLicenceDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 27 | `POST` | `api/trade/application/edit` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `updateBasicDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 28 | `POST` | `api/trade/application/edit-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `updateLicenseBo` | AuthMaker | Role / ULB | `VERIFIED` |
| 29 | `POST` | `api/trade/application/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 30 | `POST` | `api/trade/application/escalate-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 31 | `POST` | `api/trade/application/get-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `paybleAmount` | AuthMaker | Role / ULB | `VERIFIED` |
| 32 | `POST` | `api/trade/application/get-independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `readIndipendentComment` | AuthMaker | Role / ULB | `VERIFIED` |
| 33 | `POST` | `api/trade/application/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 34 | `POST` | `api/trade/application/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `addIndependentComment` | AuthMaker | Role / ULB | `VERIFIED` |
| 35 | `POST` | `api/trade/application/levelformdetail` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelformdetail` | AuthMaker | Role / ULB | `VERIFIED` |
| 36 | `POST` | `api/trade/application/leveluserpending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelUserPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 37 | `POST` | `api/trade/application/levelwisependingform` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelwisependingform` | AuthMaker | Role / ULB | `VERIFIED` |
| 38 | `POST` | `api/trade/application/list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `readApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 39 | `POST` | `api/trade/application/notice-summary` | `N/A` | `api` | `ReportController` | `noticeSummary` | None | None | `BLOCKED` |
| 40 | `POST` | `api/trade/application/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 41 | `POST` | `api/trade/application/pay-charge` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `PaymentCounter` | AuthMaker | Role / ULB | `VERIFIED` |
| 42 | `POST` | `api/trade/application/pay-razorpay-charge` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `handeRazorPay` | AuthMaker | Role / ULB | `VERIFIED` |
| 43 | `POST` | `api/trade/application/post-next` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 44 | `POST` | `api/trade/application/renewable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `renewalList` | AuthMaker | Role / ULB | `VERIFIED` |
| 45 | `POST` | `api/trade/application/search-for-renew` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `searchLicence` | AuthMaker | Role / ULB | `VERIFIED` |
| 46 | `POST` | `api/trade/application/send-to-officer` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `sendToLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 47 | `POST` | `api/trade/application/status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplicationStatus` | AuthMaker | Role / ULB | `VERIFIED` |
| 48 | `POST` | `api/trade/application/surrenderable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `surrenderList` | AuthMaker | Role / ULB | `VERIFIED` |
| 49 | `POST` | `api/trade/application/team-summary` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `teamSummary` | AuthMaker | Role / ULB | `VERIFIED` |
| 50 | `POST` | `api/trade/application/track-status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `ApplicantionTrackStatus` | AuthMaker | Role / ULB | `VERIFIED` |
| 51 | `POST` | `api/trade/application/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `uploadDocument` | AuthMaker | Role / ULB | `VERIFIED` |
| 52 | `POST` | `api/trade/application/userWiseWardWiseLevelPending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userWiseWardWiseLevelPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 53 | `POST` | `api/trade/application/userwiselevelpending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userWiseLevelPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 54 | `POST` | `api/trade/application/valid-expire-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `valideAndExpired` | AuthMaker | Role / ULB | `VERIFIED` |
| 55 | `POST` | `api/trade/appliction/documents` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getUploadDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 56 | `POST` | `api/trade/category-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `categoryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 57 | `POST` | `api/trade/category-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `categoryTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 58 | `POST` | `api/trade/dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `tradeDaseboard` | AuthMaker | Role / ULB | `VERIFIED` |
| 59 | `POST` | `api/trade/dashboard-application-collection` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationTypeCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 60 | `POST` | `api/trade/dashboard-applied-application` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userAppliedApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 61 | `POST` | `api/trade/dashboard-collection-perfomance` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `collectionPerfomance` | AuthMaker | Role / ULB | `VERIFIED` |
| 62 | `POST` | `api/trade/firm-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `firmType` | AuthMaker | Role / ULB | `VERIFIED` |
| 63 | `POST` | `api/trade/firm-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `firmTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 64 | `POST` | `api/trade/getApplyData` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getApplyData` | AuthMaker | Role / ULB | `VERIFIED` |
| 65 | `GET|HEAD` | `api/trade/health-check` | `N/A` | `api` | `Closure` | `Closure` | Public | None | `VERIFIED` |
| 66 | `POST` | `api/trade/item-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `itemType` | AuthMaker | Role / ULB | `VERIFIED` |
| 67 | `POST` | `api/trade/item-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `itemTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 68 | `POST` | `api/trade/licenceInfoWhatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `licenceInfoWhatsappChat` | AuthMaker | Role / ULB | `VERIFIED` |
| 69 | `GET|HEAD` | `api/trade/license-certificate/{id}` | `N/A` | `api` | `TradeApplication` | `licenceCertificate` | Public | None (IDOR Risk) | `SECURITY RISK` |
| 70 | `POST` | `api/trade/notice/add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `applyDenail` | AuthMaker | Role / ULB | `VERIFIED` |
| 71 | `POST` | `api/trade/notice/approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `approveReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 72 | `POST` | `api/trade/notice/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `btcInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 73 | `POST` | `api/trade/notice/citizen-details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `getDenialDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 74 | `POST` | `api/trade/notice/details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getDenialDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 75 | `POST` | `api/trade/notice/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 76 | `POST` | `api/trade/notice/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 77 | `POST` | `api/trade/notice/post-next` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 78 | `POST` | `api/trade/notice/view` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `denialview` | AuthMaker | Role / ULB | `VERIFIED` |
| 79 | `POST` | `api/trade/ownership-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `ownershipType` | AuthMaker | Role / ULB | `VERIFIED` |
| 80 | `POST` | `api/trade/ownership-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `ownershipTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 81 | `GET|HEAD` | `api/trade/payment-receipt/{id}/{transectionId}` | `N/A` | `api` | `TradeApplication` | `paymentReceipt` | Public | None (IDOR Risk) | `SECURITY RISK` |
| 82 | `POST` | `api/trade/property/by-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `validateHoldingNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 83 | `GET|HEAD` | `api/trade/provisional-certificate/{id}` | `N/A` | `api` | `TradeApplication` | `provisionalCertificate` | Public | None (IDOR Risk) | `SECURITY RISK` |
| 84 | `POST` | `api/trade/rate` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `rate` | AuthMaker | Role / ULB | `VERIFIED` |
| 85 | `POST` | `api/trade/rate-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `rateList` | AuthMaker | Role / ULB | `VERIFIED` |
| 86 | `POST` | `api/trade/tc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `TcList` | AuthMaker | Role / ULB | `VERIFIED` |
| 87 | `POST` | `api/trade/ward-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `WardList` | AuthMaker | Role / ULB | `VERIFIED` |
| 88 | `POST` | `api/trade/workflow/dashboard-data` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `workflowDashordDetails` | AuthMaker | Role / ULB | `VERIFIED` |