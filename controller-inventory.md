# Phase 1 Discovery: Controller Inventory & Method Tracing (Verified & Corrected)

## 1. Controller Portfolio & Count Reconciliation

### Reconciliation of Controller Counts (43 vs 44)
- **Class-Based Controller Targets**: Exactly **43 PHP classes** handle routes across Property, Trade, and Water. This includes **42 controllers** located under `app/Http/Controllers/` plus **1 concrete repository** (`App\Repository\Water\Concrete\WaterNewConnection`) directly bound as a route target in `routes/water.php:292`.
- **Closure Target**: Exactly **1 pseudo-controller target** (`Closure`) handling inline anonymous functions.
- **Total Action Targets**: 43 class targets + 1 Closure = **44 total targets**.

### Master Controller Portfolio Table

| # | Controller Class | Module Scope | File Path | Route Count | Injected Interfaces | Verification Status |
|---|---|---|---|---|---|---|
| 1 | `CaretakerController` | Water | `app/Http/Controllers/CaretakerController.php` | 2 | `None` | `VERIFIED` |
| 2 | `CitizenController` | Property | `app/Http/Controllers/CitizenController.php` | 3 | `iCitizenRepository` | `VERIFIED` |
| 3 | `JskController` | Property | `app/Http/Controllers/Dashboard/JskController.php` | 2 | `None` | `VERIFIED` |
| 4 | `DemoController` | Water | `app/Http/Controllers/DemoController.php` | 1 | `None` | `VERIFIED` |
| 5 | `TradeController` | Trade | `app/Http/Controllers/Mdm/TradeController.php` | 12 | `None` | `VERIFIED` |
| 6 | `BankReconcillationController` | Property | `app/Http/Controllers/Payment/BankReconcillationController.php` | 6 | `None` | `VERIFIED` |
| 7 | `CashVerificationController` | Property | `app/Http/Controllers/Payment/CashVerificationController.php` | 7 | `None` | `VERIFIED` |
| 8 | `ActiveSafController` | Property | `app/Http/Controllers/Property/ActiveSafController.php` | 32 | `iSafRepository` | `VERIFIED` |
| 9 | `ActiveSafControllerV2` | Property | `app/Http/Controllers/Property/ActiveSafControllerV2.php` | 10 | `None` | `VERIFIED` |
| 10 | `ApplySafController` | Property | `app/Http/Controllers/Property/ApplySafController.php` | 2 | `None` | `VERIFIED` |
| 11 | `CalculatorController` | Property | `app/Http/Controllers/Property/CalculatorController.php` | 3 | `iCalculatorRepository` | `VERIFIED` |
| 12 | `ClusterController` | Property | `app/Http/Controllers/Property/ClusterController.php` | 11 | `iCluster` | `PARTIALLY BLOCKED` |
| 13 | `ConcessionController` | Property | `app/Http/Controllers/Property/ConcessionController.php` | 17 | `iConcessionRepository` | `VERIFIED` |
| 14 | `DocumentOperationController` | Property | `app/Http/Controllers/Property/DocumentOperationController.php` | 1 | `iDocumentOperationRepo` | `VERIFIED` |
| 15 | `GbSafController` | Property | `app/Http/Controllers/Property/GbSafController.php` | 22 | `None` | `VERIFIED` |
| 16 | `HoldingTaxController` | Property | `app/Http/Controllers/Property/HoldingTaxController.php` | 24 | `iSafRepository` | `VERIFIED` |
| 17 | `LocationController` | Property | `app/Http/Controllers/Property/LocationController.php` | 3 | `None` | `VERIFIED` |
| 18 | `MasterReferenceController` | Property | `app/Http/Controllers/Property/MasterReferenceController.php` | 205 | `None` | `VERIFIED` |
| 19 | `ObjectionController` | Property | `app/Http/Controllers/Property/ObjectionController.php` | 21 | `iObjectionRepository` | `VERIFIED` |
| 20 | `PropMaster` | Property | `app/Http/Controllers/Property/PropMaster.php` | 5 | `None` | `VERIFIED` |
| 21 | `PropertyBifurcationController` | Property | `app/Http/Controllers/Property/PropertyBifurcationController.php` | 7 | `IPropertyBifurcation` | `VERIFIED` |
| 22 | `PropertyController` | Property | `app/Http/Controllers/Property/PropertyController.php` | 10 | `iSafRepository` | `VERIFIED` |
| 23 | `PropertyDeactivateController` | Property | `app/Http/Controllers/Property/PropertyDeactivateController.php` | 12 | `IPropertyDeactivate, iSafRepository` | `VERIFIED` |
| 24 | `PropertyDetailsController` | Property | `app/Http/Controllers/Property/PropertyDetailsController.php` | 9 | `iPropertyDetailsRepo` | `VERIFIED` |
| 25 | `RainWaterHarvestingController` | Property | `app/Http/Controllers/Property/RainWaterHarvestingController.php` | 22 | `None` | `VERIFIED` |
| 26 | `ReportController` | Property | `app/Http/Controllers/Property/ReportController.php` | 40 | `IReport` | `PARTIALLY BLOCKED` |
| 27 | `SafDocController` | Property | `app/Http/Controllers/Property/SafDocController.php` | 4 | `None` | `VERIFIED` |
| 28 | `WaiverController` | Property | `app/Http/Controllers/Property/WaiverController.php` | 9 | `None` | `VERIFIED` |
| 29 | `ZoneController` | Property | `app/Http/Controllers/Property/ZoneController.php` | 1 | `None` | `VERIFIED` |
| 30 | `ReferenceController` | Property | `app/Http/Controllers/ReferenceController.php` | 38 | `None` | `VERIFIED` |
| 31 | `ReportController` | Trade | `app/Http/Controllers/Trade/ReportController.php` | 20 | `IReport` | `PARTIALLY BLOCKED` |
| 32 | `TradeApplication` | Trade | `app/Http/Controllers/Trade/TradeApplication.php` | 30 | `ITrade` | `VERIFIED` |
| 33 | `TradeCitizenController` | Trade | `app/Http/Controllers/Trade/TradeCitizenController.php` | 18 | `ITradeCitizen` | `VERIFIED` |
| 34 | `TradeNoticeController` | Trade | `app/Http/Controllers/Trade/TradeNoticeController.php` | 7 | `ITradeNotice` | `VERIFIED` |
| 35 | `ConsumerActionRequest` | Water | `app/Http/Controllers/Water/ConsumerActionRequest.php` | 5 | `None` | `VERIFIED` |
| 36 | `NewConnectionController` | Water | `app/Http/Controllers/Water/NewConnectionController.php` | 43 | `iNewConnection` | `PARTIALLY BLOCKED` |
| 37 | `WaterApplication` | Water | `app/Http/Controllers/Water/WaterApplication.php` | 8 | `IWaterNewConnection, iNewConnection` | `PARTIALLY BLOCKED` |
| 38 | `WaterConsumer` | Water | `app/Http/Controllers/Water/WaterConsumer.php` | 20 | `IConsumer` | `VERIFIED` |
| 39 | `WaterConsumerWfController` | Water | `app/Http/Controllers/Water/WaterConsumerWfController.php` | 26 | `None` | `PARTIALLY BLOCKED` |
| 40 | `WaterMasterController` | Water | `app/Http/Controllers/Water/WaterMasterController.php` | 10 | `iNewConnection` | `VERIFIED` |
| 41 | `WaterPaymentController` | Water | `app/Http/Controllers/Water/WaterPaymentController.php` | 16 | `None` | `VERIFIED` |
| 42 | `WaterReportController` | Water | `app/Http/Controllers/Water/WaterReportController.php` | 8 | `None` | `VERIFIED` |
| 43 | `WaterNewConnection` | Water | `app/Repository/Water/Concrete/WaterNewConnection.php` | 1 | `None` | `VERIFIED` |

---

## 2. In-Depth Controller Analysis & Traced Method Details

### CaretakerController
- **Namespace**: `App\Http\Controllers`
- **File Location**: `app/Http/Controllers/CaretakerController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 2
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `caretakerConsumerTag` | `POST api/water/caretaker-consumer-tagging` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterApprovalApplicant, WaterConsumer, ThirdPartyController` | `VERIFIED` |
| `waterCaretakerOtp` | `POST api/water/caretaker-otp` | `Request` | `Direct Controller Implementation` | `WaterApprovalApplicant, WaterConsumer, ThirdPartyController` | `VERIFIED` |

---

### CitizenController
- **Namespace**: `App\Http\Controllers`
- **File Location**: `app/Http/Controllers/CitizenController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3
- **Constructor Injections**: `iCitizenRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `citizenDetailsWithCitizenId` | `POST api/property/citizen/details` | `Request` | `Injected Repo: iCitizenRepository` | `\App\Models\Water\WaterConsumerDemand, PropProperty` | `VERIFIED` |
| `propertyCount` | `POST api/property/citizen/property-count` | `Request` | `Injected Repo: iCitizenRepository` | `TradeLicence, WaterConsumer, PropProperty | pet_approved_registrations, adv_agencies` | `VERIFIED` |
| `getAllAppliedApplications` | `GET|POST|HEAD api/property/citizens/applied-applications` | `Request` | `Injected Repo: iCitizenRepository` | `None` | `VERIFIED` |

---

### JskController
- **Namespace**: `App\Http\Controllers\Dashboard`
- **File Location**: `app/Http/Controllers/Dashboard/JskController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 2
- **Constructor Injections**: `None`
- **Traits Used**: `Workflow`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `propDashboard` | `POST api/property/dashboard` | `Request` | `Direct Controller Implementation` | `PropActiveSaf, PropActiveHarvesting, WorkflowTrack` | `VERIFIED` |
| `propDashboardDtl` | `POST api/property/dashboard-details` | `Request` | `Direct Controller Implementation` | `PropActiveSaf, PropTransaction, WfRoleusermap` | `VERIFIED` |

---

### DemoController
- **Namespace**: `App\Http\Controllers`
- **File Location**: `app/Http/Controllers/DemoController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 1
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `waterConnection` | `POST api/water-connection` | `Request` | `Direct Controller Implementation` | `User` | `VERIFIED` |

---

### TradeController
- **Namespace**: `App\Http\Controllers\Mdm`
- **File Location**: `app/Http/Controllers/Mdm/TradeController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 12
- **Constructor Injections**: `None`
- **Instantiated in Constructor**: `CommonFunction, TradeParamFirmType, TradeParamApplicationType, TradeParamCategoryType, TradeParamItemType, TradeParamLicenceRate, TradeParamOwnershipType`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applicationType` | `POST api/trade/application-type` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `applicationTypeList` | `POST api/trade/application-type-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `categoryType` | `POST api/trade/category-type` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `categoryTypeList` | `POST api/trade/category-type-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `firmType` | `POST api/trade/firm-type` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `firmTypeList` | `POST api/trade/firm-type-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `itemType` | `POST api/trade/item-type` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `itemTypeList` | `POST api/trade/item-type-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `ownershipType` | `POST api/trade/ownership-type` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `ownershipTypeList` | `POST api/trade/ownership-type-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `rate` | `POST api/trade/rate` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `rateList` | `POST api/trade/rate-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |

---

