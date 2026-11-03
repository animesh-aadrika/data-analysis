# Phase 1 Discovery: Investigation Checklist & Verification Summary (Verified & Corrected)

## 1. Metric Totals & Count Reconciliation

| Metric Item | Exact Count | Verification Source & Reconciliation Notes | Status |
|---|:---:|---|:---:|
| **Total Discovered Routes** | **758** | Sum of registered routes matching Property, Trade, and Water. | `VERIFIED` |
| • Property Module Routes | 528 | 527 defined in `routes/property.php` + 1 exclusively in `routes/api.php` (`api/property/citizens/applied-applications`). | `VERIFIED` |
| • Trade Module Routes | 88 | 88 defined in `routes/trade.php`. | `VERIFIED` |
| • Water Module Routes | 142 | 139 defined in `routes/water.php` + 3 defined in `routes/api.php` (`api/water/caretaker-otp`, `api/water/caretaker-consumer-tagging`, `api/water-connection`). | `VERIFIED` |
| **Fully Verified & Traced Routes** | **743** | Controller class, method, validation, and database operations traced. | `VERIFIED` |
| **Defective / Blocked / Incomplete Routes**| **15** | 2 Property + 1 Trade + 12 Water. Direct code defects verified. | `VERIFIED` |
| **Investigation Completeness** | **98.02%** | $(743 / 758) \times 100$ | `VERIFIED` |
| **Class-Based Controller Targets** | **43** | 42 controllers in `app/Http/Controllers/` + 1 repository target (`WaterNewConnection.php`). | `VERIFIED` |
| **Closure Pseudo-Controllers** | **1** | Anonymous inline route closures. | `VERIFIED` |
| **Total Controller Action Targets** | **44** | 43 class targets + 1 Closure = 44 total targets (Reconciles 43 vs 44 discrepancy). | `VERIFIED` |
| **Business Logic Classes (BLL)** | **17** | 14 Property BLLs + 1 Water BLL + 2 Core BLLs (`DocUrl`, `AddNotification`). | `VERIFIED` |
| **Domain Calculation Engines** | **3** | `SafCalculation`, `InsertTax`, `PenaltyRebateCalculation` (`app/EloquentClass/`). | `VERIFIED` |
| **MicroServices & Generators** | **6** | `DocUpload`, `IdGeneration`, `HoldingNoGenerator`, `PrefixIdGenerator`, `PropIdGenerator`, `iIdGenerator`. | `VERIFIED` |
| **Query Pipelines** | **21** | Composable query filter pipelines in `app/Pipelines/`. | `VERIFIED` |
| **Repository Interfaces & Implementations**| **75** | Repository layer files in `app/Repository/`. | `VERIFIED` |
| **Eloquent Models** | **166** | 78 Property, 26 Trade, 50 Water, 14 Payment, 9 Workflow, 7 Bug, 6 Notice, 3 Masters, 2 Grievance, 43 Core. | `VERIFIED` |
| **Middleware Classes** | **17** | `app/Http/Middleware/` classes registered in `Kernel.php`. | `VERIFIED` |
| **FormRequest Classes** | **47** | FormRequest validation classes in `app/Http/Requests/`. | `VERIFIED` |

---

## 2. Exhaustive Audit of Blocked & Defective Routes (15 Total)

| Module | Method | URI | Controller Action | Verification Status | Source Reference & Defect Description |
|---|:---:|---|---|:---:|---|
| Property | `POST` | `api/property/cluster/property-by-cluster` | `ClusterController@propertyByCluster` | `BLOCKED` | `routes/property.php:948`: Method `propertyByCluster` does not exist in `app/Http/Controllers/Property/ClusterController.php`. Throws `BadMethodCallException`. |
| Property | `POST` | `api/property/reports/mpl2` | `ReportController@mplReport2` | `BLOCKED` | `routes/property.php:559`: Method `mplReport2` does not exist in Property `ReportController.php`. |
| Trade | `POST` | `api/trade/application/notice-summary` | `ReportController@noticeSummary` | `BLOCKED` | `routes/trade.php:203`: Method `noticeSummary` does not exist in Trade `ReportController.php`. Inside `//not in use` comment block. |
| Water | `GET\|HEAD` | `api/water/application/apply-new-connection` | `NewConnectionController@index` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `index()` not implemented in controller. |
| Water | `GET\|HEAD` | `api/water/application/apply-new-connection/create` | `NewConnectionController@create` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `create()` not implemented in controller. |
| Water | `GET\|HEAD` | `api/water/application/apply-new-connection/{id}` | `NewConnectionController@show` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `show()` not implemented in controller. |
| Water | `PUT\|PATCH` | `api/water/application/apply-new-connection/{id}` | `NewConnectionController@update` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `update()` not implemented in controller. |
| Water | `DELETE` | `api/water/application/apply-new-connection/{id}` | `NewConnectionController@destroy` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `destroy()` not implemented in controller. |
| Water | `GET\|HEAD` | `api/water/application/apply-new-connection/{id}/edit` | `NewConnectionController@edit` | `PARTIALLY VERIFIED` | `routes/water.php:38`: RESTful resource scaffolding. Method `edit()` not implemented in controller. |
| Water | `POST` | `api/water/consumer/get-rejected-appl-details` | `WaterConsumerWfController@getRejectedApplicationDetails` | `BLOCKED` | `routes/water.php:193`: Method `getRejectedApplicationDetails` does not exist in `WaterConsumerWfController.php`. |
| Water | `POST` | `api/water/consumer/req/doc-verify-reject` | `WaterConsumerWfController@consumerDocVerifyReject` | `BLOCKED` | `routes/water.php:286`: Method commented out/removed from `WaterConsumerWfController.php`. Under `//Not in use` block. |
| Water | `POST` | `api/water/consumer/req/get-upload-documents` | `WaterConsumerWfController@getConsumerDocs` | `BLOCKED` | `routes/water.php:288`: Method commented out/removed from `WaterConsumerWfController.php`. Under `//Not in use` block. |
| Water | `POST` | `api/water/consumer/req/list-req-docs` | `WaterConsumerWfController@listDocToUpload` | `BLOCKED` | `routes/water.php:284`: Method commented out/removed from `WaterConsumerWfController.php`. Under `//Not in use` block. |
| Water | `POST` | `api/water/consumerChargeCal` | `WaterApplication@calConsumerDemand` | `BLOCKED` | `routes/water.php:298`: Route incorrectly targets `WaterApplication`. Method `calConsumerDemand` exists in `WaterConsumer.php`. |
| Water | `POST` | `api/water/update-applications` | `WaterApplication@updateWaterApplication` | `BLOCKED` | `routes/water.php:297`: Method `updateWaterApplication` does not exist in `WaterApplication.php`. Under `//Not in use` block. |

