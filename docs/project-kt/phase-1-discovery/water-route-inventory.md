# Water Module: Complete Route Inventory

## 1. Inventory Summary

- **Total Registered Water Routes**: 142
- **Total Traced Routes**: 130
- **Total Untraced / Defective Routes**: 12
- **Total Unique Controllers / Endpoints**: 12

### Route Distribution by Controller

| Controller | Functional Scope | Route Count | Status |
|---|---|---|---|
| `CaretakerController` | App\Http\Controllers\CaretakerController | 2 | All Traced |
| `DemoController` | App\Http\Controllers\DemoController | 1 | All Traced |
| `ConsumerActionRequest` | App\Http\Controllers\Water\ConsumerActionRequest | 5 | All Traced |
| `NewConnectionController` | App\Http\Controllers\Water\NewConnectionController | 43 | 6 Untraced |
| `WaterApplication` | App\Http\Controllers\Water\WaterApplication | 8 | 2 Untraced |
| `WaterConsumer` | App\Http\Controllers\Water\WaterConsumer | 20 | All Traced |
| `WaterConsumerWfController` | App\Http\Controllers\Water\WaterConsumerWfController | 26 | 4 Untraced |
| `WaterMasterController` | App\Http\Controllers\Water\WaterMasterController | 10 | All Traced |
| `WaterPaymentController` | App\Http\Controllers\Water\WaterPaymentController | 16 | All Traced |
| `WaterReportController` | App\Http\Controllers\Water\WaterReportController | 8 | All Traced |
| `WaterNewConnection` | App\Repository\Water\Concrete\WaterNewConnection | 1 | All Traced |
| `Closure` | Closure | 2 | All Traced |

---

## 2. Route Registration Anomaly & Defective Routes

### A. Critical RouteServiceProvider Registration Anomaly
In `app/Providers/RouteServiceProvider.php`, `routes/water.php` is imported twice:
```php
Route::prefix('api/water')->middleware('api')->namespace($this->namespace)->group(base_path('routes/water.php'));
Route::prefix('api/water')->namespace($this->namespace)->group(base_path('routes/water.php'));
```
The second registration lacks the `'api'` middleware group (`EnsureFrontendRequestsAreStateful`, `throttle:api`, `SubstituteBindings`). In Laravel's routing table, this second pass replaces the first registration, effectively stripping the global `'api'` middleware group from all water routes, though the inner route middleware `['json.response', 'auth_maker']` remains active.

### B. Defective & Untraced Routes Table

| Method | URI | Controller@Method | Architectural Cause / Reason |
|---|---|---|---|
| `GET|HEAD` | `api/water/application/apply-new-connection` | `App\Http\Controllers\Water\NewConnectionController@index` | Untraced (Method index not found in NewConnectionController) |
| `GET|HEAD` | `api/water/application/apply-new-connection/create` | `App\Http\Controllers\Water\NewConnectionController@create` | Untraced (Method create not found in NewConnectionController) |
| `GET|HEAD` | `api/water/application/apply-new-connection/{apply_new_connection}` | `App\Http\Controllers\Water\NewConnectionController@show` | Untraced (Method show not found in NewConnectionController) |
| `PUT|PATCH` | `api/water/application/apply-new-connection/{apply_new_connection}` | `App\Http\Controllers\Water\NewConnectionController@update` | Untraced (Method update not found in NewConnectionController) |
| `DELETE` | `api/water/application/apply-new-connection/{apply_new_connection}` | `App\Http\Controllers\Water\NewConnectionController@destroy` | Untraced (Method destroy not found in NewConnectionController) |
| `GET|HEAD` | `api/water/application/apply-new-connection/{apply_new_connection}/edit` | `App\Http\Controllers\Water\NewConnectionController@edit` | Untraced (Method edit not found in NewConnectionController) |
| `POST` | `api/water/consumer/get-rejected-appl-details` | `App\Http\Controllers\Water\WaterConsumerWfController@getRejectedApplicationDetails` | Untraced (Method getRejectedApplicationDetails not found in WaterConsumerWfController) |
| `POST` | `api/water/consumer/req/doc-verify-reject` | `App\Http\Controllers\Water\WaterConsumerWfController@consumerDocVerifyReject` | Untraced (Method consumerDocVerifyReject not found in WaterConsumerWfController) |
| `POST` | `api/water/consumer/req/get-upload-documents` | `App\Http\Controllers\Water\WaterConsumerWfController@getConsumerDocs` | Untraced (Method getConsumerDocs not found in WaterConsumerWfController) |
| `POST` | `api/water/consumer/req/list-req-docs` | `App\Http\Controllers\Water\WaterConsumerWfController@listDocToUpload` | Untraced (Method listDocToUpload not found in WaterConsumerWfController) |
| `POST` | `api/water/consumerChargeCal` | `App\Http\Controllers\Water\WaterApplication@calConsumerDemand` | Untraced (Method calConsumerDemand not found in WaterApplication) |
| `POST` | `api/water/update-applications` | `App\Http\Controllers\Water\WaterApplication@updateWaterApplication` | Untraced (Method updateWaterApplication not found in WaterApplication) |