### BankReconcillationController
- **Namespace**: `App\Http\Controllers\Payment`
- **File Location**: `app/Http/Controllers/Payment/BankReconcillationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 6
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `chequeClearance` | `POST api/property/cheque-clearance` | `Validator::make inline rules` | `Direct Controller Implementation` | `PaymentReconciliation, ActiveTradeLicence, WaterApplication` | `VERIFIED` |
| `chequeDtlById` | `POST api/property/cheque-dtl-by-id` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropChequeDtl, TradeChequeDtl, WaterChequeDtl` | `VERIFIED` |
| `deactivateTransaction` | `POST api/property/deactivate-transaction` | `Validator::make inline rules` | `Direct Controller Implementation` | `AdDirectApplicationAmount, TradeTransactionDeactivateDtl, AdTransactionDeactivateDtl` | `VERIFIED` |
| `tranDeactivatedList` | `POST api/property/deactivate-transaction-dtl` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropTransaction, WaterTransactionDeactivateDtl, PropTransactionDeactivateDtl` | `VERIFIED` |
| `searchTransaction` | `POST api/property/search-transaction` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropTransaction, WaterTran, TradeTransaction` | `VERIFIED` |
| `searchTransactionNo` | `POST api/property/search-transaction-no` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropTransaction, WaterTran` | `VERIFIED` |

---

### CashVerificationController
- **Namespace**: `App\Http\Controllers\Payment`
- **File Location**: `app/Http/Controllers/Payment/CashVerificationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 7
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `cashReceipt` | `POST api/property/cash-receipt` | `$request->validate inline` | `Direct Controller Implementation` | `UlbMaster` | `VERIFIED` |
| `editChequeNo` | `POST api/property/edit-chequedtl` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterChequeDtl, TradeChequeDtl, PropChequeDtl` | `VERIFIED` |
| `cashVerificationList` | `POST api/property/list-cash-verification` | `Request` | `Direct Controller Implementation` | `TempTransaction` | `VERIFIED` |
| `tcCollectionDtl` | `POST api/property/tc-collections` | `$request->validate inline` | `Direct Controller Implementation` | `TempTransaction` | `VERIFIED` |
| `verifiedCashVerificationList` | `POST api/property/verified-cash-verification` | `Request` | `Direct Controller Implementation` | `RevDailycollection` | `VERIFIED` |
| `verifiedTcCollectionDtl` | `POST api/property/verified-tc-collections` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `cashVerify` | `POST api/property/verify-cash` | `Request` | `Direct Controller Implementation` | `PropTransaction, WaterTran, PrefixIdGenerator` | `VERIFIED` |

---

### ActiveSafController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ActiveSafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 32
- **Constructor Injections**: `iSafRepository`
- **Traits Used**: `Workflow, SAF, Razorpay, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `safDetails` | `POST api/property/saf-details` | `$request->validate inline` | `Injected Repo: iSafRepository` | `CustomDetail, PropActiveSaf, PropActiveSafsFloor` | `VERIFIED` |
| `getSafVerificationList` | `POST api/property/saf/IndiVerificationsList` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropSafVerification` | `VERIFIED` |
| `approvalRejectionSaf` | `POST api/property/saf/approvalrejection` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, PropActiveSafsFloor, WfRoleusermap` | `VERIFIED` |
| `backToCitizen` | `POST api/property/saf/back-to-citizen` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, WorkflowTrack, WfActiveDocument` | `VERIFIED` |
| `btcInbox` | `POST api/property/saf/btc-inbox` | `Request` | `Injected Repo: iSafRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `calculateSafBySafId` | `POST api/property/saf/calculate-by-saf-id` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `PropActiveSaf, PropSaf` | `VERIFIED` |
| `editSaf` | `POST api/property/saf/edit` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, PropActiveSafsOwner` | `VERIFIED` |
| `postEscalate` | `POST api/property/saf/escalate` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf` | `VERIFIED` |
| `specialInbox` | `POST api/property/saf/escalate/inbox/{key?}` | `Request` | `Injected Repo: iSafRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `fieldVerifiedInbox` | `POST api/property/saf/field-verified-inbox` | `Request` | `Injected Repo: iSafRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `generateOrderId` | `POST api/property/saf/generate-order-id` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PostRazorPayPenaltyRebate, PropActiveSaf` | `VERIFIED` |
| `geoTagging` | `POST api/property/saf/geotagging` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, DocUpload, PropSafGeotagUpload` | `VERIFIED` |
| `getDemandBySafId` | `POST api/property/saf/get-demand-by-id` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropTransaction, WfRoleusermap` | `VERIFIED` |
| `getPropByHoldingNo` | `POST api/property/saf/get-prop-byholding` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropFloor, \App\Models\Workflows\WfActiveDocument, PropProperty` | `VERIFIED` |
| `getTcVerifications` | `POST api/property/saf/get-tc-verifications` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropSafVerificationDtl, PropSafVerification, DocUpload | prop_rejected_safs, prop_safs` | `VERIFIED` |
| `inbox` | `POST api/property/saf/inbox` | `Request` | `Injected Repo: iSafRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `commentIndependent` | `POST api/property/saf/independent-comment` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, WorkflowTrack, WfRoleusermap` | `VERIFIED` |
| `generateOrderId` | `POST api/property/saf/independent/generate-order-id` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PostRazorPayPenaltyRebate, PropActiveSaf` | `VERIFIED` |
| `masterSaf` | `GET|HEAD api/property/saf/master-saf` | `Request` | `Injected Repo: iSafRepository` | `RefPropRoadType, RefPropFloor, RefPropType` | `VERIFIED` |
| `offlinePaymentSaf` | `POST api/property/saf/offline-saf-payment` | `Request` | `Injected Repo: iSafRepository` | `PropActiveSaf, PropTransaction, IdGeneration` | `VERIFIED` |
| `outbox` | `POST api/property/saf/outbox` | `Request` | `Injected Repo: iSafRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `generatePaymentReceipt` | `POST api/property/saf/payment-receipt` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `UlbMaster, PropTransaction, PropPenaltyrebate` | `VERIFIED` |
| `postNextLevel` | `POST api/property/saf/post/level` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, WfRoleusermap, WorkflowTrack` | `VERIFIED` |
| `getPropTransactions` | `GET|HEAD api/property/saf/prop-transactions` | `Request` | `Injected Repo: iSafRepository` | `None` | `VERIFIED` |
| `getTransactionBySafPropId` | `POST api/property/saf/proptransaction-by-id` | `Request` | `Injected Repo: iSafRepository` | `PropTransaction` | `VERIFIED` |
| `rejectedList` | `POST api/property/saf/rejected-inbox` | `Request` | `Injected Repo: iSafRepository` | `PropRejectedSaf` | `VERIFIED` |
| `rejectedList` | `POST api/property/saf/rejected-list` | `Request` | `Injected Repo: iSafRepository` | `PropRejectedSaf` | `VERIFIED` |
| `paymentSaf` | `POST api/property/saf/saf-payment` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropRazorpayPenalrebate, PropTransaction, PropActiveSaf` | `VERIFIED` |
| `siteVerification` | `POST api/property/saf/site-verification` | `Request` | `Injected Repo: iSafRepository` | `PropActiveSaf, WfRoleusermap, PropSafVerificationDtl` | `VERIFIED` |
| `getStaticSafDetails` | `POST api/property/saf/static-saf-dtls` | `$request->validate inline` | `Injected Repo: iSafRepository` | `WfRole, PropActiveSaf, PropActiveSafsFloor` | `VERIFIED` |
| `getVerifications` | `POST api/property/saf/verifications-comp` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, PropSafVerificationDtl, PropSafVerification | prop_rejected_safs, prop_safs` | `VERIFIED` |

---

### ActiveSafControllerV2
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ActiveSafControllerV2.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 10
- **Constructor Injections**: `None`
- **Traits Used**: `SAF`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `clusterSafPayment` | `POST api/property/saf/cluster-saf-payment` | `Request` | `Direct Controller Implementation` | `PropTransaction, IdGeneration, PropTranDtl` | `VERIFIED` |
| `deleteCitizenSaf` | `POST api/property/saf/delete-citizen-saf` | `Request` | `Direct Controller Implementation` | `PropActiveSaf, PropActiveSafsFloor, PropActiveSafsOwner` | `VERIFIED` |
| `editCitizenSaf` | `POST api/property/saf/edit-citizen-saf` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSafsFloor, PropActiveSaf, PropActiveSafsOwner` | `VERIFIED` |
| `getClusterSafDues` | `POST api/property/saf/get-cluster-saf-due` | `$request->validate inline` | `new PenaltyRebateCalculation` | `Cluster, PropActiveSaf, ActiveSafController` | `VERIFIED` |
| `getAptList` | `POST api/property/saf/list-apartment` | `$request->validate inline` | `Direct Controller Implementation` | `PropApartmentDtl` | `VERIFIED` |
| `memoReceipt` | `POST api/property/saf/memo-receipt` | `$request->validate inline` | `Direct Controller Implementation` | `UlbMaster, PropProperty, PropSafMemoDtl` | `VERIFIED` |
| `pendingGeoTaggingList` | `POST api/property/saf/pending-geotagging-list` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap` | `VERIFIED` |
| `verifyHoldingNo` | `POST api/property/saf/verify-holding` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropProperty` | `VERIFIED` |
| `searchHolding` | `POST api/property/search-holding` | `$request->validate inline` | `Direct Controller Implementation` | `PropOwner, PropProperty` | `VERIFIED` |
| `getAptList` | `POST api/property/v2/saf/list-apartment` | `$request->validate inline` | `Direct Controller Implementation` | `PropApartmentDtl` | `VERIFIED` |

---

### ApplySafController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ApplySafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 2
- **Constructor Injections**: `None`
- **Instantiated in Constructor**: `PropSafsDemand, PropProperty, PenaltyRebateCalculation`
- **Traits Used**: `SAF, Workflow`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applySafv1` | `POST api/property/saf/apply` | `Request` | `new SafCalculation, new EloquentAuthRepository` | `PropActiveSaf, PropActiveSafsFloor, WfRoleusermap` | `VERIFIED` |
| `applyGbSaf` | `POST api/property/saf/gb-apply` | `Request` | `new SafCalculation, new CalculateSafById` | `PropActiveSaf, PropActiveSafsFloor, PropActiveGbOfficer` | `VERIFIED` |

---

### CalculatorController
- **Namespace**: `App\Http\Controllers\property`
- **File Location**: `app/Http/Controllers/Property/CalculatorController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3
- **Constructor Injections**: `iCalculatorRepository`
- **Instantiated in Constructor**: `MCapitalValueRate`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `calculator` | `POST api/property/calculatePropertyTax` | `Request` | `Injected Repo: iCalculatorRepository` | `None` | `VERIFIED` |
| `dashboardDate` | `POST api/property/get-dashboard` | `Request` | `Injected Repo: iCalculatorRepository` | `None` | `VERIFIED` |
| `reviewCalculation` | `POST api/property/review-calculation` | `Request` | `Injected Repo: iCalculatorRepository` | `RefPropOccupancyFactor` | `VERIFIED` |

---

### ClusterController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ClusterController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 11
- **Constructor Injections**: `iCluster`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `clusterBasicDtls` | `POST api/property/cluster/basic-details` | `$request->validate inline` | `Injected Repo: iCluster` | `Cluster` | `VERIFIED` |
| `deleteClusterData` | `POST api/property/cluster/delete-cluster-data` | `Request` | `Injected Repo: iCluster` | `Cluster` | `VERIFIED` |
| `detailsByHolding` | `POST api/property/cluster/details-by-holding` | `$request->validate inline` | `Injected Repo: iCluster` | `PropProperty` | `VERIFIED` |
| `editClusterDetails` | `POST api/property/cluster/edit-cluster-details` | `Validator::make inline rules, Custom validation helper: $this` | `Injected Repo: iCluster` | `Cluster` | `VERIFIED` |
| `getAllClusters` | `POST api/property/cluster/get-all-clusters` | `Request` | `Injected Repo: iCluster` | `Cluster` | `VERIFIED` |
| `getClusterById` | `POST api/property/cluster/get-cluster-by-id` | `$request->validate inline` | `Injected Repo: iCluster` | `Cluster, UlbWardMaster, PropActiveSaf` | `VERIFIED` |
| `getSafBySafNo` | `POST api/property/cluster/get-saf-by-safno` | `$request->validate inline` | `Injected Repo: iCluster` | `PropActiveSaf` | `VERIFIED` |
| `propertyByCluster` | `POST api/property/cluster/property-by-cluster` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method propertyByCluster not found in ClusterController) |
| `saveClusterDetails` | `POST api/property/cluster/save-cluster-details` | `Validator::make inline rules, Custom validation helper: $this` | `Injected Repo: iCluster` | `Cluster` | `VERIFIED` |
| `saveHoldingInCluster` | `POST api/property/cluster/save-holding-in-cluster` | `$request->validate inline` | `Injected Repo: iCluster` | `Cluster, PropDemand, PropProperty` | `VERIFIED` |
| `saveSafInCluster` | `POST api/property/cluster/save-saf-in-cluster` | `$request->validate inline` | `Injected Repo: iCluster` | `Cluster, PropActiveSaf, PropSafsDemand` | `VERIFIED` |

---

### ConcessionController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ConcessionController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 17
- **Constructor Injections**: `iConcessionRepository`
- **Instantiated in Constructor**: `PropertyBifurcation`
- **Traits Used**: `WorkflowTrait, Concession, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applyConcession` | `POST api/property/concession/apply-concession` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `PropProperty, WorkflowTrack, PrefixIdGenerator` | `VERIFIED` |
| `approvalRejection` | `POST api/property/concession/approvalrejection` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `WfRoleusermap, PropOwner, WorkflowTrack` | `VERIFIED` |
| `backToCitizen` | `POST api/property/concession/backtocitizen` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `WorkflowTrack, PropActiveConcession` | `VERIFIED` |
| `btcInbox` | `POST api/property/concession/btc-inbox` | `Request` | `Injected Repo: iConcessionRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `commentIndependent` | `POST api/property/concession/comment-independent` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `WorkflowTrack, PropActiveConcession` | `VERIFIED` |
| `getDetailsById` | `POST api/property/concession/details` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `CustomDetail, WorkflowMap, PropFloor` | `VERIFIED` |
| `concessionDocList` | `POST api/property/concession/doc-list` | `Request` | `Injected Repo: iConcessionRepository` | `PropActiveConcession` | `VERIFIED` |
| `docVerifyReject` | `POST api/property/concession/doc-verify-reject` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `WfRoleusermap, PropActiveConcession, WfActiveDocument` | `VERIFIED` |
| `escalateApplication` | `POST api/property/concession/escalate` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `PropActiveConcession` | `VERIFIED` |
| `getDocType` | `POST api/property/concession/get-doc-type` | `Request` | `Injected Repo: iConcessionRepository` | `RefRequiredDocument` | `VERIFIED` |
| `getUploadedDocuments` | `POST api/property/concession/get-uploaded-documents` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `DocUpload, PropActiveConcession, WfActiveDocument` | `VERIFIED` |
| `inbox` | `POST api/property/concession/inbox` | `Request` | `Injected Repo: iConcessionRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `postNextLevel` | `POST api/property/concession/next-level` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `WorkflowTrack, WfWorkflow, PropActiveConcession` | `VERIFIED` |
| `outbox` | `POST api/property/concession/outbox` | `Request` | `Injected Repo: iConcessionRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `getOwnerDetails` | `POST api/property/concession/owner-details` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `PropOwner` | `VERIFIED` |
| `specialInbox` | `POST api/property/concession/special-inbox` | `Request` | `Injected Repo: iConcessionRepository` | `WfWardUser, WfWorkflowrolemap, WfRoleusermap` | `VERIFIED` |
| `uploadDocument` | `POST api/property/concession/upload-document` | `$request->validate inline` | `Injected Repo: iConcessionRepository` | `DocUpload, PropActiveConcession, WfActiveDocument` | `VERIFIED` |

---

