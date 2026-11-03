# Phase 1 Discovery: Controller Inventory & Method Tracing

## 1. Controller Portfolio Overview

A total of **43 unique controllers/repository endpoints** power the routes of Property, Trade, and Water.

| # | Controller | Module Scope | File Path | Route Count | Injected Dependencies |
|---|---|---|---|---|---|
| 1 | `CaretakerController` | Water | `app/Http/Controllers/CaretakerController.php` | 2 | `None` |
| 2 | `CitizenController` | Property | `app/Http/Controllers/CitizenController.php` | 3 | `iCitizenRepository $repository` |
| 3 | `JskController` | Property | `app/Http/Controllers/Dashboard/JskController.php` | 2 | `None` |
| 4 | `DemoController` | Water | `app/Http/Controllers/DemoController.php` | 1 | `None` |
| 5 | `TradeController` | Trade | `app/Http/Controllers/Mdm/TradeController.php` | 12 | `None` |
| 6 | `BankReconcillationController` | Property | `app/Http/Controllers/Payment/BankReconcillationController.php` | 6 | `None` |
| 7 | `CashVerificationController` | Property | `app/Http/Controllers/Payment/CashVerificationController.php` | 7 | `None` |
| 8 | `ActiveSafController` | Property | `app/Http/Controllers/Property/ActiveSafController.php` | 32 | `iSafRepository $saf_repository` |
| 9 | `ActiveSafControllerV2` | Property | `app/Http/Controllers/Property/ActiveSafControllerV2.php` | 10 | `None` |
| 10 | `ApplySafController` | Property | `app/Http/Controllers/Property/ApplySafController.php` | 2 | `None` |
| 11 | `CalculatorController` | Property | `app/Http/Controllers/Property/CalculatorController.php` | 3 | `iCalculatorRepository $iCalculatorRepository` |
| 12 | `ClusterController` | Property | `app/Http/Controllers/Property/ClusterController.php` | 11 | `iCluster $cluster` |
| 13 | `ConcessionController` | Property | `app/Http/Controllers/Property/ConcessionController.php` | 17 | `iConcessionRepository $concession_repository` |
| 14 | `DocumentOperationController` | Property | `app/Http/Controllers/Property/DocumentOperationController.php` | 1 | `iDocumentOperationRepo $DocumentOperationRepo` |
| 15 | `GbSafController` | Property | `app/Http/Controllers/Property/GbSafController.php` | 22 | `None` |
| 16 | `HoldingTaxController` | Property | `app/Http/Controllers/Property/HoldingTaxController.php` | 24 | `iSafRepository $safRepo` |
| 17 | `LocationController` | Property | `app/Http/Controllers/Property/LocationController.php` | 3 | `None` |
| 18 | `MasterReferenceController` | Property | `app/Http/Controllers/Property/MasterReferenceController.php` | 205 | `None` |
| 19 | `ObjectionController` | Property | `app/Http/Controllers/Property/ObjectionController.php` | 21 | `iObjectionRepository $objection` |
| 20 | `PropMaster` | Property | `app/Http/Controllers/Property/PropMaster.php` | 5 | `None` |
| 21 | `PropertyBifurcationController` | Property | `app/Http/Controllers/Property/PropertyBifurcationController.php` | 7 | `IPropertyBifurcation $Repository` |
| 22 | `PropertyController` | Property | `app/Http/Controllers/Property/PropertyController.php` | 10 | `iSafRepository $safRepo` |
| 23 | `PropertyDeactivateController` | Property | `app/Http/Controllers/Property/PropertyDeactivateController.php` | 12 | `IPropertyDeactivate $PropertyDeactivate, iSafRepository $saf_repository` |
| 24 | `PropertyDetailsController` | Property | `app/Http/Controllers/Property/PropertyDetailsController.php` | 9 | `iPropertyDetailsRepo $propertyDetails` |
| 25 | `RainWaterHarvestingController` | Property | `app/Http/Controllers/Property/RainWaterHarvestingController.php` | 22 | `None` |
| 26 | `ReportController` | Property | `app/Http/Controllers/Property/ReportController.php` | 40 | `IReport $TradeRepository` |
| 27 | `SafDocController` | Property | `app/Http/Controllers/Property/SafDocController.php` | 4 | `None` |
| 28 | `WaiverController` | Property | `app/Http/Controllers/Property/WaiverController.php` | 9 | `None` |
| 29 | `ZoneController` | Property | `app/Http/Controllers/Property/ZoneController.php` | 1 | `None` |
| 30 | `ReferenceController` | Property | `app/Http/Controllers/ReferenceController.php` | 38 | `None` |
| 31 | `ReportController` | Trade | `app/Http/Controllers/Trade/ReportController.php` | 20 | `IReport $TradeRepository` |
| 32 | `TradeApplication` | Trade | `app/Http/Controllers/Trade/TradeApplication.php` | 30 | `ITrade $TradeRepository` |
| 33 | `TradeCitizenController` | Trade | `app/Http/Controllers/Trade/TradeCitizenController.php` | 18 | `ITradeCitizen $TradeRepository` |
| 34 | `TradeNoticeController` | Trade | `app/Http/Controllers/Trade/TradeNoticeController.php` | 7 | `ITradeNotice $TradeRepository` |
| 35 | `ConsumerActionRequest` | Water | `app/Http/Controllers/Water/ConsumerActionRequest.php` | 5 | `None` |
| 36 | `NewConnectionController` | Water | `app/Http/Controllers/Water/NewConnectionController.php` | 43 | `iNewConnection $newConnection` |
| 37 | `WaterApplication` | Water | `app/Http/Controllers/Water/WaterApplication.php` | 8 | `IWaterNewConnection $Repository, iNewConnection $newConnection` |
| 38 | `WaterConsumer` | Water | `app/Http/Controllers/Water/WaterConsumer.php` | 20 | `IConsumer $Repository` |
| 39 | `WaterConsumerWfController` | Water | `app/Http/Controllers/Water/WaterConsumerWfController.php` | 26 | `None` |
| 40 | `WaterMasterController` | Water | `app/Http/Controllers/Water/WaterMasterController.php` | 10 | `iNewConnection $newConnection` |
| 41 | `WaterPaymentController` | Water | `app/Http/Controllers/Water/WaterPaymentController.php` | 16 | `None` |
| 42 | `WaterReportController` | Water | `app/Http/Controllers/Water/WaterReportController.php` | 8 | `None` |
| 43 | `WaterNewConnection` | Water | `app/Repository/Water/Concrete/WaterNewConnection.php` | 1 | `None` |

---

## 2. In-Depth Controller Analysis

### CaretakerController
- **Fully Qualified Namespace**: `App\Http\Controllers\CaretakerController`
- **File Location**: `app/Http/Controllers/CaretakerController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 2

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `caretakerConsumerTag` | `POST api/water/caretaker-consumer-tagging` | `Validator::make inline rules` | `Direct controller logic` | `WaterApprovalApplicant, WaterConsumer, ThirdPartyController, ActiveCitizenUndercare` | `responseMsgs() helper | Catch: Exception $e` |
| `waterCaretakerOtp` | `POST api/water/caretaker-otp` | `Request` | `Direct controller logic` | `WaterApprovalApplicant, WaterConsumer, ThirdPartyController, ActiveCitizenUndercare` | `responseMsgs() helper | Catch: Exception $e` |

---

### CitizenController
- **Fully Qualified Namespace**: `App\Http\Controllers\CitizenController`
- **File Location**: `app/Http/Controllers/CitizenController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3
- **Constructor Injections**: `iCitizenRepository $repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `citizenDetailsWithCitizenId` | `POST api/property/citizen/details` | `Request` | `Direct controller logic` | `\App\Models\Water\WaterConsumerDemand, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyCount` | `POST api/property/citizen/property-count` | `Request` | `Direct controller logic` | `TradeLicence, WaterConsumer, PropProperty | Tables: pet_approved_registrations, adv_agencies, adv_selfadvertisements (Conn: pgsql_fines, pgsql_tanker, pgsql_master, pgsql_advertisements)` | `responseMsgs() helper | Catch: \Exception $e` |
| `getAllAppliedApplications` | `GET|POST|HEAD api/property/citizens/applied-applications` | `Request` | `$this->Repository->getAllAppliedApplications()` | `None` | `Delegated return (Repository/Service/BLL)` |

---

### JskController
- **Fully Qualified Namespace**: `App\Http\Controllers\Dashboard\JskController`
- **File Location**: `app/Http/Controllers/Dashboard/JskController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 2
- **Traits Used**: `Workflow`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `propDashboard` | `POST api/property/dashboard` | `Request` | `Direct controller logic` | `PropActiveSaf, PropActiveHarvesting, WorkflowTrack, PropActiveObjection` | `responseMsgs() helper | Catch: Exception $e` |
| `propDashboardDtl` | `POST api/property/dashboard-details` | `Request` | `Direct controller logic` | `PropActiveSaf, PropTransaction, WfRoleusermap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |

---

### DemoController
- **Fully Qualified Namespace**: `App\Http\Controllers\DemoController`
- **File Location**: `app/Http/Controllers/DemoController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 1

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `waterConnection` | `POST api/water-connection` | `Request` | `Direct controller logic` | `User` | `Delegated return (Repository/Service/BLL)` |

---

### TradeController
- **Fully Qualified Namespace**: `App\Http\Controllers\Mdm\TradeController`
- **File Location**: `app/Http/Controllers/Mdm/TradeController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 12

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applicationType` | `POST api/trade/application-type` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `applicationTypeList` | `POST api/trade/application-type-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `categoryType` | `POST api/trade/category-type` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `categoryTypeList` | `POST api/trade/category-type-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `firmType` | `POST api/trade/firm-type` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `firmTypeList` | `POST api/trade/firm-type-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `itemType` | `POST api/trade/item-type` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `itemTypeList` | `POST api/trade/item-type-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `ownershipType` | `POST api/trade/ownership-type` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `ownershipTypeList` | `POST api/trade/ownership-type-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `rate` | `POST api/trade/rate` | `$request->validate inline` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `rateList` | `POST api/trade/rate-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |

---

### BankReconcillationController
- **Fully Qualified Namespace**: `App\Http\Controllers\Payment\BankReconcillationController`
- **File Location**: `app/Http/Controllers/Payment/BankReconcillationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 6

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `chequeClearance` | `POST api/property/cheque-clearance` | `Validator::make inline rules` | `Direct controller logic` | `PaymentReconciliation, ActiveTradeLicence, WaterApplication, PropProperty (Conn: pgsql_master, pgsql_water, pgsql_trade)` | `Delegated return (Repository/Service/BLL) | Catch: Exception $error` |
| `chequeDtlById` | `POST api/property/cheque-dtl-by-id` | `Validator::make inline rules` | `Direct controller logic` | `PropChequeDtl, TradeChequeDtl, WaterChequeDtl` | `Standard JSON | Catch: Exception $error` |
| `deactivateTransaction` | `POST api/property/deactivate-transaction` | `Validator::make inline rules` | `Direct controller logic` | `AdDirectApplicationAmount, TradeTransactionDeactivateDtl, AdTransactionDeactivateDtl, AdApplicationAmount (Conn: pgsql_advertisements, pgsql_master, pgsql_water, pgsql_trade)` | `responseMsgs() helper | Catch: Exception $e` |
| `tranDeactivatedList` | `POST api/property/deactivate-transaction-dtl` | `Validator::make inline rules` | `Direct controller logic` | `PropTransaction, WaterTransactionDeactivateDtl, PropTransactionDeactivateDtl, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `searchTransaction` | `POST api/property/search-transaction` | `Validator::make inline rules` | `Direct controller logic` | `PropTransaction, WaterTran, TradeTransaction` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $error` |
| `searchTransactionNo` | `POST api/property/search-transaction-no` | `Validator::make inline rules` | `Direct controller logic` | `PropTransaction, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |

---