---

## 3. Comprehensive Route Inventory Table

| # | Method | URI | Route Name | Middleware | Controller | Method | Authentication | Authorization | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `POST` | `api/water-connection` | `N/A` | `api` | `DemoController` | `waterConnection` | Public | None | `Traced` |
| 2 | `POST` | `api/water/Razorpay-Orderid` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterApplication` | `handeRazorPay` | AuthMaker | None | `Traced` |
| 3 | `POST` | `api/water/admin/application/application-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getApplicationDetailsv1` | AuthMaker | None | `Traced` |
| 4 | `POST` | `api/water/admin/application/cancel-inspection-scheduling` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `cancelSiteInspection` | AuthMaker | None | `Traced` |
| 5 | `POST` | `api/water/admin/application/dashboard-data` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterApplication` | `getJskAppliedApplication` | AuthMaker | None | `Traced` |
| 6 | `POST` | `api/water/admin/application/document-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getDocToUploadv1` | AuthMaker | None | `Traced` |
| 7 | `POST` | `api/water/admin/application/generate-payment-receipt` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `generateOfflinePaymentReceipt` | AuthMaker | None | `Traced` |
| 8 | `POST` | `api/water/admin/application/get-details-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getApplicationDetailById` | AuthMaker | None | `Traced` |
| 9 | `POST` | `api/water/admin/application/je-site-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getJeSiteDetails` | AuthMaker | None | `Traced` |
| 10 | `POST` | `api/water/admin/application/list-details-by-date` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `listApplicationBydate` | AuthMaker | None | `Traced` |
| 11 | `POST` | `api/water/admin/application/online-technical-inspection` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `onlineSiteInspection` | AuthMaker | None | `Traced` |
| 12 | `POST` | `api/water/admin/application/save-inspection-date` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `saveInspectionDateTime` | AuthMaker | None | `Traced` |
| 13 | `POST` | `api/water/admin/application/site-inspection-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getSiteInspectionDetails` | AuthMaker | None | `Traced` |
| 14 | `POST` | `api/water/admin/application/technical-inspection-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getTechnicalInsDetails` | AuthMaker | None | `Traced` |
| 15 | `POST` | `api/water/admin/consumer/add-fixed-rate` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `addFixedRate` | AuthMaker | None | `Traced` |
| 16 | `POST` | `api/water/admin/consumer/apply-deactivation` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `applyDeactivation` | AuthMaker | None | `Traced` |
| 17 | `POST` | `api/water/admin/consumer/demand-deactivation` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `consumerDemandDeactivation` | AuthMaker | None | `Traced` |
| 18 | `POST` | `api/water/admin/consumer/generate-demand` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `saveGenerateConsumerDemand` | AuthMaker | None | `Traced` |
| 19 | `POST` | `api/water/admin/consumer/get-meter-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `getMeterList` | AuthMaker | None | `Traced` |
| 20 | `POST` | `api/water/admin/consumer/save-connection-meter` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `saveUpdateMeterDetails` | AuthMaker | None | `Traced` |
| 21 | `POST` | `api/water/admin/dis-generate-payment-receipt` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `generateOfflinePaymentReceiptv1` | AuthMaker | None | `Traced` |
| 22 | `POST` | `api/water/admin/search-application` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `searchApplicationByParameter` | AuthMaker | None | `Traced` |
| 23 | `POST` | `api/water/admin/workflow/dashboard-data` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterApplication` | `workflowDashordDetails` | AuthMaker | None | `Traced` |
| 24 | `POST` | `api/water/aggregate-report` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `tcCollectionReport` | AuthMaker | None | `Traced` |
| 25 | `POST` | `api/water/applicant/search` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `searchApplication` | AuthMaker | None | `Traced` |
| 26 | `GET|HEAD` | `api/water/application/apply-new-connection` | `apply-new-connection.index` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `index` | AuthMaker | None | `Untraced (Method index not found in NewConnectionController)` |
| 27 | `POST` | `api/water/application/apply-new-connection` | `apply-new-connection.store` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `store` | AuthMaker | None | `Traced` |
| 28 | `GET|HEAD` | `api/water/application/apply-new-connection/create` | `apply-new-connection.create` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `create` | AuthMaker | None | `Untraced (Method create not found in NewConnectionController)` |
| 29 | `GET|HEAD` | `api/water/application/apply-new-connection/{apply_new_connection}` | `apply-new-connection.show` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `show` | AuthMaker | None | `Untraced (Method show not found in NewConnectionController)` |
| 30 | `PUT|PATCH` | `api/water/application/apply-new-connection/{apply_new_connection}` | `apply-new-connection.update` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `update` | AuthMaker | None | `Untraced (Method update not found in NewConnectionController)` |
| 31 | `DELETE` | `api/water/application/apply-new-connection/{apply_new_connection}` | `apply-new-connection.destroy` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `destroy` | AuthMaker | None | `Untraced (Method destroy not found in NewConnectionController)` |
| 32 | `GET|HEAD` | `api/water/application/apply-new-connection/{apply_new_connection}/edit` | `apply-new-connection.edit` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `edit` | AuthMaker | None | `Untraced (Method edit not found in NewConnectionController)` |
| 33 | `POST` | `api/water/application/approval-rejection` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `approvalRejectionWater` | AuthMaker | None | `Traced` |
| 34 | `POST` | `api/water/application/delete` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `deleteWaterApplication` | AuthMaker | None | `Traced` |
| 35 | `POST` | `api/water/application/edit` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `editWaterAppliction` | AuthMaker | None | `Traced` |
| 36 | `POST` | `api/water/application/get-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getApplicationDetails` | AuthMaker | None | `Traced` |
| 37 | `POST` | `api/water/application/payment/get-payment-history` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `getApplicationPaymentHistory` | AuthMaker | None | `Traced` |
| 38 | `POST` | `api/water/application/payment/offline/pay-connection-charge` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `offlineConnectionPayment` | AuthMaker | None | `Traced` |
| 39 | `POST` | `api/water/application/search` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getActiveApplictaions` | AuthMaker | None | `Traced` |
| 40 | `POST` | `api/water/apply-new-connection` | `N/A` | `None` | `Closure` | `Closure` | Public | None | `Traced` |
| 41 | `POST` | `api/water/apply-water-disconnection` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `applyWaterDisconnection` | AuthMaker | None | `Traced` |
| 42 | `POST` | `api/water/applywater-ferule-cleaning` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `applyConsumerRequest` | AuthMaker | None | `Traced` |
| 43 | `POST` | `api/water/approve-reject-report` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `approveRejectReports` | AuthMaker | None | `Traced` |
| 44 | `POST` | `api/water/back-to-citizen` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 45 | `POST` | `api/water/btc-inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `btcInbox` | AuthMaker | None | `Traced` |
| 46 | `POST` | `api/water/caretaker-consumer-tagging` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `CaretakerController` | `caretakerConsumerTag` | AuthMaker | None | `Traced` |
| 47 | `POST` | `api/water/caretaker-otp` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `CaretakerController` | `waterCaretakerOtp` | AuthMaker | None | `Traced` |
| 48 | `POST` | `api/water/cargeCal` | `N/A` | `None` | `WaterApplication` | `calWaterConCharge` | Public | None | `Traced` |
| 49 | `POST` | `api/water/check-doc` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `checkDoc` | AuthMaker | None | `Traced` |
| 50 | `POST` | `api/water/citizen/get-doc-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getDocToUpload` | AuthMaker | None | `Traced` |
| 51 | `POST` | `api/water/citizen/payment-history` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `paymentHistory` | AuthMaker | None | `Traced` |
| 52 | `POST` | `api/water/citizenApplications` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterApplication` | `getCitizenApplication` | AuthMaker | None | `Traced` |
| 53 | `POST` | `api/water/comment-independent` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 54 | `POST` | `api/water/connection-collection` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `connectionCollection` | AuthMaker | None | `Traced` |
| 55 | `POST` | `api/water/consumer-info-watsapp-chat` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `ConsumerInfoWatsappChat` | AuthMaker | None | `Traced` |
| 56 | `POST` | `api/water/consumer/add-advance` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `addAdvance` | AuthMaker | None | `Traced` |
| 57 | `POST` | `api/water/consumer/calculate-month-demand` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `callDemandByMonth` | AuthMaker | None | `Traced` |
| 58 | `POST` | `api/water/consumer/calculate/meter-fixed-reading` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `calculateMeterFixedReading` | AuthMaker | None | `Traced` |
| 59 | `POST` | `api/water/consumer/caretaken-connections` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `viewCaretakenConnection` | AuthMaker | None | `Traced` |
| 60 | `POST` | `api/water/consumer/deactivation-approve-rejet` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `approveRejectV1` | AuthMaker | None | `Traced` |
| 61 | `POST` | `api/water/consumer/deactivation-btc-inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `btcInbox` | AuthMaker | None | `Traced` |
| 62 | `POST` | `api/water/consumer/deactivation-documents-verify` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `documentVerify` | AuthMaker | None | `Traced` |
| 63 | `POST` | `api/water/consumer/deactivation-escalate-inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `specialInbox` | AuthMaker | None | `Traced` |
| 64 | `POST` | `api/water/consumer/deactivation-get-doc-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getDocList` | AuthMaker | None | `Traced` |
| 65 | `POST` | `api/water/consumer/deactivation-upload-documents` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `uploadDocuments` | AuthMaker | None | `Traced` |
| 66 | `POST` | `api/water/consumer/deactivation-upload-documents_view` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getUploadDocuments` | AuthMaker | None | `Traced` |
| 67 | `POST` | `api/water/consumer/deactivation-worklfow-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getConsumerDetails` | AuthMaker | None | `Traced` |
| 68 | `POST` | `api/water/consumer/demand/generate-payment-receipt` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `generateDemandPaymentReceipt` | AuthMaker | None | `Traced` |
| 69 | `POST` | `api/water/consumer/generate-memo` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `generateMemo` | AuthMaker | None | `Traced` |
| 70 | `POST` | `api/water/consumer/get-connection-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `getConnectionList` | AuthMaker | None | `Traced` |
| 71 | `POST` | `api/water/consumer/get-listed-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `approvedWaterApplications` | AuthMaker | None | `Traced` |
| 72 | `POST` | `api/water/consumer/get-owner-details` | `N/A` | `None` | `WaterConsumer` | `getOwnerDetailsInfo` | Public | None | `Traced` |
| 73 | `POST` | `api/water/consumer/get-payment-history` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `getConsumerPaymentHistory` | AuthMaker | None | `Traced` |
| 74 | `POST` | `api/water/consumer/get-rejected-appl-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getRejectedApplicationDetails` | AuthMaker | None | `Untraced (Method getRejectedApplicationDetails not found in WaterConsumerWfController)` |
| 75 | `POST` | `api/water/consumer/get-rejected-documents-only` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getRejectedDocumentsOnly` | AuthMaker | None | `Traced` |
| 76 | `POST` | `api/water/consumer/list-demand` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `listConsumerDemand` | AuthMaker | None | `Traced` |
| 77 | `POST` | `api/water/consumer/offline-demand-payment` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `offlineDemandPayment` | AuthMaker | None | `Traced` |
| 78 | `POST` | `api/water/consumer/offline-request-payment` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `offlineConReqPayment` | AuthMaker | None | `Traced` |
| 79 | `POST` | `api/water/consumer/online-demand-payment` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `initiateOnlineDemandPayment` | AuthMaker | None | `Traced` |
| 80 | `POST` | `api/water/consumer/online-request-payment` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `initiateOnlineConRequestPayment` | AuthMaker | None | `Traced` |
| 81 | `POST` | `api/water/consumer/report/dcb-pie-chart` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `dcbPieChart` | AuthMaker | None | `Traced` |
| 82 | `POST` | `api/water/consumer/report/list-ward-dcb` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `wardWiseDCB` | AuthMaker | None | `Traced` |
| 83 | `POST` | `api/water/consumer/req/approval-rejection` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `consumerApprovalRejection` | AuthMaker | None | `Traced` |
| 84 | `POST` | `api/water/consumer/req/doc-verify-reject` | `N/A` | `None` | `WaterConsumerWfController` | `consumerDocVerifyReject` | Public | None | `Untraced (Method consumerDocVerifyReject not found in WaterConsumerWfController)` |
| 85 | `POST` | `api/water/consumer/req/get-upload-documents` | `N/A` | `None` | `WaterConsumerWfController` | `getConsumerDocs` | Public | None | `Untraced (Method getConsumerDocs not found in WaterConsumerWfController)` |
| 86 | `POST` | `api/water/consumer/req/get-worklfow-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getWorkflow` | AuthMaker | None | `Traced` |
| 87 | `POST` | `api/water/consumer/req/inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `consumerInbox` | AuthMaker | None | `Traced` |
| 88 | `POST` | `api/water/consumer/req/list-req-docs` | `N/A` | `None` | `WaterConsumerWfController` | `listDocToUpload` | Public | None | `Untraced (Method listDocToUpload not found in WaterConsumerWfController)` |
| 89 | `POST` | `api/water/consumer/req/outbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `consumerOutbox` | AuthMaker | None | `Traced` |
| 90 | `POST` | `api/water/consumer/req/post-next-level` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `consumerPostNextLevel` | AuthMaker | None | `Traced` |
| 91 | `POST` | `api/water/consumer/search-fixed-connections` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `searchFixedConsumers` | AuthMaker | None | `Traced` |
| 92 | `POST` | `api/water/consumer/self-generate-demand` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `selfGenerateDemand` | AuthMaker | None | `Traced` |
| 93 | `POST` | `api/water/consumer/water-user-charges` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `getWaterUserCharges` | AuthMaker | None | `Traced` |
| 94 | `POST` | `api/water/consumerChargeCal` | `N/A` | `None` | `WaterApplication` | `calConsumerDemand` | Public | None | `Untraced (Method calConsumerDemand not found in WaterApplication)` |
| 95 | `POST` | `api/water/consumers/post-next-level-appllication` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `postNextLevelApplication` | AuthMaker | None | `Traced` |
| 96 | `POST` | `api/water/consumers/reupload-water-doc` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `reuploadWaterDoc` | AuthMaker | None | `Traced` |
| 97 | `POST` | `api/water/create-water-pipeline-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `createWaterPipelineType` | AuthMaker | None | `Traced` |
| 98 | `POST` | `api/water/create-water-prop-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `createWaterPropTypeMstr` | AuthMaker | None | `Traced` |
| 99 | `POST` | `api/water/deactivation/back-to-citizen` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 100 | `POST` | `api/water/delete-water-pipeline-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `dataActiveDeactive` | AuthMaker | None | `Traced` |
| 101 | `POST` | `api/water/delete-water-prop-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `activeDeactiveById` | AuthMaker | None | `Traced` |
| 102 | `POST` | `api/water/disconnection/payment/get-payment-history` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `getDisApplicationPaymentHistory` | AuthMaker | None | `Traced` |
| 103 | `POST` | `api/water/doc-verify-reject` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `docVerifyRejects` | AuthMaker | None | `Traced` |
| 104 | `POST` | `api/water/escalate` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `postEscalate` | AuthMaker | None | `Traced` |
| 105 | `POST` | `api/water/field-verified-inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `fieldVerifiedInbox` | AuthMaker | None | `Traced` |
| 106 | `POST` | `api/water/get-details-applications-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getApplicationDetails` | AuthMaker | None | `Traced` |
| 107 | `POST` | `api/water/get-details-disconnections` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getRequestedApplication` | AuthMaker | None | `Traced` |
| 108 | `POST` | `api/water/get-rejected-documents-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getRejectedDocumentsList` | AuthMaker | None | `Traced` |
| 109 | `POST` | `api/water/get-upload-documents` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getUploadDocuments` | AuthMaker | None | `Traced` |
| 110 | `POST` | `api/water/get-water-pipeline-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `getAllPipeline` | AuthMaker | None | `Traced` |
| 111 | `POST` | `api/water/get-water-prop-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `getAllData` | AuthMaker | None | `Traced` |
| 112 | `POST` | `api/water/getTranNo` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterApplication` | `readTransectionAndApl` | AuthMaker | None | `Traced` |
| 113 | `POST` | `api/water/get_consumer_details_by_id` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumer` | `getByApplicationId` | AuthMaker | None | `Traced` |
| 114 | `POST` | `api/water/getby-id-water-pipeline-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `getDataId` | AuthMaker | None | `Traced` |
| 115 | `POST` | `api/water/getby-id-water-prop-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `getDataById` | AuthMaker | None | `Traced` |
| 116 | `GET|HEAD` | `api/water/health-check` | `N/A` | `None` | `Closure` | `Closure` | Public | None | `Traced` |
| 117 | `POST` | `api/water/inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `waterInbox` | AuthMaker | None | `Traced` |
| 118 | `POST` | `api/water/level-wise-report` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `levelWiseReport` | AuthMaker | None | `Traced` |
| 119 | `POST` | `api/water/master/get-listed-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `getWaterMasterData` | AuthMaker | None | `Traced` |
| 120 | `POST` | `api/water/new-connection-report` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `newConnectioReport` | AuthMaker | None | `Traced` |
| 121 | `POST` | `api/water/outbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `waterOutbox` | AuthMaker | None | `Traced` |
| 122 | `POST` | `api/water/post-next-level` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 123 | `POST` | `api/water/report-cosumer` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterReportController` | `consumerReport` | AuthMaker | None | `Traced` |
| 124 | `POST` | `api/water/request/discon/get-inspection-dtls` | `N/A` | `ForceJsonResponse, AuthMaker` | `ConsumerActionRequest` | `getInspectionData` | AuthMaker | None | `Traced` |
| 125 | `POST` | `api/water/request/discon/getInspectinMaster` | `N/A` | `ForceJsonResponse, AuthMaker` | `ConsumerActionRequest` | `getSiteInspectionCompar` | AuthMaker | None | `Traced` |
| 126 | `POST` | `api/water/request/discon/inspection` | `N/A` | `ForceJsonResponse, AuthMaker` | `ConsumerActionRequest` | `updateSiteInspection` | AuthMaker | None | `Traced` |
| 127 | `POST` | `api/water/request/discon/sedule-cancel` | `N/A` | `ForceJsonResponse, AuthMaker` | `ConsumerActionRequest` | `cancelDisconnectionSitInspection` | AuthMaker | None | `Traced` |
| 128 | `POST` | `api/water/request/discon/sedule-inspection` | `N/A` | `ForceJsonResponse, AuthMaker` | `ConsumerActionRequest` | `setDisconnectionSitInspection` | AuthMaker | None | `Traced` |
| 129 | `POST` | `api/water/search-consumer` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `searchWaterConsumer` | AuthMaker | None | `Traced` |
| 130 | `POST` | `api/water/search-holding-saf` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getSafHoldingDetails` | AuthMaker | None | `Traced` |
| 131 | `POST` | `api/water/simple-upload-document` | `N/A` | `None` | `NewConnectionController` | `testUploadDocument` | Public | None | `Traced` |
| 132 | `POST` | `api/water/site-verification/save-site-details` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterPaymentController` | `saveSitedetails` | AuthMaker | None | `Traced` |
| 133 | `POST` | `api/water/special-inbox` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `waterSpecialInbox` | AuthMaker | None | `Traced` |
| 134 | `POST` | `api/water/test` | `N/A` | `None` | `WaterNewConnection` | `razorPayResponse` | Public | None | `Traced` |
| 135 | `POST` | `api/water/update-applications` | `N/A` | `None` | `WaterApplication` | `updateWaterApplication` | Public | None | `Untraced (Method updateWaterApplication not found in WaterApplication)` |
| 136 | `POST` | `api/water/update-water-pipeline-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `updateDataById` | AuthMaker | None | `Traced` |
| 137 | `POST` | `api/water/update-water-prop-type` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterMasterController` | `updateById` | AuthMaker | None | `Traced` |
| 138 | `POST` | `api/water/upload-document` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `uploadWaterDoc` | AuthMaker | None | `Traced` |
| 139 | `POST` | `api/water/workflow/application/get-by-id` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getApplicationsDetails` | AuthMaker | None | `Traced` |
| 140 | `POST` | `api/water/workflow/get-doc-list` | `N/A` | `ForceJsonResponse, AuthMaker` | `NewConnectionController` | `getDocList` | AuthMaker | None | `Traced` |
| 141 | `POST` | `api/water/workflow/get-doc-list-je` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `getDocListForJe` | AuthMaker | None | `Traced` |
| 142 | `POST` | `api/water/workflow/upload-doc-je` | `N/A` | `ForceJsonResponse, AuthMaker` | `WaterConsumerWfController` | `uploadWaterDocJe` | AuthMaker | None | `Traced` |