### DocumentOperationController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/DocumentOperationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 1
- **Constructor Injections**: `iDocumentOperationRepo`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getAllDocuments` | `POST api/property/get-all-documents` | `Request` | `Injected Repo: iDocumentOperationRepo` | `None` | `VERIFIED` |

---

### GbSafController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/GbSafController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 22
- **Constructor Injections**: `None`
- **Traits Used**: `SAF, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `backToCitizen` | `POST api/property/gbsaf/back-to-citizen` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, WorkflowTrack` | `VERIFIED` |
| `btcInbox` | `POST api/property/gbsaf/btc-inbox` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf` | `VERIFIED` |
| `gbSafDetails` | `POST api/property/gbsaf/details` | `$request->validate inline` | `Direct Controller Implementation` | `CustomDetail, PropActiveSaf, PropActiveSafsFloor` | `VERIFIED` |
| `docVerifyReject` | `POST api/property/gbsaf/doc-verify-reject` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, WfRoleusermap, WfActiveDocument` | `VERIFIED` |
| `approvalRejectionGbSaf` | `POST api/property/gbsaf/final-approve-reject` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, PropFloor, PropActiveSafsFloor` | `VERIFIED` |
| `geoTagging` | `POST api/property/gbsaf/geo-tagging` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, DocUpload, PropSafGeotagUpload` | `VERIFIED` |
| `getDocList` | `POST api/property/gbsaf/get-doc-list` | `Request` | `Direct Controller Implementation` | `PropActiveSaf` | `VERIFIED` |
| `getUploadedDocuments` | `POST api/property/gbsaf/get-uploaded-document` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, DocUpload, WfActiveDocument` | `VERIFIED` |
| `inbox` | `POST api/property/gbsaf/inbox` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf` | `VERIFIED` |
| `fieldVerifiedInbox` | `POST api/property/gbsaf/inbox-field-verification` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf` | `VERIFIED` |
| `commentIndependent` | `POST api/property/gbsaf/independent-comment` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, WorkflowTrack, WfRoleusermap` | `VERIFIED` |
| `postNextLevel` | `POST api/property/gbsaf/next-level` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, WorkflowTrack, WfWorkflow` | `VERIFIED` |
| `outbox` | `POST api/property/gbsaf/outbox` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf` | `VERIFIED` |
| `postEscalate` | `POST api/property/gbsaf/post-escalate` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf` | `VERIFIED` |
| `siteVerification` | `POST api/property/gbsaf/site-verification` | `Request` | `Direct Controller Implementation` | `PropActiveSaf, WfRoleusermap, PropSafVerificationDtl` | `VERIFIED` |
| `specialInbox` | `POST api/property/gbsaf/special-inbox` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveSaf` | `VERIFIED` |
| `getStaticSafDetails` | `POST api/property/gbsaf/static-details` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, PropActiveGbOfficer, PropSafMemoDtl` | `VERIFIED` |
| `getTcVerifications` | `POST api/property/gbsaf/tc-verification` | `$request->validate inline` | `Direct Controller Implementation` | `PropSafVerificationDtl, PropSafVerification, DocUpload` | `VERIFIED` |
| `uploadDocument` | `POST api/property/gbsaf/upload-documents` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, DocUpload, WfActiveDocument` | `VERIFIED` |
| `propertyGbListByKey` | `POST api/property/get-filter-property-details-gb` | `$request->validate inline` | `Direct Controller Implementation` | `WfRoleusermap, PropProperty` | `VERIFIED` |
| `getGbHoldingDues` | `POST api/property/get-gb-holding-dues` | `$request->validate inline` | `new PenaltyRebateCalculation` | `UlbMaster, WfRoleusermap, PropProperty` | `VERIFIED` |
| `getGbPropByHoldingNo` | `POST api/property/saf/get-gb-prop-byholding` | `$request->validate inline` | `Direct Controller Implementation` | `PropFloor, PropProperty, WaterConsumer` | `VERIFIED` |

---

### HoldingTaxController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/HoldingTaxController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 24
- **Constructor Injections**: `iSafRepository`
- **Traits Used**: `SAF, Razorpay, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `citizenPropWaterDtls` | `POST api/property/citizen/property-water-dtls` | `Request` | `Injected Repo: iSafRepository` | `None` | `VERIFIED` |
| `clusterPaymentHistory` | `POST api/property/cluster/payment-history` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropTransaction` | `VERIFIED` |
| `clusterPaymentReceipt` | `POST api/property/cluster/payment-receipt` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `Cluster, PropPenaltyrebate, PropTransaction` | `VERIFIED` |
| `generateDemandPdf` | `GET|HEAD api/property/demand-pdf/{propertyId}` | `Request` | `Injected Repo: iSafRepository` | `None | ulb_masters, prop_properties` | `VERIFIED` |
| `generateOrderIdv1` | `POST api/property/generate-orderId` | `FormRequest: //` | `Injected Repo: iSafRepository` | `None` | `VERIFIED` |
| `generateOrderId` | `POST api/property/generate-prop-orderid` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PostRazorPayPenaltyRebate, PropProperty` | `VERIFIED` |
| `getHoldingDues` | `POST api/property/get-holding-dues` | `$request->validate inline` | `Injected Repo: iSafRepository` | `UlbMaster, WfRoleusermap, PropProperty` | `VERIFIED` |
| `getHoldingImpDtls` | `POST api/property/get-holding-imp-dtls` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `None | prop_properties, prop_demands` | `VERIFIED` |
| `getTransactionsByHoldingNo` | `POST api/property/get-tran-by-holding-no` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `None | prop_transactions, prop_properties` | `VERIFIED` |
| `generateOrderId` | `POST api/property/independent/generate-prop-orderid` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PostRazorPayPenaltyRebate, PropProperty` | `VERIFIED` |
| `getHoldingDues` | `POST api/property/independent/get-holding-dues` | `$request->validate inline` | `Injected Repo: iSafRepository` | `UlbMaster, WfRoleusermap, PropProperty` | `VERIFIED` |
| `initiatePayment` | `GET|HEAD api/property/initiate-payment/{propertyId}` | `Request` | `Injected Repo: iSafRepository` | `PostRazorPayPenaltyRebate, PropProperty` | `VERIFIED` |
| `legacyPaymentHolding` | `POST api/property/legacy-payment-holding` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropProperty, WfActiveDocument, PropDemand` | `VERIFIED` |
| `offlinePaymentHolding` | `POST api/property/offline-payment-holding` | `Request` | `Injected Repo: iSafRepository` | `PropTransaction, PropProperty, PropOwner` | `VERIFIED` |
| `paymentHolding` | `POST api/property/payment-holding` | `Request` | `Injected Repo: iSafRepository` | `PropRazorpayPenalrebate, PropTransaction, PropProperty` | `VERIFIED` |
| `comparativeDemand` | `POST api/property/prop-comparative-demand` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `UlbMaster, PropProperty` | `VERIFIED` |
| `propertyDues` | `POST api/property/prop-dues` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `None` | `VERIFIED` |
| `propPaymentHistory` | `POST api/property/prop-payment-history` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropTransaction, PropProperty` | `VERIFIED` |
| `propPaymentReceipt` | `POST api/property/prop-payment-receipt` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `UlbMaster, PropTransaction, PropPenaltyrebate` | `VERIFIED` |
| `proUlbReceipt` | `POST api/property/prop-ulb-receipt` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropTransaction` | `VERIFIED` |
| `propPaymentReceiptv1` | `POST api/property/prop-water-payment-receipt` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `UlbMaster, PropTransaction, PropPenaltyrebate` | `VERIFIED` |
| `clusterPayment` | `POST api/property/prop/cluster-payment` | `Request` | `Injected Repo: iSafRepository` | `PropTransaction, IdGeneration, PropTranDtl` | `VERIFIED` |
| `getClusterHoldingDues` | `POST api/property/prop/get-cluster-holding-due` | `$request->validate inline` | `Injected Repo: iSafRepository` | `Cluster, PropAdvance, Clusters` | `VERIFIED` |
| `generateHoldingDemand` | `POST api/property/v1/generate-holding-demand` | `$request->validate inline` | `Injected Repo: iSafRepository` | `YearlyDemandGeneration` | `VERIFIED` |

---

### LocationController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/LocationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 3
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `location_list` | `POST api/property/location` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropLocation` | `VERIFIED` |
| `bindLocationWithWards` | `POST api/property/location/ward-list` | `Validator::make inline rules` | `Direct Controller Implementation` | `UlbWardMaster` | `VERIFIED` |
| `mapLevel1` | `POST api/property/map/level1` | `Request` | `Direct Controller Implementation` | `UlbMaster, DataMap` | `VERIFIED` |

---