### CashVerificationController
- **Fully Qualified Namespace**: `App\Http\Controllers\Payment\CashVerificationController`
- **File Location**: `app/Http/Controllers/Payment/CashVerificationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 7

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `cashReceipt` | `POST api/property/cash-receipt` | `$request->validate inline` | `Direct controller logic` | `UlbMaster` | `responseMsgs() helper | Catch: Exception $e` |
| `editChequeNo` | `POST api/property/edit-chequedtl` | `Validator::make inline rules` | `Direct controller logic` | `WaterChequeDtl, TradeChequeDtl, PropChequeDtl, TempTransaction (Conn: pgsql_master)` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `cashVerificationList` | `POST api/property/list-cash-verification` | `Request` | `Direct controller logic` | `TempTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `tcCollectionDtl` | `POST api/property/tc-collections` | `$request->validate inline` | `Direct controller logic` | `TempTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `verifiedCashVerificationList` | `POST api/property/verified-cash-verification` | `Request` | `Direct controller logic` | `RevDailycollection` | `responseMsgs() helper | Catch: Exception $e` |
| `verifiedTcCollectionDtl` | `POST api/property/verified-tc-collections` | `$request->validate inline` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `cashVerify` | `POST api/property/verify-cash` | `Request` | `Direct controller logic` | `PropTransaction, WaterTran, PrefixIdGenerator, TradeTransaction (Conn: pgsql_master, pgsql_water, pgsql_trade)` | `responseMsgs() helper | Catch: Exception $e` |

---

### ActiveSafController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ActiveSafController`
- **File Location**: `app/Http/Controllers/Property/ActiveSafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 32
- **Traits Used**: `Workflow`, `SAF`, `Razorpay`, `SafDetailsTrait`
- **Constructor Injections**: `iSafRepository $saf_repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `safDetails` | `POST api/property/saf-details` | `$request->validate inline` | `Direct controller logic` | `CustomDetail, PropActiveSaf, PropActiveSafsFloor, WorkflowMap` | `responseMsgs() helper | Catch: Exception $e` |
| `getSafVerificationList` | `POST api/property/saf/IndiVerificationsList` | `$request->validate inline` | `Direct controller logic` | `PropSafVerification` | `responseMsgs() helper | Catch: Exception $e` |
| `approvalRejectionSaf` | `POST api/property/saf/approvalrejection` | `$request->validate inline` | `new SafApprovalBll` | `PropActiveSaf, PropActiveSafsFloor, WfRoleusermap, PropActiveSafsOwner (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `backToCitizen` | `POST api/property/saf/back-to-citizen` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WorkflowTrack, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `btcInbox` | `POST api/property/saf/btc-inbox` | `Request` | `$this->Repository->getSaf()` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `calculateSafBySafId` | `POST api/property/saf/calculate-by-saf-id` | `Validator::make inline rules` | `new CalculateSafById` | `PropActiveSaf, PropSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `editSaf` | `POST api/property/saf/edit` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `postEscalate` | `POST api/property/saf/escalate` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/property/saf/escalate/inbox/{key?}` | `Request` | `$this->Repository->getSaf()` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `fieldVerifiedInbox` | `POST api/property/saf/field-verified-inbox` | `Request` | `$this->Repository->getSaf()` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `generateOrderId` | `POST api/property/saf/generate-order-id` | `$request->validate inline` | `Direct controller logic` | `PostRazorPayPenaltyRebate, PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `geoTagging` | `POST api/property/saf/geotagging` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, DocUpload, PropSafGeotagUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `getDemandBySafId` | `POST api/property/saf/get-demand-by-id` | `$request->validate inline` | `Direct controller logic` | `PropTransaction, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `getPropByHoldingNo` | `POST api/property/saf/get-prop-byholding` | `$request->validate inline` | `new \App\MicroServices\DocUpload` | `PropFloor, \App\Models\Workflows\WfActiveDocument, PropProperty, PropOwner (Conn: pgsql_water, pgsql_trade)` | `responseMsgs() helper | Catch: \Exception $e, \Exception $e` |
| `getTcVerifications` | `POST api/property/saf/get-tc-verifications` | `$request->validate inline` | `Direct controller logic` | `PropSafVerificationDtl, PropSafVerification, DocUpload, PropSafGeotagUpload | Tables: prop_rejected_safs, prop_safs, ulb_ward_masters` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/saf/inbox` | `Request` | `$this->Repository->getSaf()` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `commentIndependent` | `POST api/property/saf/independent-comment` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WorkflowTrack, WfRoleusermap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $rbEx` |
| `generateOrderId` | `POST api/property/saf/independent/generate-order-id` | `$request->validate inline` | `Direct controller logic` | `PostRazorPayPenaltyRebate, PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `masterSaf` | `GET|HEAD api/property/saf/master-saf` | `Request` | `Direct controller logic` | `RefPropRoadType, RefPropFloor, RefPropType, RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |
| `offlinePaymentSaf` | `POST api/property/saf/offline-saf-payment` | `Request` | `Direct controller logic` | `PropActiveSaf, PropTransaction, IdGeneration, PreviousHoldingDeactivation (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `outbox` | `POST api/property/saf/outbox` | `Request` | `$this->Repository->getSaf()` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `generatePaymentReceipt` | `POST api/property/saf/payment-receipt` | `Validator::make inline rules` | `new PaymentReceiptHelper` | `UlbMaster, PropTransaction, PropPenaltyrebate, PropSafsDemand` | `responseMsgs() helper | Catch: Exception $e` |
| `postNextLevel` | `POST api/property/saf/post/level` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WfRoleusermap, WorkflowTrack, WfWorkflow (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `getPropTransactions` | `GET|HEAD api/property/saf/prop-transactions` | `Request` | `$this->Repository->getPropTransByCitizenUserId()` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `getTransactionBySafPropId` | `POST api/property/saf/proptransaction-by-id` | `Request` | `Direct controller logic` | `PropTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `rejectedList` | `POST api/property/saf/rejected-inbox` | `Request` | `Direct controller logic` | `PropRejectedSaf` | `responseMsgs() helper | Catch: Exception $e, Exception $e` |
| `rejectedList` | `POST api/property/saf/rejected-list` | `Request` | `Direct controller logic` | `PropRejectedSaf` | `responseMsgs() helper | Catch: Exception $e, Exception $e` |
| `paymentSaf` | `POST api/property/saf/saf-payment` | `$request->validate inline` | `Direct controller logic` | `PropRazorpayPenalrebate, PropTransaction, PropActiveSaf, PropPenaltyrebate (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `siteVerification` | `POST api/property/saf/site-verification` | `Request` | `Direct controller logic` | `PropActiveSaf, WfRoleusermap, PropSafVerificationDtl, PropSafVerification` | `responseMsgs() helper | Catch: Exception $e` |
| `getStaticSafDetails` | `POST api/property/saf/static-saf-dtls` | `$request->validate inline` | `Direct controller logic` | `WfRole, PropActiveSaf, PropActiveSafsFloor, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `getVerifications` | `POST api/property/saf/verifications-comp` | `$request->validate inline` | `new SafCalculation, new \App\Repository\Property\Concrete\PropertyDeactivate` | `PropActiveSaf, PropSafVerificationDtl, PropSafVerification, DocUpload | Tables: prop_rejected_safs, prop_safs` | `responseMsgs() helper | Catch: Exception $e` |

---

### ActiveSafControllerV2
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ActiveSafControllerV2`
- **File Location**: `app/Http/Controllers/Property/ActiveSafControllerV2.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 10
- **Traits Used**: `SAF`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `clusterSafPayment` | `POST api/property/saf/cluster-saf-payment` | `Request` | `Direct controller logic` | `PropTransaction, IdGeneration, PropTranDtl, PropSafsDemand (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteCitizenSaf` | `POST api/property/saf/delete-citizen-saf` | `Request` | `Direct controller logic` | `PropActiveSaf, PropActiveSafsFloor, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `editCitizenSaf` | `POST api/property/saf/edit-citizen-saf` | `$request->validate inline` | `Direct controller logic` | `PropActiveSafsFloor, PropActiveSaf, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `getClusterSafDues` | `POST api/property/saf/get-cluster-saf-due` | `$request->validate inline` | `new PenaltyRebateCalculation` | `Cluster, PropActiveSaf, ActiveSafController, Clusters` | `responseMsgs() helper | Catch: Exception $e` |
| `getAptList` | `POST api/property/saf/list-apartment` | `$request->validate inline` | `Direct controller logic` | `PropApartmentDtl` | `responseMsgs() helper | Catch: Exception $e` |
| `memoReceipt` | `POST api/property/saf/memo-receipt` | `$request->validate inline` | `Direct controller logic` | `UlbMaster, PropProperty, PropSafMemoDtl, PropTax` | `responseMsgs() helper | Catch: Exception $e` |
| `pendingGeoTaggingList` | `POST api/property/saf/pending-geotagging-list` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `verifyHoldingNo` | `POST api/property/saf/verify-holding` | `Validator::make inline rules` | `Direct controller logic` | `PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `searchHolding` | `POST api/property/search-holding` | `$request->validate inline` | `Direct controller logic` | `PropOwner, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getAptList` | `POST api/property/v2/saf/list-apartment` | `$request->validate inline` | `Direct controller logic` | `PropApartmentDtl` | `responseMsgs() helper | Catch: Exception $e` |

---

### ApplySafController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ApplySafController`
- **File Location**: `app/Http/Controllers/Property/ApplySafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 2
- **Traits Used**: `SAF`, `Workflow`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applySafv1` | `POST api/property/saf/apply` | `Request` | `new SafCalculation, new EloquentAuthRepository, new CalculateSafById` | `PropActiveSaf, PropActiveSafsFloor, WfRoleusermap, PropActiveSafsOwner (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `applyGbSaf` | `POST api/property/saf/gb-apply` | `Request` | `new SafCalculation, new CalculateSafById` | `PropActiveSaf, PropActiveSafsFloor, PropActiveGbOfficer, PostSafPropTaxes (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |

---

### CalculatorController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\CalculatorController`
- **File Location**: `app/Http/Controllers/Property/CalculatorController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3
- **Constructor Injections**: `iCalculatorRepository $iCalculatorRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `calculator` | `POST api/property/calculatePropertyTax` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `dashboardDate` | `POST api/property/get-dashboard` | `Request` | `$this->Repository->getDashboardData()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `reviewCalculation` | `POST api/property/review-calculation` | `Request` | `new SafCalculation, new CalculateSafById` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |

---

### ClusterController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ClusterController`
- **File Location**: `app/Http/Controllers/Property/ClusterController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 11
- **Constructor Injections**: `iCluster $cluster`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `clusterBasicDtls` | `POST api/property/cluster/basic-details` | `$request->validate inline` | `Direct controller logic` | `Cluster` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteClusterData` | `POST api/property/cluster/delete-cluster-data` | `Request` | `Direct controller logic` | `Cluster` | `responseMsgs() helper | Catch: Exception $error` |
| `detailsByHolding` | `POST api/property/cluster/details-by-holding` | `$request->validate inline` | `Direct controller logic` | `PropProperty` | `responseMsgs() helper | Catch: Exception $error` |
| `editClusterDetails` | `POST api/property/cluster/edit-cluster-details` | `Validator::make inline rules, Custom validation helper: $this` | `Direct controller logic` | `Cluster` | `responseMsgs() helper | Catch: Exception $error` |
| `getAllClusters` | `POST api/property/cluster/get-all-clusters` | `Request` | `Direct controller logic` | `Cluster` | `responseMsgs() helper | Catch: Exception $error` |
| `getClusterById` | `POST api/property/cluster/get-cluster-by-id` | `$request->validate inline` | `Direct controller logic` | `Cluster, UlbWardMaster, PropActiveSaf, PropProperty` | `responseMsgs() helper | Catch: Exception $error` |
| `getSafBySafNo` | `POST api/property/cluster/get-saf-by-safno` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyByCluster` | `POST api/property/cluster/property-by-cluster` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method propertyByCluster not found in ClusterController) |
| `saveClusterDetails` | `POST api/property/cluster/save-cluster-details` | `Validator::make inline rules, Custom validation helper: $this` | `Direct controller logic` | `Cluster` | `responseMsgs() helper | Catch: Exception $error` |
| `saveHoldingInCluster` | `POST api/property/cluster/save-holding-in-cluster` | `$request->validate inline` | `Direct controller logic` | `Cluster, PropDemand, PropProperty` | `responseMsgs() helper | Catch: Exception $error` |
| `saveSafInCluster` | `POST api/property/cluster/save-saf-in-cluster` | `$request->validate inline` | `Direct controller logic` | `Cluster, PropActiveSaf, PropSafsDemand` | `responseMsgs() helper | Catch: Exception $error` |

---

### ConcessionController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ConcessionController`
- **File Location**: `app/Http/Controllers/Property/ConcessionController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 17
- **Traits Used**: `WorkflowTrait`, `Concession`, `SafDetailsTrait`
- **Constructor Injections**: `iConcessionRepository $concession_repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applyConcession` | `POST api/property/concession/apply-concession` | `$request->validate inline` | `Direct controller logic` | `PropProperty, WorkflowTrack, PrefixIdGenerator, WfWorkflow (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `approvalRejection` | `POST api/property/concession/approvalrejection` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropOwner, WorkflowTrack, PropActiveConcession (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `backToCitizen` | `POST api/property/concession/backtocitizen` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, PropActiveConcession (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `btcInbox` | `POST api/property/concession/btc-inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `commentIndependent` | `POST api/property/concession/comment-independent` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, PropActiveConcession (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `getDetailsById` | `POST api/property/concession/details` | `$request->validate inline` | `Direct controller logic` | `CustomDetail, WorkflowMap, PropFloor, PropOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `concessionDocList` | `POST api/property/concession/doc-list` | `Request` | `Direct controller logic` | `PropActiveConcession` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyReject` | `POST api/property/concession/doc-verify-reject` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropActiveConcession, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `escalateApplication` | `POST api/property/concession/escalate` | `$request->validate inline` | `Direct controller logic` | `PropActiveConcession` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocType` | `POST api/property/concession/get-doc-type` | `Request` | `Direct controller logic` | `RefRequiredDocument` | `responseMsgs() helper` |
| `getUploadedDocuments` | `POST api/property/concession/get-uploaded-documents` | `$request->validate inline` | `Direct controller logic` | `DocUpload, PropActiveConcession, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/concession/inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `postNextLevel` | `POST api/property/concession/next-level` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, WfWorkflow, PropActiveConcession, WfWorkflowrolemap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $rbEx` |
| `outbox` | `POST api/property/concession/outbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `getOwnerDetails` | `POST api/property/concession/owner-details` | `$request->validate inline` | `Direct controller logic` | `PropOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/property/concession/special-inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadDocument` | `POST api/property/concession/upload-document` | `$request->validate inline` | `Direct controller logic` | `DocUpload, PropActiveConcession, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |

---

### DocumentOperationController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\DocumentOperationController`
- **File Location**: `app/Http/Controllers/Property/DocumentOperationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 1
- **Constructor Injections**: `iDocumentOperationRepo $DocumentOperationRepo`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getAllDocuments` | `POST api/property/get-all-documents` | `Request` | `$this->DocumentOperationRepo->getAllDocuments()` | `None` | `Delegated return (Repository/Service/BLL)` |

---

### GbSafController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\GbSafController`
- **File Location**: `app/Http/Controllers/Property/GbSafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 22
- **Traits Used**: `SAF`, `SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `backToCitizen` | `POST api/property/gbsaf/back-to-citizen` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WorkflowTrack (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `btcInbox` | `POST api/property/gbsaf/btc-inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `gbSafDetails` | `POST api/property/gbsaf/details` | `$request->validate inline` | `Direct controller logic` | `CustomDetail, PropActiveSaf, PropActiveSafsFloor, WorkflowMap` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyReject` | `POST api/property/gbsaf/doc-verify-reject` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WfRoleusermap, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `approvalRejectionGbSaf` | `POST api/property/gbsaf/final-approve-reject` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, PropFloor, PropActiveSafsFloor, WfRoleusermap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `geoTagging` | `POST api/property/gbsaf/geo-tagging` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, DocUpload, PropSafGeotagUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocList` | `POST api/property/gbsaf/get-doc-list` | `Request` | `Direct controller logic` | `PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadedDocuments` | `POST api/property/gbsaf/get-uploaded-document` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/gbsaf/inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `fieldVerifiedInbox` | `POST api/property/gbsaf/inbox-field-verification` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `commentIndependent` | `POST api/property/gbsaf/independent-comment` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WorkflowTrack, WfRoleusermap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `postNextLevel` | `POST api/property/gbsaf/next-level` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WorkflowTrack, WfWorkflow, WfWorkflowrolemap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `outbox` | `POST api/property/gbsaf/outbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `postEscalate` | `POST api/property/gbsaf/post-escalate` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `siteVerification` | `POST api/property/gbsaf/site-verification` | `Request` | `Direct controller logic` | `PropActiveSaf, WfRoleusermap, PropSafVerificationDtl, PropSafVerification` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/property/gbsaf/special-inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `getStaticSafDetails` | `POST api/property/gbsaf/static-details` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, PropActiveGbOfficer, PropSafMemoDtl, PropActiveSafsFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `getTcVerifications` | `POST api/property/gbsaf/tc-verification` | `$request->validate inline` | `Direct controller logic` | `PropSafVerificationDtl, PropSafVerification, DocUpload, PropSafGeotagUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadDocument` | `POST api/property/gbsaf/upload-documents` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyGbListByKey` | `POST api/property/get-filter-property-details-gb` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getGbHoldingDues` | `POST api/property/get-gb-holding-dues` | `$request->validate inline` | `new PenaltyRebateCalculation` | `UlbMaster, WfRoleusermap, PropProperty, PropGbofficer` | `responseMsgs() helper | Catch: Exception $e` |
| `getGbPropByHoldingNo` | `POST api/property/saf/get-gb-prop-byholding` | `$request->validate inline` | `Direct controller logic` | `PropFloor, PropProperty, WaterConsumer, ActiveTradeLicence` | `responseMsgs() helper | Catch: Exception $e` |

---

### HoldingTaxController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\HoldingTaxController`
- **File Location**: `app/Http/Controllers/Property/HoldingTaxController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 24
- **Traits Used**: `SAF`, `Razorpay`, `SafDetailsTrait`
- **Constructor Injections**: `iSafRepository $safRepo`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `citizenPropWaterDtls` | `POST api/property/citizen/property-water-dtls` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: \Exception $e` |
| `clusterPaymentHistory` | `POST api/property/cluster/payment-history` | `$request->validate inline` | `Direct controller logic` | `PropTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `clusterPaymentReceipt` | `POST api/property/cluster/payment-receipt` | `Validator::make inline rules` | `new PaymentReceiptHelper` | `Cluster, PropPenaltyrebate, PropTransaction` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `generateDemandPdf` | `GET|HEAD api/property/demand-pdf/{propertyId}` | `Request` | `Direct controller logic` | `None | Tables: ulb_masters, prop_properties, prop_demands` | `responseMsgs() helper | Catch: Exception $e` |
| `generateOrderIdv1` | `POST api/property/generate-orderId` | `FormRequest: //` | `Direct controller logic` | `None` | `Standard JSON` |
| `generateOrderId` | `POST api/property/generate-prop-orderid` | `$request->validate inline` | `Direct controller logic` | `PostRazorPayPenaltyRebate, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getHoldingDues` | `POST api/property/get-holding-dues` | `$request->validate inline` | `new PenaltyRebateCalculation` | `UlbMaster, WfRoleusermap, PropProperty, PropOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `getHoldingImpDtls` | `POST api/property/get-holding-imp-dtls` | `Validator::make inline rules` | `Direct controller logic` | `None | Tables: prop_properties, prop_demands` | `responseMsgs() helper | Catch: Exception $e` |
| `getTransactionsByHoldingNo` | `POST api/property/get-tran-by-holding-no` | `Validator::make inline rules` | `Direct controller logic` | `None | Tables: prop_transactions, prop_properties` | `responseMsgs() helper | Catch: Exception $e` |
| `generateOrderId` | `POST api/property/independent/generate-prop-orderid` | `$request->validate inline` | `Direct controller logic` | `PostRazorPayPenaltyRebate, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getHoldingDues` | `POST api/property/independent/get-holding-dues` | `$request->validate inline` | `new PenaltyRebateCalculation` | `UlbMaster, WfRoleusermap, PropProperty, PropOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `initiatePayment` | `GET|HEAD api/property/initiate-payment/{propertyId}` | `Request` | `Direct controller logic` | `PostRazorPayPenaltyRebate, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `legacyPaymentHolding` | `POST api/property/legacy-payment-holding` | `$request->validate inline` | `Direct controller logic` | `PropProperty, WfActiveDocument, PropDemand, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `offlinePaymentHolding` | `POST api/property/offline-payment-holding` | `Request` | `Direct controller logic` | `PropTransaction, PropProperty, PropOwner, IdGeneration` | `responseMsgs() helper | Catch: Exception $e` |
| `paymentHolding` | `POST api/property/payment-holding` | `Request` | `Direct controller logic` | `PropRazorpayPenalrebate, PropTransaction, PropProperty, PropPenaltyrebate` | `responseMsgs() helper | Catch: Exception $e` |
| `comparativeDemand` | `POST api/property/prop-comparative-demand` | `Validator::make inline rules` | `new SafCalculation` | `UlbMaster, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyDues` | `POST api/property/prop-dues` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper, response()->json(), return response()` |
| `propPaymentHistory` | `POST api/property/prop-payment-history` | `$request->validate inline` | `Direct controller logic` | `PropTransaction, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `propPaymentReceipt` | `POST api/property/prop-payment-receipt` | `Validator::make inline rules` | `new PaymentReceiptHelper` | `UlbMaster, PropTransaction, PropPenaltyrebate, ActiveSafController` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `proUlbReceipt` | `POST api/property/prop-ulb-receipt` | `$request->validate inline` | `Direct controller logic` | `PropTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `propPaymentReceiptv1` | `POST api/property/prop-water-payment-receipt` | `Validator::make inline rules` | `new PaymentReceiptHelper` | `UlbMaster, PropTransaction, PropPenaltyrebate, ActiveSafController` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `clusterPayment` | `POST api/property/prop/cluster-payment` | `Request` | `Direct controller logic` | `PropTransaction, IdGeneration, PropTranDtl, PropAdjustment` | `responseMsgs() helper | Catch: Exception $e` |
| `getClusterHoldingDues` | `POST api/property/prop/get-cluster-holding-due` | `$request->validate inline` | `new PenaltyRebateCalculation` | `Cluster, PropAdvance, Clusters, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `generateHoldingDemand` | `POST api/property/v1/generate-holding-demand` | `$request->validate inline` | `Direct controller logic` | `YearlyDemandGeneration` | `responseMsgs() helper | Catch: Exception $e` |

---

### LocationController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\LocationController`
- **File Location**: `app/Http/Controllers/Property/LocationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `location_list` | `POST api/property/location` | `Validator::make inline rules` | `Direct controller logic` | `PropLocation` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `bindLocationWithWards` | `POST api/property/location/ward-list` | `Validator::make inline rules` | `Direct controller logic` | `UlbWardMaster` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `mapLevel1` | `POST api/property/map/level1` | `Request` | `Direct controller logic` | `UlbMaster, DataMap` | `responseMsgs() helper` |

---

### MasterReferenceController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\MasterReferenceController`
- **File Location**: `app/Http/Controllers/Property/MasterReferenceController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 205

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `addAboutUs` | `POST api/property/m-about-us-create` | `$request->validate inline` | `Direct controller logic` | `AboutUsDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteAboutUs` | `POST api/property/m-about-us-delete` | `$request->validate inline` | `Direct controller logic` | `AboutUsDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `aboutUsbyId` | `POST api/property/m-about-us-get-by-id` | `$request->validate inline` | `Direct controller logic` | `AboutUsDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `listAboutUs` | `POST api/property/m-about-us-list` | `Request` | `Direct controller logic` | `AboutUsDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `updateAboutUs` | `POST api/property/m-about-us-update` | `$request->validate inline` | `Direct controller logic` | `AboutUsDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `addActRule` | `POST api/property/m-act-rules-create` | `$request->validate inline` | `Direct controller logic` | `DocUpload, ActRule` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteActRule` | `POST api/property/m-act-rules-delete` | `$request->validate inline` | `Direct controller logic` | `ActRule` | `responseMsgs() helper | Catch: Exception $e` |
| `actRulebyId` | `POST api/property/m-act-rules-get-by-id` | `$request->validate inline` | `Direct controller logic` | `DocUpload, ActRule` | `responseMsgs() helper | Catch: Exception $e` |
| `listActRule` | `POST api/property/m-act-rules-list` | `Request` | `Direct controller logic` | `DocUpload, ActRule` | `responseMsgs() helper | Catch: Exception $e` |
| `updateActRule` | `POST api/property/m-act-rules-update` | `$request->validate inline` | `Direct controller logic` | `DocUpload, ActRule` | `responseMsgs() helper | Catch: Exception $e` |
| `addAdministrative` | `POST api/property/m-administrative-create` | `$request->validate inline` | `Direct controller logic` | `DocUpload, Administrative` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteAdministrative` | `POST api/property/m-administrative-delete` | `$request->validate inline` | `Direct controller logic` | `Administrative` | `responseMsgs() helper | Catch: Exception $e` |
| `administrativebyId` | `POST api/property/m-administrative-get-by-id` | `$request->validate inline` | `Direct controller logic` | `DocUpload, Administrative` | `responseMsgs() helper | Catch: Exception $e` |
| `listAdministrative` | `POST api/property/m-administrative-list` | `Request` | `Direct controller logic` | `DocUpload, Administrative` | `responseMsgs() helper | Catch: Exception $e` |
| `updateAdministrative` | `POST api/property/m-administrative-update` | `$request->validate inline` | `Direct controller logic` | `DocUpload, Administrative` | `responseMsgs() helper | Catch: Exception $e` |
| `addAnnouncement` | `POST api/property/m-announcement-create` | `$request->validate inline` | `Direct controller logic` | `Announcement` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteAnnouncementType` | `POST api/property/m-announcement-delete` | `$request->validate inline` | `Direct controller logic` | `Announcement` | `responseMsgs() helper | Catch: Exception $e` |
| `announcementTypebyId` | `POST api/property/m-announcement-get-by-id` | `$request->validate inline` | `Direct controller logic` | `Announcement` | `responseMsgs() helper | Catch: Exception $e` |
| `announcementList` | `POST api/property/m-announcement-list` | `Request` | `Direct controller logic` | `Announcement` | `responseMsgs() helper | Catch: Exception $e` |
| `updateAnnouncementType` | `POST api/property/m-announcement-update` | `$request->validate inline` | `Direct controller logic` | `Announcement` | `responseMsgs() helper | Catch: Exception $e` |
| `addapp` | `POST api/property/m-app-create` | `$request->validate inline` | `Direct controller logic` | `MMobileAppLink` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteapp` | `POST api/property/m-app-delete` | `$request->validate inline` | `Direct controller logic` | `MMobileAppLink` | `responseMsgs() helper | Catch: Exception $e` |
| `appbyId` | `POST api/property/m-app-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MMobileAppLink` | `responseMsgs() helper | Catch: Exception $e` |
| `appList` | `POST api/property/m-app-list` | `Request` | `Direct controller logic` | `MMobileAppLink` | `responseMsgs() helper | Catch: Exception $e` |
| `updateapp` | `POST api/property/m-app-update` | `$request->validate inline` | `Direct controller logic` | `MMobileAppLink` | `responseMsgs() helper | Catch: Exception $e` |
| `addAssetesv3` | `POST api/property/m-assets-create` | `$request->validate inline` | `Direct controller logic` | `MAsset, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteAssetesv3` | `POST api/property/m-assets-delete` | `$request->validate inline` | `Direct controller logic` | `MAsset` | `responseMsgs() helper | Catch: Exception $e` |
| `allListAssetesv3` | `POST api/property/m-assets-get` | `Request` | `Direct controller logic` | `MAsset, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `Assetesv3ById` | `POST api/property/m-assets-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MAsset, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `editAssetesv3` | `POST api/property/m-assets-update` | `$request->validate inline` | `Direct controller logic` | `MAsset, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `addCDesk` | `POST api/property/m-c-desk-create` | `$request->validate inline` | `Direct controller logic` | `CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteCDesk` | `POST api/property/m-c-desk-delete` | `$request->validate inline` | `Direct controller logic` | `CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `addCDeskDesc` | `POST api/property/m-c-desk-des-create` | `$request->validate inline` | `Direct controller logic` | `CitizenDeskDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteCDeskDesc` | `POST api/property/m-c-desk-des-delete` | `$request->validate inline` | `Direct controller logic` | `CitizenDeskDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `CDeskDescbyId` | `POST api/property/m-c-desk-des-get-by-id` | `$request->validate inline` | `Direct controller logic` | `CitizenDeskDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `updateCDeskDesc` | `POST api/property/m-c-desk-des-update` | `$request->validate inline` | `Direct controller logic` | `CitizenDeskDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `CDeskbyId` | `POST api/property/m-c-desk-get-by-id` | `$request->validate inline` | `Direct controller logic` | `CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `CDeskList` | `POST api/property/m-c-desk-list` | `Request` | `Direct controller logic` | `CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `updateCDesk` | `POST api/property/m-c-desk-update` | `$request->validate inline` | `Direct controller logic` | `CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `MCapitalValurRateById` | `POST api/property/m-capital-value-rate-get` | `$request->validate inline` | `Direct controller logic` | `MCapitalValueRate` | `responseMsgs() helper | Catch: Exception $e` |
| `allMCapitalValurRateList` | `POST api/property/m-capital-value-rate-list` | `Request` | `Direct controller logic` | `MCapitalValueRate` | `responseMsgs() helper | Catch: Exception $e` |
| `addContact` | `POST api/property/m-contact-create` | `$request->validate inline` | `Direct controller logic` | `Contact` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteContact` | `POST api/property/m-contact-delete` | `$request->validate inline` | `Direct controller logic` | `Contact` | `responseMsgs() helper | Catch: Exception $e` |
| `ContactbyId` | `POST api/property/m-contact-get-by-id` | `$request->validate inline` | `Direct controller logic` | `Contact` | `responseMsgs() helper | Catch: Exception $e` |
| `ContactList` | `POST api/property/m-contact-list` | `Request` | `Direct controller logic` | `Contact` | `responseMsgs() helper | Catch: Exception $e` |
| `updateContact` | `POST api/property/m-contact-update` | `$request->validate inline` | `Direct controller logic` | `Contact` | `responseMsgs() helper | Catch: Exception $e` |
| `dashboardData` | `POST api/property/m-dashboard-data` | `Request` | `new MEService` | `Department, MScheme, UsefulLink, CitizenDesk` | `responseMsgs() helper | Catch: Exception $e` |
| `dashboardSliderData` | `POST api/property/m-dashboard-slider-data` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteBlog` | `POST api/property/m-delete-blog` | `$request->validate inline` | `Direct controller logic` | `BlogPost` | `responseMsgs() helper | Catch: Exception $e` |
| `addDepartment` | `POST api/property/m-department-create` | `$request->validate inline` | `Direct controller logic` | `Department` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteDepartment` | `POST api/property/m-department-delete` | `$request->validate inline` | `Direct controller logic` | `Department` | `responseMsgs() helper | Catch: Exception $e` |
| `departmentbyId` | `POST api/property/m-department-get-by-id` | `$request->validate inline` | `Direct controller logic` | `Department` | `responseMsgs() helper | Catch: Exception $e` |
| `departmentList` | `POST api/property/m-department-list` | `Request` | `Direct controller logic` | `Department` | `responseMsgs() helper | Catch: Exception $e` |
| `updateDepartment` | `POST api/property/m-department-update` | `$request->validate inline` | `Direct controller logic` | `Department` | `responseMsgs() helper | Catch: Exception $e` |
| `addService` | `POST api/property/m-e-service-create` | `$request->validate inline` | `new MEService` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteService` | `POST api/property/m-e-service-delete` | `$request->validate inline` | `new MEService` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `ServicebyId` | `POST api/property/m-e-service-get-by-id` | `$request->validate inline` | `new MEService` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `ServiceList` | `POST api/property/m-e-service-list` | `Request` | `new MEService` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `updateService` | `POST api/property/m-e-service-update` | `$request->validate inline` | `new MEService` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `activeBlogsList` | `POST api/property/m-get-active-blog` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `blogById` | `POST api/property/m-get-blog-by-Id` | `$request->validate inline` | `Direct controller logic` | `BlogPost, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `addUserManualHeading` | `POST api/property/m-heading-create` | `$request->validate inline` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteUserManualHeading` | `POST api/property/m-heading-delete` | `$request->validate inline` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `addHeadingDescription` | `POST api/property/m-heading-description-create` | `$request->validate inline` | `Direct controller logic` | `UserManualHeadingDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteHeading` | `POST api/property/m-heading-description-delete` | `$request->validate inline` | `Direct controller logic` | `UserManualHeadingDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `userHeadingbyId` | `POST api/property/m-heading-description-get-by-id` | `$request->validate inline` | `Direct controller logic` | `UserManualHeadingDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `userHeadingList` | `POST api/property/m-heading-description-list` | `Request` | `Direct controller logic` | `UserManualHeadingDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `updateHeading` | `POST api/property/m-heading-description-update` | `$request->validate inline` | `Direct controller logic` | `UserManualHeadingDescription` | `responseMsgs() helper | Catch: Exception $e` |
| `userManualHeadingbyId` | `POST api/property/m-heading-get-by-id` | `$request->validate inline` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `userManualHeadingList` | `POST api/property/m-heading-list` | `Request` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `userManualHeadingListMaster` | `POST api/property/m-heading-list-master` | `Request` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `userManualHeadingListMasterDesc` | `POST api/property/m-heading-list-master-desc` | `$request->validate inline` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `updateUserManualHeading` | `POST api/property/m-heading-update` | `$request->validate inline` | `Direct controller logic` | `UserManualHeading` | `responseMsgs() helper | Catch: Exception $e` |
| `addImportantLink` | `POST api/property/m-important-link-create` | `$request->validate inline` | `Direct controller logic` | `ImportantLink` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteImportantLink` | `POST api/property/m-important-link-delete` | `$request->validate inline` | `Direct controller logic` | `ImportantLink` | `responseMsgs() helper | Catch: Exception $e` |
| `importantLinkbyId` | `POST api/property/m-important-link-get-by-id` | `$request->validate inline` | `Direct controller logic` | `ImportantLink` | `responseMsgs() helper | Catch: Exception $e` |
| `importantLinkList` | `POST api/property/m-important-link-list` | `Request` | `Direct controller logic` | `ImportantLink` | `responseMsgs() helper | Catch: Exception $e` |
| `updateImportantLink` | `POST api/property/m-important-link-update` | `$request->validate inline` | `Direct controller logic` | `ImportantLink` | `responseMsgs() helper | Catch: Exception $e` |
| `allBlogs` | `POST api/property/m-list-of-all-blog` | `Request` | `Direct controller logic` | `BlogPost, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `addnews` | `POST api/property/m-news-create` | `$request->validate inline` | `Direct controller logic` | `MNewsEvent` | `responseMsgs() helper | Catch: Exception $e` |
| `deletenews` | `POST api/property/m-news-delete` | `$request->validate inline` | `Direct controller logic` | `MNewsEvent` | `responseMsgs() helper | Catch: Exception $e` |
| `newsbyId` | `POST api/property/m-news-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MNewsEvent` | `responseMsgs() helper | Catch: Exception $e` |
| `newsList` | `POST api/property/m-news-list` | `Request` | `Direct controller logic` | `MNewsEvent` | `responseMsgs() helper | Catch: Exception $e` |
| `updatenews` | `POST api/property/m-news-update` | `$request->validate inline` | `Direct controller logic` | `MNewsEvent` | `responseMsgs() helper | Catch: Exception $e` |
| `addNotice` | `POST api/property/m-notice-create` | `$request->validate inline` | `Direct controller logic` | `ImportantNotice` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteNoticeType` | `POST api/property/m-notice-delete` | `$request->validate inline` | `Direct controller logic` | `ImportantNotice` | `responseMsgs() helper | Catch: Exception $e` |
| `noticeTypebyId` | `POST api/property/m-notice-get-by-id` | `$request->validate inline` | `Direct controller logic` | `ImportantNotice` | `responseMsgs() helper | Catch: Exception $e` |
| `noticeList` | `POST api/property/m-notice-list` | `Request` | `Direct controller logic` | `ImportantNotice` | `responseMsgs() helper | Catch: Exception $e` |
| `updateNoticeType` | `POST api/property/m-notice-update` | `$request->validate inline` | `Direct controller logic` | `ImportantNotice` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropBuildingRentalconstsById` | `POST api/property/m-prop-building-reantal-const-get` | `$request->validate inline` | `Direct controller logic` | `MPropBuildingRentalconst` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropBuildingRentalconstsList` | `POST api/property/m-prop-building-reantal-const-list` | `Request` | `Direct controller logic` | `MPropBuildingRentalconst` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropBuildingRentalRatesById` | `POST api/property/m-prop-building-reantal-rate-get` | `$request->validate inline` | `Direct controller logic` | `MPropBuildingRentalrate` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropBuildingRentalRatesList` | `POST api/property/m-prop-building-reantal-rate-list` | `Request` | `Direct controller logic` | `MPropBuildingRentalrate` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropCvRatesById` | `POST api/property/m-prop-cv-rate-get` | `$request->validate inline` | `Direct controller logic` | `MPropCvRate` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropCvRatesList` | `POST api/property/m-prop-cv-rate-list` | `Request` | `Direct controller logic` | `MPropCvRate` | `responseMsgs() helper | Catch: Exception $e` |
| `createForgeryType` | `POST api/property/m-prop-forgery-type-create` | `$request->validate inline` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteForgeryType` | `POST api/property/m-prop-forgery-type-delete` | `$request->validate inline` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `ForgeryTypebyId` | `POST api/property/m-prop-forgery-type-get` | `$request->validate inline` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `allForgeryTypelist` | `POST api/property/m-prop-forgery-type-list` | `Request` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateForgeryType` | `POST api/property/m-prop-forgery-type-update` | `$request->validate inline` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropMultiFactorById` | `POST api/property/m-prop-multi-factor-get` | `$request->validate inline` | `Direct controller logic` | `MPropMultiFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropMultiFactorList` | `POST api/property/m-prop-multi-factor-list` | `Request` | `Direct controller logic` | `MPropMultiFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropRentalValueById` | `POST api/property/m-prop-rental-value-get` | `$request->validate inline` | `Direct controller logic` | `MPropRentalValue` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropRentalValueList` | `POST api/property/m-prop-rental-value-list` | `Request` | `Direct controller logic` | `MPropRentalValue` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropRoadTypeById` | `POST api/property/m-prop-road-types-get` | `$request->validate inline` | `Direct controller logic` | `MPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropRoadTypeList` | `POST api/property/m-prop-road-types-list` | `Request` | `Direct controller logic` | `MPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `MPropVacantRentalrateById` | `POST api/property/m-prop-vacant-rentalrates-get` | `$request->validate inline` | `Direct controller logic` | `MPropVacantRentalrate` | `responseMsgs() helper | Catch: Exception $e` |
| `allMPropVacantRentalrateList` | `POST api/property/m-prop-vacant-rentalrates-list` | `Request` | `Direct controller logic` | `MPropVacantRentalrate` | `responseMsgs() helper | Catch: Exception $e` |
| `addQuickLink` | `POST api/property/m-quick-link-create` | `$request->validate inline` | `Direct controller logic` | `QuickLink` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteQuickLink` | `POST api/property/m-quick-link-delete` | `$request->validate inline` | `Direct controller logic` | `QuickLink` | `responseMsgs() helper | Catch: Exception $e` |
| `quickLinkbyId` | `POST api/property/m-quick-link-get-by-id` | `$request->validate inline` | `Direct controller logic` | `QuickLink` | `responseMsgs() helper | Catch: Exception $e` |
| `quickLinkList` | `POST api/property/m-quick-link-list` | `Request` | `Direct controller logic` | `QuickLink` | `responseMsgs() helper | Catch: Exception $e` |
| `updateQuickLink` | `POST api/property/m-quick-link-update` | `$request->validate inline` | `Direct controller logic` | `QuickLink` | `responseMsgs() helper | Catch: Exception $e` |
| `addscheme` | `POST api/property/m-scheme-create` | `$request->validate inline` | `Direct controller logic` | `MScheme` | `responseMsgs() helper | Catch: Exception $e` |
| `deletescheme` | `POST api/property/m-scheme-delete` | `$request->validate inline` | `Direct controller logic` | `MScheme` | `responseMsgs() helper | Catch: Exception $e` |
| `schemebyId` | `POST api/property/m-scheme-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MScheme` | `responseMsgs() helper | Catch: Exception $e` |
| `schemeList` | `POST api/property/m-scheme-list` | `Request` | `Direct controller logic` | `MScheme` | `responseMsgs() helper | Catch: Exception $e` |
| `updatescheme` | `POST api/property/m-scheme-update` | `$request->validate inline` | `Direct controller logic` | `MScheme` | `responseMsgs() helper | Catch: Exception $e` |
| `createSlider` | `POST api/property/m-slider-create` | `$request->validate inline` | `Direct controller logic` | `MSlider, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteSlider` | `POST api/property/m-slider-delete` | `$request->validate inline` | `Direct controller logic` | `MSlider` | `responseMsgs() helper | Catch: Exception $e` |
| `allSliderList` | `POST api/property/m-slider-get` | `Request` | `Direct controller logic` | `MSlider, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `sliderById` | `POST api/property/m-slider-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MSlider, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `updateSlider` | `POST api/property/m-slider-update` | `$request->validate inline` | `Direct controller logic` | `MSlider, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `storeBlogPost` | `POST api/property/m-store-blog-post` | `Validator::make inline rules` | `Direct controller logic` | `BlogPost, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `editBlog` | `POST api/property/m-update-blog` | `Validator::make inline rules` | `Direct controller logic` | `BlogPost, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `addUsefulLink` | `POST api/property/m-useful-link-create` | `$request->validate inline` | `Direct controller logic` | `UsefulLink` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteUsefulLink` | `POST api/property/m-useful-link-delete` | `$request->validate inline` | `Direct controller logic` | `UsefulLink` | `responseMsgs() helper | Catch: Exception $e` |
| `usefulLinkbyId` | `POST api/property/m-useful-link-get-by-id` | `$request->validate inline` | `Direct controller logic` | `UsefulLink` | `responseMsgs() helper | Catch: Exception $e` |
| `usefulLinkList` | `POST api/property/m-useful-link-list` | `Request` | `Direct controller logic` | `UsefulLink` | `responseMsgs() helper | Catch: Exception $e` |
| `updateUsefulLink` | `POST api/property/m-useful-link-update` | `$request->validate inline` | `Direct controller logic` | `UsefulLink` | `responseMsgs() helper | Catch: Exception $e` |
| `addWhatsNew` | `POST api/property/m-whats-new-create` | `$request->validate inline` | `Direct controller logic` | `MWhat` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteWhatsNew` | `POST api/property/m-whats-new-delete` | `$request->validate inline` | `Direct controller logic` | `MWhat` | `responseMsgs() helper | Catch: Exception $e` |
| `WhatsNewbyId` | `POST api/property/m-whats-new-get-by-id` | `$request->validate inline` | `Direct controller logic` | `MWhat` | `responseMsgs() helper | Catch: Exception $e` |
| `WhatsNewList` | `POST api/property/m-whats-new-list` | `Request` | `Direct controller logic` | `MWhat` | `responseMsgs() helper | Catch: Exception $e` |
| `updateWhatsNew` | `POST api/property/m-whats-new-update` | `$request->validate inline` | `Direct controller logic` | `MWhat` | `responseMsgs() helper | Catch: Exception $e` |
| `createConstructionType` | `POST api/property/ref-prop-construction-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteConstructionType` | `POST api/property/ref-prop-construction-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: Exception $e` |
| `constructiontypebyId` | `POST api/property/ref-prop-construction-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: Exception $e` |
| `allConstructiontypelist` | `POST api/property/ref-prop-construction-type-list` | `Request` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateConstructionType` | `POST api/property/ref-prop-construction-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: Exception $e` |
| `createFloorType` | `POST api/property/ref-prop-floor-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteFloorType` | `POST api/property/ref-prop-floor-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `floortypebyId` | `POST api/property/ref-prop-floor-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `allFloortypelist` | `POST api/property/ref-prop-floor-type-list` | `Request` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `updateFloorType` | `POST api/property/ref-prop-floor-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: Exception $e` |
| `createGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `GbBuildingtypebyId` | `POST api/property/ref-prop-gbbuilding-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `allGbBuildingtypelist` | `POST api/property/ref-prop-gbbuilding-type-list` | `Request` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `updateGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `createGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `GbPropUsagetypebyId` | `POST api/property/ref-prop-gbpropusage-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `allGbPropUsagetypelist` | `POST api/property/ref-prop-gbpropusage-type-list` | `Request` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `updateGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: Exception $e` |
| `createObjectionType` | `POST api/property/ref-prop-objection-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteObjectionType` | `POST api/property/ref-prop-objection-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: Exception $e` |
| `ObjectiontypebyId` | `POST api/property/ref-prop-objection-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: Exception $e` |
| `allObjectiontypelist` | `POST api/property/ref-prop-objection-type-list` | `Request` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateObjectionType` | `POST api/property/ref-prop-objection-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: Exception $e` |
| `createOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-create` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `OccupancyFactorbyId` | `POST api/property/ref-prop-occupancy-factor-get` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `allOccupancyFactorlist` | `POST api/property/ref-prop-occupancy-factor-list` | `Request` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `updateOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-update` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: Exception $e` |
| `createOccupancyType` | `POST api/property/ref-prop-occupancy-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteOccupancyType` | `POST api/property/ref-prop-occupancy-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: Exception $e` |
| `OccupancyTypebyId` | `POST api/property/ref-prop-occupancy-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: Exception $e` |
| `allOccupancyTypelist` | `POST api/property/ref-prop-occupancy-type-list` | `Request` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateOccupancyType` | `POST api/property/ref-prop-occupancy-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: Exception $e` |
| `createOwnershipType` | `POST api/property/ref-prop-ownership-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteOwnershipType` | `POST api/property/ref-prop-ownership-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: Exception $e` |
| `OwnershipTypebyId` | `POST api/property/ref-prop-ownership-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: Exception $e` |
| `allOwnershipTypelist` | `POST api/property/ref-prop-ownership-type-list` | `Request` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateOwnershipType` | `POST api/property/ref-prop-ownership-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: Exception $e` |
| `createPenaltyType` | `POST api/property/ref-prop-penalty-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: Exception $e` |
| `deletePenaltyType` | `POST api/property/ref-prop-penalty-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: Exception $e` |
| `PenaltyTypebyId` | `POST api/property/ref-prop-penalty-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: Exception $e` |
| `allPenaltyTypelist` | `POST api/property/ref-prop-penalty-type-list` | `Request` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: Exception $e` |
| `updatePenaltyType` | `POST api/property/ref-prop-penalty-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: Exception $e` |
| `createPropertyType` | `POST api/property/ref-prop-property-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: Exception $e` |
| `deletepropertyType` | `POST api/property/ref-prop-property-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyTypebyId` | `POST api/property/ref-prop-property-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: Exception $e` |
| `allpropertyTypelist` | `POST api/property/ref-prop-property-type-list` | `Request` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: Exception $e` |
| `updatePropertyType` | `POST api/property/ref-prop-property-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: Exception $e` |
| `createRebateType` | `POST api/property/ref-prop-rebate-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteRebateType` | `POST api/property/ref-prop-rebate-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: Exception $e` |
| `RebateTypebyId` | `POST api/property/ref-prop-rebate-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: Exception $e` |
| `allRebateTypelist` | `POST api/property/ref-prop-rebate-type-list` | `Request` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateRebateType` | `POST api/property/ref-prop-rebate-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: Exception $e` |
| `createRoadType` | `POST api/property/ref-prop-road-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteroadType` | `POST api/property/ref-prop-road-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `roadTypebyId` | `POST api/property/ref-prop-road-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `allroadTypelist` | `POST api/property/ref-prop-road-type-list` | `Request` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateroadType` | `POST api/property/ref-prop-road-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: Exception $e` |
| `createPropTransferMode` | `POST api/property/ref-prop-transfer-mode-create` | `$request->validate inline` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: Exception $e` |
| `deleteTransferMode` | `POST api/property/ref-prop-transfer-mode-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: Exception $e` |
| `TransferModebyId` | `POST api/property/ref-prop-transfer-mode-get` | `$request->validate inline` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: Exception $e` |
| `allTransferModelist` | `POST api/property/ref-prop-transfer-mode-list` | `Request` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: Exception $e` |
| `updateTransferMode` | `POST api/property/ref-prop-transfer-mode-update` | `$request->validate inline` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: Exception $e` |
| `createPropUsageType` | `POST api/property/ref-prop-usage-type-create` | `$request->validate inline` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |
| `deletePropUsageType` | `POST api/property/ref-prop-usage-type-delete` | `$request->validate inline` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |
| `PropUsageTypebyId` | `POST api/property/ref-prop-usage-type-get` | `$request->validate inline` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |
| `allPropUsageTypelist` | `POST api/property/ref-prop-usage-type-list` | `Request` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateUsageType` | `POST api/property/ref-prop-usage-type-update` | `$request->validate inline` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: Exception $e` |

---

### ObjectionController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ObjectionController`
- **File Location**: `app/Http/Controllers/Property/ObjectionController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 21
- **Traits Used**: `SafDoc`, `WorkflowTrait`, `Objection`, `SafDetailsTrait`
- **Constructor Injections**: `iObjectionRepository $objection`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `addMembers` | `POST api/property/objection/add-members` | `Request` | `Direct controller logic` | `PropProperty, PropActiveObjection, PrefixIdGenerator, WfWorkflow (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `applyObjection` | `POST api/property/objection/apply-objection` | `$request->validate inline` | `$this->Repository->applyObjection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `approvalRejection` | `POST api/property/objection/approvalrejection` | `$request->validate inline` | `new CalculatePropById` | `PropActiveObjectionDtl, PropFloor, WfRoleusermap, PropProperty (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `backToCitizen` | `POST api/property/objection/backtocitizen` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, PropActiveObjection (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $rbEx` |
| `btcInboxList` | `POST api/property/objection/btc-inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `citizenDocList` | `POST api/property/objection/citizen-doc-list` | `Request` | `Direct controller logic` | `RefRequiredDocument` | `responseMsgs() helper` |
| `citizenForgeryDocList` | `POST api/property/objection/citizen-forgery-doclist` | `Request` | `Direct controller logic` | `RefRequiredDocument` | `responseMsgs() helper` |
| `commentIndependent` | `POST api/property/objection/comment-independent` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, PropActiveObjection (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `getDetailsById` | `POST api/property/objection/details` | `$request->validate inline` | `Direct controller logic` | `PropActiveObjectionDtl, CustomDetail, PropFloor, WorkflowMap` | `responseMsgs() helper | Catch: Exception $e` |
| `objectionDocList` | `POST api/property/objection/doc-list` | `Request` | `Direct controller logic` | `PropActiveObjectionOwner, PropActiveObjection` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyReject` | `POST api/property/objection/doc-verify-reject` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropActiveObjection, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |
| `forgeryType` | `POST api/property/objection/forgery-type` | `Request` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadedDocuments` | `POST api/property/objection/get-uploaded-documents` | `$request->validate inline` | `Direct controller logic` | `DocUpload, PropActiveObjection, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/objection/inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `postNextLevel` | `POST api/property/objection/next-level` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack, PropActiveObjection, WfWorkflow, WfWorkflowrolemap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `objectionType` | `GET|HEAD api/property/objection/objection-type` | `Request` | `Direct controller logic` | `RefPropObjectionType` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `outbox` | `POST api/property/objection/outbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `ownerDetailById` | `POST api/property/objection/owner-detailById` | `Request` | `Direct controller logic` | `PropOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `postEscalate` | `POST api/property/objection/post-escalate` | `$request->validate inline` | `Direct controller logic` | `PropActiveObjection` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/property/objection/special-inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadDocument` | `POST api/property/objection/upload-document` | `$request->validate inline` | `Direct controller logic` | `DocUpload, PropActiveObjection, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e, \Throwable $e_rb` |

---

### PropMaster
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\PropMaster`
- **File Location**: `app/Http/Controllers/Property/PropMaster.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 5

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `propConstructionType` | `GET|HEAD api/property/prop-const-type` | `Request` | `Direct controller logic` | `RefPropConstructionType` | `Delegated return (Repository/Service/BLL)` |
| `propOccupancyType` | `GET|HEAD api/property/prop-occupancy-type` | `Request` | `Direct controller logic` | `RefPropOccupancyType` | `Delegated return (Repository/Service/BLL)` |
| `propPropertyType` | `GET|HEAD api/property/prop-property-type` | `Request` | `Direct controller logic` | `RefPropType` | `Delegated return (Repository/Service/BLL)` |
| `propRoadType` | `GET|HEAD api/property/prop-road-type` | `Request` | `Direct controller logic` | `RefPropRoadType` | `Delegated return (Repository/Service/BLL)` |
| `propUsageType` | `GET|HEAD api/property/prop-usage-type` | `Request` | `Direct controller logic` | `RefPropUsageType` | `Delegated return (Repository/Service/BLL)` |

---

### PropertyBifurcationController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\PropertyBifurcationController`
- **File Location**: `app/Http/Controllers/Property/PropertyBifurcationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 7
- **Constructor Injections**: `IPropertyBifurcation $Repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `addRecord` | `POST|GET|HEAD api/property/applyBifurcation/{id}` | `Request` | `$this->Repository->addRecord()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `inbox` | `POST api/property/bifurcationInbox` | `Request` | `$this->Repository->inbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `outbox` | `POST api/property/bifurcationOutbox` | `Request` | `$this->Repository->outbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `postNextLevel` | `POST api/property/bifurcationPostNext` | `Request` | `$this->Repository->postNextLevel()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `documentUpload` | `GET|POST|HEAD api/property/documentUpload/{id}` | `Request` | `$this->Repository->documentUpload()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `readSafDtls` | `GET|HEAD api/property/getSafDtls/{id}` | `Request` | `$this->Repository->readSafDtls()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `readHoldigbyNo` | `POST api/property/searchByHoldingNoBi` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |

---

### PropertyController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\PropertyController`
- **File Location**: `app/Http/Controllers/Property/PropertyController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 10
- **Constructor Injections**: `iSafRepository $safRepo`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `basicPropertyEdit` | `POST api/property/basic-edit` | `Request` | `Direct controller logic` | `PropOwner, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `caretakerOtp` | `POST api/property/caretaker-otp` | `Request` | `Direct controller logic` | `PropOwner, ThirdPartyController, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `caretakerPropertyTag` | `POST api/property/caretaker-property-tagging` | `$request->validate inline` | `Direct controller logic` | `ActiveCitizen, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `checkAmalgamation` | `POST api/property/check-amalgamation` | `Validator::make inline rules` | `Direct controller logic` | `HoldingTaxController, PropFloor, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `checkAmalgamationProperty` | `POST api/property/check-amalgamation-property` | `Validator::make inline rules` | `Direct controller logic` | `HoldingTaxController, PropFloor, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `CheckProperty` | `POST api/property/check-property` | `Validator::make inline rules` | `Direct controller logic` | `PropActiveSaf, HoldingTaxController, PropActiveHarvesting, PropActiveObjection` | `responseMsgs() helper | Catch: Exception $e` |
| `citizenHoldingSaf` | `POST api/property/citizen-holding-saf` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, ActiveCitizenUndercare, PropSaf, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `citizenStatusUpdate` | `POST api/property/citizen-status-update` | `Validator::make inline rules` | `Direct controller logic` | `ActiveCitizen, ActiveCitizenUndercare (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `getpropLatLong` | `POST api/property/getpropLatLong` | `$request->validate inline` | `Direct controller logic` | `PropDemand, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `masterHoldingData` | `POST api/property/master-holding-data` | `Request` | `Direct controller logic` | `ActiveSafController, PropFloor, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |

---

### PropertyDeactivateController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\PropertyDeactivateController`
- **File Location**: `app/Http/Controllers/Property/PropertyDeactivateController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 12
- **Constructor Injections**: `IPropertyDeactivate $PropertyDeactivate, iSafRepository $saf_repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `approvalRejection` | `POST api/property/approve-reject-deactivation-request` | `$request->validate inline` | `Direct controller logic` | `PropActiveDeactivationRequest, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `commentIndependent` | `POST api/property/commentIndependentPrpDeactivation` | `$request->validate inline` | `Direct controller logic` | `PropActiveDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `deactivatProperty` | `POST api/property/deactivationRequest` | `Request` | `$this->_REPOSITORY->deactivatProperty()` | `PropDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `readPorertyById` | `POST api/property/get-prop-dtl-for-deactivation` | `Request` | `$this->_SAF_REPOSITORY->getPropByHoldingNo()` | `PropActiveDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `readDeactivationReq` | `POST api/property/getDeactivationDtls` | `Request` | `$this->_REPOSITORY->readDeactivationReq()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getUplodedDocuments` | `POST api/property/getDocumentsPrpDeactivation` | `$request->validate inline` | `$this->_REPOSITORY->readDocumentPath()` | `PropActiveDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/inboxDeactivation` | `Request` | `$this->_REPOSITORY->inbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `outbox` | `POST api/property/outboxDeactivation` | `Request` | `$this->_REPOSITORY->outbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `postEscalate` | `POST api/property/postEscalateDeactivation` | `$request->validate inline` | `Direct controller logic` | `PropActiveDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `postNextLevel` | `POST api/property/postNextDeactivation` | `Request` | `Direct controller logic` | `WfWorkflow, PropActiveDeactivationRequest` | `responseMsgs() helper | Catch: Exception $e` |
| `readHoldigbyNo` | `POST api/property/searchByHoldingNo` | `Request` | `$this->_REPOSITORY->readHoldigbyNo()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `specialInbox` | `POST api/property/specialDeactivation` | `Request` | `$this->_REPOSITORY->specialInbox()` | `None` | `Delegated return (Repository/Service/BLL)` |

---

### PropertyDetailsController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\PropertyDetailsController`
- **File Location**: `app/Http/Controllers/Property/PropertyDetailsController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 9
- **Constructor Injections**: `iPropertyDetailsRepo $propertyDetails`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getUserDetails` | `POST api/property/active-application/get-user-details` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getOwnerDetailsInfo` | `POST api/property/details/get-owner-details` | `$request->validate inline` | `Direct controller logic` | `PropSaf, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getPropertyGeoTag` | `POST api/property/get-Property-Geo-Tags` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `applicationsListByKey` | `POST api/property/get-filter-application-details` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, PropObjection, PropActiveHarvesting, PropSaf` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyListByKey` | `POST api/property/get-filter-property-details` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `getListOfSaf` | `GET|HEAD api/property/get-list-saf` | `Request` | `Direct controller logic` | `PropActiveSaf` | `Delegated return (Repository/Service/BLL)` |
| `propertyListByKeyGrv` | `POST api/property/grievance/get-filter-property-details` | `$request->validate inline` | `Direct controller logic` | `WfRoleusermap, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyHoldingInfoWatsappChat` | `POST api/property/propertyHoldingInfoWatsappChat` | `$request->validate inline` | `Direct controller logic` | `PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `propertyPaymentStatusWatsappChat` | `POST api/property/propertyPaymentStatusWatsappChat` | `$request->validate inline` | `Direct controller logic` | `PropProperty | Tables: prop_transactions` | `responseMsgs() helper | Catch: Exception $e` |

---

### RainWaterHarvestingController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\RainWaterHarvestingController`
- **File Location**: `app/Http/Controllers/Property/RainWaterHarvestingController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 22
- **Traits Used**: `SAF`, `Workflow`, `Ward`, `SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getWardMasterData` | `GET|HEAD api/property/get-wardmaster-data` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $error` |
| `finalApprovalRejection` | `POST api/property/harvesting/approval-rejection` | `Validator::make inline rules` | `new CalculatePropById` | `WfRoleusermap, PropProperty, PropActiveHarvesting, WorkflowTrack (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `backToCitizen` | `POST api/property/harvesting/backtocitizen` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, WorkflowTrack, WfWorkflowrolemap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `btcInboxList` | `POST api/property/harvesting/btc-inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `citizenDocList` | `POST api/property/harvesting/citizen-doc-list` | `Request` | `Direct controller logic` | `RefRequiredDocument` | `responseMsgs() helper` |
| `commentIndependent` | `POST api/property/harvesting/comment-independent` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, WorkflowTrack, WfRoleusermap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `getDetailsById` | `POST api/property/harvesting/details-by-id` | `$request->validate inline` | `Direct controller logic` | `CustomDetail, WorkflowMap, PropFloor, WfRole` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyReject` | `POST api/property/harvesting/doc-verify-reject` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, WfRoleusermap, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `postEscalate` | `POST api/property/harvesting/escalate` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `fieldVerifiedInbox` | `POST api/property/harvesting/field-verification-inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocList` | `POST api/property/harvesting/get-doc-list` | `Request` | `Direct controller logic` | `PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `getTcVerifications` | `POST api/property/harvesting/get-tc-verifications` | `Request` | `Direct controller logic` | `PropActiveHarvesting, PropRwhVerification, PropHarvestingGeotagUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadedDocuments` | `POST api/property/harvesting/get-uploaded-documents` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `harvestingInbox` | `POST api/property/harvesting/inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `postNextLevel` | `POST api/property/harvesting/next-level` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, WorkflowTrack, WfWorkflow, WfWorkflowrolemap (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `harvestingOutbox` | `POST api/property/harvesting/outbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `rejectionOfHarvesting` | `POST api/property/harvesting/rejection` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `siteVerification` | `POST api/property/harvesting/site-verification` | `$request->validate inline` | `Direct controller logic` | `RefRequiredDocument, WfRoleusermap, PropActiveHarvesting, PropRwhVerification (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/property/harvesting/special-inbox` | `Request` | `Direct controller logic` | `WfWorkflowrolemap, PropActiveHarvesting` | `responseMsgs() helper | Catch: Exception $e` |
| `staticDetails` | `POST api/property/harvesting/static-details` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, PropHarvestingGeotagUpload, WfActiveDocument, DocUpload` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadDocument` | `POST api/property/harvesting/upload-document` | `$request->validate inline` | `Direct controller logic` | `PropActiveHarvesting, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `waterHarvestingApplication` | `POST api/property/water-harvesting-application` | `Validator::make inline rules` | `Direct controller logic` | `PropActiveHarvesting, WorkflowTrack, PrefixIdGenerator, WfWorkflow (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $error` |

---

### ReportController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ReportController`
- **File Location**: `app/Http/Controllers/Property/ReportController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 40
- **Traits Used**: `Auth`, `Report`
- **Constructor Injections**: `IReport $TradeRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `dashboardSummaryCards` | `POST api/property/dashboard-summary-cards` | `Request` | `Direct controller logic` | `None | Tables: users, district_masters, ulb_masters (Conn: pgsql_master)` | `responseMsgs() helper | Catch: \Exception $e` |
| `getLocality` | `POST api/property/geo` | `Request` | `Direct controller logic` | `None` | `response()->json(), return response()` |
| `liveDashboardData` | `POST api/property/live-dashboard-data` | `Request` | `Direct controller logic` | `None (Conn: pgsql_reports)` | `responseMsgs() helper | Catch: Exception $e` |
| `liveDashboardUpdate` | `POST api/property/live-dashboard-update` | `Request` | `new MplYearlyReport` | `None (Conn: pgsql_reports)` | `Delegated return (Repository/Service/BLL)` |
| `mplReportCollectionNew` | `POST api/property/report/mpl-todayCollection-new` | `Validator::make inline rules` | `Direct controller logic` | `PropTransaction, TradeTransaction, WaterTran` | `responseMsgs() helper | Catch: \Exception $e` |
| `ulbList` | `POST api/property/report/ulb-list` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: \Exception $e` |
| `dcbPieChart` | `POST api/property/reports/dcb-piechart` | `Validator::make inline rules` | `$this->Repository->dcbPieChart()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `listFY` | `POST api/property/reports/list-fy` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `mplReport` | `POST api/property/reports/mpl` | `Request` | `Direct controller logic` | `None (Conn: pgsql_reports)` | `responseMsgs() helper | Catch: Exception $e` |
| `mplReport2` | `POST api/property/reports/mpl2` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method mplReport2 not found in ReportController) |
| `notPaidFrom2016` | `POST api/property/reports/not-paid-from-2016` | `$request->validate inline` | `$this->Repository->notPaidFrom2016()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `oldHolding` | `POST api/property/reports/oldHolding` | `$request->validate inline` | `Direct controller logic` | `PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `PaymentModeWiseSummery` | `POST api/property/reports/payment-mode-wise-summery` | `Validator::make inline rules` | `$this->Repository->PropPaymentModeWiseSummery()` | `None` | `responseMsgs() helper` |
| `previousYearPaidButnotCurrentYear` | `POST api/property/reports/previous-year-paid-not-current-year` | `$request->validate inline` | `$this->Repository->previousYearPaidButnotCurrentYear()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `bulkReceipt` | `POST api/property/reports/print-bulk-receipt` | `$request->validate inline` | `Direct controller logic` | `HoldingTaxController, ActiveSafController, PropTransaction` | `responseMsgs() helper | Catch: Exception $e` |
| `propSafCollection` | `POST api/property/reports/prop/saf/collection` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `collectionReport` | `POST api/property/reports/property/collection` | `$request->validate inline` | `$this->Repository->collectionReport()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PropDCB` | `POST api/property/reports/property/dcb` | `$request->validate inline` | `$this->Repository->PropDCB()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PropDeactedList` | `POST api/property/reports/property/deactivated-list` | `$request->validate inline` | `$this->Repository->PropDeactedList()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `gbSafCollection` | `POST api/property/reports/property/gbsaf-collection` | `$request->validate inline` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `gbsafIndividualDemandCollection` | `POST api/property/reports/property/gbsaf-individual-demand-collection` | `$request->validate inline` | `$this->Repository->gbsafIndividualDemandCollection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PropFineRebate` | `POST api/property/reports/property/holding-wise-fine-rebate` | `$request->validate inline` | `$this->Repository->PropFineRebate()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `propIndividualDemandCollection` | `POST api/property/reports/property/individual-demand-collection` | `$request->validate inline` | `$this->Repository->propIndividualDemandCollection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PropPaymentModeWiseSummery` | `POST api/property/reports/property/payment-mode-wise-summery` | `$request->validate inline` | `$this->Repository->PropPaymentModeWiseSummery()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `safPropIndividualDemandAndCollection` | `POST api/property/reports/property/prop-saf-individual-demand-collection` | `$request->validate inline` | `$this->Repository->safPropIndividualDemandAndCollection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PropWardWiseDCB` | `POST api/property/reports/property/ward-wise-dcb` | `$request->validate inline` | `$this->Repository->PropWardWiseDCB()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `rebateNpenalty` | `POST api/property/reports/rebate/penalty` | `Request` | `$this->Repository->rebateNpenalty()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `safCollection` | `POST api/property/reports/saf/collection` | `$request->validate inline` | `$this->Repository->safCollection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelformdetail` | `POST api/property/reports/saf/levelformdetail` | `$request->validate inline` | `$this->Repository->levelformdetail()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelUserPending` | `POST api/property/reports/saf/leveluserpending` | `$request->validate inline` | `$this->Repository->levelUserPending()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelwisependingform` | `POST api/property/reports/saf/levelwisependingform` | `Request` | `$this->Repository->levelwisependingform()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `SafPaymentModeWiseSummery` | `POST api/property/reports/saf/payment-mode-wise-summery` | `$request->validate inline` | `$this->Repository->SafPaymentModeWiseSummery()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `safSamFamGeotagging` | `POST api/property/reports/saf/saf-sam-fam-geotagging` | `$request->validate inline` | `$this->Repository->safSamFamGeotagging()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `userWiseWardWireLevelPending` | `POST api/property/reports/saf/userWiseWardWireLevelPending` | `$request->validate inline` | `$this->Repository->userWiseWardWireLevelPending()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `userWiseLevelPending` | `POST api/property/reports/saf/userwiselevelpending` | `$request->validate inline` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `wardWiseHoldingReport` | `POST api/property/reports/ward-wise-holding` | `Request` | `Direct controller logic` | `PropDemand` | `responseMsgs() helper` |
| `rolesByUlbAndModule` | `POST api/property/roles-by-ulb-module` | `Request` | `Direct controller logic` | `None` | `Standard JSON` |
| `todayCollectionDashboard` | `POST api/property/today-collection-dashboard` | `$request->validate inline` | `Direct controller logic` | `None` | `response()->json(), return response() | Catch: \Throwable $e, \Exception $e` |
| `ulbModuleRoleCount` | `POST api/property/ulb-module-role-count-dashboard` | `Request` | `Direct controller logic` | `None (Conn: pgsql_master)` | `response()->json(), return response() | Catch: Exception $e` |
| `ulbWiseApplicationCount` | `POST api/property/ulb-wise-count-dashboard` | `Request` | `Direct controller logic` | `None (Conn: pgsql_reports)` | `responseMsgs() helper | Catch: \Exception $e` |

---

### SafDocController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\SafDocController`
- **File Location**: `app/Http/Controllers/Property/SafDocController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 4
- **Traits Used**: `SafDoc`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `docVerifyReject` | `POST api/property/saf/doc-verify-reject` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, WfRoleusermap, WfDocument, FacadesConfig (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `docUpload` | `POST api/property/saf/document-upload` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, DocUpload, FacadesConfig, WfActiveDocument (Conn: pgsql_master)` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocList` | `POST api/property/saf/get-doc-list` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadDocuments` | `POST api/property/saf/get-uploaded-documents` | `$request->validate inline` | `Direct controller logic` | `PropActiveSaf, FacadesConfig, PropSaf, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaiverController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\WaiverController`
- **File Location**: `app/Http/Controllers/Property/WaiverController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 9
- **Traits Used**: `WaiverTrait`, `SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applicationDetails` | `POST api/property/waiver/application-detail` | `Validator::make inline rules` | `Direct controller logic` | `WorkflowMap, CustomDetail, PropActiveSaf, PropProperty` | `responseMsgs() helper | Catch: Exception $e` |
| `apply` | `POST api/property/waiver/apply` | `Validator::make inline rules` | `Direct controller logic` | `PrefixIdGenerator, WfWorkflow, PropActiveWaiver` | `responseMsgs() helper | Catch: Exception $e` |
| `approvedApplication` | `POST api/property/waiver/approved-list` | `Request` | `Direct controller logic` | `PropActiveWaiver` | `responseMsgs() helper | Catch: Exception $e` |
| `approvalRejection` | `POST api/property/waiver/final-approval` | `$request->validate inline` | `Direct controller logic` | `PropActiveWaiver, WorkflowTrack, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `finalWaivedAmount` | `POST api/property/waiver/final-waived` | `Validator::make inline rules` | `Direct controller logic` | `PropActiveWaiver` | `responseMsgs() helper | Catch: Exception $e` |
| `inbox` | `POST api/property/waiver/list-inbox` | `Request` | `Direct controller logic` | `WfWardUser, WfWorkflowrolemap, PropActiveWaiver, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `staticDetails` | `POST api/property/waiver/static-details` | `$request->validate inline` | `Direct controller logic` | `PropActiveWaiver` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadedDocuments` | `POST api/property/waiver/uploaded-documents` | `$request->validate inline` | `Direct controller logic` | `PropActiveWaiver, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyReject` | `POST api/property/waiver/verify-document` | `$request->validate inline` | `Direct controller logic` | `PropActiveWaiver, WfRoleusermap, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |

---

### ZoneController
- **Fully Qualified Namespace**: `App\Http\Controllers\Property\ZoneController`
- **File Location**: `app/Http/Controllers/Property/ZoneController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 1

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getZoneByUlb` | `POST api/property/get-zone-byUlb` | `Request` | `Direct controller logic` | `ZoneMaster` | `responseMsgs() helper | Catch: Exception $e` |

---

### ReferenceController
- **Fully Qualified Namespace**: `App\Http\Controllers\ReferenceController`
- **File Location**: `app/Http/Controllers/ReferenceController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 38

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `listBuildingRentalconst` | `POST api/property/building-rental-const` | `Request` | `Direct controller logic` | `MPropBuildingRentalconst` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropBuildingRentalrate` | `POST api/property/building-rental-rate` | `Request` | `Direct controller logic` | `MPropBuildingRentalrate` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropFloor` | `POST api/property/floor-type` | `Request` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropgbBuildingUsagetype` | `POST api/property/gb-building-usage-type` | `Request` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropgbPropUsagetype` | `POST api/property/gb-prop-usage-type` | `Request` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropConstructiontype` | `POST api/property/get-construction-list` | `Request` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listpropForgeryType` | `POST api/property/get-forgery-type` | `Request` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listProptype` | `POST api/property/get-prop-type` | `Request` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRentalValue` | `POST api/property/get-rental-value` | `Request` | `Direct controller logic` | `MPropRentalValue` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropObjectiontype` | `POST api/property/prop-objection-type` | `Request` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOccupancyFactor` | `POST api/property/prop-occupancy-factor` | `Request` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOccupancytype` | `POST api/property/prop-occupancy-type` | `Request` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOwnershiptype` | `POST api/property/prop-ownership-type` | `Request` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropPenaltytype` | `POST api/property/prop-penalty-type` | `Request` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRebatetype` | `POST api/property/prop-rebate-type` | `Request` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRoadtype` | `POST api/property/prop-road-type` | `Request` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropTransfermode` | `POST api/property/prop-transfer-mode` | `Request` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropUsagetype` | `POST api/property/prop-usage-type` | `Request` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listBuildingRentalconst` | `POST api/property/v1/building-rental-const` | `Request` | `Direct controller logic` | `MPropBuildingRentalconst` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropBuildingRentalrate` | `POST api/property/v1/building-rental-rate` | `Request` | `Direct controller logic` | `MPropBuildingRentalrate` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropFloor` | `POST api/property/v1/floor-type` | `Request` | `Direct controller logic` | `RefPropFloor` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropgbBuildingUsagetype` | `POST api/property/v1/gb-building-usage-type` | `Request` | `Direct controller logic` | `RefPropGbbuildingusagetype` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropgbPropUsagetype` | `POST api/property/v1/gb-prop-usage-type` | `Request` | `Direct controller logic` | `RefPropGbpropusagetype` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropConstructiontype` | `POST api/property/v1/get-construction-list` | `Request` | `Direct controller logic` | `RefPropConstructionType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listpropForgeryType` | `POST api/property/v1/get-forgery-type` | `Request` | `Direct controller logic` | `MPropForgeryType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listProptype` | `POST api/property/v1/get-prop-type` | `Request` | `Direct controller logic` | `RefPropType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRentalValue` | `POST api/property/v1/get-rental-value` | `Request` | `Direct controller logic` | `MPropRentalValue` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropObjectiontype` | `POST api/property/v1/prop-objection-type` | `Request` | `Direct controller logic` | `RefPropObjectionType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOccupancyFactor` | `POST api/property/v1/prop-occupancy-factor` | `Request` | `Direct controller logic` | `RefPropOccupancyFactor` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOccupancytype` | `POST api/property/v1/prop-occupancy-type` | `Request` | `Direct controller logic` | `RefPropOccupancyType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropOwnershiptype` | `POST api/property/v1/prop-ownership-type` | `Request` | `Direct controller logic` | `RefPropOwnershipType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropPenaltytype` | `POST api/property/v1/prop-penalty-type` | `Request` | `Direct controller logic` | `RefPropPenaltyType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRebatetype` | `POST api/property/v1/prop-rebate-type` | `Request` | `Direct controller logic` | `RefPropRebateType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropRoadtype` | `POST api/property/v1/prop-road-type` | `Request` | `Direct controller logic` | `RefPropRoadType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropTransfermode` | `POST api/property/v1/prop-transfer-mode` | `Request` | `Direct controller logic` | `RefPropTransferMode` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropUsagetype` | `POST api/property/v1/prop-usage-type` | `Request` | `Direct controller logic` | `RefPropUsageType` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropVacantRentalrate` | `POST api/property/v1/vacant-rental-rate` | `Request` | `Direct controller logic` | `MPropVacantRentalrate` | `responseMsgs() helper | Catch: \Exception $e` |
| `listPropVacantRentalrate` | `POST api/property/vacant-rental-rate` | `Request` | `Direct controller logic` | `MPropVacantRentalrate` | `responseMsgs() helper | Catch: \Exception $e` |

---

### ReportController
- **Fully Qualified Namespace**: `App\Http\Controllers\Trade\ReportController`
- **File Location**: `app/Http/Controllers/Trade/ReportController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 20
- **Traits Used**: `Auth`
- **Constructor Injections**: `IReport $TradeRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applicationAgentNotice` | `POST api/trade/application/application-agent-notice` | `$request->validate inline` | `$this->Repository->applicationAgentNotice()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `applicationStatus` | `POST api/trade/application/application-status` | `$request->validate inline` | `$this->Repository->applicationStatus()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `bulkPaymentRecipt` | `POST api/trade/application/bulk-payment-recipt` | `$request->validate inline` | `$this->Repository->bulkPaymentRecipt()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `CollectionReports` | `POST api/trade/application/collection-reports` | `$request->validate inline` | `$this->Repository->CollectionReports()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `CollectionSummary` | `POST api/trade/application/collection-summary` | `$request->validate inline` | `$this->Repository->CollectionSummary()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelformdetail` | `POST api/trade/application/levelformdetail` | `$request->validate inline` | `$this->Repository->levelformdetail()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelUserPending` | `POST api/trade/application/leveluserpending` | `$request->validate inline` | `$this->Repository->levelUserPending()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `levelwisependingform` | `POST api/trade/application/levelwisependingform` | `Request` | `$this->Repository->levelwisependingform()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `noticeSummary` | `POST api/trade/application/notice-summary` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method noticeSummary not found in ReportController) |
| `teamSummary` | `POST api/trade/application/team-summary` | `$request->validate inline` | `$this->Repository->teamSummary()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `ApplicantionTrackStatus` | `POST api/trade/application/track-status` | `$request->validate inline` | `$this->Repository->ApplicantionTrackStatus()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `userWiseWardWiseLevelPending` | `POST api/trade/application/userWiseWardWiseLevelPending` | `$request->validate inline` | `$this->Repository->userWiseWardWiseLevelPending()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `userWiseLevelPending` | `POST api/trade/application/userwiselevelpending` | `$request->validate inline` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `valideAndExpired` | `POST api/trade/application/valid-expire-list` | `$request->validate inline` | `$this->Repository->valideAndExpired()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `tradeDaseboard` | `POST api/trade/dashboard` | `$request->validate inline` | `$this->Repository->tradeDaseboard()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `applicationTypeCollection` | `POST api/trade/dashboard-application-collection` | `$request->validate inline` | `$this->Repository->applicationTypeCollection()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `userAppliedApplication` | `POST api/trade/dashboard-applied-application` | `$request->validate inline` | `$this->Repository->userAppliedApplication()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `collectionPerfomance` | `POST api/trade/dashboard-collection-perfomance` | `$request->validate inline` | `$this->Repository->collectionPerfomance()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `TcList` | `POST api/trade/tc-list` | `Request` | `Direct controller logic` | `None | Tables: users` | `responseMsgs() helper | Catch: Exception $e` |
| `WardList` | `POST api/trade/ward-list` | `Request` | `Direct controller logic` | `UlbWardMaster` | `responseMsgs() helper | Catch: Exception $e` |

---

### TradeApplication
- **Fully Qualified Namespace**: `App\Http\Controllers\Trade\TradeApplication`
- **File Location**: `app/Http/Controllers/Trade/TradeApplication.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 30
- **Traits Used**: `TradeTrait`
- **Constructor Injections**: `ITrade $TradeRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applyApplication` | `POST api/trade/application/add` | `Request` | `$this->_REPOSITORY->addRecord()` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `approveReject` | `POST api/trade/application/approve-reject` | `$request->validate inline` | `Direct controller logic` | `UlbMaster, WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |
| `approvedApplication` | `POST api/trade/application/approved-list` | `Request` | `$this->_REPOSITORY->approvedApplication()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `backToCitizen` | `POST api/trade/application/btc` | `$request->validate inline` | `Direct controller logic` | `WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |
| `btcInbox` | `POST api/trade/application/btc-inbox` | `Request` | `$this->_REPOSITORY->btcInbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getDocList` | `POST api/trade/application/doc-list` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper` |
| `documentVerify` | `POST api/trade/application/document-verify` | `$request->validate inline` | `Direct controller logic` | `WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getLicenceDtl` | `POST api/trade/application/dtl-by-id` | `Validator::make inline rules` | `$this->_REPOSITORY->readLicenceDtl()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `updateBasicDtl` | `POST api/trade/application/edit` | `Request` | `$this->_REPOSITORY->updateBasicDtl()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `updateLicenseBo` | `POST api/trade/application/edit-by-id` | `Request` | `$this->_REPOSITORY->updateLicenseBo()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `postEscalate` | `POST api/trade/application/escalate` | `Request` | `$this->_REPOSITORY->postEscalate()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `specialInbox` | `POST api/trade/application/escalate-inbox` | `Request` | `$this->_REPOSITORY->specialInbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `paybleAmount` | `POST api/trade/application/get-demand` | `Request` | `$this->_REPOSITORY->getPaybleAmount()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `readIndipendentComment` | `POST api/trade/application/get-independent-comment` | `Request` | `$this->_REPOSITORY->readIndipendentComment()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `inbox` | `POST api/trade/application/inbox` | `Request` | `$this->_REPOSITORY->inbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `addIndependentComment` | `POST api/trade/application/independent-comment` | `Request` | `$this->_REPOSITORY->addIndependentComment()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `readApplication` | `POST api/trade/application/list` | `Validator::make inline rules` | `$this->_REPOSITORY->readApplication()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `outbox` | `POST api/trade/application/outbox` | `Request` | `$this->_REPOSITORY->outbox()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `PaymentCounter` | `POST api/trade/application/pay-charge` | `Request` | `$this->_REPOSITORY->paymentCounter()` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `postNextLevel` | `POST api/trade/application/post-next` | `$request->validate inline` | `Direct controller logic` | `WfWorkflow, WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |
| `searchLicence` | `POST api/trade/application/search-for-renew` | `Request` | `$this->_REPOSITORY->searchLicenceByNo()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `uploadDocument` | `POST api/trade/application/upload-document` | `Validator::make inline rules, $request->validate inline` | `Direct controller logic` | `documents, UlbMaster, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadDocuments` | `POST api/trade/appliction/documents` | `$request->validate inline` | `Direct controller logic` | `DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getApplyData` | `POST api/trade/getApplyData` | `Validator::make inline rules` | `$this->_REPOSITORY->getLicenceById()` | `TradeLicence` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `licenceCertificate` | `GET|HEAD api/trade/license-certificate/{id}` | `Validator::make inline rules` | `$this->_REPOSITORY->licenceCertificate()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getDenialDetails` | `POST api/trade/notice/details` | `Request` | `$this->_REPOSITORY->readDenialdtlbyNoticno()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `paymentReceipt` | `GET|HEAD api/trade/payment-receipt/{id}/{transectionId}` | `Validator::make inline rules` | `$this->_REPOSITORY->readPaymentReceipt()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `validateHoldingNo` | `POST api/trade/property/by-holding` | `Request` | `$this->_REPOSITORY->isvalidateHolding()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `provisionalCertificate` | `GET|HEAD api/trade/provisional-certificate/{id}` | `Validator::make inline rules` | `$this->_REPOSITORY->provisionalCertificate()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `workflowDashordDetails` | `POST api/trade/workflow/dashboard-data` | `Request` | `$this->_REPOSITORY->inbox()` | `WfWorkflow, WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |

---

### TradeCitizenController
- **Fully Qualified Namespace**: `App\Http\Controllers\Trade\TradeCitizenController`
- **File Location**: `app/Http/Controllers/Trade/TradeCitizenController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 18
- **Traits Used**: `Auth`, `Razorpay`
- **Constructor Injections**: `ITradeCitizen $TradeRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getOwnerDetailsInfo` | `POST api/trade/application-search/get-owner-details` | `$request->validate inline` | `Direct controller logic` | `TradeLicence` | `responseMsgs() helper | Catch: Exception $e` |
| `amendmentList` | `POST api/trade/application/amendable-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `readAtachedLicenseDtl` | `POST api/trade/application/attached-list` | `Request` | `Direct controller logic` | `ActiveCitizenUndercare` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `applyApplication` | `POST api/trade/application/citizen-add` | `Request` | `$this->_REPOSITORY->addRecord()` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `citizenApplication` | `POST api/trade/application/citizen-application` | `Request` | `$this->_REPOSITORY->citizenApplication()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `citizenApplicationByCitizenId` | `POST api/trade/application/citizen-application-list` | `Request` | `$this->_REPOSITORY->citizenApplicationByCitizenId()` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `readCitizenLicenceDtl` | `POST api/trade/application/citizen-by-id` | `$request->validate inline` | `$this->_REPOSITORY->readCitizenLicenceDtl()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `readCitizenLicenceDtbylicences` | `POST api/trade/application/citizen-by-licence` | `$request->validate inline` | `$this->_REPOSITORY->readCitizenLicenceDtbylicences()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `citizenHistory` | `POST api/trade/application/citizen-history` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `getWardList` | `POST api/trade/application/citizen-ward-list` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `conformRazorPayTran` | `POST api/trade/application/conform-razorpay-tran` | `Validator::make inline rules` | `Direct controller logic` | `TradeTransaction, TradeRazorPayResponse, ActiveTradeLicence` | `Standard JSON | Catch: Exception $e` |
| `handeRazorPay` | `POST api/trade/application/pay-razorpay-charge` | `$request->validate inline` | `$this->_REPOSITORY_TRADE->getLicenseDocLists(), $this->_REPOSITORY_TRADE->getActiveLicenseById(), $this->_REPOSITORY_TRADE->cltCharge()` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `renewalList` | `POST api/trade/application/renewable-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON` |
| `sendToLevel` | `POST api/trade/application/send-to-officer` | `Request` | `$this->_REPOSITORY_TRADE->checkWorckFlowForwardBackord()` | `WorkflowTrack, ActiveTradeLicence` | `Standard JSON | Catch: Exception $e` |
| `citizenApplicationStatus` | `POST api/trade/application/status` | `$request->validate inline` | `$this->_REPOSITORY_TRADE->getAllLicenceById(), $this->_REPOSITORY_TRADE->applicationStatus()` | `None` | `Standard JSON | Catch: Exception $e` |
| `surrenderList` | `POST api/trade/application/surrenderable-list` | `Request` | `Direct controller logic` | `None` | `Standard JSON | Catch: Exception $e` |
| `licenceInfoWhatsappChat` | `POST api/trade/licenceInfoWhatsappChat` | `Validator::make inline rules` | `Direct controller logic` | `TradeLicence, TradeRenewal, ActiveTradeLicence` | `responseMsgs() helper | Catch: Exception $e` |
| `getDenialDetails` | `POST api/trade/notice/citizen-details` | `Request` | `$this->_REPOSITORY_TRADE->readDenialdtlbyNoticno()` | `None` | `Standard JSON` |

---

### TradeNoticeController
- **Fully Qualified Namespace**: `App\Http\Controllers\Trade\TradeNoticeController`
- **File Location**: `app/Http/Controllers/Trade/TradeNoticeController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 7
- **Constructor Injections**: `ITradeNotice $TradeRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `applyDenail` | `POST api/trade/notice/add` | `$request->validate inline` | `$this->_REPOSITORY->addDenail()` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `approveReject` | `POST api/trade/notice/approve-reject` | `Request` | `$this->_REPOSITORY->approveReject()` | `None` | `Standard JSON` |
| `btcInbox` | `POST api/trade/notice/btc-inbox` | `Request` | `$this->_REPOSITORY->btcInbox()` | `None` | `Standard JSON` |
| `inbox` | `POST api/trade/notice/inbox` | `Request` | `$this->_REPOSITORY->inbox()` | `None` | `Standard JSON` |
| `outbox` | `POST api/trade/notice/outbox` | `Request` | `$this->_REPOSITORY->outbox()` | `None` | `Standard JSON` |
| `postNextLevel` | `POST api/trade/notice/post-next` | `$request->validate inline` | `Direct controller logic` | `WfWorkflow, ActiveTradeNoticeConsumerDtl, WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |
| `denialview` | `POST api/trade/notice/view` | `Request` | `$this->_REPOSITORY->denialView()` | `None` | `Standard JSON` |

---

### ConsumerActionRequest
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\ConsumerActionRequest`
- **File Location**: `app/Http/Controllers/Water/ConsumerActionRequest.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 5

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getInspectionData` | `POST api/water/request/discon/get-inspection-dtls` | `Validator::make inline rules` | `Direct controller logic` | `WaterDisconnectionSiteInspections` | `responseMsgs() helper | Catch: Exception $e` |
| `getSiteInspectionCompar` | `POST api/water/request/discon/getInspectinMaster` | `Validator::make inline rules` | `Direct controller logic` | `WaterDisconnectionSiteInspections, WaterSiteInspection, WaterTran, WaterPaymentController` | `responseMsgs() helper | Catch: Exception $e` |
| `updateSiteInspection` | `POST api/water/request/discon/inspection` | `Request` | `Direct controller logic` | `WaterDisconnectionSiteInspections, WaterSiteInspection` | `responseMsgs() helper | Catch: Exception $e` |
| `cancelDisconnectionSitInspection` | `POST api/water/request/discon/sedule-cancel` | `Validator::make inline rules` | `Direct controller logic` | `WaterDisconnectionSiteInspections` | `responseMsgs() helper | Catch: Exception $e` |
| `setDisconnectionSitInspection` | `POST api/water/request/discon/sedule-inspection` | `Validator::make inline rules` | `Direct controller logic` | `WaterDisconnectionSiteInspections` | `responseMsgs() helper | Catch: Exception $e` |

---

### NewConnectionController
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\NewConnectionController`
- **File Location**: `app/Http/Controllers/Water/NewConnectionController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 43
- **Traits Used**: `Ward`, `Workflow`, `WaterTrait`, `SAF`
- **Constructor Injections**: `iNewConnection $newConnection`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `getApplicationDetailsv1` | `POST api/water/admin/application/application-details` | `Validator::make inline rules` | `Direct controller logic` | `WaterApprovalApplicant, WaterApprovalApplicationDetail, WaterSiteInspectionsScheduling, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `cancelSiteInspection` | `POST api/water/admin/application/cancel-inspection-scheduling` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspection, WaterSiteInspectionsScheduling, WaterPenaltyInstallment, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocToUploadv1` | `POST api/water/admin/application/document-details` | `Validator::make inline rules` | `Direct controller logic` | `WfActiveDocument, WaterApprovalApplicationDetail, WaterRejectionApplicationDetail, WaterConnectionCharge` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `getApplicationDetailById` | `POST api/water/admin/application/get-details-by-id` | `Validator::make inline rules` | `Direct controller logic` | `WaterTran, WaterPenaltyInstallment, WaterConnectionCharge, WaterApplication` | `responseMsgs() helper | Catch: Exception $e` |
| `getJeSiteDetails` | `POST api/water/admin/application/je-site-details` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspection, WaterSiteInspectionsScheduling` | `responseMsgs() helper | Catch: Exception $e` |
| `listApplicationBydate` | `POST api/water/admin/application/list-details-by-date` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WaterPenaltyInstallment, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `onlineSiteInspection` | `POST api/water/admin/application/online-technical-inspection` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspection` | `responseMsgs() helper | Catch: Exception $e` |
| `saveInspectionDateTime` | `POST api/water/admin/application/save-inspection-date` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspectionsScheduling` | `responseMsgs() helper | Catch: Exception $e` |
| `getSiteInspectionDetails` | `POST api/water/admin/application/site-inspection-details` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspectionsScheduling` | `responseMsgs() helper | Catch: Exception $e` |
| `getTechnicalInsDetails` | `POST api/water/admin/application/technical-inspection-details` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspection` | `responseMsgs() helper | Catch: Exception $e` |
| `searchApplicationByParameter` | `POST api/water/admin/search-application` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WaterSiteInspectionsScheduling` | `responseMsgs() helper | Catch: Exception $e` |
| `index` | `GET|HEAD api/water/application/apply-new-connection` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method index not found in NewConnectionController) |
| `store` | `POST api/water/application/apply-new-connection` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $error` |
| `create` | `GET|HEAD api/water/application/apply-new-connection/create` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method create not found in NewConnectionController) |
| `show` | `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method show not found in NewConnectionController) |
| `update` | `PUT|PATCH api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method update not found in NewConnectionController) |
| `destroy` | `DELETE api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method destroy not found in NewConnectionController) |
| `edit` | `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}/edit` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method edit not found in NewConnectionController) |
| `approvalRejectionWater` | `POST api/water/application/approval-rejection` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WfRoleusermap` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `deleteWaterApplication` | `POST api/water/application/delete` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WaterApplicant, WaterPenaltyInstallment, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `editWaterAppliction` | `POST api/water/application/edit` | `Validator::make inline rules` | `new NewConnectionRepository` | `WaterApplicant, waterAudit, WaterPenaltyInstallment, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `getApplicationDetails` | `POST api/water/application/get-by-id` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplicant, WaterSiteInspectionsScheduling, WaterTran, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `getActiveApplictaions` | `POST api/water/application/search` | `FormRequest: $key);` | `Direct controller logic` | `None` | `Standard JSON` |
| `backToCitizen` | `POST api/water/back-to-citizen` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WorkflowTrack` | `responseMsgs() helper | Catch: Exception $e` |
| `btcInbox` | `POST api/water/btc-inbox` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getDocToUpload` | `POST api/water/citizen/get-doc-list` | `Validator::make inline rules` | `Direct controller logic` | `WfActiveDocument, WaterConnectionCharge, WaterApplication, DocUpload` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `commentIndependent` | `POST api/water/comment-independent` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WorkflowTrack, WfRoleusermap` | `responseMsgs() helper | Catch: Exception $e` |
| `ConsumerInfoWatsappChat` | `POST api/water/consumer-info-watsapp-chat` | `$request->validate inline` | `Direct controller logic` | `WaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `approvedWaterApplications` | `POST api/water/consumer/get-listed-details` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerInitialMeter, WaterConsumer, WaterConsumerDemand, WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `docVerifyRejects` | `POST api/water/doc-verify-reject` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WfRoleusermap, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `postEscalate` | `POST api/water/escalate` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication` | `responseMsgs() helper | Catch: Exception $e` |
| `fieldVerifiedInbox` | `POST api/water/field-verified-inbox` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getUploadDocuments` | `POST api/water/get-upload-documents` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `waterInbox` | `POST api/water/inbox` | `Request` | `Direct controller logic` | `None` | `Standard JSON` |
| `waterOutbox` | `POST api/water/outbox` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `postNextLevel` | `POST api/water/post-next-level` | `Validator::make inline rules` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $error` |
| `searchWaterConsumer` | `POST api/water/search-consumer` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getSafHoldingDetails` | `POST api/water/search-holding-saf` | `Validator::make inline rules` | `Direct controller logic` | `PropActiveSafsFloor, PropFloor, PropActiveSaf, PropActiveSafsOwner` | `responseMsgs() helper | Catch: Exception $e` |
| `testUploadDocument` | `POST api/water/simple-upload-document` | `Request` | `Direct controller logic` | `None` | `Standard JSON` |
| `waterSpecialInbox` | `POST api/water/special-inbox` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL)` |
| `uploadWaterDoc` | `POST api/water/upload-document` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getApplicationsDetails` | `POST api/water/workflow/application/get-by-id` | `Validator::make inline rules` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `getDocList` | `POST api/water/workflow/get-doc-list` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WaterApplicant` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaterApplication
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterApplication`
- **File Location**: `app/Http/Controllers/Water/WaterApplication.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 8
- **Traits Used**: `Workflow`
- **Constructor Injections**: `IWaterNewConnection $Repository, iNewConnection $newConnection`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `handeRazorPay` | `POST api/water/Razorpay-Orderid` | `Request` | `$this->Repository->handeRazorPay()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getJskAppliedApplication` | `POST api/water/admin/application/dashboard-data` | `Request` | `Direct controller logic` | `WfRole, WaterTran, WfWorkflow, WaterWaterApplication` | `responseMsgs() helper | Catch: Exception $e` |
| `workflowDashordDetails` | `POST api/water/admin/workflow/dashboard-data` | `Request` | `Direct controller logic` | `WfRole, WorkflowTrack, WfWorkflow, WfWorkflowrolemap` | `responseMsgs() helper | Catch: Exception $e` |
| `calWaterConCharge` | `POST api/water/cargeCal` | `Request` | `$this->Repository->calWaterConCharge()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `getCitizenApplication` | `POST api/water/citizenApplications` | `Request` | `$this->Repository->getCitizenApplication()` | `None` | `Standard JSON | Catch: Exception $e` |
| `calConsumerDemand` | `POST api/water/consumerChargeCal` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method calConsumerDemand not found in WaterApplication) |
| `readTransectionAndApl` | `POST api/water/getTranNo` | `Request` | `$this->Repository->readTransectionAndApl()` | `None` | `Delegated return (Repository/Service/BLL)` |
| `updateWaterApplication` | `POST api/water/update-applications` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method updateWaterApplication not found in WaterApplication) |

---

### WaterConsumer
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterConsumer`
- **File Location**: `app/Http/Controllers/Water/WaterConsumer.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 20
- **Traits Used**: `Workflow`, `WaterTrait`
- **Constructor Injections**: `IConsumer $Repository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `addFixedRate` | `POST api/water/admin/consumer/add-fixed-rate` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `applyDeactivation` | `POST api/water/admin/consumer/apply-deactivation` | `Validator::make inline rules` | `Direct controller logic` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack, PrefixIdGenerator` | `responseMsgs() helper | Catch: Exception $e` |
| `consumerDemandDeactivation` | `POST api/water/admin/consumer/demand-deactivation` | `Validator::make inline rules` | `Direct controller logic` | `WaterWaterConsumer, WaterConsumerDemand` | `responseMsgs() helper | Catch: Exception $e` |
| `saveGenerateConsumerDemand` | `POST api/water/admin/consumer/generate-demand` | `Validator::make inline rules` | `$this->Repository->calConsumerDemand()` | `WaterConsumerInitialMeter, WaterWaterConsumer, WaterMeterReadingDoc, WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `getMeterList` | `POST api/water/admin/consumer/get-meter-list` | `Validator::make inline rules` | `Direct controller logic` | `WaterNewConnection, WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `saveUpdateMeterDetails` | `POST api/water/admin/consumer/save-connection-meter` | `Request` | `Direct controller logic` | `WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `searchApplication` | `POST api/water/applicant/search` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `applyWaterDisconnection` | `POST api/water/apply-water-disconnection` | `$request->validate inline` | `Direct controller logic` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack, PrefixIdGenerator` | `responseMsgs() helper | Catch: Exception $e` |
| `applyConsumerRequest` | `POST api/water/applywater-ferule-cleaning` | `Validator::make inline rules` | `Direct controller logic` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack, PrefixIdGenerator` | `responseMsgs() helper | Catch: Exception $e` |
| `checkDoc` | `POST api/water/check-doc` | `Request` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `addAdvance` | `POST api/water/consumer/add-advance` | `Validator::make inline rules` | `Direct controller logic` | `WaterAdvance` | `responseMsgs() helper | Catch: Exception $e` |
| `calculateMeterFixedReading` | `POST api/water/consumer/calculate/meter-fixed-reading` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerInitialMeter, WaterConsumerDemand` | `responseMsgs() helper | Catch: Exception $e` |
| `viewCaretakenConnection` | `POST api/water/consumer/caretaken-connections` | `Request` | `Direct controller logic` | `WaterWaterConsumer, ActiveCitizenUndercare` | `responseMsgs() helper | Catch: Exception $e` |
| `generateMemo` | `POST api/water/consumer/generate-memo` | `Validator::make inline rules` | `$this->Repository->getconsumerRelatedData()` | `UlbMaster, WaterSiteInspection, PropProperty, WaterWaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getConnectionList` | `POST api/water/consumer/get-connection-list` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `getOwnerDetailsInfo` | `POST api/water/consumer/get-owner-details` | `$request->validate inline` | `Direct controller logic` | `WaterWaterConsumer, WaterApprovalApplicationDetail` | `responseMsgs() helper | Catch: Exception $e` |
| `listConsumerDemand` | `POST api/water/consumer/list-demand` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerDemand, WaterConsumerMeter` | `responseMsgs() helper | Catch: Exception $e` |
| `searchFixedConsumers` | `POST api/water/consumer/search-fixed-connections` | `Validator::make inline rules` | `Direct controller logic` | `WaterWaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `selfGenerateDemand` | `POST api/water/consumer/self-generate-demand` | `Validator::make inline rules` | `Direct controller logic` | `WaterWaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getByApplicationId` | `POST api/water/get_consumer_details_by_id` | `FormRequest: 9223372036854775807"` | `Direct controller logic` | `WaterConsumerApprovedRequest` | `Standard JSON` |

---

### WaterConsumerWfController
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterConsumerWfController`
- **File Location**: `app/Http/Controllers/Water/WaterConsumerWfController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 26
- **Traits Used**: `Ward`, `Workflow`, `WaterTrait`, `WaterRequestTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `approveRejectV1` | `POST api/water/consumer/deactivation-approve-rejet` | `Request` | `Direct controller logic` | `None` | `Standard JSON` |
| `btcInbox` | `POST api/water/consumer/deactivation-btc-inbox` | `Validator::make inline rules` | `Direct controller logic` | `WfWorkflowrolemap, CommonFunction` | `responseMsgs() helper | Catch: Exception $e` |
| `documentVerify` | `POST api/water/consumer/deactivation-documents-verify` | `Validator::make inline rules` | `Direct controller logic` | `WfRoleusermap, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `specialInbox` | `POST api/water/consumer/deactivation-escalate-inbox` | `Validator::make inline rules` | `Direct controller logic` | `WfWorkflowrolemap, CommonFunction` | `responseMsgs() helper | Catch: Exception $e` |
| `getDocList` | `POST api/water/consumer/deactivation-get-doc-list` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadDocuments` | `POST api/water/consumer/deactivation-upload-documents` | `Validator::make inline rules` | `Direct controller logic` | `DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getUploadDocuments` | `POST api/water/consumer/deactivation-upload-documents_view` | `Validator::make inline rules` | `Direct controller logic` | `DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `getConsumerDetails` | `POST api/water/consumer/deactivation-worklfow-by-id` | `Request` | `Direct controller logic` | `WorkflowMap, CustomDetail, WaterConsumerOwner, WorkflowTrack (Conn: pgsql_water)` | `responseMsgs() helper | Catch: Exception $e` |
| `getRejectedApplicationDetails` | `POST api/water/consumer/get-rejected-appl-details` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method getRejectedApplicationDetails not found in WaterConsumerWfController) |
| `getRejectedDocumentsOnly` | `POST api/water/consumer/get-rejected-documents-only` | `$request->validate inline` | `Direct controller logic` | `DocUpload, WfActiveDocument` | `response()->json(), return response() | Catch: Exception $e` |
| `consumerApprovalRejection` | `POST api/water/consumer/req/approval-rejection` | `FormRequest: //` | `Direct controller logic` | `None` | `Standard JSON` |
| `consumerDocVerifyReject` | `POST api/water/consumer/req/doc-verify-reject` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method consumerDocVerifyReject not found in WaterConsumerWfController) |
| `getConsumerDocs` | `POST api/water/consumer/req/get-upload-documents` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method getConsumerDocs not found in WaterConsumerWfController) |
| `getWorkflow` | `POST api/water/consumer/req/get-worklfow-by-id` | `$request->validate inline` | `Direct controller logic` | `None` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |
| `consumerInbox` | `POST api/water/consumer/req/inbox` | `Validator::make inline rules` | `Direct controller logic` | `WfWorkflowrolemap, CommonFunction` | `responseMsgs() helper | Catch: Exception $e` |
| `listDocToUpload` | `POST api/water/consumer/req/list-req-docs` | `None` | `None` | `None` | **DEFECTIVE / UNTRACED**: Untraced (Method listDocToUpload not found in WaterConsumerWfController) |
| `consumerOutbox` | `POST api/water/consumer/req/outbox` | `Validator::make inline rules` | `Direct controller logic` | `WfWorkflowrolemap, CommonFunction` | `responseMsgs() helper | Catch: Exception $e` |
| `consumerPostNextLevel` | `POST api/water/consumer/req/post-next-level` | `FormRequest: //` | `Direct controller logic` | `None` | `Standard JSON` |
| `postNextLevelApplication` | `POST api/water/consumers/post-next-level-appllication` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerActiveRequest, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `reuploadWaterDoc` | `POST api/water/consumers/reupload-water-doc` | `Validator::make inline rules` | `Direct controller logic` | `DocUpload, document, WaterConsumerActiveRequest, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |
| `backToCitizen` | `POST api/water/deactivation/back-to-citizen` | `$request->validate inline` | `Direct controller logic` | `WaterConsumerActiveRequest, WorkflowTrack, CommonFunction` | `responseMsgs() helper | Catch: Exception $e` |
| `getApplicationDetails` | `POST api/water/get-details-applications-by-id` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerOwner, WaterConsumerCharge, WaterSiteInspectionsScheduling, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `getRequestedApplication` | `POST api/water/get-details-disconnections` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `getRejectedDocumentsList` | `POST api/water/get-rejected-documents-list` | `Request` | `Direct controller logic` | `None` | `response()->json(), return response() | Catch: Exception $e` |
| `getDocListForJe` | `POST api/water/workflow/get-doc-list-je` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `uploadWaterDocJe` | `POST api/water/workflow/upload-doc-je` | `Validator::make inline rules` | `Direct controller logic` | `DocUpload, WfActiveDocument` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaterMasterController
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterMasterController`
- **File Location**: `app/Http/Controllers/Water/WaterMasterController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 10
- **Constructor Injections**: `iNewConnection $newConnection`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `createWaterPipelineType` | `POST api/water/create-water-pipeline-type` | `Request` | `Direct controller logic` | `WaterParamPipelineType` | `responseMsgs() helper | Catch: Exception $e` |
| `createWaterPropTypeMstr` | `POST api/water/create-water-prop-type` | `Request` | `Direct controller logic` | `WaterPropertyTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |
| `dataActiveDeactive` | `POST api/water/delete-water-pipeline-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterParamPipelineType` | `responseMsgs() helper | Catch: Exception $e` |
| `activeDeactiveById` | `POST api/water/delete-water-prop-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterPropertyTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |
| `getAllPipeline` | `POST api/water/get-water-pipeline-type` | `Request` | `Direct controller logic` | `WaterParamPipelineType` | `responseMsgs() helper | Catch: Exception $e` |
| `getAllData` | `POST api/water/get-water-prop-type` | `Request` | `Direct controller logic` | `WaterPropertyTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |
| `getDataId` | `POST api/water/getby-id-water-pipeline-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterParamPipelineType` | `responseMsgs() helper | Catch: Exception $e` |
| `getDataById` | `POST api/water/getby-id-water-prop-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterPropertyTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |
| `updateDataById` | `POST api/water/update-water-pipeline-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterParamPipelineType` | `responseMsgs() helper | Catch: Exception $e` |
| `updateById` | `POST api/water/update-water-prop-type` | `Validator::make inline rules` | `Direct controller logic` | `WaterPropertyTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaterPaymentController
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterPaymentController`
- **File Location**: `app/Http/Controllers/Water/WaterPaymentController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 16
- **Traits Used**: `Ward`, `Workflow`, `Razorpay`, `WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `generateOfflinePaymentReceipt` | `POST api/water/admin/application/generate-payment-receipt` | `Validator::make inline rules` | `Direct controller logic` | `UlbMaster, WaterTranFineRebate, WaterApprovalApplicationDetail, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `generateOfflinePaymentReceiptv1` | `POST api/water/admin/dis-generate-payment-receipt` | `Validator::make inline rules` | `Direct controller logic` | `WaterSiteInspection, WaterTranFineRebate, WaterConsumerCharge, waterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getApplicationPaymentHistory` | `POST api/water/application/payment/get-payment-history` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication, WaterConnectionCharge, WaterPenaltyInstallment, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `offlineConnectionPayment` | `POST api/water/application/payment/offline/pay-connection-charge` | `Request` | `Direct controller logic` | `WaterSiteInspection, IdGeneration, WaterTran, WaterConnectionCharge` | `responseMsgs() helper | Catch: Exception $e` |
| `paymentHistory` | `POST api/water/citizen/payment-history` | `Validator::make inline rules` | `Direct controller logic` | `WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `callDemandByMonth` | `POST api/water/consumer/calculate-month-demand` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `generateDemandPaymentReceipt` | `POST api/water/consumer/demand/generate-payment-receipt` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerTax, WaterConsumerMeter, UlbMaster, WaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getConsumerPaymentHistory` | `POST api/water/consumer/get-payment-history` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerDemand, WaterTranDetail, WaterConsumer, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `offlineDemandPayment` | `POST api/water/consumer/offline-demand-payment` | `Request` | `Direct controller logic` | `WaterAdjustment, waterTran, IdGeneration` | `responseMsgs() helper | Catch: Exception $e` |
| `offlineConReqPayment` | `POST api/water/consumer/offline-request-payment` | `Request` | `Direct controller logic` | `WaterConsumerCharge, IdGeneration, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `initiateOnlineDemandPayment` | `POST api/water/consumer/online-demand-payment` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `initiateOnlineConRequestPayment` | `POST api/water/consumer/online-request-payment` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `getWaterUserCharges` | `POST api/water/consumer/water-user-charges` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerDemand, WaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `getDisApplicationPaymentHistory` | `POST api/water/disconnection/payment/get-payment-history` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumerCharge, WaterPenaltyInstallment, WaterTran` | `responseMsgs() helper | Catch: Exception $e` |
| `getWaterMasterData` | `POST api/water/master/get-listed-details` | `Request` | `Direct controller logic` | `WaterConnectionThroughMstr, WaterPropertyTypeMstr, WaterOwnerTypeMstr, WaterConnectionTypeMstr` | `responseMsgs() helper | Catch: Exception $e` |
| `saveSitedetails` | `POST api/water/site-verification/save-site-details` | `Request` | `Direct controller logic` | `WaterSiteInspection, Charges, WaterSiteInspectionsScheduling, InspectionData` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaterReportController
- **Fully Qualified Namespace**: `App\Http\Controllers\Water\WaterReportController`
- **File Location**: `app/Http/Controllers/Water/WaterReportController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 8
- **Traits Used**: `WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `tcCollectionReport` | `POST api/water/aggregate-report` | `Request` | `Direct controller logic` | `None (Conn: pgsql_water)` | `responseMsgs() helper | Catch: Exception $e` |
| `approveRejectReports` | `POST api/water/approve-reject-report` | `Validator::make inline rules` | `Direct controller logic` | `WaterRejectionApplicationDetail, WaterApprovalApplicationDetail` | `responseMsgs() helper, response()->json(), return response() | Catch: Exception $e` |
| `connectionCollection` | `POST api/water/connection-collection` | `Validator::make inline rules` | `Direct controller logic` | `WaterTran | Tables: water_applications` | `responseMsgs() helper | Catch: Exception $e` |
| `dcbPieChart` | `POST api/water/consumer/report/dcb-pie-chart` | `Request` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |
| `wardWiseDCB` | `POST api/water/consumer/report/list-ward-dcb` | `Validator::make inline rules` | `Direct controller logic` | `None (Conn: pgsql_water)` | `responseMsgs() helper | Catch: Exception $e` |
| `levelWiseReport` | `POST api/water/level-wise-report` | `Validator::make inline rules` | `Direct controller logic` | `WaterApplication` | `responseMsgs() helper | Catch: Exception $e` |
| `newConnectioReport` | `POST api/water/new-connection-report` | `Validator::make inline rules` | `Direct controller logic` | `WaterConsumer` | `responseMsgs() helper | Catch: Exception $e` |
| `consumerReport` | `POST api/water/report-cosumer` | `Validator::make inline rules` | `Direct controller logic` | `None` | `responseMsgs() helper | Catch: Exception $e` |

---

### WaterNewConnection
- **Fully Qualified Namespace**: `App\Repository\Water\Concrete\WaterNewConnection`
- **File Location**: `app/Repository/Water/Concrete/WaterNewConnection.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 1
- **Traits Used**: `Auth`, `WardPermission`, `Razorpay`, `WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Downstream Services / Repositories | Models / Tables Touched | Response & Exceptions |
|---|---|---|---|---|---|
| `razorPayResponse` | `POST api/water/test` | `Request` | `Direct controller logic` | `WaterRazorPayRequest, WaterPaymentController` | `Delegated return (Repository/Service/BLL) | Catch: Exception $e` |

---