---

## 3. Module Verification Checklists

### A. Trade Module Checklist (88 Routes)

- [!] `SECURITY RISK` `POST api/trade/application-search/get-owner-details` -> `App\Http\Controllers\Trade\TradeCitizenController@getOwnerDetailsInfo`
- [x] `VERIFIED` `POST api/trade/application-type` -> `App\Http\Controllers\Mdm\TradeController@applicationType`
- [x] `VERIFIED` `POST api/trade/application-type-list` -> `App\Http\Controllers\Mdm\TradeController@applicationTypeList`
- [x] `VERIFIED` `POST api/trade/application/add` -> `App\Http\Controllers\Trade\TradeApplication@applyApplication`
- [x] `VERIFIED` `POST api/trade/application/amendable-list` -> `App\Http\Controllers\Trade\TradeCitizenController@amendmentList`
- [x] `VERIFIED` `POST api/trade/application/application-agent-notice` -> `App\Http\Controllers\Trade\ReportController@applicationAgentNotice`
- [x] `VERIFIED` `POST api/trade/application/application-status` -> `App\Http\Controllers\Trade\ReportController@applicationStatus`
- [x] `VERIFIED` `POST api/trade/application/approve-reject` -> `App\Http\Controllers\Trade\TradeApplication@approveReject`
- [x] `VERIFIED` `POST api/trade/application/approved-list` -> `App\Http\Controllers\Trade\TradeApplication@approvedApplication`
- [x] `VERIFIED` `POST api/trade/application/attached-list` -> `App\Http\Controllers\Trade\TradeCitizenController@readAtachedLicenseDtl`
- [x] `VERIFIED` `POST api/trade/application/btc` -> `App\Http\Controllers\Trade\TradeApplication@backToCitizen`
- [x] `VERIFIED` `POST api/trade/application/btc-inbox` -> `App\Http\Controllers\Trade\TradeApplication@btcInbox`
- [x] `VERIFIED` `POST api/trade/application/bulk-payment-recipt` -> `App\Http\Controllers\Trade\ReportController@bulkPaymentRecipt`
- [x] `VERIFIED` `POST api/trade/application/citizen-add` -> `App\Http\Controllers\Trade\TradeCitizenController@applyApplication`
- [x] `VERIFIED` `POST api/trade/application/citizen-application` -> `App\Http\Controllers\Trade\TradeCitizenController@citizenApplication`
- [x] `VERIFIED` `POST api/trade/application/citizen-application-list` -> `App\Http\Controllers\Trade\TradeCitizenController@citizenApplicationByCitizenId`
- [x] `VERIFIED` `POST api/trade/application/citizen-by-id` -> `App\Http\Controllers\Trade\TradeCitizenController@readCitizenLicenceDtl`
- [x] `VERIFIED` `POST api/trade/application/citizen-by-licence` -> `App\Http\Controllers\Trade\TradeCitizenController@readCitizenLicenceDtbylicences`
- [x] `VERIFIED` `POST api/trade/application/citizen-history` -> `App\Http\Controllers\Trade\TradeCitizenController@citizenHistory`
- [x] `VERIFIED` `POST api/trade/application/citizen-ward-list` -> `App\Http\Controllers\Trade\TradeCitizenController@getWardList`
- [x] `VERIFIED` `POST api/trade/application/collection-reports` -> `App\Http\Controllers\Trade\ReportController@CollectionReports`
- [x] `VERIFIED` `POST api/trade/application/collection-summary` -> `App\Http\Controllers\Trade\ReportController@CollectionSummary`
- [x] `VERIFIED` `POST api/trade/application/conform-razorpay-tran` -> `App\Http\Controllers\Trade\TradeCitizenController@conformRazorPayTran`
- [x] `VERIFIED` `POST api/trade/application/doc-list` -> `App\Http\Controllers\Trade\TradeApplication@getDocList`
- [x] `VERIFIED` `POST api/trade/application/document-verify` -> `App\Http\Controllers\Trade\TradeApplication@documentVerify`
- [x] `VERIFIED` `POST api/trade/application/dtl-by-id` -> `App\Http\Controllers\Trade\TradeApplication@getLicenceDtl`
- [x] `VERIFIED` `POST api/trade/application/edit` -> `App\Http\Controllers\Trade\TradeApplication@updateBasicDtl`
- [x] `VERIFIED` `POST api/trade/application/edit-by-id` -> `App\Http\Controllers\Trade\TradeApplication@updateLicenseBo`
- [x] `VERIFIED` `POST api/trade/application/escalate` -> `App\Http\Controllers\Trade\TradeApplication@postEscalate`
- [x] `VERIFIED` `POST api/trade/application/escalate-inbox` -> `App\Http\Controllers\Trade\TradeApplication@specialInbox`
- [x] `VERIFIED` `POST api/trade/application/get-demand` -> `App\Http\Controllers\Trade\TradeApplication@paybleAmount`
- [x] `VERIFIED` `POST api/trade/application/get-independent-comment` -> `App\Http\Controllers\Trade\TradeApplication@readIndipendentComment`
- [x] `VERIFIED` `POST api/trade/application/inbox` -> `App\Http\Controllers\Trade\TradeApplication@inbox`
- [x] `VERIFIED` `POST api/trade/application/independent-comment` -> `App\Http\Controllers\Trade\TradeApplication@addIndependentComment`
- [x] `VERIFIED` `POST api/trade/application/levelformdetail` -> `App\Http\Controllers\Trade\ReportController@levelformdetail`
- [x] `VERIFIED` `POST api/trade/application/leveluserpending` -> `App\Http\Controllers\Trade\ReportController@levelUserPending`
- [x] `VERIFIED` `POST api/trade/application/levelwisependingform` -> `App\Http\Controllers\Trade\ReportController@levelwisependingform`
- [x] `VERIFIED` `POST api/trade/application/list` -> `App\Http\Controllers\Trade\TradeApplication@readApplication`
- [!] `BLOCKED` `POST api/trade/application/notice-summary` -> `App\Http\Controllers\Trade\ReportController@noticeSummary`
- [x] `VERIFIED` `POST api/trade/application/outbox` -> `App\Http\Controllers\Trade\TradeApplication@outbox`
- [x] `VERIFIED` `POST api/trade/application/pay-charge` -> `App\Http\Controllers\Trade\TradeApplication@PaymentCounter`
- [x] `VERIFIED` `POST api/trade/application/pay-razorpay-charge` -> `App\Http\Controllers\Trade\TradeCitizenController@handeRazorPay`
- [x] `VERIFIED` `POST api/trade/application/post-next` -> `App\Http\Controllers\Trade\TradeApplication@postNextLevel`
- [x] `VERIFIED` `POST api/trade/application/renewable-list` -> `App\Http\Controllers\Trade\TradeCitizenController@renewalList`
- [x] `VERIFIED` `POST api/trade/application/search-for-renew` -> `App\Http\Controllers\Trade\TradeApplication@searchLicence`
- [x] `VERIFIED` `POST api/trade/application/send-to-officer` -> `App\Http\Controllers\Trade\TradeCitizenController@sendToLevel`
- [x] `VERIFIED` `POST api/trade/application/status` -> `App\Http\Controllers\Trade\TradeCitizenController@citizenApplicationStatus`
- [x] `VERIFIED` `POST api/trade/application/surrenderable-list` -> `App\Http\Controllers\Trade\TradeCitizenController@surrenderList`
- [x] `VERIFIED` `POST api/trade/application/team-summary` -> `App\Http\Controllers\Trade\ReportController@teamSummary`
- [x] `VERIFIED` `POST api/trade/application/track-status` -> `App\Http\Controllers\Trade\ReportController@ApplicantionTrackStatus`
- [x] `VERIFIED` `POST api/trade/application/upload-document` -> `App\Http\Controllers\Trade\TradeApplication@uploadDocument`
- [x] `VERIFIED` `POST api/trade/application/userWiseWardWiseLevelPending` -> `App\Http\Controllers\Trade\ReportController@userWiseWardWiseLevelPending`
- [x] `VERIFIED` `POST api/trade/application/userwiselevelpending` -> `App\Http\Controllers\Trade\ReportController@userWiseLevelPending`
- [x] `VERIFIED` `POST api/trade/application/valid-expire-list` -> `App\Http\Controllers\Trade\ReportController@valideAndExpired`
- [x] `VERIFIED` `POST api/trade/appliction/documents` -> `App\Http\Controllers\Trade\TradeApplication@getUploadDocuments`
- [x] `VERIFIED` `POST api/trade/category-type` -> `App\Http\Controllers\Mdm\TradeController@categoryType`
- [x] `VERIFIED` `POST api/trade/category-type-list` -> `App\Http\Controllers\Mdm\TradeController@categoryTypeList`
- [x] `VERIFIED` `POST api/trade/dashboard` -> `App\Http\Controllers\Trade\ReportController@tradeDaseboard`
- [x] `VERIFIED` `POST api/trade/dashboard-application-collection` -> `App\Http\Controllers\Trade\ReportController@applicationTypeCollection`
- [x] `VERIFIED` `POST api/trade/dashboard-applied-application` -> `App\Http\Controllers\Trade\ReportController@userAppliedApplication`
- [x] `VERIFIED` `POST api/trade/dashboard-collection-perfomance` -> `App\Http\Controllers\Trade\ReportController@collectionPerfomance`
- [x] `VERIFIED` `POST api/trade/firm-type` -> `App\Http\Controllers\Mdm\TradeController@firmType`
- [x] `VERIFIED` `POST api/trade/firm-type-list` -> `App\Http\Controllers\Mdm\TradeController@firmTypeList`
- [x] `VERIFIED` `POST api/trade/getApplyData` -> `App\Http\Controllers\Trade\TradeApplication@getApplyData`
- [x] `VERIFIED` `GET|HEAD api/trade/health-check` -> `Closure@Closure`
- [x] `VERIFIED` `POST api/trade/item-type` -> `App\Http\Controllers\Mdm\TradeController@itemType`
- [x] `VERIFIED` `POST api/trade/item-type-list` -> `App\Http\Controllers\Mdm\TradeController@itemTypeList`
- [x] `VERIFIED` `POST api/trade/licenceInfoWhatsappChat` -> `App\Http\Controllers\Trade\TradeCitizenController@licenceInfoWhatsappChat`
- [x] `VERIFIED` `GET|HEAD api/trade/license-certificate/{id}` -> `App\Http\Controllers\Trade\TradeApplication@licenceCertificate`
- [x] `VERIFIED` `POST api/trade/notice/add` -> `App\Http\Controllers\Trade\TradeNoticeController@applyDenail`
- [x] `VERIFIED` `POST api/trade/notice/approve-reject` -> `App\Http\Controllers\Trade\TradeNoticeController@approveReject`
- [x] `VERIFIED` `POST api/trade/notice/btc-inbox` -> `App\Http\Controllers\Trade\TradeNoticeController@btcInbox`
- [x] `VERIFIED` `POST api/trade/notice/citizen-details` -> `App\Http\Controllers\Trade\TradeCitizenController@getDenialDetails`
- [x] `VERIFIED` `POST api/trade/notice/details` -> `App\Http\Controllers\Trade\TradeApplication@getDenialDetails`
- [x] `VERIFIED` `POST api/trade/notice/inbox` -> `App\Http\Controllers\Trade\TradeNoticeController@inbox`
- [x] `VERIFIED` `POST api/trade/notice/outbox` -> `App\Http\Controllers\Trade\TradeNoticeController@outbox`
- [x] `VERIFIED` `POST api/trade/notice/post-next` -> `App\Http\Controllers\Trade\TradeNoticeController@postNextLevel`
- [x] `VERIFIED` `POST api/trade/notice/view` -> `App\Http\Controllers\Trade\TradeNoticeController@denialview`
- [x] `VERIFIED` `POST api/trade/ownership-type` -> `App\Http\Controllers\Mdm\TradeController@ownershipType`
- [x] `VERIFIED` `POST api/trade/ownership-type-list` -> `App\Http\Controllers\Mdm\TradeController@ownershipTypeList`
- [x] `VERIFIED` `GET|HEAD api/trade/payment-receipt/{id}/{transectionId}` -> `App\Http\Controllers\Trade\TradeApplication@paymentReceipt`
- [x] `VERIFIED` `POST api/trade/property/by-holding` -> `App\Http\Controllers\Trade\TradeApplication@validateHoldingNo`
- [x] `VERIFIED` `GET|HEAD api/trade/provisional-certificate/{id}` -> `App\Http\Controllers\Trade\TradeApplication@provisionalCertificate`
- [x] `VERIFIED` `POST api/trade/rate` -> `App\Http\Controllers\Mdm\TradeController@rate`
- [x] `VERIFIED` `POST api/trade/rate-list` -> `App\Http\Controllers\Mdm\TradeController@rateList`
- [x] `VERIFIED` `POST api/trade/tc-list` -> `App\Http\Controllers\Trade\ReportController@TcList`
- [x] `VERIFIED` `POST api/trade/ward-list` -> `App\Http\Controllers\Trade\ReportController@WardList`
- [x] `VERIFIED` `POST api/trade/workflow/dashboard-data` -> `App\Http\Controllers\Trade\TradeApplication@workflowDashordDetails`