### MasterReferenceController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/MasterReferenceController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 205
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `addAboutUs` | `POST api/property/m-about-us-create` | `$request->validate inline` | `Direct Controller Implementation` | `AboutUsDetail` | `VERIFIED` |
| `deleteAboutUs` | `POST api/property/m-about-us-delete` | `$request->validate inline` | `Direct Controller Implementation` | `AboutUsDetail` | `VERIFIED` |
| `aboutUsbyId` | `POST api/property/m-about-us-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `AboutUsDetail` | `VERIFIED` |
| `listAboutUs` | `POST api/property/m-about-us-list` | `Request` | `Direct Controller Implementation` | `AboutUsDetail` | `VERIFIED` |
| `updateAboutUs` | `POST api/property/m-about-us-update` | `$request->validate inline` | `Direct Controller Implementation` | `AboutUsDetail` | `VERIFIED` |
| `addActRule` | `POST api/property/m-act-rules-create` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, ActRule` | `VERIFIED` |
| `deleteActRule` | `POST api/property/m-act-rules-delete` | `$request->validate inline` | `Direct Controller Implementation` | `ActRule` | `VERIFIED` |
| `actRulebyId` | `POST api/property/m-act-rules-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, ActRule` | `VERIFIED` |
| `listActRule` | `POST api/property/m-act-rules-list` | `Request` | `Direct Controller Implementation` | `DocUpload, ActRule` | `VERIFIED` |
| `updateActRule` | `POST api/property/m-act-rules-update` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, ActRule` | `VERIFIED` |
| `addAdministrative` | `POST api/property/m-administrative-create` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, Administrative` | `VERIFIED` |
| `deleteAdministrative` | `POST api/property/m-administrative-delete` | `$request->validate inline` | `Direct Controller Implementation` | `Administrative` | `VERIFIED` |
| `administrativebyId` | `POST api/property/m-administrative-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, Administrative` | `VERIFIED` |
| `listAdministrative` | `POST api/property/m-administrative-list` | `Request` | `Direct Controller Implementation` | `DocUpload, Administrative` | `VERIFIED` |
| `updateAdministrative` | `POST api/property/m-administrative-update` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, Administrative` | `VERIFIED` |
| `addAnnouncement` | `POST api/property/m-announcement-create` | `$request->validate inline` | `Direct Controller Implementation` | `Announcement` | `VERIFIED` |
| `deleteAnnouncementType` | `POST api/property/m-announcement-delete` | `$request->validate inline` | `Direct Controller Implementation` | `Announcement` | `VERIFIED` |
| `announcementTypebyId` | `POST api/property/m-announcement-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `Announcement` | `VERIFIED` |
| `announcementList` | `POST api/property/m-announcement-list` | `Request` | `Direct Controller Implementation` | `Announcement` | `VERIFIED` |
| `updateAnnouncementType` | `POST api/property/m-announcement-update` | `$request->validate inline` | `Direct Controller Implementation` | `Announcement` | `VERIFIED` |
| `addapp` | `POST api/property/m-app-create` | `$request->validate inline` | `Direct Controller Implementation` | `MMobileAppLink` | `VERIFIED` |
| `deleteapp` | `POST api/property/m-app-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MMobileAppLink` | `VERIFIED` |
| `appbyId` | `POST api/property/m-app-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MMobileAppLink` | `VERIFIED` |
| `appList` | `POST api/property/m-app-list` | `Request` | `Direct Controller Implementation` | `MMobileAppLink` | `VERIFIED` |
| `updateapp` | `POST api/property/m-app-update` | `$request->validate inline` | `Direct Controller Implementation` | `MMobileAppLink` | `VERIFIED` |
| `addAssetesv3` | `POST api/property/m-assets-create` | `$request->validate inline` | `Direct Controller Implementation` | `MAsset, DocUpload` | `VERIFIED` |
| `deleteAssetesv3` | `POST api/property/m-assets-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MAsset` | `VERIFIED` |
| `allListAssetesv3` | `POST api/property/m-assets-get` | `Request` | `Direct Controller Implementation` | `MAsset, DocUpload` | `VERIFIED` |
| `Assetesv3ById` | `POST api/property/m-assets-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MAsset, DocUpload` | `VERIFIED` |
| `editAssetesv3` | `POST api/property/m-assets-update` | `$request->validate inline` | `Direct Controller Implementation` | `MAsset, DocUpload` | `VERIFIED` |
| `addCDesk` | `POST api/property/m-c-desk-create` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDesk` | `VERIFIED` |
| `deleteCDesk` | `POST api/property/m-c-desk-delete` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDesk` | `VERIFIED` |
| `addCDeskDesc` | `POST api/property/m-c-desk-des-create` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDeskDescription` | `VERIFIED` |
| `deleteCDeskDesc` | `POST api/property/m-c-desk-des-delete` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDeskDescription` | `VERIFIED` |
| `CDeskDescbyId` | `POST api/property/m-c-desk-des-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDeskDescription` | `VERIFIED` |
| `updateCDeskDesc` | `POST api/property/m-c-desk-des-update` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDeskDescription` | `VERIFIED` |
| `CDeskbyId` | `POST api/property/m-c-desk-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDesk` | `VERIFIED` |
| `CDeskList` | `POST api/property/m-c-desk-list` | `Request` | `Direct Controller Implementation` | `CitizenDesk` | `VERIFIED` |
| `updateCDesk` | `POST api/property/m-c-desk-update` | `$request->validate inline` | `Direct Controller Implementation` | `CitizenDesk` | `VERIFIED` |
| `MCapitalValurRateById` | `POST api/property/m-capital-value-rate-get` | `$request->validate inline` | `Direct Controller Implementation` | `MCapitalValueRate` | `VERIFIED` |
| `allMCapitalValurRateList` | `POST api/property/m-capital-value-rate-list` | `Request` | `Direct Controller Implementation` | `MCapitalValueRate` | `VERIFIED` |
| `addContact` | `POST api/property/m-contact-create` | `$request->validate inline` | `Direct Controller Implementation` | `Contact` | `VERIFIED` |
| `deleteContact` | `POST api/property/m-contact-delete` | `$request->validate inline` | `Direct Controller Implementation` | `Contact` | `VERIFIED` |
| `ContactbyId` | `POST api/property/m-contact-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `Contact` | `VERIFIED` |
| `ContactList` | `POST api/property/m-contact-list` | `Request` | `Direct Controller Implementation` | `Contact` | `VERIFIED` |
| `updateContact` | `POST api/property/m-contact-update` | `$request->validate inline` | `Direct Controller Implementation` | `Contact` | `VERIFIED` |
| `dashboardData` | `POST api/property/m-dashboard-data` | `Request` | `new MEService` | `Department, MScheme, UsefulLink` | `VERIFIED` |
| `dashboardSliderData` | `POST api/property/m-dashboard-slider-data` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `deleteBlog` | `POST api/property/m-delete-blog` | `$request->validate inline` | `Direct Controller Implementation` | `BlogPost` | `VERIFIED` |
| `addDepartment` | `POST api/property/m-department-create` | `$request->validate inline` | `Direct Controller Implementation` | `Department` | `VERIFIED` |
| `deleteDepartment` | `POST api/property/m-department-delete` | `$request->validate inline` | `Direct Controller Implementation` | `Department` | `VERIFIED` |
| `departmentbyId` | `POST api/property/m-department-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `Department` | `VERIFIED` |
| `departmentList` | `POST api/property/m-department-list` | `Request` | `Direct Controller Implementation` | `Department` | `VERIFIED` |
| `updateDepartment` | `POST api/property/m-department-update` | `$request->validate inline` | `Direct Controller Implementation` | `Department` | `VERIFIED` |
| `addService` | `POST api/property/m-e-service-create` | `$request->validate inline` | `new MEService` | `None` | `VERIFIED` |
| `deleteService` | `POST api/property/m-e-service-delete` | `$request->validate inline` | `new MEService` | `None` | `VERIFIED` |
| `ServicebyId` | `POST api/property/m-e-service-get-by-id` | `$request->validate inline` | `new MEService` | `None` | `VERIFIED` |
| `ServiceList` | `POST api/property/m-e-service-list` | `Request` | `new MEService` | `None` | `VERIFIED` |
| `updateService` | `POST api/property/m-e-service-update` | `$request->validate inline` | `new MEService` | `None` | `VERIFIED` |
| `activeBlogsList` | `POST api/property/m-get-active-blog` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `blogById` | `POST api/property/m-get-blog-by-Id` | `$request->validate inline` | `Direct Controller Implementation` | `BlogPost, DocUpload` | `VERIFIED` |
| `addUserManualHeading` | `POST api/property/m-heading-create` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `deleteUserManualHeading` | `POST api/property/m-heading-delete` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `addHeadingDescription` | `POST api/property/m-heading-description-create` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeadingDescription` | `VERIFIED` |
| `deleteHeading` | `POST api/property/m-heading-description-delete` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeadingDescription` | `VERIFIED` |
| `userHeadingbyId` | `POST api/property/m-heading-description-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeadingDescription` | `VERIFIED` |
| `userHeadingList` | `POST api/property/m-heading-description-list` | `Request` | `Direct Controller Implementation` | `UserManualHeadingDescription` | `VERIFIED` |
| `updateHeading` | `POST api/property/m-heading-description-update` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeadingDescription` | `VERIFIED` |
| `userManualHeadingbyId` | `POST api/property/m-heading-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `userManualHeadingList` | `POST api/property/m-heading-list` | `Request` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `userManualHeadingListMaster` | `POST api/property/m-heading-list-master` | `Request` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `userManualHeadingListMasterDesc` | `POST api/property/m-heading-list-master-desc` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `updateUserManualHeading` | `POST api/property/m-heading-update` | `$request->validate inline` | `Direct Controller Implementation` | `UserManualHeading` | `VERIFIED` |
| `addImportantLink` | `POST api/property/m-important-link-create` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantLink` | `VERIFIED` |
| `deleteImportantLink` | `POST api/property/m-important-link-delete` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantLink` | `VERIFIED` |
| `importantLinkbyId` | `POST api/property/m-important-link-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantLink` | `VERIFIED` |
| `importantLinkList` | `POST api/property/m-important-link-list` | `Request` | `Direct Controller Implementation` | `ImportantLink` | `VERIFIED` |
| `updateImportantLink` | `POST api/property/m-important-link-update` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantLink` | `VERIFIED` |
| `allBlogs` | `POST api/property/m-list-of-all-blog` | `Request` | `Direct Controller Implementation` | `BlogPost, DocUpload` | `VERIFIED` |
| `addnews` | `POST api/property/m-news-create` | `$request->validate inline` | `Direct Controller Implementation` | `MNewsEvent` | `VERIFIED` |
| `deletenews` | `POST api/property/m-news-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MNewsEvent` | `VERIFIED` |
| `newsbyId` | `POST api/property/m-news-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MNewsEvent` | `VERIFIED` |
| `newsList` | `POST api/property/m-news-list` | `Request` | `Direct Controller Implementation` | `MNewsEvent` | `VERIFIED` |
| `updatenews` | `POST api/property/m-news-update` | `$request->validate inline` | `Direct Controller Implementation` | `MNewsEvent` | `VERIFIED` |
| `addNotice` | `POST api/property/m-notice-create` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantNotice` | `VERIFIED` |
| `deleteNoticeType` | `POST api/property/m-notice-delete` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantNotice` | `VERIFIED` |
| `noticeTypebyId` | `POST api/property/m-notice-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantNotice` | `VERIFIED` |
| `noticeList` | `POST api/property/m-notice-list` | `Request` | `Direct Controller Implementation` | `ImportantNotice` | `VERIFIED` |
| `updateNoticeType` | `POST api/property/m-notice-update` | `$request->validate inline` | `Direct Controller Implementation` | `ImportantNotice` | `VERIFIED` |
| `MPropBuildingRentalconstsById` | `POST api/property/m-prop-building-reantal-const-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropBuildingRentalconst` | `VERIFIED` |
| `allMPropBuildingRentalconstsList` | `POST api/property/m-prop-building-reantal-const-list` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalconst` | `VERIFIED` |
| `MPropBuildingRentalRatesById` | `POST api/property/m-prop-building-reantal-rate-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropBuildingRentalrate` | `VERIFIED` |
| `allMPropBuildingRentalRatesList` | `POST api/property/m-prop-building-reantal-rate-list` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalrate` | `VERIFIED` |
| `MPropCvRatesById` | `POST api/property/m-prop-cv-rate-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropCvRate` | `VERIFIED` |
| `allMPropCvRatesList` | `POST api/property/m-prop-cv-rate-list` | `Request` | `Direct Controller Implementation` | `MPropCvRate` | `VERIFIED` |
| `createForgeryType` | `POST api/property/m-prop-forgery-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `deleteForgeryType` | `POST api/property/m-prop-forgery-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `ForgeryTypebyId` | `POST api/property/m-prop-forgery-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `allForgeryTypelist` | `POST api/property/m-prop-forgery-type-list` | `Request` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `updateForgeryType` | `POST api/property/m-prop-forgery-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `MPropMultiFactorById` | `POST api/property/m-prop-multi-factor-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropMultiFactor` | `VERIFIED` |
| `allMPropMultiFactorList` | `POST api/property/m-prop-multi-factor-list` | `Request` | `Direct Controller Implementation` | `MPropMultiFactor` | `VERIFIED` |
| `MPropRentalValueById` | `POST api/property/m-prop-rental-value-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropRentalValue` | `VERIFIED` |
| `allMPropRentalValueList` | `POST api/property/m-prop-rental-value-list` | `Request` | `Direct Controller Implementation` | `MPropRentalValue` | `VERIFIED` |
| `MPropRoadTypeById` | `POST api/property/m-prop-road-types-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropRoadType` | `VERIFIED` |
| `allMPropRoadTypeList` | `POST api/property/m-prop-road-types-list` | `Request` | `Direct Controller Implementation` | `MPropRoadType` | `VERIFIED` |
| `MPropVacantRentalrateById` | `POST api/property/m-prop-vacant-rentalrates-get` | `$request->validate inline` | `Direct Controller Implementation` | `MPropVacantRentalrate` | `VERIFIED` |
| `allMPropVacantRentalrateList` | `POST api/property/m-prop-vacant-rentalrates-list` | `Request` | `Direct Controller Implementation` | `MPropVacantRentalrate` | `VERIFIED` |
| `addQuickLink` | `POST api/property/m-quick-link-create` | `$request->validate inline` | `Direct Controller Implementation` | `QuickLink` | `VERIFIED` |
| `deleteQuickLink` | `POST api/property/m-quick-link-delete` | `$request->validate inline` | `Direct Controller Implementation` | `QuickLink` | `VERIFIED` |
| `quickLinkbyId` | `POST api/property/m-quick-link-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `QuickLink` | `VERIFIED` |
| `quickLinkList` | `POST api/property/m-quick-link-list` | `Request` | `Direct Controller Implementation` | `QuickLink` | `VERIFIED` |
| `updateQuickLink` | `POST api/property/m-quick-link-update` | `$request->validate inline` | `Direct Controller Implementation` | `QuickLink` | `VERIFIED` |
| `addscheme` | `POST api/property/m-scheme-create` | `$request->validate inline` | `Direct Controller Implementation` | `MScheme` | `VERIFIED` |
| `deletescheme` | `POST api/property/m-scheme-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MScheme` | `VERIFIED` |
| `schemebyId` | `POST api/property/m-scheme-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MScheme` | `VERIFIED` |
| `schemeList` | `POST api/property/m-scheme-list` | `Request` | `Direct Controller Implementation` | `MScheme` | `VERIFIED` |
| `updatescheme` | `POST api/property/m-scheme-update` | `$request->validate inline` | `Direct Controller Implementation` | `MScheme` | `VERIFIED` |
| `createSlider` | `POST api/property/m-slider-create` | `$request->validate inline` | `Direct Controller Implementation` | `MSlider, DocUpload` | `VERIFIED` |
| `deleteSlider` | `POST api/property/m-slider-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MSlider` | `VERIFIED` |
| `allSliderList` | `POST api/property/m-slider-get` | `Request` | `Direct Controller Implementation` | `MSlider, DocUpload` | `VERIFIED` |
| `sliderById` | `POST api/property/m-slider-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MSlider, DocUpload` | `VERIFIED` |
| `updateSlider` | `POST api/property/m-slider-update` | `$request->validate inline` | `Direct Controller Implementation` | `MSlider, DocUpload` | `VERIFIED` |
| `storeBlogPost` | `POST api/property/m-store-blog-post` | `Validator::make inline rules` | `Direct Controller Implementation` | `BlogPost, DocUpload` | `VERIFIED` |
| `editBlog` | `POST api/property/m-update-blog` | `Validator::make inline rules` | `Direct Controller Implementation` | `BlogPost, DocUpload` | `VERIFIED` |
| `addUsefulLink` | `POST api/property/m-useful-link-create` | `$request->validate inline` | `Direct Controller Implementation` | `UsefulLink` | `VERIFIED` |
| `deleteUsefulLink` | `POST api/property/m-useful-link-delete` | `$request->validate inline` | `Direct Controller Implementation` | `UsefulLink` | `VERIFIED` |
| `usefulLinkbyId` | `POST api/property/m-useful-link-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `UsefulLink` | `VERIFIED` |
| `usefulLinkList` | `POST api/property/m-useful-link-list` | `Request` | `Direct Controller Implementation` | `UsefulLink` | `VERIFIED` |
| `updateUsefulLink` | `POST api/property/m-useful-link-update` | `$request->validate inline` | `Direct Controller Implementation` | `UsefulLink` | `VERIFIED` |
| `addWhatsNew` | `POST api/property/m-whats-new-create` | `$request->validate inline` | `Direct Controller Implementation` | `MWhat` | `VERIFIED` |
| `deleteWhatsNew` | `POST api/property/m-whats-new-delete` | `$request->validate inline` | `Direct Controller Implementation` | `MWhat` | `VERIFIED` |
| `WhatsNewbyId` | `POST api/property/m-whats-new-get-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `MWhat` | `VERIFIED` |
| `WhatsNewList` | `POST api/property/m-whats-new-list` | `Request` | `Direct Controller Implementation` | `MWhat` | `VERIFIED` |
| `updateWhatsNew` | `POST api/property/m-whats-new-update` | `$request->validate inline` | `Direct Controller Implementation` | `MWhat` | `VERIFIED` |
| `createConstructionType` | `POST api/property/ref-prop-construction-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `deleteConstructionType` | `POST api/property/ref-prop-construction-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `constructiontypebyId` | `POST api/property/ref-prop-construction-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `allConstructiontypelist` | `POST api/property/ref-prop-construction-type-list` | `Request` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `updateConstructionType` | `POST api/property/ref-prop-construction-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `createFloorType` | `POST api/property/ref-prop-floor-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `deleteFloorType` | `POST api/property/ref-prop-floor-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `floortypebyId` | `POST api/property/ref-prop-floor-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `allFloortypelist` | `POST api/property/ref-prop-floor-type-list` | `Request` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `updateFloorType` | `POST api/property/ref-prop-floor-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `createGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `deleteGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `GbBuildingtypebyId` | `POST api/property/ref-prop-gbbuilding-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `allGbBuildingtypelist` | `POST api/property/ref-prop-gbbuilding-type-list` | `Request` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `updateGbBuildingType` | `POST api/property/ref-prop-gbbuilding-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `createGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `deleteGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `GbPropUsagetypebyId` | `POST api/property/ref-prop-gbpropusage-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `allGbPropUsagetypelist` | `POST api/property/ref-prop-gbpropusage-type-list` | `Request` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `updateGbPropUsageType` | `POST api/property/ref-prop-gbpropusage-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `createObjectionType` | `POST api/property/ref-prop-objection-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `deleteObjectionType` | `POST api/property/ref-prop-objection-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `ObjectiontypebyId` | `POST api/property/ref-prop-objection-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `allObjectiontypelist` | `POST api/property/ref-prop-objection-type-list` | `Request` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `updateObjectionType` | `POST api/property/ref-prop-objection-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `createOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `deleteOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `OccupancyFactorbyId` | `POST api/property/ref-prop-occupancy-factor-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `allOccupancyFactorlist` | `POST api/property/ref-prop-occupancy-factor-list` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `updateOccupancyFactor` | `POST api/property/ref-prop-occupancy-factor-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `createOccupancyType` | `POST api/property/ref-prop-occupancy-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `deleteOccupancyType` | `POST api/property/ref-prop-occupancy-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `OccupancyTypebyId` | `POST api/property/ref-prop-occupancy-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `allOccupancyTypelist` | `POST api/property/ref-prop-occupancy-type-list` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `updateOccupancyType` | `POST api/property/ref-prop-occupancy-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `createOwnershipType` | `POST api/property/ref-prop-ownership-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `deleteOwnershipType` | `POST api/property/ref-prop-ownership-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `OwnershipTypebyId` | `POST api/property/ref-prop-ownership-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `allOwnershipTypelist` | `POST api/property/ref-prop-ownership-type-list` | `Request` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `updateOwnershipType` | `POST api/property/ref-prop-ownership-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `createPenaltyType` | `POST api/property/ref-prop-penalty-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `deletePenaltyType` | `POST api/property/ref-prop-penalty-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `PenaltyTypebyId` | `POST api/property/ref-prop-penalty-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `allPenaltyTypelist` | `POST api/property/ref-prop-penalty-type-list` | `Request` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `updatePenaltyType` | `POST api/property/ref-prop-penalty-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `createPropertyType` | `POST api/property/ref-prop-property-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `deletepropertyType` | `POST api/property/ref-prop-property-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `propertyTypebyId` | `POST api/property/ref-prop-property-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `allpropertyTypelist` | `POST api/property/ref-prop-property-type-list` | `Request` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `updatePropertyType` | `POST api/property/ref-prop-property-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `createRebateType` | `POST api/property/ref-prop-rebate-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `deleteRebateType` | `POST api/property/ref-prop-rebate-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `RebateTypebyId` | `POST api/property/ref-prop-rebate-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `allRebateTypelist` | `POST api/property/ref-prop-rebate-type-list` | `Request` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `updateRebateType` | `POST api/property/ref-prop-rebate-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `createRoadType` | `POST api/property/ref-prop-road-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `deleteroadType` | `POST api/property/ref-prop-road-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `roadTypebyId` | `POST api/property/ref-prop-road-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `allroadTypelist` | `POST api/property/ref-prop-road-type-list` | `Request` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `updateroadType` | `POST api/property/ref-prop-road-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `createPropTransferMode` | `POST api/property/ref-prop-transfer-mode-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `deleteTransferMode` | `POST api/property/ref-prop-transfer-mode-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `TransferModebyId` | `POST api/property/ref-prop-transfer-mode-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `allTransferModelist` | `POST api/property/ref-prop-transfer-mode-list` | `Request` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `updateTransferMode` | `POST api/property/ref-prop-transfer-mode-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `createPropUsageType` | `POST api/property/ref-prop-usage-type-create` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `deletePropUsageType` | `POST api/property/ref-prop-usage-type-delete` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `PropUsageTypebyId` | `POST api/property/ref-prop-usage-type-get` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `allPropUsageTypelist` | `POST api/property/ref-prop-usage-type-list` | `Request` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `updateUsageType` | `POST api/property/ref-prop-usage-type-update` | `$request->validate inline` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |

---

### ObjectionController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ObjectionController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 21
- **Constructor Injections**: `iObjectionRepository`
- **Traits Used**: `SafDoc, WorkflowTrait, Objection, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `addMembers` | `POST api/property/objection/add-members` | `Request` | `Injected Repo: iObjectionRepository` | `PropProperty, PropActiveObjection, PrefixIdGenerator` | `VERIFIED` |
| `applyObjection` | `POST api/property/objection/apply-objection` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `None` | `VERIFIED` |
| `approvalRejection` | `POST api/property/objection/approvalrejection` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `PropActiveObjectionDtl, PropFloor, WfRoleusermap` | `VERIFIED` |
| `backToCitizen` | `POST api/property/objection/backtocitizen` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `WorkflowTrack, PropActiveObjection` | `VERIFIED` |
| `btcInboxList` | `POST api/property/objection/btc-inbox` | `Request` | `Injected Repo: iObjectionRepository` | `WfWorkflowrolemap` | `VERIFIED` |
| `citizenDocList` | `POST api/property/objection/citizen-doc-list` | `Request` | `Injected Repo: iObjectionRepository` | `RefRequiredDocument` | `VERIFIED` |
| `citizenForgeryDocList` | `POST api/property/objection/citizen-forgery-doclist` | `Request` | `Injected Repo: iObjectionRepository` | `RefRequiredDocument` | `VERIFIED` |
| `commentIndependent` | `POST api/property/objection/comment-independent` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `WorkflowTrack, PropActiveObjection` | `VERIFIED` |
| `getDetailsById` | `POST api/property/objection/details` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `PropActiveObjectionDtl, CustomDetail, PropFloor` | `VERIFIED` |
| `objectionDocList` | `POST api/property/objection/doc-list` | `Request` | `Injected Repo: iObjectionRepository` | `PropActiveObjectionOwner, PropActiveObjection` | `VERIFIED` |
| `docVerifyReject` | `POST api/property/objection/doc-verify-reject` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `WfRoleusermap, PropActiveObjection, WfActiveDocument` | `VERIFIED` |
| `forgeryType` | `POST api/property/objection/forgery-type` | `Request` | `Injected Repo: iObjectionRepository` | `MPropForgeryType` | `VERIFIED` |
| `getUploadedDocuments` | `POST api/property/objection/get-uploaded-documents` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `DocUpload, PropActiveObjection, WfActiveDocument` | `VERIFIED` |
| `inbox` | `POST api/property/objection/inbox` | `Request` | `Injected Repo: iObjectionRepository` | `WfWorkflowrolemap` | `VERIFIED` |
| `postNextLevel` | `POST api/property/objection/next-level` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `WorkflowTrack, PropActiveObjection, WfWorkflow` | `VERIFIED` |
| `objectionType` | `GET|HEAD api/property/objection/objection-type` | `Request` | `Injected Repo: iObjectionRepository` | `RefPropObjectionType` | `VERIFIED` |
| `outbox` | `POST api/property/objection/outbox` | `Request` | `Injected Repo: iObjectionRepository` | `WfWorkflowrolemap` | `VERIFIED` |
| `ownerDetailById` | `POST api/property/objection/owner-detailById` | `Request` | `Injected Repo: iObjectionRepository` | `PropOwner` | `VERIFIED` |
| `postEscalate` | `POST api/property/objection/post-escalate` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `PropActiveObjection` | `VERIFIED` |
| `specialInbox` | `POST api/property/objection/special-inbox` | `Request` | `Injected Repo: iObjectionRepository` | `WfWorkflowrolemap` | `VERIFIED` |
| `uploadDocument` | `POST api/property/objection/upload-document` | `$request->validate inline` | `Injected Repo: iObjectionRepository` | `DocUpload, PropActiveObjection, WfActiveDocument` | `VERIFIED` |

