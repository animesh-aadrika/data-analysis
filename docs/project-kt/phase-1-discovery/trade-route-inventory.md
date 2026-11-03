# Trade Module: Complete Route Inventory

## 1. Inventory Summary

- **Total Registered Trade Routes**: 88
- **Total Traced Routes**: 87
- **Total Untraced / Defective Routes**: 1
- **Total Unique Controllers / Endpoints**: 6

### Route Distribution by Controller

| Controller | Functional Scope | Route Count | Status |
|---|---|---|---|
| `TradeController` | App\Http\Controllers\Mdm\TradeController | 12 | All Traced |
| `ReportController` | App\Http\Controllers\Trade\ReportController | 20 | 1 Untraced |
| `TradeApplication` | App\Http\Controllers\Trade\TradeApplication | 30 | All Traced |
| `TradeCitizenController` | App\Http\Controllers\Trade\TradeCitizenController | 18 | All Traced |
| `TradeNoticeController` | App\Http\Controllers\Trade\TradeNoticeController | 7 | All Traced |
| `Closure` | Closure | 1 | All Traced |

---

## 2. Anomalies & Untraced Routes

| Method | URI | Controller@Method | Reason for Untraced Status |
|---|---|---|---|
| `POST` | `api/trade/application/notice-summary` | `App\Http\Controllers\Trade\ReportController@noticeSummary` | Untraced (Method noticeSummary not found in ReportController) |

### Functional Breakdown
1. **Trade Application Workflow (`TradeApplication`)** (30 routes): New license creation, editable updates, document upload, verification, workflow inbox/outbox/escalate/btc, approvals, rejections, counter payments, and public certificate downloads.
2. **Trade Citizen Portal (`TradeCitizenController`)** (18 routes): Citizen portal self-application, ward dropdowns, Razorpay payment initiation and confirmation, renewal lists, amendment lists, surrender lists, tracking status, and WhatsApp chat support.
3. **Trade Denial Notices (`TradeNoticeController`)** (7 routes): Violation and denial notice creation, inbox, outbox, BTC inbox, post-next-level forwarding, approval/rejection, and notice PDF view.
4. **Trade Analytics & Reports (`ReportController`)** (20 routes): Trade dashboard, collection metrics, TC/collector list, ward list, team performance, level-wise pending applications, user-wise pendency, and bulk receipts.
5. **Trade Master Data Management (`Mdm\TradeController`)** (12 routes): Rates, firm types, ownership types, category types, item types, and application types.
6. **Health Check (`Closure`)** (1 route): Microservice availability ping.

---

## 3. Comprehensive Route Inventory Table