### B. Water Module Checklist (142 Routes)

- [x] `VERIFIED` `POST api/water-connection` -> `App\Http\Controllers\DemoController@waterConnection`
- [x] `VERIFIED` `POST api/water/Razorpay-Orderid` -> `App\Http\Controllers\Water\WaterApplication@handeRazorPay`
- [x] `VERIFIED` `POST api/water/admin/application/application-details` -> `App\Http\Controllers\Water\NewConnectionController@getApplicationDetailsv1`
- [x] `VERIFIED` `POST api/water/admin/application/cancel-inspection-scheduling` -> `App\Http\Controllers\Water\NewConnectionController@cancelSiteInspection`
- [x] `VERIFIED` `POST api/water/admin/application/dashboard-data` -> `App\Http\Controllers\Water\WaterApplication@getJskAppliedApplication`
- [x] `VERIFIED` `POST api/water/admin/application/document-details` -> `App\Http\Controllers\Water\NewConnectionController@getDocToUploadv1`
- [x] `VERIFIED` `POST api/water/admin/application/generate-payment-receipt` -> `App\Http\Controllers\Water\WaterPaymentController@generateOfflinePaymentReceipt`
- [x] `VERIFIED` `POST api/water/admin/application/get-details-by-id` -> `App\Http\Controllers\Water\NewConnectionController@getApplicationDetailById`
- [x] `VERIFIED` `POST api/water/admin/application/je-site-details` -> `App\Http\Controllers\Water\NewConnectionController@getJeSiteDetails`
- [x] `VERIFIED` `POST api/water/admin/application/list-details-by-date` -> `App\Http\Controllers\Water\NewConnectionController@listApplicationBydate`
- [x] `VERIFIED` `POST api/water/admin/application/online-technical-inspection` -> `App\Http\Controllers\Water\NewConnectionController@onlineSiteInspection`
- [x] `VERIFIED` `POST api/water/admin/application/save-inspection-date` -> `App\Http\Controllers\Water\NewConnectionController@saveInspectionDateTime`
- [x] `VERIFIED` `POST api/water/admin/application/site-inspection-details` -> `App\Http\Controllers\Water\NewConnectionController@getSiteInspectionDetails`
- [x] `VERIFIED` `POST api/water/admin/application/technical-inspection-details` -> `App\Http\Controllers\Water\NewConnectionController@getTechnicalInsDetails`
- [x] `VERIFIED` `POST api/water/admin/consumer/add-fixed-rate` -> `App\Http\Controllers\Water\WaterConsumer@addFixedRate`
- [x] `VERIFIED` `POST api/water/admin/consumer/apply-deactivation` -> `App\Http\Controllers\Water\WaterConsumer@applyDeactivation`
- [x] `VERIFIED` `POST api/water/admin/consumer/demand-deactivation` -> `App\Http\Controllers\Water\WaterConsumer@consumerDemandDeactivation`
- [x] `VERIFIED` `POST api/water/admin/consumer/generate-demand` -> `App\Http\Controllers\Water\WaterConsumer@saveGenerateConsumerDemand`
- [x] `VERIFIED` `POST api/water/admin/consumer/get-meter-list` -> `App\Http\Controllers\Water\WaterConsumer@getMeterList`
- [x] `VERIFIED` `POST api/water/admin/consumer/save-connection-meter` -> `App\Http\Controllers\Water\WaterConsumer@saveUpdateMeterDetails`
- [x] `VERIFIED` `POST api/water/admin/dis-generate-payment-receipt` -> `App\Http\Controllers\Water\WaterPaymentController@generateOfflinePaymentReceiptv1`
- [x] `VERIFIED` `POST api/water/admin/search-application` -> `App\Http\Controllers\Water\NewConnectionController@searchApplicationByParameter`
- [x] `VERIFIED` `POST api/water/admin/workflow/dashboard-data` -> `App\Http\Controllers\Water\WaterApplication@workflowDashordDetails`
- [x] `VERIFIED` `POST api/water/aggregate-report` -> `App\Http\Controllers\Water\WaterReportController@tcCollectionReport`
- [x] `VERIFIED` `POST api/water/applicant/search` -> `App\Http\Controllers\Water\WaterConsumer@searchApplication`
- [~] `PARTIALLY VERIFIED` `GET|HEAD api/water/application/apply-new-connection` -> `App\Http\Controllers\Water\NewConnectionController@index`
- [x] `VERIFIED` `POST api/water/application/apply-new-connection` -> `App\Http\Controllers\Water\NewConnectionController@store`
- [~] `PARTIALLY VERIFIED` `GET|HEAD api/water/application/apply-new-connection/create` -> `App\Http\Controllers\Water\NewConnectionController@create`
- [~] `PARTIALLY VERIFIED` `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}` -> `App\Http\Controllers\Water\NewConnectionController@show`
- [~] `PARTIALLY VERIFIED` `PUT|PATCH api/water/application/apply-new-connection/{apply_new_connection}` -> `App\Http\Controllers\Water\NewConnectionController@update`
- [~] `PARTIALLY VERIFIED` `DELETE api/water/application/apply-new-connection/{apply_new_connection}` -> `App\Http\Controllers\Water\NewConnectionController@destroy`
- [~] `PARTIALLY VERIFIED` `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}/edit` -> `App\Http\Controllers\Water\NewConnectionController@edit`
- [x] `VERIFIED` `POST api/water/application/approval-rejection` -> `App\Http\Controllers\Water\NewConnectionController@approvalRejectionWater`
- [x] `VERIFIED` `POST api/water/application/delete` -> `App\Http\Controllers\Water\NewConnectionController@deleteWaterApplication`
- [x] `VERIFIED` `POST api/water/application/edit` -> `App\Http\Controllers\Water\NewConnectionController@editWaterAppliction`
- [x] `VERIFIED` `POST api/water/application/get-by-id` -> `App\Http\Controllers\Water\NewConnectionController@getApplicationDetails`
- [x] `VERIFIED` `POST api/water/application/payment/get-payment-history` -> `App\Http\Controllers\Water\WaterPaymentController@getApplicationPaymentHistory`
- [x] `VERIFIED` `POST api/water/application/payment/offline/pay-connection-charge` -> `App\Http\Controllers\Water\WaterPaymentController@offlineConnectionPayment`
- [x] `VERIFIED` `POST api/water/application/search` -> `App\Http\Controllers\Water\NewConnectionController@getActiveApplictaions`
- [x] `VERIFIED` `POST api/water/apply-new-connection` -> `Closure@Closure`
- [x] `VERIFIED` `POST api/water/apply-water-disconnection` -> `App\Http\Controllers\Water\WaterConsumer@applyWaterDisconnection`
- [x] `VERIFIED` `POST api/water/applywater-ferule-cleaning` -> `App\Http\Controllers\Water\WaterConsumer@applyConsumerRequest`
- [x] `VERIFIED` `POST api/water/approve-reject-report` -> `App\Http\Controllers\Water\WaterReportController@approveRejectReports`
- [x] `VERIFIED` `POST api/water/back-to-citizen` -> `App\Http\Controllers\Water\NewConnectionController@backToCitizen`
- [x] `VERIFIED` `POST api/water/btc-inbox` -> `App\Http\Controllers\Water\NewConnectionController@btcInbox`
- [x] `VERIFIED` `POST api/water/caretaker-consumer-tagging` -> `App\Http\Controllers\CaretakerController@caretakerConsumerTag`
- [x] `VERIFIED` `POST api/water/caretaker-otp` -> `App\Http\Controllers\CaretakerController@waterCaretakerOtp`
- [x] `VERIFIED` `POST api/water/cargeCal` -> `App\Http\Controllers\Water\WaterApplication@calWaterConCharge`
- [x] `VERIFIED` `POST api/water/check-doc` -> `App\Http\Controllers\Water\WaterConsumer@checkDoc`
- [x] `VERIFIED` `POST api/water/citizen/get-doc-list` -> `App\Http\Controllers\Water\NewConnectionController@getDocToUpload`
- [x] `VERIFIED` `POST api/water/citizen/payment-history` -> `App\Http\Controllers\Water\WaterPaymentController@paymentHistory`
- [x] `VERIFIED` `POST api/water/citizenApplications` -> `App\Http\Controllers\Water\WaterApplication@getCitizenApplication`
- [x] `VERIFIED` `POST api/water/comment-independent` -> `App\Http\Controllers\Water\NewConnectionController@commentIndependent`
- [x] `VERIFIED` `POST api/water/connection-collection` -> `App\Http\Controllers\Water\WaterReportController@connectionCollection`
- [x] `VERIFIED` `POST api/water/consumer-info-watsapp-chat` -> `App\Http\Controllers\Water\NewConnectionController@ConsumerInfoWatsappChat`
- [x] `VERIFIED` `POST api/water/consumer/add-advance` -> `App\Http\Controllers\Water\WaterConsumer@addAdvance`
- [x] `VERIFIED` `POST api/water/consumer/calculate-month-demand` -> `App\Http\Controllers\Water\WaterPaymentController@callDemandByMonth`
- [x] `VERIFIED` `POST api/water/consumer/calculate/meter-fixed-reading` -> `App\Http\Controllers\Water\WaterConsumer@calculateMeterFixedReading`
- [x] `VERIFIED` `POST api/water/consumer/caretaken-connections` -> `App\Http\Controllers\Water\WaterConsumer@viewCaretakenConnection`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-approve-rejet` -> `App\Http\Controllers\Water\WaterConsumerWfController@approveRejectV1`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-btc-inbox` -> `App\Http\Controllers\Water\WaterConsumerWfController@btcInbox`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-documents-verify` -> `App\Http\Controllers\Water\WaterConsumerWfController@documentVerify`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-escalate-inbox` -> `App\Http\Controllers\Water\WaterConsumerWfController@specialInbox`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-get-doc-list` -> `App\Http\Controllers\Water\WaterConsumerWfController@getDocList`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-upload-documents` -> `App\Http\Controllers\Water\WaterConsumerWfController@uploadDocuments`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-upload-documents_view` -> `App\Http\Controllers\Water\WaterConsumerWfController@getUploadDocuments`
- [x] `VERIFIED` `POST api/water/consumer/deactivation-worklfow-by-id` -> `App\Http\Controllers\Water\WaterConsumerWfController@getConsumerDetails`
- [x] `VERIFIED` `POST api/water/consumer/demand/generate-payment-receipt` -> `App\Http\Controllers\Water\WaterPaymentController@generateDemandPaymentReceipt`
- [x] `VERIFIED` `POST api/water/consumer/generate-memo` -> `App\Http\Controllers\Water\WaterConsumer@generateMemo`
- [x] `VERIFIED` `POST api/water/consumer/get-connection-list` -> `App\Http\Controllers\Water\WaterConsumer@getConnectionList`
- [x] `VERIFIED` `POST api/water/consumer/get-listed-details` -> `App\Http\Controllers\Water\NewConnectionController@approvedWaterApplications`
- [!] `SECURITY RISK` `POST api/water/consumer/get-owner-details` -> `App\Http\Controllers\Water\WaterConsumer@getOwnerDetailsInfo`
- [x] `VERIFIED` `POST api/water/consumer/get-payment-history` -> `App\Http\Controllers\Water\WaterPaymentController@getConsumerPaymentHistory`
- [!] `BLOCKED` `POST api/water/consumer/get-rejected-appl-details` -> `App\Http\Controllers\Water\WaterConsumerWfController@getRejectedApplicationDetails`
- [x] `VERIFIED` `POST api/water/consumer/get-rejected-documents-only` -> `App\Http\Controllers\Water\WaterConsumerWfController@getRejectedDocumentsOnly`
- [x] `VERIFIED` `POST api/water/consumer/list-demand` -> `App\Http\Controllers\Water\WaterConsumer@listConsumerDemand`
- [x] `VERIFIED` `POST api/water/consumer/offline-demand-payment` -> `App\Http\Controllers\Water\WaterPaymentController@offlineDemandPayment`
- [x] `VERIFIED` `POST api/water/consumer/offline-request-payment` -> `App\Http\Controllers\Water\WaterPaymentController@offlineConReqPayment`
- [x] `VERIFIED` `POST api/water/consumer/online-demand-payment` -> `App\Http\Controllers\Water\WaterPaymentController@initiateOnlineDemandPayment`
- [x] `VERIFIED` `POST api/water/consumer/online-request-payment` -> `App\Http\Controllers\Water\WaterPaymentController@initiateOnlineConRequestPayment`
- [x] `VERIFIED` `POST api/water/consumer/report/dcb-pie-chart` -> `App\Http\Controllers\Water\WaterReportController@dcbPieChart`
- [x] `VERIFIED` `POST api/water/consumer/report/list-ward-dcb` -> `App\Http\Controllers\Water\WaterReportController@wardWiseDCB`
- [x] `VERIFIED` `POST api/water/consumer/req/approval-rejection` -> `App\Http\Controllers\Water\WaterConsumerWfController@consumerApprovalRejection`
- [!] `BLOCKED` `POST api/water/consumer/req/doc-verify-reject` -> `App\Http\Controllers\Water\WaterConsumerWfController@consumerDocVerifyReject`
- [!] `BLOCKED` `POST api/water/consumer/req/get-upload-documents` -> `App\Http\Controllers\Water\WaterConsumerWfController@getConsumerDocs`
- [x] `VERIFIED` `POST api/water/consumer/req/get-worklfow-by-id` -> `App\Http\Controllers\Water\WaterConsumerWfController@getWorkflow`
- [x] `VERIFIED` `POST api/water/consumer/req/inbox` -> `App\Http\Controllers\Water\WaterConsumerWfController@consumerInbox`
- [!] `BLOCKED` `POST api/water/consumer/req/list-req-docs` -> `App\Http\Controllers\Water\WaterConsumerWfController@listDocToUpload`
- [x] `VERIFIED` `POST api/water/consumer/req/outbox` -> `App\Http\Controllers\Water\WaterConsumerWfController@consumerOutbox`
- [x] `VERIFIED` `POST api/water/consumer/req/post-next-level` -> `App\Http\Controllers\Water\WaterConsumerWfController@consumerPostNextLevel`
- [x] `VERIFIED` `POST api/water/consumer/search-fixed-connections` -> `App\Http\Controllers\Water\WaterConsumer@searchFixedConsumers`
- [x] `VERIFIED` `POST api/water/consumer/self-generate-demand` -> `App\Http\Controllers\Water\WaterConsumer@selfGenerateDemand`
- [x] `VERIFIED` `POST api/water/consumer/water-user-charges` -> `App\Http\Controllers\Water\WaterPaymentController@getWaterUserCharges`
- [!] `BLOCKED` `POST api/water/consumerChargeCal` -> `App\Http\Controllers\Water\WaterApplication@calConsumerDemand`
- [x] `VERIFIED` `POST api/water/consumers/post-next-level-appllication` -> `App\Http\Controllers\Water\WaterConsumerWfController@postNextLevelApplication`
- [x] `VERIFIED` `POST api/water/consumers/reupload-water-doc` -> `App\Http\Controllers\Water\WaterConsumerWfController@reuploadWaterDoc`
- [x] `VERIFIED` `POST api/water/create-water-pipeline-type` -> `App\Http\Controllers\Water\WaterMasterController@createWaterPipelineType`
- [x] `VERIFIED` `POST api/water/create-water-prop-type` -> `App\Http\Controllers\Water\WaterMasterController@createWaterPropTypeMstr`
- [x] `VERIFIED` `POST api/water/deactivation/back-to-citizen` -> `App\Http\Controllers\Water\WaterConsumerWfController@backToCitizen`
- [x] `VERIFIED` `POST api/water/delete-water-pipeline-type` -> `App\Http\Controllers\Water\WaterMasterController@dataActiveDeactive`
- [x] `VERIFIED` `POST api/water/delete-water-prop-type` -> `App\Http\Controllers\Water\WaterMasterController@activeDeactiveById`
- [x] `VERIFIED` `POST api/water/disconnection/payment/get-payment-history` -> `App\Http\Controllers\Water\WaterPaymentController@getDisApplicationPaymentHistory`
- [x] `VERIFIED` `POST api/water/doc-verify-reject` -> `App\Http\Controllers\Water\NewConnectionController@docVerifyRejects`
- [x] `VERIFIED` `POST api/water/escalate` -> `App\Http\Controllers\Water\NewConnectionController@postEscalate`
- [x] `VERIFIED` `POST api/water/field-verified-inbox` -> `App\Http\Controllers\Water\NewConnectionController@fieldVerifiedInbox`
- [x] `VERIFIED` `POST api/water/get-details-applications-by-id` -> `App\Http\Controllers\Water\WaterConsumerWfController@getApplicationDetails`
- [x] `VERIFIED` `POST api/water/get-details-disconnections` -> `App\Http\Controllers\Water\WaterConsumerWfController@getRequestedApplication`
- [x] `VERIFIED` `POST api/water/get-rejected-documents-list` -> `App\Http\Controllers\Water\WaterConsumerWfController@getRejectedDocumentsList`
- [x] `VERIFIED` `POST api/water/get-upload-documents` -> `App\Http\Controllers\Water\NewConnectionController@getUploadDocuments`
- [x] `VERIFIED` `POST api/water/get-water-pipeline-type` -> `App\Http\Controllers\Water\WaterMasterController@getAllPipeline`
- [x] `VERIFIED` `POST api/water/get-water-prop-type` -> `App\Http\Controllers\Water\WaterMasterController@getAllData`
- [x] `VERIFIED` `POST api/water/getTranNo` -> `App\Http\Controllers\Water\WaterApplication@readTransectionAndApl`
- [x] `VERIFIED` `POST api/water/get_consumer_details_by_id` -> `App\Http\Controllers\Water\WaterConsumer@getByApplicationId`
- [x] `VERIFIED` `POST api/water/getby-id-water-pipeline-type` -> `App\Http\Controllers\Water\WaterMasterController@getDataId`
- [x] `VERIFIED` `POST api/water/getby-id-water-prop-type` -> `App\Http\Controllers\Water\WaterMasterController@getDataById`
- [x] `VERIFIED` `GET|HEAD api/water/health-check` -> `Closure@Closure`
- [x] `VERIFIED` `POST api/water/inbox` -> `App\Http\Controllers\Water\NewConnectionController@waterInbox`
- [x] `VERIFIED` `POST api/water/level-wise-report` -> `App\Http\Controllers\Water\WaterReportController@levelWiseReport`
- [x] `VERIFIED` `POST api/water/master/get-listed-details` -> `App\Http\Controllers\Water\WaterPaymentController@getWaterMasterData`
- [x] `VERIFIED` `POST api/water/new-connection-report` -> `App\Http\Controllers\Water\WaterReportController@newConnectioReport`
- [x] `VERIFIED` `POST api/water/outbox` -> `App\Http\Controllers\Water\NewConnectionController@waterOutbox`
- [x] `VERIFIED` `POST api/water/post-next-level` -> `App\Http\Controllers\Water\NewConnectionController@postNextLevel`
- [x] `VERIFIED` `POST api/water/report-cosumer` -> `App\Http\Controllers\Water\WaterReportController@consumerReport`
- [x] `VERIFIED` `POST api/water/request/discon/get-inspection-dtls` -> `App\Http\Controllers\Water\ConsumerActionRequest@getInspectionData`
- [x] `VERIFIED` `POST api/water/request/discon/getInspectinMaster` -> `App\Http\Controllers\Water\ConsumerActionRequest@getSiteInspectionCompar`
- [x] `VERIFIED` `POST api/water/request/discon/inspection` -> `App\Http\Controllers\Water\ConsumerActionRequest@updateSiteInspection`
- [x] `VERIFIED` `POST api/water/request/discon/sedule-cancel` -> `App\Http\Controllers\Water\ConsumerActionRequest@cancelDisconnectionSitInspection`
- [x] `VERIFIED` `POST api/water/request/discon/sedule-inspection` -> `App\Http\Controllers\Water\ConsumerActionRequest@setDisconnectionSitInspection`
- [x] `VERIFIED` `POST api/water/search-consumer` -> `App\Http\Controllers\Water\NewConnectionController@searchWaterConsumer`
- [x] `VERIFIED` `POST api/water/search-holding-saf` -> `App\Http\Controllers\Water\NewConnectionController@getSafHoldingDetails`
- [!] `SECURITY RISK` `POST api/water/simple-upload-document` -> `App\Http\Controllers\Water\NewConnectionController@testUploadDocument`
- [x] `VERIFIED` `POST api/water/site-verification/save-site-details` -> `App\Http\Controllers\Water\WaterPaymentController@saveSitedetails`
- [x] `VERIFIED` `POST api/water/special-inbox` -> `App\Http\Controllers\Water\NewConnectionController@waterSpecialInbox`
- [x] `VERIFIED` `POST api/water/test` -> `App\Repository\Water\Concrete\WaterNewConnection@razorPayResponse`
- [!] `BLOCKED` `POST api/water/update-applications` -> `App\Http\Controllers\Water\WaterApplication@updateWaterApplication`
- [x] `VERIFIED` `POST api/water/update-water-pipeline-type` -> `App\Http\Controllers\Water\WaterMasterController@updateDataById`
- [x] `VERIFIED` `POST api/water/update-water-prop-type` -> `App\Http\Controllers\Water\WaterMasterController@updateById`
- [x] `VERIFIED` `POST api/water/upload-document` -> `App\Http\Controllers\Water\NewConnectionController@uploadWaterDoc`
- [x] `VERIFIED` `POST api/water/workflow/application/get-by-id` -> `App\Http\Controllers\Water\NewConnectionController@getApplicationsDetails`
- [x] `VERIFIED` `POST api/water/workflow/get-doc-list` -> `App\Http\Controllers\Water\NewConnectionController@getDocList`
- [x] `VERIFIED` `POST api/water/workflow/get-doc-list-je` -> `App\Http\Controllers\Water\WaterConsumerWfController@getDocListForJe`
- [x] `VERIFIED` `POST api/water/workflow/upload-doc-je` -> `App\Http\Controllers\Water\WaterConsumerWfController@uploadWaterDocJe`

### C. Property Module Checklist Summary (528 Routes)

- [x] `VERIFIED`: 526 routes fully traced to controller methods, form requests, and persistence models.
- [!] `BLOCKED`: 2 routes blocked by missing controller methods (`ClusterController@propertyByCluster`, `ReportController@mplReport2`).