---

### PropMaster
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/PropMaster.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 5
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `propConstructionType` | `GET|HEAD api/property/prop-const-type` | `Request` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `propOccupancyType` | `GET|HEAD api/property/prop-occupancy-type` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `propPropertyType` | `GET|HEAD api/property/prop-property-type` | `Request` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `propRoadType` | `GET|HEAD api/property/prop-road-type` | `Request` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `propUsageType` | `GET|HEAD api/property/prop-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |

---

### PropertyBifurcationController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/PropertyBifurcationController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 7
- **Constructor Injections**: `IPropertyBifurcation`
- **Instantiated in Constructor**: `PropertyDeactivate`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `addRecord` | `POST|GET|HEAD api/property/applyBifurcation/{id}` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `inbox` | `POST api/property/bifurcationInbox` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `outbox` | `POST api/property/bifurcationOutbox` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `postNextLevel` | `POST api/property/bifurcationPostNext` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `documentUpload` | `GET|POST|HEAD api/property/documentUpload/{id}` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `readSafDtls` | `GET|HEAD api/property/getSafDtls/{id}` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |
| `readHoldigbyNo` | `POST api/property/searchByHoldingNoBi` | `Request` | `Injected Repo: IPropertyBifurcation` | `None` | `VERIFIED` |

---

### PropertyController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/PropertyController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 10
- **Constructor Injections**: `iSafRepository`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `basicPropertyEdit` | `POST api/property/basic-edit` | `Request` | `Injected Repo: iSafRepository` | `PropOwner, PropProperty` | `VERIFIED` |
| `caretakerOtp` | `POST api/property/caretaker-otp` | `Request` | `Injected Repo: iSafRepository` | `PropOwner, ThirdPartyController, PropProperty` | `VERIFIED` |
| `caretakerPropertyTag` | `POST api/property/caretaker-property-tagging` | `$request->validate inline` | `Injected Repo: iSafRepository` | `ActiveCitizen, PropProperty` | `VERIFIED` |
| `checkAmalgamation` | `POST api/property/check-amalgamation` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `HoldingTaxController, PropFloor, PropProperty` | `VERIFIED` |
| `checkAmalgamationProperty` | `POST api/property/check-amalgamation-property` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `HoldingTaxController, PropFloor, PropProperty` | `VERIFIED` |
| `CheckProperty` | `POST api/property/check-property` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `PropActiveSaf, HoldingTaxController, PropActiveHarvesting` | `VERIFIED` |
| `citizenHoldingSaf` | `POST api/property/citizen-holding-saf` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropActiveSaf, ActiveCitizenUndercare, PropSaf` | `VERIFIED` |
| `citizenStatusUpdate` | `POST api/property/citizen-status-update` | `Validator::make inline rules` | `Injected Repo: iSafRepository` | `ActiveCitizen, ActiveCitizenUndercare` | `VERIFIED` |
| `getpropLatLong` | `POST api/property/getpropLatLong` | `$request->validate inline` | `Injected Repo: iSafRepository` | `PropDemand, PropProperty` | `VERIFIED` |
| `masterHoldingData` | `POST api/property/master-holding-data` | `Request` | `Injected Repo: iSafRepository` | `ActiveSafController, PropFloor, PropProperty` | `VERIFIED` |

---

### PropertyDeactivateController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/PropertyDeactivateController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 12
- **Constructor Injections**: `IPropertyDeactivate, iSafRepository`
- **Instantiated in Constructor**: `ActiveSafController, CommonFunction, ModelWard, WorkflowTrack`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `approvalRejection` | `POST api/property/approve-reject-deactivation-request` | `$request->validate inline` | `Injected Repo: IPropertyDeactivate` | `PropActiveDeactivationRequest, PropProperty` | `VERIFIED` |
| `commentIndependent` | `POST api/property/commentIndependentPrpDeactivation` | `$request->validate inline` | `Injected Repo: IPropertyDeactivate` | `PropActiveDeactivationRequest` | `VERIFIED` |
| `deactivatProperty` | `POST api/property/deactivationRequest` | `Request` | `Injected Repo: IPropertyDeactivate` | `PropDeactivationRequest` | `VERIFIED` |
| `readPorertyById` | `POST api/property/get-prop-dtl-for-deactivation` | `Request` | `Injected Repo: IPropertyDeactivate` | `PropActiveDeactivationRequest` | `VERIFIED` |
| `readDeactivationReq` | `POST api/property/getDeactivationDtls` | `Request` | `Injected Repo: IPropertyDeactivate` | `None` | `VERIFIED` |
| `getUplodedDocuments` | `POST api/property/getDocumentsPrpDeactivation` | `$request->validate inline` | `Injected Repo: IPropertyDeactivate` | `PropActiveDeactivationRequest` | `VERIFIED` |
| `inbox` | `POST api/property/inboxDeactivation` | `Request` | `Injected Repo: IPropertyDeactivate` | `None` | `VERIFIED` |
| `outbox` | `POST api/property/outboxDeactivation` | `Request` | `Injected Repo: IPropertyDeactivate` | `None` | `VERIFIED` |
| `postEscalate` | `POST api/property/postEscalateDeactivation` | `$request->validate inline` | `Injected Repo: IPropertyDeactivate` | `PropActiveDeactivationRequest` | `VERIFIED` |
| `postNextLevel` | `POST api/property/postNextDeactivation` | `Request` | `Injected Repo: IPropertyDeactivate` | `WfWorkflow, PropActiveDeactivationRequest` | `VERIFIED` |
| `readHoldigbyNo` | `POST api/property/searchByHoldingNo` | `Request` | `Injected Repo: IPropertyDeactivate` | `None` | `VERIFIED` |
| `specialInbox` | `POST api/property/specialDeactivation` | `Request` | `Injected Repo: IPropertyDeactivate` | `None` | `VERIFIED` |

---

### PropertyDetailsController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/PropertyDetailsController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 9
- **Constructor Injections**: `iPropertyDetailsRepo`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getUserDetails` | `POST api/property/active-application/get-user-details` | `Request` | `Injected Repo: iPropertyDetailsRepo` | `None` | `VERIFIED` |
| `getOwnerDetailsInfo` | `POST api/property/details/get-owner-details` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `PropSaf, PropProperty` | `VERIFIED` |
| `getPropertyGeoTag` | `POST api/property/get-Property-Geo-Tags` | `Request` | `Injected Repo: iPropertyDetailsRepo` | `None` | `VERIFIED` |
| `applicationsListByKey` | `POST api/property/get-filter-application-details` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `PropActiveSaf, PropObjection, PropActiveHarvesting` | `VERIFIED` |
| `propertyListByKey` | `POST api/property/get-filter-property-details` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `WfRoleusermap, PropProperty` | `VERIFIED` |
| `getListOfSaf` | `GET|HEAD api/property/get-list-saf` | `Request` | `Injected Repo: iPropertyDetailsRepo` | `PropActiveSaf` | `VERIFIED` |
| `propertyListByKeyGrv` | `POST api/property/grievance/get-filter-property-details` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `WfRoleusermap, PropProperty` | `VERIFIED` |
| `propertyHoldingInfoWatsappChat` | `POST api/property/propertyHoldingInfoWatsappChat` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `PropProperty` | `VERIFIED` |
| `propertyPaymentStatusWatsappChat` | `POST api/property/propertyPaymentStatusWatsappChat` | `$request->validate inline` | `Injected Repo: iPropertyDetailsRepo` | `PropProperty | prop_transactions` | `VERIFIED` |

---

### RainWaterHarvestingController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/RainWaterHarvestingController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 22
- **Constructor Injections**: `None`
- **Instantiated in Constructor**: `PropertyBifurcation`
- **Traits Used**: `SAF, Workflow, Ward, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getWardMasterData` | `GET|HEAD api/property/get-wardmaster-data` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `finalApprovalRejection` | `POST api/property/harvesting/approval-rejection` | `Validator::make inline rules` | `new CalculatePropById` | `WfRoleusermap, PropProperty, PropActiveHarvesting` | `VERIFIED` |
| `backToCitizen` | `POST api/property/harvesting/backtocitizen` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, WorkflowTrack, WfWorkflowrolemap` | `VERIFIED` |
| `btcInboxList` | `POST api/property/harvesting/btc-inbox` | `Request` | `Direct Controller Implementation` | `WfWorkflowrolemap, PropActiveHarvesting` | `VERIFIED` |
| `citizenDocList` | `POST api/property/harvesting/citizen-doc-list` | `Request` | `Direct Controller Implementation` | `RefRequiredDocument` | `VERIFIED` |
| `commentIndependent` | `POST api/property/harvesting/comment-independent` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, WorkflowTrack, WfRoleusermap` | `VERIFIED` |
| `getDetailsById` | `POST api/property/harvesting/details-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `CustomDetail, WorkflowMap, PropFloor` | `VERIFIED` |
| `docVerifyReject` | `POST api/property/harvesting/doc-verify-reject` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, WfRoleusermap, WfActiveDocument` | `VERIFIED` |
| `postEscalate` | `POST api/property/harvesting/escalate` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting` | `VERIFIED` |
| `fieldVerifiedInbox` | `POST api/property/harvesting/field-verification-inbox` | `Request` | `Direct Controller Implementation` | `WfWorkflowrolemap, PropActiveHarvesting` | `VERIFIED` |
| `getDocList` | `POST api/property/harvesting/get-doc-list` | `Request` | `Direct Controller Implementation` | `PropActiveHarvesting` | `VERIFIED` |
| `getTcVerifications` | `POST api/property/harvesting/get-tc-verifications` | `Request` | `Direct Controller Implementation` | `PropActiveHarvesting, PropRwhVerification, PropHarvestingGeotagUpload` | `VERIFIED` |
| `getUploadedDocuments` | `POST api/property/harvesting/get-uploaded-documents` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, DocUpload, WfActiveDocument` | `VERIFIED` |
| `harvestingInbox` | `POST api/property/harvesting/inbox` | `Request` | `Direct Controller Implementation` | `WfWorkflowrolemap, PropActiveHarvesting` | `VERIFIED` |
| `postNextLevel` | `POST api/property/harvesting/next-level` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, WorkflowTrack, WfWorkflow` | `VERIFIED` |
| `harvestingOutbox` | `POST api/property/harvesting/outbox` | `Request` | `Direct Controller Implementation` | `WfWorkflowrolemap, PropActiveHarvesting` | `VERIFIED` |
| `rejectionOfHarvesting` | `POST api/property/harvesting/rejection` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting` | `VERIFIED` |
| `siteVerification` | `POST api/property/harvesting/site-verification` | `$request->validate inline` | `Direct Controller Implementation` | `RefRequiredDocument, WfRoleusermap, PropActiveHarvesting` | `VERIFIED` |
| `specialInbox` | `POST api/property/harvesting/special-inbox` | `Request` | `Direct Controller Implementation` | `WfWorkflowrolemap, PropActiveHarvesting` | `VERIFIED` |
| `staticDetails` | `POST api/property/harvesting/static-details` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, PropHarvestingGeotagUpload, WfActiveDocument` | `VERIFIED` |
| `uploadDocument` | `POST api/property/harvesting/upload-document` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveHarvesting, DocUpload, WfActiveDocument` | `VERIFIED` |
| `waterHarvestingApplication` | `POST api/property/water-harvesting-application` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropActiveHarvesting, WorkflowTrack, PrefixIdGenerator` | `VERIFIED` |