| # | Method | URI | Route Name | Middleware | Controller | Method | Authentication | Authorization | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `POST` | `api/trade/application-search/get-owner-details` | `N/A` | `api` | `TradeCitizenController` | `getOwnerDetailsInfo` | Public | None | `Traced` |
| 2 | `POST` | `api/trade/application-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `applicationType` | AuthMaker | None | `Traced` |
| 3 | `POST` | `api/trade/application-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `applicationTypeList` | AuthMaker | None | `Traced` |
| 4 | `POST` | `api/trade/application/add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `applyApplication` | AuthMaker | None | `Traced` |
| 5 | `POST` | `api/trade/application/amendable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `amendmentList` | AuthMaker | None | `Traced` |
| 6 | `POST` | `api/trade/application/application-agent-notice` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationAgentNotice` | AuthMaker | None | `Traced` |
| 7 | `POST` | `api/trade/application/application-status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationStatus` | AuthMaker | None | `Traced` |
| 8 | `POST` | `api/trade/application/approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `approveReject` | AuthMaker | None | `Traced` |
| 9 | `POST` | `api/trade/application/approved-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `approvedApplication` | AuthMaker | None | `Traced` |
| 10 | `POST` | `api/trade/application/attached-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readAtachedLicenseDtl` | AuthMaker | None | `Traced` |
| 11 | `POST` | `api/trade/application/btc` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `backToCitizen` | AuthMaker | None | `Traced` |
| 12 | `POST` | `api/trade/application/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `btcInbox` | AuthMaker | None | `Traced` |
| 13 | `POST` | `api/trade/application/bulk-payment-recipt` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `bulkPaymentRecipt` | AuthMaker | None | `Traced` |
| 14 | `POST` | `api/trade/application/citizen-add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `applyApplication` | AuthMaker | None | `Traced` |
| 15 | `POST` | `api/trade/application/citizen-application` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplication` | AuthMaker | None | `Traced` |
| 16 | `POST` | `api/trade/application/citizen-application-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplicationByCitizenId` | AuthMaker | None | `Traced` |
| 17 | `POST` | `api/trade/application/citizen-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readCitizenLicenceDtl` | AuthMaker | None | `Traced` |
| 18 | `POST` | `api/trade/application/citizen-by-licence` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `readCitizenLicenceDtbylicences` | AuthMaker | None | `Traced` |
| 19 | `POST` | `api/trade/application/citizen-history` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenHistory` | AuthMaker | None | `Traced` |
| 20 | `POST` | `api/trade/application/citizen-ward-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `getWardList` | AuthMaker | None | `Traced` |
| 21 | `POST` | `api/trade/application/collection-reports` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `CollectionReports` | AuthMaker | None | `Traced` |
| 22 | `POST` | `api/trade/application/collection-summary` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `CollectionSummary` | AuthMaker | None | `Traced` |
| 23 | `POST` | `api/trade/application/conform-razorpay-tran` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `conformRazorPayTran` | AuthMaker | None | `Traced` |
| 24 | `POST` | `api/trade/application/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getDocList` | AuthMaker | None | `Traced` |
| 25 | `POST` | `api/trade/application/document-verify` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `documentVerify` | AuthMaker | None | `Traced` |
| 26 | `POST` | `api/trade/application/dtl-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getLicenceDtl` | AuthMaker | None | `Traced` |
| 27 | `POST` | `api/trade/application/edit` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `updateBasicDtl` | AuthMaker | None | `Traced` |
| 28 | `POST` | `api/trade/application/edit-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `updateLicenseBo` | AuthMaker | None | `Traced` |
| 29 | `POST` | `api/trade/application/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `postEscalate` | AuthMaker | None | `Traced` |
| 30 | `POST` | `api/trade/application/escalate-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `specialInbox` | AuthMaker | None | `Traced` |
| 31 | `POST` | `api/trade/application/get-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `paybleAmount` | AuthMaker | None | `Traced` |
| 32 | `POST` | `api/trade/application/get-independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `readIndipendentComment` | AuthMaker | None | `Traced` |
| 33 | `POST` | `api/trade/application/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `inbox` | AuthMaker | None | `Traced` |
| 34 | `POST` | `api/trade/application/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `addIndependentComment` | AuthMaker | None | `Traced` |
| 35 | `POST` | `api/trade/application/levelformdetail` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelformdetail` | AuthMaker | None | `Traced` |
| 36 | `POST` | `api/trade/application/leveluserpending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelUserPending` | AuthMaker | None | `Traced` |
| 37 | `POST` | `api/trade/application/levelwisependingform` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `levelwisependingform` | AuthMaker | None | `Traced` |
| 38 | `POST` | `api/trade/application/list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `readApplication` | AuthMaker | None | `Traced` |
| 39 | `POST` | `api/trade/application/notice-summary` | `N/A` | `api` | `ReportController` | `noticeSummary` | Public | None | `Untraced (Method noticeSummary not found in ReportController)` |
| 40 | `POST` | `api/trade/application/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `outbox` | AuthMaker | None | `Traced` |
| 41 | `POST` | `api/trade/application/pay-charge` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `PaymentCounter` | AuthMaker | None | `Traced` |
| 42 | `POST` | `api/trade/application/pay-razorpay-charge` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `handeRazorPay` | AuthMaker | None | `Traced` |
| 43 | `POST` | `api/trade/application/post-next` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `postNextLevel` | AuthMaker | None | `Traced` |
| 44 | `POST` | `api/trade/application/renewable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `renewalList` | AuthMaker | None | `Traced` |
| 45 | `POST` | `api/trade/application/search-for-renew` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `searchLicence` | AuthMaker | None | `Traced` |
| 46 | `POST` | `api/trade/application/send-to-officer` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `sendToLevel` | AuthMaker | None | `Traced` |
| 47 | `POST` | `api/trade/application/status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `citizenApplicationStatus` | AuthMaker | None | `Traced` |
| 48 | `POST` | `api/trade/application/surrenderable-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `surrenderList` | AuthMaker | None | `Traced` |
| 49 | `POST` | `api/trade/application/team-summary` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `teamSummary` | AuthMaker | None | `Traced` |
| 50 | `POST` | `api/trade/application/track-status` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `ApplicantionTrackStatus` | AuthMaker | None | `Traced` |
| 51 | `POST` | `api/trade/application/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `uploadDocument` | AuthMaker | None | `Traced` |
| 52 | `POST` | `api/trade/application/userWiseWardWiseLevelPending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userWiseWardWiseLevelPending` | AuthMaker | None | `Traced` |
| 53 | `POST` | `api/trade/application/userwiselevelpending` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userWiseLevelPending` | AuthMaker | None | `Traced` |
| 54 | `POST` | `api/trade/application/valid-expire-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `valideAndExpired` | AuthMaker | None | `Traced` |
| 55 | `POST` | `api/trade/appliction/documents` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getUploadDocuments` | AuthMaker | None | `Traced` |
| 56 | `POST` | `api/trade/category-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `categoryType` | AuthMaker | None | `Traced` |
| 57 | `POST` | `api/trade/category-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `categoryTypeList` | AuthMaker | None | `Traced` |
| 58 | `POST` | `api/trade/dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `tradeDaseboard` | AuthMaker | None | `Traced` |
| 59 | `POST` | `api/trade/dashboard-application-collection` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `applicationTypeCollection` | AuthMaker | None | `Traced` |
| 60 | `POST` | `api/trade/dashboard-applied-application` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `userAppliedApplication` | AuthMaker | None | `Traced` |
| 61 | `POST` | `api/trade/dashboard-collection-perfomance` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `collectionPerfomance` | AuthMaker | None | `Traced` |
| 62 | `POST` | `api/trade/firm-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `firmType` | AuthMaker | None | `Traced` |
| 63 | `POST` | `api/trade/firm-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `firmTypeList` | AuthMaker | None | `Traced` |
| 64 | `POST` | `api/trade/getApplyData` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getApplyData` | AuthMaker | None | `Traced` |
| 65 | `GET|HEAD` | `api/trade/health-check` | `N/A` | `api` | `Closure` | `Closure` | Public | None | `Traced` |
| 66 | `POST` | `api/trade/item-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `itemType` | AuthMaker | None | `Traced` |
| 67 | `POST` | `api/trade/item-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `itemTypeList` | AuthMaker | None | `Traced` |
| 68 | `POST` | `api/trade/licenceInfoWhatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `licenceInfoWhatsappChat` | AuthMaker | None | `Traced` |
| 69 | `GET|HEAD` | `api/trade/license-certificate/{id}` | `N/A` | `api` | `TradeApplication` | `licenceCertificate` | Public | None | `Traced` |
| 70 | `POST` | `api/trade/notice/add` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `applyDenail` | AuthMaker | None | `Traced` |
| 71 | `POST` | `api/trade/notice/approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `approveReject` | AuthMaker | None | `Traced` |
| 72 | `POST` | `api/trade/notice/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `btcInbox` | AuthMaker | None | `Traced` |
| 73 | `POST` | `api/trade/notice/citizen-details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeCitizenController` | `getDenialDetails` | AuthMaker | None | `Traced` |
| 74 | `POST` | `api/trade/notice/details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `getDenialDetails` | AuthMaker | None | `Traced` |
| 75 | `POST` | `api/trade/notice/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `inbox` | AuthMaker | None | `Traced` |
| 76 | `POST` | `api/trade/notice/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `outbox` | AuthMaker | None | `Traced` |
| 77 | `POST` | `api/trade/notice/post-next` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 78 | `POST` | `api/trade/notice/view` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeNoticeController` | `denialview` | AuthMaker | None | `Traced` |
| 79 | `POST` | `api/trade/ownership-type` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `ownershipType` | AuthMaker | None | `Traced` |
| 80 | `POST` | `api/trade/ownership-type-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `ownershipTypeList` | AuthMaker | None | `Traced` |
| 81 | `GET|HEAD` | `api/trade/payment-receipt/{id}/{transectionId}` | `N/A` | `api` | `TradeApplication` | `paymentReceipt` | Public | None | `Traced` |
| 82 | `POST` | `api/trade/property/by-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `validateHoldingNo` | AuthMaker | None | `Traced` |
| 83 | `GET|HEAD` | `api/trade/provisional-certificate/{id}` | `N/A` | `api` | `TradeApplication` | `provisionalCertificate` | Public | None | `Traced` |
| 84 | `POST` | `api/trade/rate` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `rate` | AuthMaker | None | `Traced` |
| 85 | `POST` | `api/trade/rate-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeController` | `rateList` | AuthMaker | None | `Traced` |
| 86 | `POST` | `api/trade/tc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `TcList` | AuthMaker | None | `Traced` |
| 87 | `POST` | `api/trade/ward-list` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `ReportController` | `WardList` | AuthMaker | None | `Traced` |
| 88 | `POST` | `api/trade/workflow/dashboard-data` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `TradeApplication` | `workflowDashordDetails` | AuthMaker | None | `Traced` |