---

### ReportController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ReportController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 40
- **Constructor Injections**: `IReport`
- **Instantiated in Constructor**: `CommonFunction`
- **Traits Used**: `Auth, Report`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `dashboardSummaryCards` | `POST api/property/dashboard-summary-cards` | `Request` | `Injected Repo: IReport` | `None | users, district_masters` | `VERIFIED` |
| `getLocality` | `POST api/property/geo` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `liveDashboardData` | `POST api/property/live-dashboard-data` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `liveDashboardUpdate` | `POST api/property/live-dashboard-update` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `mplReportCollectionNew` | `POST api/property/report/mpl-todayCollection-new` | `Validator::make inline rules` | `Injected Repo: IReport` | `PropTransaction, TradeTransaction, WaterTran` | `VERIFIED` |
| `ulbList` | `POST api/property/report/ulb-list` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `dcbPieChart` | `POST api/property/reports/dcb-piechart` | `Validator::make inline rules` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `listFY` | `POST api/property/reports/list-fy` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `mplReport` | `POST api/property/reports/mpl` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `mplReport2` | `POST api/property/reports/mpl2` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method mplReport2 not found in ReportController) |
| `notPaidFrom2016` | `POST api/property/reports/not-paid-from-2016` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `oldHolding` | `POST api/property/reports/oldHolding` | `$request->validate inline` | `Injected Repo: IReport` | `PropProperty` | `VERIFIED` |
| `PaymentModeWiseSummery` | `POST api/property/reports/payment-mode-wise-summery` | `Validator::make inline rules` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `previousYearPaidButnotCurrentYear` | `POST api/property/reports/previous-year-paid-not-current-year` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `bulkReceipt` | `POST api/property/reports/print-bulk-receipt` | `$request->validate inline` | `Injected Repo: IReport` | `HoldingTaxController, ActiveSafController, PropTransaction` | `VERIFIED` |
| `propSafCollection` | `POST api/property/reports/prop/saf/collection` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `collectionReport` | `POST api/property/reports/property/collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `PropDCB` | `POST api/property/reports/property/dcb` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `PropDeactedList` | `POST api/property/reports/property/deactivated-list` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `gbSafCollection` | `POST api/property/reports/property/gbsaf-collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `gbsafIndividualDemandCollection` | `POST api/property/reports/property/gbsaf-individual-demand-collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `PropFineRebate` | `POST api/property/reports/property/holding-wise-fine-rebate` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `propIndividualDemandCollection` | `POST api/property/reports/property/individual-demand-collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `PropPaymentModeWiseSummery` | `POST api/property/reports/property/payment-mode-wise-summery` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `safPropIndividualDemandAndCollection` | `POST api/property/reports/property/prop-saf-individual-demand-collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `PropWardWiseDCB` | `POST api/property/reports/property/ward-wise-dcb` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `rebateNpenalty` | `POST api/property/reports/rebate/penalty` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `safCollection` | `POST api/property/reports/saf/collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelformdetail` | `POST api/property/reports/saf/levelformdetail` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelUserPending` | `POST api/property/reports/saf/leveluserpending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelwisependingform` | `POST api/property/reports/saf/levelwisependingform` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `SafPaymentModeWiseSummery` | `POST api/property/reports/saf/payment-mode-wise-summery` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `safSamFamGeotagging` | `POST api/property/reports/saf/saf-sam-fam-geotagging` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `userWiseWardWireLevelPending` | `POST api/property/reports/saf/userWiseWardWireLevelPending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `userWiseLevelPending` | `POST api/property/reports/saf/userwiselevelpending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `wardWiseHoldingReport` | `POST api/property/reports/ward-wise-holding` | `Request` | `Injected Repo: IReport` | `PropDemand` | `VERIFIED` |
| `rolesByUlbAndModule` | `POST api/property/roles-by-ulb-module` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `todayCollectionDashboard` | `POST api/property/today-collection-dashboard` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `ulbModuleRoleCount` | `POST api/property/ulb-module-role-count-dashboard` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `ulbWiseApplicationCount` | `POST api/property/ulb-wise-count-dashboard` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |

---

### SafDocController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/SafDocController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 4
- **Constructor Injections**: `None`
- **Traits Used**: `SafDoc`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `docVerifyReject` | `POST api/property/saf/doc-verify-reject` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, WfRoleusermap, WfDocument` | `VERIFIED` |
| `docUpload` | `POST api/property/saf/document-upload` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, DocUpload, FacadesConfig` | `VERIFIED` |
| `getDocList` | `POST api/property/saf/get-doc-list` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, PropActiveSafsOwner` | `VERIFIED` |
| `getUploadDocuments` | `POST api/property/saf/get-uploaded-documents` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveSaf, FacadesConfig, PropSaf` | `VERIFIED` |

---

### WaiverController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/WaiverController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 9
- **Constructor Injections**: `None`
- **Traits Used**: `WaiverTrait, SafDetailsTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applicationDetails` | `POST api/property/waiver/application-detail` | `Validator::make inline rules` | `Direct Controller Implementation` | `WorkflowMap, CustomDetail, PropActiveSaf` | `VERIFIED` |
| `apply` | `POST api/property/waiver/apply` | `Validator::make inline rules` | `Direct Controller Implementation` | `PrefixIdGenerator, WfWorkflow, PropActiveWaiver` | `VERIFIED` |
| `approvedApplication` | `POST api/property/waiver/approved-list` | `Request` | `Direct Controller Implementation` | `PropActiveWaiver` | `VERIFIED` |
| `approvalRejection` | `POST api/property/waiver/final-approval` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveWaiver, WorkflowTrack, WfRoleusermap` | `VERIFIED` |
| `finalWaivedAmount` | `POST api/property/waiver/final-waived` | `Validator::make inline rules` | `Direct Controller Implementation` | `PropActiveWaiver` | `VERIFIED` |
| `inbox` | `POST api/property/waiver/list-inbox` | `Request` | `Direct Controller Implementation` | `WfWardUser, WfWorkflowrolemap, PropActiveWaiver` | `VERIFIED` |
| `staticDetails` | `POST api/property/waiver/static-details` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveWaiver` | `VERIFIED` |
| `getUploadedDocuments` | `POST api/property/waiver/uploaded-documents` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveWaiver, WfActiveDocument` | `VERIFIED` |
| `docVerifyReject` | `POST api/property/waiver/verify-document` | `$request->validate inline` | `Direct Controller Implementation` | `PropActiveWaiver, WfRoleusermap, WfActiveDocument` | `VERIFIED` |

---

### ZoneController
- **Namespace**: `App\Http\Controllers\Property`
- **File Location**: `app/Http/Controllers/Property/ZoneController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 1
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getZoneByUlb` | `POST api/property/get-zone-byUlb` | `Request` | `Direct Controller Implementation` | `ZoneMaster` | `VERIFIED` |

---

### ReferenceController
- **Namespace**: `App\Http\Controllers`
- **File Location**: `app/Http/Controllers/ReferenceController.php`
- **Associated Modules**: Property
- **Total Registered Actions**: 38
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `listBuildingRentalconst` | `POST api/property/building-rental-const` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalconst` | `VERIFIED` |
| `listPropBuildingRentalrate` | `POST api/property/building-rental-rate` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalrate` | `VERIFIED` |
| `listPropFloor` | `POST api/property/floor-type` | `Request` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `listPropgbBuildingUsagetype` | `POST api/property/gb-building-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `listPropgbPropUsagetype` | `POST api/property/gb-prop-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `listPropConstructiontype` | `POST api/property/get-construction-list` | `Request` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `listpropForgeryType` | `POST api/property/get-forgery-type` | `Request` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `listProptype` | `POST api/property/get-prop-type` | `Request` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `listPropRentalValue` | `POST api/property/get-rental-value` | `Request` | `Direct Controller Implementation` | `MPropRentalValue` | `VERIFIED` |
| `listPropObjectiontype` | `POST api/property/prop-objection-type` | `Request` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `listPropOccupancyFactor` | `POST api/property/prop-occupancy-factor` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `listPropOccupancytype` | `POST api/property/prop-occupancy-type` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `listPropOwnershiptype` | `POST api/property/prop-ownership-type` | `Request` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `listPropPenaltytype` | `POST api/property/prop-penalty-type` | `Request` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `listPropRebatetype` | `POST api/property/prop-rebate-type` | `Request` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `listPropRoadtype` | `POST api/property/prop-road-type` | `Request` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `listPropTransfermode` | `POST api/property/prop-transfer-mode` | `Request` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `listPropUsagetype` | `POST api/property/prop-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `listBuildingRentalconst` | `POST api/property/v1/building-rental-const` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalconst` | `VERIFIED` |
| `listPropBuildingRentalrate` | `POST api/property/v1/building-rental-rate` | `Request` | `Direct Controller Implementation` | `MPropBuildingRentalrate` | `VERIFIED` |
| `listPropFloor` | `POST api/property/v1/floor-type` | `Request` | `Direct Controller Implementation` | `RefPropFloor` | `VERIFIED` |
| `listPropgbBuildingUsagetype` | `POST api/property/v1/gb-building-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropGbbuildingusagetype` | `VERIFIED` |
| `listPropgbPropUsagetype` | `POST api/property/v1/gb-prop-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropGbpropusagetype` | `VERIFIED` |
| `listPropConstructiontype` | `POST api/property/v1/get-construction-list` | `Request` | `Direct Controller Implementation` | `RefPropConstructionType` | `VERIFIED` |
| `listpropForgeryType` | `POST api/property/v1/get-forgery-type` | `Request` | `Direct Controller Implementation` | `MPropForgeryType` | `VERIFIED` |
| `listProptype` | `POST api/property/v1/get-prop-type` | `Request` | `Direct Controller Implementation` | `RefPropType` | `VERIFIED` |
| `listPropRentalValue` | `POST api/property/v1/get-rental-value` | `Request` | `Direct Controller Implementation` | `MPropRentalValue` | `VERIFIED` |
| `listPropObjectiontype` | `POST api/property/v1/prop-objection-type` | `Request` | `Direct Controller Implementation` | `RefPropObjectionType` | `VERIFIED` |
| `listPropOccupancyFactor` | `POST api/property/v1/prop-occupancy-factor` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyFactor` | `VERIFIED` |
| `listPropOccupancytype` | `POST api/property/v1/prop-occupancy-type` | `Request` | `Direct Controller Implementation` | `RefPropOccupancyType` | `VERIFIED` |
| `listPropOwnershiptype` | `POST api/property/v1/prop-ownership-type` | `Request` | `Direct Controller Implementation` | `RefPropOwnershipType` | `VERIFIED` |
| `listPropPenaltytype` | `POST api/property/v1/prop-penalty-type` | `Request` | `Direct Controller Implementation` | `RefPropPenaltyType` | `VERIFIED` |
| `listPropRebatetype` | `POST api/property/v1/prop-rebate-type` | `Request` | `Direct Controller Implementation` | `RefPropRebateType` | `VERIFIED` |
| `listPropRoadtype` | `POST api/property/v1/prop-road-type` | `Request` | `Direct Controller Implementation` | `RefPropRoadType` | `VERIFIED` |
| `listPropTransfermode` | `POST api/property/v1/prop-transfer-mode` | `Request` | `Direct Controller Implementation` | `RefPropTransferMode` | `VERIFIED` |
| `listPropUsagetype` | `POST api/property/v1/prop-usage-type` | `Request` | `Direct Controller Implementation` | `RefPropUsageType` | `VERIFIED` |
| `listPropVacantRentalrate` | `POST api/property/v1/vacant-rental-rate` | `Request` | `Direct Controller Implementation` | `MPropVacantRentalrate` | `VERIFIED` |
| `listPropVacantRentalrate` | `POST api/property/vacant-rental-rate` | `Request` | `Direct Controller Implementation` | `MPropVacantRentalrate` | `VERIFIED` |

---

### ReportController
- **Namespace**: `App\Http\Controllers\Trade`
- **File Location**: `app/Http/Controllers/Trade/ReportController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 20
- **Constructor Injections**: `IReport`
- **Instantiated in Constructor**: `CommonFunction`
- **Traits Used**: `Auth`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applicationAgentNotice` | `POST api/trade/application/application-agent-notice` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `applicationStatus` | `POST api/trade/application/application-status` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `bulkPaymentRecipt` | `POST api/trade/application/bulk-payment-recipt` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `CollectionReports` | `POST api/trade/application/collection-reports` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `CollectionSummary` | `POST api/trade/application/collection-summary` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelformdetail` | `POST api/trade/application/levelformdetail` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelUserPending` | `POST api/trade/application/leveluserpending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `levelwisependingform` | `POST api/trade/application/levelwisependingform` | `Request` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `noticeSummary` | `POST api/trade/application/notice-summary` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method noticeSummary not found in ReportController) |
| `teamSummary` | `POST api/trade/application/team-summary` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `ApplicantionTrackStatus` | `POST api/trade/application/track-status` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `userWiseWardWiseLevelPending` | `POST api/trade/application/userWiseWardWiseLevelPending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `userWiseLevelPending` | `POST api/trade/application/userwiselevelpending` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `valideAndExpired` | `POST api/trade/application/valid-expire-list` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `tradeDaseboard` | `POST api/trade/dashboard` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `applicationTypeCollection` | `POST api/trade/dashboard-application-collection` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `userAppliedApplication` | `POST api/trade/dashboard-applied-application` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `collectionPerfomance` | `POST api/trade/dashboard-collection-perfomance` | `$request->validate inline` | `Injected Repo: IReport` | `None` | `VERIFIED` |
| `TcList` | `POST api/trade/tc-list` | `Request` | `Injected Repo: IReport` | `None | users` | `VERIFIED` |
| `WardList` | `POST api/trade/ward-list` | `Request` | `Injected Repo: IReport` | `UlbWardMaster` | `VERIFIED` |

---

### TradeApplication
- **Namespace**: `App\Http\Controllers\Trade`
- **File Location**: `app/Http/Controllers/Trade/TradeApplication.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 30
- **Constructor Injections**: `ITrade`
- **Instantiated in Constructor**: `ModelWard, CommonFunction, Trade, TradeParamFirmType, TradeParamOwnershipType, TradeParamCategoryType, TradeParamItemType, ActiveTradeLicence, ActiveTradeOwner`
- **Traits Used**: `TradeTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applyApplication` | `POST api/trade/application/add` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `approveReject` | `POST api/trade/application/approve-reject` | `$request->validate inline` | `Injected Repo: ITrade` | `UlbMaster, WorkflowTrack` | `VERIFIED` |
| `approvedApplication` | `POST api/trade/application/approved-list` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `backToCitizen` | `POST api/trade/application/btc` | `$request->validate inline` | `Injected Repo: ITrade` | `WorkflowTrack` | `VERIFIED` |
| `btcInbox` | `POST api/trade/application/btc-inbox` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `getDocList` | `POST api/trade/application/doc-list` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `documentVerify` | `POST api/trade/application/document-verify` | `$request->validate inline` | `Injected Repo: ITrade` | `WfActiveDocument` | `VERIFIED` |
| `getLicenceDtl` | `POST api/trade/application/dtl-by-id` | `Validator::make inline rules` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `updateBasicDtl` | `POST api/trade/application/edit` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `updateLicenseBo` | `POST api/trade/application/edit-by-id` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `postEscalate` | `POST api/trade/application/escalate` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `specialInbox` | `POST api/trade/application/escalate-inbox` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `paybleAmount` | `POST api/trade/application/get-demand` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `readIndipendentComment` | `POST api/trade/application/get-independent-comment` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `inbox` | `POST api/trade/application/inbox` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `addIndependentComment` | `POST api/trade/application/independent-comment` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `readApplication` | `POST api/trade/application/list` | `Validator::make inline rules` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `outbox` | `POST api/trade/application/outbox` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `PaymentCounter` | `POST api/trade/application/pay-charge` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `postNextLevel` | `POST api/trade/application/post-next` | `$request->validate inline` | `Injected Repo: ITrade` | `WfWorkflow, WorkflowTrack` | `VERIFIED` |
| `searchLicence` | `POST api/trade/application/search-for-renew` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `uploadDocument` | `POST api/trade/application/upload-document` | `Validator::make inline rules, $request->validate inline` | `Injected Repo: ITrade` | `documents, UlbMaster, DocUpload` | `VERIFIED` |
| `getUploadDocuments` | `POST api/trade/appliction/documents` | `$request->validate inline` | `Injected Repo: ITrade` | `DocUpload, WfActiveDocument` | `VERIFIED` |
| `getApplyData` | `POST api/trade/getApplyData` | `Validator::make inline rules` | `Injected Repo: ITrade` | `TradeLicence` | `VERIFIED` |
| `licenceCertificate` | `GET|HEAD api/trade/license-certificate/{id}` | `Validator::make inline rules` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `getDenialDetails` | `POST api/trade/notice/details` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `paymentReceipt` | `GET|HEAD api/trade/payment-receipt/{id}/{transectionId}` | `Validator::make inline rules` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `validateHoldingNo` | `POST api/trade/property/by-holding` | `Request` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `provisionalCertificate` | `GET|HEAD api/trade/provisional-certificate/{id}` | `Validator::make inline rules` | `Injected Repo: ITrade` | `None` | `VERIFIED` |
| `workflowDashordDetails` | `POST api/trade/workflow/dashboard-data` | `Request` | `Injected Repo: ITrade` | `WfWorkflow, WorkflowTrack` | `VERIFIED` |

---

### TradeCitizenController
- **Namespace**: `App\Http\Controllers\Trade`
- **File Location**: `app/Http/Controllers/Trade/TradeCitizenController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 18
- **Constructor Injections**: `ITradeCitizen`
- **Instantiated in Constructor**: `ModelWard, CommonFunction, Trade, Notice`
- **Traits Used**: `Auth, Razorpay`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getOwnerDetailsInfo` | `POST api/trade/application-search/get-owner-details` | `$request->validate inline` | `Injected Repo: ITradeCitizen` | `TradeLicence` | `SECURITY RISK` |
| `amendmentList` | `POST api/trade/application/amendable-list` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `readAtachedLicenseDtl` | `POST api/trade/application/attached-list` | `Request` | `Injected Repo: ITradeCitizen` | `ActiveCitizenUndercare` | `VERIFIED` |
| `applyApplication` | `POST api/trade/application/citizen-add` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `citizenApplication` | `POST api/trade/application/citizen-application` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `citizenApplicationByCitizenId` | `POST api/trade/application/citizen-application-list` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `readCitizenLicenceDtl` | `POST api/trade/application/citizen-by-id` | `$request->validate inline` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `readCitizenLicenceDtbylicences` | `POST api/trade/application/citizen-by-licence` | `$request->validate inline` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `citizenHistory` | `POST api/trade/application/citizen-history` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `getWardList` | `POST api/trade/application/citizen-ward-list` | `Validator::make inline rules` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `conformRazorPayTran` | `POST api/trade/application/conform-razorpay-tran` | `Validator::make inline rules` | `Injected Repo: ITradeCitizen` | `TradeTransaction, TradeRazorPayResponse, ActiveTradeLicence` | `VERIFIED` |
| `handeRazorPay` | `POST api/trade/application/pay-razorpay-charge` | `$request->validate inline` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `renewalList` | `POST api/trade/application/renewable-list` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `sendToLevel` | `POST api/trade/application/send-to-officer` | `Request` | `Injected Repo: ITradeCitizen` | `WorkflowTrack, ActiveTradeLicence` | `VERIFIED` |
| `citizenApplicationStatus` | `POST api/trade/application/status` | `$request->validate inline` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `surrenderList` | `POST api/trade/application/surrenderable-list` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |
| `licenceInfoWhatsappChat` | `POST api/trade/licenceInfoWhatsappChat` | `Validator::make inline rules` | `Injected Repo: ITradeCitizen` | `TradeLicence, TradeRenewal, ActiveTradeLicence` | `VERIFIED` |
| `getDenialDetails` | `POST api/trade/notice/citizen-details` | `Request` | `Injected Repo: ITradeCitizen` | `None` | `VERIFIED` |

---

### TradeNoticeController
- **Namespace**: `App\Http\Controllers\Trade`
- **File Location**: `app/Http/Controllers/Trade/TradeNoticeController.php`
- **Associated Modules**: Trade
- **Total Registered Actions**: 7
- **Constructor Injections**: `ITradeNotice`
- **Instantiated in Constructor**: `ModelWard, CommonFunction`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `applyDenail` | `POST api/trade/notice/add` | `$request->validate inline` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |
| `approveReject` | `POST api/trade/notice/approve-reject` | `Request` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |
| `btcInbox` | `POST api/trade/notice/btc-inbox` | `Request` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |
| `inbox` | `POST api/trade/notice/inbox` | `Request` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |
| `outbox` | `POST api/trade/notice/outbox` | `Request` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |
| `postNextLevel` | `POST api/trade/notice/post-next` | `$request->validate inline` | `Injected Repo: ITradeNotice` | `WfWorkflow, ActiveTradeNoticeConsumerDtl, WorkflowTrack` | `VERIFIED` |
| `denialview` | `POST api/trade/notice/view` | `Request` | `Injected Repo: ITradeNotice` | `None` | `VERIFIED` |

---

### ConsumerActionRequest
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/ConsumerActionRequest.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 5
- **Constructor Injections**: `None`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getInspectionData` | `POST api/water/request/discon/get-inspection-dtls` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterDisconnectionSiteInspections` | `VERIFIED` |
| `getSiteInspectionCompar` | `POST api/water/request/discon/getInspectinMaster` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterDisconnectionSiteInspections, WaterSiteInspection, WaterTran` | `VERIFIED` |
| `updateSiteInspection` | `POST api/water/request/discon/inspection` | `Request` | `Direct Controller Implementation` | `WaterDisconnectionSiteInspections, WaterSiteInspection` | `VERIFIED` |
| `cancelDisconnectionSitInspection` | `POST api/water/request/discon/sedule-cancel` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterDisconnectionSiteInspections` | `VERIFIED` |
| `setDisconnectionSitInspection` | `POST api/water/request/discon/sedule-inspection` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterDisconnectionSiteInspections` | `VERIFIED` |

---

### NewConnectionController
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/NewConnectionController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 43
- **Constructor Injections**: `iNewConnection`
- **Instantiated in Constructor**: `CommonFunction, CommonFunction`
- **Traits Used**: `Ward, Workflow, WaterTrait, SAF`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `getApplicationDetailsv1` | `POST api/water/admin/application/application-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApprovalApplicant, WaterApprovalApplicationDetail, WaterSiteInspectionsScheduling` | `VERIFIED` |
| `cancelSiteInspection` | `POST api/water/admin/application/cancel-inspection-scheduling` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspection, WaterSiteInspectionsScheduling, WaterPenaltyInstallment` | `VERIFIED` |
| `getDocToUploadv1` | `POST api/water/admin/application/document-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WfActiveDocument, WaterApprovalApplicationDetail, WaterRejectionApplicationDetail` | `VERIFIED` |
| `getApplicationDetailById` | `POST api/water/admin/application/get-details-by-id` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterTran, WaterPenaltyInstallment, WaterConnectionCharge` | `VERIFIED` |
| `getJeSiteDetails` | `POST api/water/admin/application/je-site-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspection, WaterSiteInspectionsScheduling` | `VERIFIED` |
| `listApplicationBydate` | `POST api/water/admin/application/list-details-by-date` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WaterPenaltyInstallment, WaterConnectionCharge` | `VERIFIED` |
| `onlineSiteInspection` | `POST api/water/admin/application/online-technical-inspection` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspection` | `VERIFIED` |
| `saveInspectionDateTime` | `POST api/water/admin/application/save-inspection-date` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspectionsScheduling` | `VERIFIED` |
| `getSiteInspectionDetails` | `POST api/water/admin/application/site-inspection-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspectionsScheduling` | `VERIFIED` |
| `getTechnicalInsDetails` | `POST api/water/admin/application/technical-inspection-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterSiteInspection` | `VERIFIED` |
| `searchApplicationByParameter` | `POST api/water/admin/search-application` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WaterSiteInspectionsScheduling` | `VERIFIED` |
| `index` | `GET|HEAD api/water/application/apply-new-connection` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method index not found in NewConnectionController) |
| `store` | `POST api/water/application/apply-new-connection` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `create` | `GET|HEAD api/water/application/apply-new-connection/create` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method create not found in NewConnectionController) |
| `show` | `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method show not found in NewConnectionController) |
| `update` | `PUT|PATCH api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method update not found in NewConnectionController) |
| `destroy` | `DELETE api/water/application/apply-new-connection/{apply_new_connection}` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method destroy not found in NewConnectionController) |
| `edit` | `GET|HEAD api/water/application/apply-new-connection/{apply_new_connection}/edit` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method edit not found in NewConnectionController) |
| `approvalRejectionWater` | `POST api/water/application/approval-rejection` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WfRoleusermap` | `VERIFIED` |
| `deleteWaterApplication` | `POST api/water/application/delete` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WaterApplicant, WaterPenaltyInstallment` | `VERIFIED` |
| `editWaterAppliction` | `POST api/water/application/edit` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplicant, waterAudit, WaterPenaltyInstallment` | `VERIFIED` |
| `getApplicationDetails` | `POST api/water/application/get-by-id` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplicant, WaterSiteInspectionsScheduling, WaterTran` | `VERIFIED` |
| `getActiveApplictaions` | `POST api/water/application/search` | `FormRequest: $key);` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `backToCitizen` | `POST api/water/back-to-citizen` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WorkflowTrack` | `VERIFIED` |
| `btcInbox` | `POST api/water/btc-inbox` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `getDocToUpload` | `POST api/water/citizen/get-doc-list` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WfActiveDocument, WaterConnectionCharge, WaterApplication` | `VERIFIED` |
| `commentIndependent` | `POST api/water/comment-independent` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WorkflowTrack, WfRoleusermap` | `VERIFIED` |
| `ConsumerInfoWatsappChat` | `POST api/water/consumer-info-watsapp-chat` | `$request->validate inline` | `Injected Repo: iNewConnection` | `WaterConsumer` | `VERIFIED` |
| `approvedWaterApplications` | `POST api/water/consumer/get-listed-details` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterConsumerInitialMeter, WaterConsumer, WaterConsumerDemand` | `VERIFIED` |
| `docVerifyRejects` | `POST api/water/doc-verify-reject` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WfRoleusermap, WfActiveDocument` | `VERIFIED` |
| `postEscalate` | `POST api/water/escalate` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication` | `VERIFIED` |
| `fieldVerifiedInbox` | `POST api/water/field-verified-inbox` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `getUploadDocuments` | `POST api/water/get-upload-documents` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, DocUpload, WfActiveDocument` | `VERIFIED` |
| `waterInbox` | `POST api/water/inbox` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `waterOutbox` | `POST api/water/outbox` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `postNextLevel` | `POST api/water/post-next-level` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `searchWaterConsumer` | `POST api/water/search-consumer` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterConsumer` | `VERIFIED` |
| `getSafHoldingDetails` | `POST api/water/search-holding-saf` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `PropActiveSafsFloor, PropFloor, PropActiveSaf` | `VERIFIED` |
| `testUploadDocument` | `POST api/water/simple-upload-document` | `Request` | `Injected Repo: iNewConnection` | `None` | `SECURITY RISK` |
| `waterSpecialInbox` | `POST api/water/special-inbox` | `Request` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `uploadWaterDoc` | `POST api/water/upload-document` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, DocUpload, WfActiveDocument` | `VERIFIED` |
| `getApplicationsDetails` | `POST api/water/workflow/application/get-by-id` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `None` | `VERIFIED` |
| `getDocList` | `POST api/water/workflow/get-doc-list` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterApplication, WaterApplicant` | `VERIFIED` |

---

### WaterApplication
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterApplication.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 8
- **Constructor Injections**: `IWaterNewConnection, iNewConnection`
- **Instantiated in Constructor**: `NewConnectionController`
- **Traits Used**: `Workflow`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `handeRazorPay` | `POST api/water/Razorpay-Orderid` | `Request` | `Injected Repo: IWaterNewConnection` | `None` | `VERIFIED` |
| `getJskAppliedApplication` | `POST api/water/admin/application/dashboard-data` | `Request` | `Injected Repo: IWaterNewConnection` | `WfRole, WaterTran, WfWorkflow` | `VERIFIED` |
| `workflowDashordDetails` | `POST api/water/admin/workflow/dashboard-data` | `Request` | `Injected Repo: IWaterNewConnection` | `WfRole, WorkflowTrack, WfWorkflow` | `VERIFIED` |
| `calWaterConCharge` | `POST api/water/cargeCal` | `Request` | `Injected Repo: IWaterNewConnection` | `None` | `VERIFIED` |
| `getCitizenApplication` | `POST api/water/citizenApplications` | `Request` | `Injected Repo: IWaterNewConnection` | `None` | `VERIFIED` |
| `calConsumerDemand` | `POST api/water/consumerChargeCal` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method calConsumerDemand not found in WaterApplication) |
| `readTransectionAndApl` | `POST api/water/getTranNo` | `Request` | `Injected Repo: IWaterNewConnection` | `None` | `VERIFIED` |
| `updateWaterApplication` | `POST api/water/update-applications` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method updateWaterApplication not found in WaterApplication) |

---

### WaterConsumer
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterConsumer.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 20
- **Constructor Injections**: `IConsumer`
- **Traits Used**: `Workflow, WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `addFixedRate` | `POST api/water/admin/consumer/add-fixed-rate` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterConsumerMeter` | `VERIFIED` |
| `applyDeactivation` | `POST api/water/admin/consumer/apply-deactivation` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack` | `VERIFIED` |
| `consumerDemandDeactivation` | `POST api/water/admin/consumer/demand-deactivation` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterWaterConsumer, WaterConsumerDemand` | `VERIFIED` |
| `saveGenerateConsumerDemand` | `POST api/water/admin/consumer/generate-demand` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterConsumerInitialMeter, WaterWaterConsumer, WaterMeterReadingDoc` | `VERIFIED` |
| `getMeterList` | `POST api/water/admin/consumer/get-meter-list` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterNewConnection, WaterConsumerMeter` | `VERIFIED` |
| `saveUpdateMeterDetails` | `POST api/water/admin/consumer/save-connection-meter` | `Request` | `Injected Repo: IConsumer` | `WaterConsumerMeter` | `VERIFIED` |
| `searchApplication` | `POST api/water/applicant/search` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `None` | `VERIFIED` |
| `applyWaterDisconnection` | `POST api/water/apply-water-disconnection` | `$request->validate inline` | `Injected Repo: IConsumer` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack` | `VERIFIED` |
| `applyConsumerRequest` | `POST api/water/applywater-ferule-cleaning` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterWaterConsumer, WaterConsumerCharge, WorkflowTrack` | `VERIFIED` |
| `checkDoc` | `POST api/water/check-doc` | `Request` | `Injected Repo: IConsumer` | `None` | `VERIFIED` |
| `addAdvance` | `POST api/water/consumer/add-advance` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterAdvance` | `VERIFIED` |
| `calculateMeterFixedReading` | `POST api/water/consumer/calculate/meter-fixed-reading` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterConsumerInitialMeter, WaterConsumerDemand` | `VERIFIED` |
| `viewCaretakenConnection` | `POST api/water/consumer/caretaken-connections` | `Request` | `Injected Repo: IConsumer` | `WaterWaterConsumer, ActiveCitizenUndercare` | `VERIFIED` |
| `generateMemo` | `POST api/water/consumer/generate-memo` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `UlbMaster, WaterSiteInspection, PropProperty` | `VERIFIED` |
| `getConnectionList` | `POST api/water/consumer/get-connection-list` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterConsumerMeter` | `VERIFIED` |
| `getOwnerDetailsInfo` | `POST api/water/consumer/get-owner-details` | `$request->validate inline` | `Injected Repo: IConsumer` | `WaterWaterConsumer, WaterApprovalApplicationDetail` | `SECURITY RISK` |
| `listConsumerDemand` | `POST api/water/consumer/list-demand` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterConsumerDemand, WaterConsumerMeter` | `VERIFIED` |
| `searchFixedConsumers` | `POST api/water/consumer/search-fixed-connections` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterWaterConsumer` | `VERIFIED` |
| `selfGenerateDemand` | `POST api/water/consumer/self-generate-demand` | `Validator::make inline rules` | `Injected Repo: IConsumer` | `WaterWaterConsumer` | `VERIFIED` |
| `getByApplicationId` | `POST api/water/get_consumer_details_by_id` | `FormRequest: 9223372036854775807"` | `Injected Repo: IConsumer` | `WaterConsumerApprovedRequest` | `VERIFIED` |

---

### WaterConsumerWfController
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterConsumerWfController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 26
- **Constructor Injections**: `None`
- **Traits Used**: `Ward, Workflow, WaterTrait, WaterRequestTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `approveRejectV1` | `POST api/water/consumer/deactivation-approve-rejet` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `btcInbox` | `POST api/water/consumer/deactivation-btc-inbox` | `Validator::make inline rules` | `Direct Controller Implementation` | `WfWorkflowrolemap, CommonFunction` | `VERIFIED` |
| `documentVerify` | `POST api/water/consumer/deactivation-documents-verify` | `Validator::make inline rules` | `Direct Controller Implementation` | `WfRoleusermap, WfActiveDocument` | `VERIFIED` |
| `specialInbox` | `POST api/water/consumer/deactivation-escalate-inbox` | `Validator::make inline rules` | `Direct Controller Implementation` | `WfWorkflowrolemap, CommonFunction` | `VERIFIED` |
| `getDocList` | `POST api/water/consumer/deactivation-get-doc-list` | `Validator::make inline rules` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `uploadDocuments` | `POST api/water/consumer/deactivation-upload-documents` | `Validator::make inline rules` | `Direct Controller Implementation` | `DocUpload, WfActiveDocument` | `VERIFIED` |
| `getUploadDocuments` | `POST api/water/consumer/deactivation-upload-documents_view` | `Validator::make inline rules` | `Direct Controller Implementation` | `DocUpload, WfActiveDocument` | `VERIFIED` |
| `getConsumerDetails` | `POST api/water/consumer/deactivation-worklfow-by-id` | `Request` | `Direct Controller Implementation` | `WorkflowMap, CustomDetail, WaterConsumerOwner` | `VERIFIED` |
| `getRejectedApplicationDetails` | `POST api/water/consumer/get-rejected-appl-details` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method getRejectedApplicationDetails not found in WaterConsumerWfController) |
| `getRejectedDocumentsOnly` | `POST api/water/consumer/get-rejected-documents-only` | `$request->validate inline` | `Direct Controller Implementation` | `DocUpload, WfActiveDocument` | `VERIFIED` |
| `consumerApprovalRejection` | `POST api/water/consumer/req/approval-rejection` | `FormRequest: //` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `consumerDocVerifyReject` | `POST api/water/consumer/req/doc-verify-reject` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method consumerDocVerifyReject not found in WaterConsumerWfController) |
| `getConsumerDocs` | `POST api/water/consumer/req/get-upload-documents` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method getConsumerDocs not found in WaterConsumerWfController) |
| `getWorkflow` | `POST api/water/consumer/req/get-worklfow-by-id` | `$request->validate inline` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `consumerInbox` | `POST api/water/consumer/req/inbox` | `Validator::make inline rules` | `Direct Controller Implementation` | `WfWorkflowrolemap, CommonFunction` | `VERIFIED` |
| `listDocToUpload` | `POST api/water/consumer/req/list-req-docs` | `None` | `Defective Route` | `None` | `BLOCKED`: Untraced (Method listDocToUpload not found in WaterConsumerWfController) |
| `consumerOutbox` | `POST api/water/consumer/req/outbox` | `Validator::make inline rules` | `Direct Controller Implementation` | `WfWorkflowrolemap, CommonFunction` | `VERIFIED` |
| `consumerPostNextLevel` | `POST api/water/consumer/req/post-next-level` | `FormRequest: //` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `postNextLevelApplication` | `POST api/water/consumers/post-next-level-appllication` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerActiveRequest, WfActiveDocument` | `VERIFIED` |
| `reuploadWaterDoc` | `POST api/water/consumers/reupload-water-doc` | `Validator::make inline rules` | `Direct Controller Implementation` | `DocUpload, document, WaterConsumerActiveRequest` | `VERIFIED` |
| `backToCitizen` | `POST api/water/deactivation/back-to-citizen` | `$request->validate inline` | `Direct Controller Implementation` | `WaterConsumerActiveRequest, WorkflowTrack, CommonFunction` | `VERIFIED` |
| `getApplicationDetails` | `POST api/water/get-details-applications-by-id` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerOwner, WaterConsumerCharge, WaterSiteInspectionsScheduling` | `VERIFIED` |
| `getRequestedApplication` | `POST api/water/get-details-disconnections` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `getRejectedDocumentsList` | `POST api/water/get-rejected-documents-list` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `getDocListForJe` | `POST api/water/workflow/get-doc-list-je` | `Validator::make inline rules` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `uploadWaterDocJe` | `POST api/water/workflow/upload-doc-je` | `Validator::make inline rules` | `Direct Controller Implementation` | `DocUpload, WfActiveDocument` | `VERIFIED` |

---

### WaterMasterController
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterMasterController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 10
- **Constructor Injections**: `iNewConnection`
- **Instantiated in Constructor**: `CommonFunction`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `createWaterPipelineType` | `POST api/water/create-water-pipeline-type` | `Request` | `Injected Repo: iNewConnection` | `WaterParamPipelineType` | `VERIFIED` |
| `createWaterPropTypeMstr` | `POST api/water/create-water-prop-type` | `Request` | `Injected Repo: iNewConnection` | `WaterPropertyTypeMstr` | `VERIFIED` |
| `dataActiveDeactive` | `POST api/water/delete-water-pipeline-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterParamPipelineType` | `VERIFIED` |
| `activeDeactiveById` | `POST api/water/delete-water-prop-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterPropertyTypeMstr` | `VERIFIED` |
| `getAllPipeline` | `POST api/water/get-water-pipeline-type` | `Request` | `Injected Repo: iNewConnection` | `WaterParamPipelineType` | `VERIFIED` |
| `getAllData` | `POST api/water/get-water-prop-type` | `Request` | `Injected Repo: iNewConnection` | `WaterPropertyTypeMstr` | `VERIFIED` |
| `getDataId` | `POST api/water/getby-id-water-pipeline-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterParamPipelineType` | `VERIFIED` |
| `getDataById` | `POST api/water/getby-id-water-prop-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterPropertyTypeMstr` | `VERIFIED` |
| `updateDataById` | `POST api/water/update-water-pipeline-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterParamPipelineType` | `VERIFIED` |
| `updateById` | `POST api/water/update-water-prop-type` | `Validator::make inline rules` | `Injected Repo: iNewConnection` | `WaterPropertyTypeMstr` | `VERIFIED` |

---

### WaterPaymentController
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterPaymentController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 16
- **Constructor Injections**: `None`
- **Traits Used**: `Ward, Workflow, Razorpay, WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `generateOfflinePaymentReceipt` | `POST api/water/admin/application/generate-payment-receipt` | `Validator::make inline rules` | `Direct Controller Implementation` | `UlbMaster, WaterTranFineRebate, WaterApprovalApplicationDetail` | `VERIFIED` |
| `generateOfflinePaymentReceiptv1` | `POST api/water/admin/dis-generate-payment-receipt` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterSiteInspection, WaterTranFineRebate, WaterConsumerCharge` | `VERIFIED` |
| `getApplicationPaymentHistory` | `POST api/water/application/payment/get-payment-history` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterApplication, WaterConnectionCharge, WaterPenaltyInstallment` | `VERIFIED` |
| `offlineConnectionPayment` | `POST api/water/application/payment/offline/pay-connection-charge` | `Request` | `Direct Controller Implementation` | `WaterSiteInspection, IdGeneration, WaterTran` | `VERIFIED` |
| `paymentHistory` | `POST api/water/citizen/payment-history` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterTran` | `VERIFIED` |
| `callDemandByMonth` | `POST api/water/consumer/calculate-month-demand` | `Validator::make inline rules` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `generateDemandPaymentReceipt` | `POST api/water/consumer/demand/generate-payment-receipt` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerTax, WaterConsumerMeter, UlbMaster` | `VERIFIED` |
| `getConsumerPaymentHistory` | `POST api/water/consumer/get-payment-history` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerDemand, WaterTranDetail, WaterConsumer` | `VERIFIED` |
| `offlineDemandPayment` | `POST api/water/consumer/offline-demand-payment` | `Request` | `Direct Controller Implementation` | `WaterAdjustment, waterTran, IdGeneration` | `VERIFIED` |
| `offlineConReqPayment` | `POST api/water/consumer/offline-request-payment` | `Request` | `Direct Controller Implementation` | `WaterConsumerCharge, IdGeneration, WaterTran` | `VERIFIED` |
| `initiateOnlineDemandPayment` | `POST api/water/consumer/online-demand-payment` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `initiateOnlineConRequestPayment` | `POST api/water/consumer/online-request-payment` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `getWaterUserCharges` | `POST api/water/consumer/water-user-charges` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerDemand, WaterConsumer` | `VERIFIED` |
| `getDisApplicationPaymentHistory` | `POST api/water/disconnection/payment/get-payment-history` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumerCharge, WaterPenaltyInstallment, WaterTran` | `VERIFIED` |
| `getWaterMasterData` | `POST api/water/master/get-listed-details` | `Request` | `Direct Controller Implementation` | `WaterConnectionThroughMstr, WaterPropertyTypeMstr, WaterOwnerTypeMstr` | `VERIFIED` |
| `saveSitedetails` | `POST api/water/site-verification/save-site-details` | `Request` | `Direct Controller Implementation` | `WaterSiteInspection, Charges, WaterSiteInspectionsScheduling` | `VERIFIED` |

---

### WaterReportController
- **Namespace**: `App\Http\Controllers\Water`
- **File Location**: `app/Http/Controllers/Water/WaterReportController.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 8
- **Constructor Injections**: `None`
- **Traits Used**: `WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `tcCollectionReport` | `POST api/water/aggregate-report` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `approveRejectReports` | `POST api/water/approve-reject-report` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterRejectionApplicationDetail, WaterApprovalApplicationDetail` | `VERIFIED` |
| `connectionCollection` | `POST api/water/connection-collection` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterTran | water_applications` | `VERIFIED` |
| `dcbPieChart` | `POST api/water/consumer/report/dcb-pie-chart` | `Request` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `wardWiseDCB` | `POST api/water/consumer/report/list-ward-dcb` | `Validator::make inline rules` | `Direct Controller Implementation` | `None` | `VERIFIED` |
| `levelWiseReport` | `POST api/water/level-wise-report` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterApplication` | `VERIFIED` |
| `newConnectioReport` | `POST api/water/new-connection-report` | `Validator::make inline rules` | `Direct Controller Implementation` | `WaterConsumer` | `VERIFIED` |
| `consumerReport` | `POST api/water/report-cosumer` | `Validator::make inline rules` | `Direct Controller Implementation` | `None` | `VERIFIED` |

---

### WaterNewConnection
- **Namespace**: `App\Repository\Water\Concrete`
- **File Location**: `app/Repository/Water/Concrete/WaterNewConnection.php`
- **Associated Modules**: Water
- **Total Registered Actions**: 1
- **Constructor Injections**: `None`
- **Instantiated in Constructor**: `ModelWard, CommonFunction`
- **Traits Used**: `Auth, WardPermission, Razorpay, WaterTrait`

#### Method Trace Matrix

| Method | HTTP Method & URI | Validations | Architecture / Downstream Layer | Models / Tables Touched | Status |
|---|---|---|---|---|---|
| `razorPayResponse` | `POST api/water/test` | `Request` | `Direct Controller Implementation` | `WaterRazorPayRequest, WaterPaymentController` | `VERIFIED` |

---
