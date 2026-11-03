# Property Module: Complete Route Inventory

## 1. Inventory Summary

- **Total Registered Property Routes**: 528
- **Total Traced Routes**: 526
- **Total Untraced / Defective Routes**: 2
- **Total Unique Controllers / Endpoints**: 28

### Route Distribution by Controller

| Controller | Functional Scope | Route Count | Status |
|---|---|---|---|
| `CitizenController` | App\Http\Controllers\CitizenController | 3 | All Traced |
| `JskController` | App\Http\Controllers\Dashboard\JskController | 2 | All Traced |
| `BankReconcillationController` | App\Http\Controllers\Payment\BankReconcillationController | 6 | All Traced |
| `CashVerificationController` | App\Http\Controllers\Payment\CashVerificationController | 7 | All Traced |
| `ActiveSafController` | App\Http\Controllers\Property\ActiveSafController | 32 | All Traced |
| `ActiveSafControllerV2` | App\Http\Controllers\Property\ActiveSafControllerV2 | 10 | All Traced |
| `ApplySafController` | App\Http\Controllers\Property\ApplySafController | 2 | All Traced |
| `CalculatorController` | App\Http\Controllers\Property\CalculatorController | 3 | All Traced |
| `ClusterController` | App\Http\Controllers\Property\ClusterController | 11 | 1 Untraced |
| `ConcessionController` | App\Http\Controllers\Property\ConcessionController | 17 | All Traced |
| `DocumentOperationController` | App\Http\Controllers\Property\DocumentOperationController | 1 | All Traced |
| `GbSafController` | App\Http\Controllers\Property\GbSafController | 22 | All Traced |
| `HoldingTaxController` | App\Http\Controllers\Property\HoldingTaxController | 24 | All Traced |
| `LocationController` | App\Http\Controllers\Property\LocationController | 3 | All Traced |
| `MasterReferenceController` | App\Http\Controllers\Property\MasterReferenceController | 205 | All Traced |
| `ObjectionController` | App\Http\Controllers\Property\ObjectionController | 21 | All Traced |
| `PropMaster` | App\Http\Controllers\Property\PropMaster | 5 | All Traced |
| `PropertyBifurcationController` | App\Http\Controllers\Property\PropertyBifurcationController | 7 | All Traced |
| `PropertyController` | App\Http\Controllers\Property\PropertyController | 10 | All Traced |
| `PropertyDeactivateController` | App\Http\Controllers\Property\PropertyDeactivateController | 12 | All Traced |
| `PropertyDetailsController` | App\Http\Controllers\Property\PropertyDetailsController | 9 | All Traced |
| `RainWaterHarvestingController` | App\Http\Controllers\Property\RainWaterHarvestingController | 22 | All Traced |
| `ReportController` | App\Http\Controllers\Property\ReportController | 40 | 1 Untraced |
| `SafDocController` | App\Http\Controllers\Property\SafDocController | 4 | All Traced |
| `WaiverController` | App\Http\Controllers\Property\WaiverController | 9 | All Traced |
| `ZoneController` | App\Http\Controllers\Property\ZoneController | 1 | All Traced |
| `ReferenceController` | App\Http\Controllers\ReferenceController | 38 | All Traced |
| `Closure` | Closure | 2 | All Traced |

---

## 2. Anomalies & Untraced Routes

| Method | URI | Controller@Method | Reason for Untraced Status |
|---|---|---|---|
| `POST` | `api/property/cluster/property-by-cluster` | `App\Http\Controllers\Property\ClusterController@propertyByCluster` | Untraced (Method propertyByCluster not found in ClusterController) |
| `POST` | `api/property/reports/mpl2` | `App\Http\Controllers\Property\ReportController@mplReport2` | Untraced (Method mplReport2 not found in ReportController) |

---

## 3. Comprehensive Route Inventory Table

| # | Method | URI | Route Name | Middleware | Controller | Method | Authentication | Authorization | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `POST` | `api/property/active-application/get-user-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getUserDetails` | AuthMaker | None | `Traced` |
| 2 | `POST` | `api/property/api-test` | `N/A` | `api, ApiKeyMiddleware` | `Closure` | `Closure` | API Key | None | `Traced` |
| 3 | `POST|GET|HEAD` | `api/property/applyBifurcation/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `addRecord` | Public | None | `Traced` |
| 4 | `POST` | `api/property/approve-reject-deactivation-request` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `approvalRejection` | AuthMaker | None | `Traced` |
| 5 | `POST` | `api/property/basic-edit` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `basicPropertyEdit` | AuthMaker | None | `Traced` |
| 6 | `POST` | `api/property/bifurcationInbox` | `N/A` | `api` | `PropertyBifurcationController` | `inbox` | Public | None | `Traced` |
| 7 | `POST` | `api/property/bifurcationOutbox` | `N/A` | `api` | `PropertyBifurcationController` | `outbox` | Public | None | `Traced` |
| 8 | `POST` | `api/property/bifurcationPostNext` | `N/A` | `api` | `PropertyBifurcationController` | `postNextLevel` | Public | None | `Traced` |
| 9 | `POST` | `api/property/building-rental-const` | `N/A` | `api` | `ReferenceController` | `listBuildingRentalconst` | Public | None | `Traced` |
| 10 | `POST` | `api/property/building-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropBuildingRentalrate` | Public | None | `Traced` |
| 11 | `POST` | `api/property/calculatePropertyTax` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `calculator` | AuthMaker | None | `Traced` |
| 12 | `POST` | `api/property/caretaker-otp` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `caretakerOtp` | AuthMaker | None | `Traced` |
| 13 | `POST` | `api/property/caretaker-property-tagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `caretakerPropertyTag` | AuthMaker | None | `Traced` |
| 14 | `POST` | `api/property/cash-receipt` | `N/A` | `api` | `CashVerificationController` | `cashReceipt` | Public | None | `Traced` |
| 15 | `POST` | `api/property/check-amalgamation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `checkAmalgamation` | AuthMaker | None | `Traced` |
| 16 | `POST` | `api/property/check-amalgamation-property` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `checkAmalgamationProperty` | AuthMaker | None | `Traced` |
| 17 | `POST` | `api/property/check-property` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `CheckProperty` | AuthMaker | None | `Traced` |
| 18 | `POST` | `api/property/cheque-clearance` | `N/A` | `api` | `BankReconcillationController` | `chequeClearance` | Public | None | `Traced` |
| 19 | `POST` | `api/property/cheque-dtl-by-id` | `N/A` | `api` | `BankReconcillationController` | `chequeDtlById` | Public | None | `Traced` |
| 20 | `POST` | `api/property/citizen-holding-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `citizenHoldingSaf` | AuthMaker | None | `Traced` |
| 21 | `POST` | `api/property/citizen-status-update` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `citizenStatusUpdate` | AuthMaker | None | `Traced` |
| 22 | `POST` | `api/property/citizen/details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `CitizenController` | `citizenDetailsWithCitizenId` | AuthMaker | None | `Traced` |
| 23 | `POST` | `api/property/citizen/property-count` | `N/A` | `api` | `CitizenController` | `propertyCount` | Public | None | `Traced` |
| 24 | `POST` | `api/property/citizen/property-water-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `citizenPropWaterDtls` | AuthMaker | None | `Traced` |
| 25 | `GET|POST|HEAD` | `api/property/citizens/applied-applications` | `N/A` | `api` | `CitizenController` | `getAllAppliedApplications` | Public | None | `Traced` |
| 26 | `POST` | `api/property/cluster/basic-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `clusterBasicDtls` | AuthMaker | None | `Traced` |
| 27 | `POST` | `api/property/cluster/delete-cluster-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `deleteClusterData` | AuthMaker | None | `Traced` |
| 28 | `POST` | `api/property/cluster/details-by-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `detailsByHolding` | AuthMaker | None | `Traced` |
| 29 | `POST` | `api/property/cluster/edit-cluster-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `editClusterDetails` | AuthMaker | None | `Traced` |
| 30 | `POST` | `api/property/cluster/get-all-clusters` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getAllClusters` | AuthMaker | None | `Traced` |
| 31 | `POST` | `api/property/cluster/get-cluster-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getClusterById` | AuthMaker | None | `Traced` |
| 32 | `POST` | `api/property/cluster/get-saf-by-safno` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getSafBySafNo` | AuthMaker | None | `Traced` |
| 33 | `POST` | `api/property/cluster/payment-history` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPaymentHistory` | AuthMaker | None | `Traced` |
| 34 | `POST` | `api/property/cluster/payment-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPaymentReceipt` | AuthMaker | None | `Traced` |
| 35 | `POST` | `api/property/cluster/property-by-cluster` | `N/A` | `api` | `ClusterController` | `propertyByCluster` | Public | None | `Untraced (Method propertyByCluster not found in ClusterController)` |
| 36 | `POST` | `api/property/cluster/save-cluster-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveClusterDetails` | AuthMaker | None | `Traced` |
| 37 | `POST` | `api/property/cluster/save-holding-in-cluster` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveHoldingInCluster` | AuthMaker | None | `Traced` |
| 38 | `POST` | `api/property/cluster/save-saf-in-cluster` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveSafInCluster` | AuthMaker | None | `Traced` |
| 39 | `POST` | `api/property/commentIndependentPrpDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 40 | `POST` | `api/property/concession/apply-concession` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `applyConcession` | AuthMaker | None | `Traced` |
| 41 | `POST` | `api/property/concession/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `approvalRejection` | AuthMaker | None | `Traced` |
| 42 | `POST` | `api/property/concession/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 43 | `POST` | `api/property/concession/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `btcInbox` | AuthMaker | None | `Traced` |
| 44 | `POST` | `api/property/concession/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 45 | `POST` | `api/property/concession/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getDetailsById` | AuthMaker | None | `Traced` |
| 46 | `POST` | `api/property/concession/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `concessionDocList` | AuthMaker | None | `Traced` |
| 47 | `POST` | `api/property/concession/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 48 | `POST` | `api/property/concession/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `escalateApplication` | AuthMaker | None | `Traced` |
| 49 | `POST` | `api/property/concession/get-doc-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getDocType` | AuthMaker | None | `Traced` |
| 50 | `POST` | `api/property/concession/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getUploadedDocuments` | AuthMaker | None | `Traced` |
| 51 | `POST` | `api/property/concession/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `inbox` | AuthMaker | None | `Traced` |
| 52 | `POST` | `api/property/concession/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 53 | `POST` | `api/property/concession/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `outbox` | AuthMaker | None | `Traced` |
| 54 | `POST` | `api/property/concession/owner-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getOwnerDetails` | AuthMaker | None | `Traced` |
| 55 | `POST` | `api/property/concession/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `specialInbox` | AuthMaker | None | `Traced` |
| 56 | `POST` | `api/property/concession/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `uploadDocument` | AuthMaker | None | `Traced` |
| 57 | `POST` | `api/property/dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `JskController` | `propDashboard` | AuthMaker | None | `Traced` |
| 58 | `POST` | `api/property/dashboard-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `JskController` | `propDashboardDtl` | AuthMaker | None | `Traced` |
| 59 | `POST` | `api/property/dashboard-summary-cards` | `N/A` | `api` | `ReportController` | `dashboardSummaryCards` | Public | None | `Traced` |
| 60 | `POST` | `api/property/deactivate-transaction` | `N/A` | `api` | `BankReconcillationController` | `deactivateTransaction` | Public | None | `Traced` |
| 61 | `POST` | `api/property/deactivate-transaction-dtl` | `N/A` | `api` | `BankReconcillationController` | `tranDeactivatedList` | Public | None | `Traced` |
| 62 | `POST` | `api/property/deactivationRequest` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `deactivatProperty` | AuthMaker | None | `Traced` |
| 63 | `GET|HEAD` | `api/property/demand-pdf/{propertyId}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateDemandPdf` | AuthMaker | None | `Traced` |
| 64 | `POST` | `api/property/details/get-owner-details` | `N/A` | `api` | `PropertyDetailsController` | `getOwnerDetailsInfo` | Public | None | `Traced` |
| 65 | `GET|POST|HEAD` | `api/property/documentUpload/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `documentUpload` | Public | None | `Traced` |
| 66 | `POST` | `api/property/edit-chequedtl` | `N/A` | `api` | `CashVerificationController` | `editChequeNo` | Public | None | `Traced` |
| 67 | `POST` | `api/property/floor-type` | `N/A` | `api` | `ReferenceController` | `listPropFloor` | Public | None | `Traced` |
| 68 | `POST` | `api/property/gb-building-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbBuildingUsagetype` | Public | None | `Traced` |
| 69 | `POST` | `api/property/gb-prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbPropUsagetype` | Public | None | `Traced` |
| 70 | `POST` | `api/property/gbsaf/back-to-citizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 71 | `POST` | `api/property/gbsaf/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `btcInbox` | AuthMaker | None | `Traced` |
| 72 | `POST` | `api/property/gbsaf/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `gbSafDetails` | AuthMaker | None | `Traced` |
| 73 | `POST` | `api/property/gbsaf/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 74 | `POST` | `api/property/gbsaf/final-approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `approvalRejectionGbSaf` | AuthMaker | None | `Traced` |
| 75 | `POST` | `api/property/gbsaf/geo-tagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `geoTagging` | AuthMaker | None | `Traced` |
| 76 | `POST` | `api/property/gbsaf/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getDocList` | AuthMaker | None | `Traced` |
| 77 | `POST` | `api/property/gbsaf/get-uploaded-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getUploadedDocuments` | AuthMaker | None | `Traced` |
| 78 | `POST` | `api/property/gbsaf/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `inbox` | AuthMaker | None | `Traced` |
| 79 | `POST` | `api/property/gbsaf/inbox-field-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `fieldVerifiedInbox` | AuthMaker | None | `Traced` |
| 80 | `POST` | `api/property/gbsaf/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 81 | `POST` | `api/property/gbsaf/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 82 | `POST` | `api/property/gbsaf/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `outbox` | AuthMaker | None | `Traced` |
| 83 | `POST` | `api/property/gbsaf/post-escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `postEscalate` | AuthMaker | None | `Traced` |
| 84 | `POST` | `api/property/gbsaf/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `siteVerification` | AuthMaker | None | `Traced` |
| 85 | `POST` | `api/property/gbsaf/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `specialInbox` | AuthMaker | None | `Traced` |
| 86 | `POST` | `api/property/gbsaf/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getStaticSafDetails` | AuthMaker | None | `Traced` |
| 87 | `POST` | `api/property/gbsaf/tc-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getTcVerifications` | AuthMaker | None | `Traced` |
| 88 | `POST` | `api/property/gbsaf/upload-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `uploadDocument` | AuthMaker | None | `Traced` |
| 89 | `POST` | `api/property/generate-orderId` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderIdv1` | AuthMaker | None | `Traced` |
| 90 | `POST` | `api/property/generate-prop-orderid` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderId` | AuthMaker | None | `Traced` |
| 91 | `POST` | `api/property/geo` | `N/A` | `api` | `ReportController` | `getLocality` | Public | None | `Traced` |
| 92 | `POST` | `api/property/get-Property-Geo-Tags` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getPropertyGeoTag` | AuthMaker | None | `Traced` |
| 93 | `POST` | `api/property/get-all-documents` | `N/A` | `api` | `DocumentOperationController` | `getAllDocuments` | Public | None | `Traced` |
| 94 | `POST` | `api/property/get-construction-list` | `N/A` | `api` | `ReferenceController` | `listPropConstructiontype` | Public | None | `Traced` |
| 95 | `POST` | `api/property/get-dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `dashboardDate` | AuthMaker | None | `Traced` |
| 96 | `POST` | `api/property/get-filter-application-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `applicationsListByKey` | AuthMaker | None | `Traced` |
| 97 | `POST` | `api/property/get-filter-property-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyListByKey` | AuthMaker | None | `Traced` |
| 98 | `POST` | `api/property/get-filter-property-details-gb` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `propertyGbListByKey` | AuthMaker | None | `Traced` |
| 99 | `POST` | `api/property/get-forgery-type` | `N/A` | `api` | `ReferenceController` | `listpropForgeryType` | Public | None | `Traced` |
| 100 | `POST` | `api/property/get-gb-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getGbHoldingDues` | AuthMaker | None | `Traced` |
| 101 | `POST` | `api/property/get-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingDues` | AuthMaker | None | `Traced` |
| 102 | `POST` | `api/property/get-holding-imp-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingImpDtls` | AuthMaker | None | `Traced` |
| 103 | `GET|HEAD` | `api/property/get-list-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getListOfSaf` | AuthMaker | None | `Traced` |
| 104 | `POST` | `api/property/get-prop-dtl-for-deactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readPorertyById` | AuthMaker | None | `Traced` |
| 105 | `POST` | `api/property/get-prop-type` | `N/A` | `api` | `ReferenceController` | `listProptype` | Public | None | `Traced` |
| 106 | `POST` | `api/property/get-rental-value` | `N/A` | `api` | `ReferenceController` | `listPropRentalValue` | Public | None | `Traced` |
| 107 | `POST` | `api/property/get-tran-by-holding-no` | `N/A` | `api` | `HoldingTaxController` | `getTransactionsByHoldingNo` | Public | None | `Traced` |
| 108 | `GET|HEAD` | `api/property/get-wardmaster-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getWardMasterData` | AuthMaker | None | `Traced` |
| 109 | `POST` | `api/property/get-zone-byUlb` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ZoneController` | `getZoneByUlb` | AuthMaker | None | `Traced` |
| 110 | `POST` | `api/property/getDeactivationDtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readDeactivationReq` | AuthMaker | None | `Traced` |
| 111 | `POST` | `api/property/getDocumentsPrpDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `getUplodedDocuments` | AuthMaker | None | `Traced` |
| 112 | `GET|HEAD` | `api/property/getSafDtls/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `readSafDtls` | Public | None | `Traced` |
| 113 | `POST` | `api/property/getpropLatLong` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `getpropLatLong` | AuthMaker | None | `Traced` |
| 114 | `POST` | `api/property/grievance/get-filter-property-details` | `N/A` | `api` | `PropertyDetailsController` | `propertyListByKeyGrv` | Public | None | `Traced` |
| 115 | `POST` | `api/property/harvesting/approval-rejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `finalApprovalRejection` | AuthMaker | None | `Traced` |
| 116 | `POST` | `api/property/harvesting/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 117 | `POST` | `api/property/harvesting/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `btcInboxList` | AuthMaker | None | `Traced` |
| 118 | `POST` | `api/property/harvesting/citizen-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `citizenDocList` | AuthMaker | None | `Traced` |
| 119 | `POST` | `api/property/harvesting/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 120 | `POST` | `api/property/harvesting/details-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getDetailsById` | AuthMaker | None | `Traced` |
| 121 | `POST` | `api/property/harvesting/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 122 | `POST` | `api/property/harvesting/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `postEscalate` | AuthMaker | None | `Traced` |
| 123 | `POST` | `api/property/harvesting/field-verification-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `fieldVerifiedInbox` | AuthMaker | None | `Traced` |
| 124 | `POST` | `api/property/harvesting/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getDocList` | AuthMaker | None | `Traced` |
| 125 | `POST` | `api/property/harvesting/get-tc-verifications` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getTcVerifications` | AuthMaker | None | `Traced` |
| 126 | `POST` | `api/property/harvesting/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getUploadedDocuments` | AuthMaker | None | `Traced` |
| 127 | `POST` | `api/property/harvesting/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `harvestingInbox` | AuthMaker | None | `Traced` |
| 128 | `POST` | `api/property/harvesting/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 129 | `POST` | `api/property/harvesting/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `harvestingOutbox` | AuthMaker | None | `Traced` |
| 130 | `POST` | `api/property/harvesting/rejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `rejectionOfHarvesting` | AuthMaker | None | `Traced` |
| 131 | `POST` | `api/property/harvesting/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `siteVerification` | AuthMaker | None | `Traced` |
| 132 | `POST` | `api/property/harvesting/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `specialInbox` | AuthMaker | None | `Traced` |
| 133 | `POST` | `api/property/harvesting/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `staticDetails` | AuthMaker | None | `Traced` |
| 134 | `POST` | `api/property/harvesting/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `uploadDocument` | AuthMaker | None | `Traced` |
| 135 | `GET|HEAD` | `api/property/health-check` | `N/A` | `api` | `Closure` | `Closure` | Public | None | `Traced` |
| 136 | `POST` | `api/property/inboxDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `inbox` | AuthMaker | None | `Traced` |
| 137 | `POST` | `api/property/independent/generate-prop-orderid` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderId` | AuthMaker | None | `Traced` |
| 138 | `POST` | `api/property/independent/get-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingDues` | AuthMaker | None | `Traced` |
| 139 | `GET|HEAD` | `api/property/initiate-payment/{propertyId}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `initiatePayment` | AuthMaker | None | `Traced` |
| 140 | `POST` | `api/property/legacy-payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `legacyPaymentHolding` | AuthMaker | None | `Traced` |
| 141 | `POST` | `api/property/list-cash-verification` | `N/A` | `api` | `CashVerificationController` | `cashVerificationList` | Public | None | `Traced` |
| 142 | `POST` | `api/property/live-dashboard-data` | `N/A` | `api` | `ReportController` | `liveDashboardData` | Public | None | `Traced` |
| 143 | `POST` | `api/property/live-dashboard-update` | `N/A` | `api` | `ReportController` | `liveDashboardUpdate` | Public | None | `Traced` |
| 144 | `POST` | `api/property/location` | `N/A` | `api` | `LocationController` | `location_list` | Public | None | `Traced` |
| 145 | `POST` | `api/property/location/ward-list` | `N/A` | `api` | `LocationController` | `bindLocationWithWards` | Public | None | `Traced` |
| 146 | `POST` | `api/property/m-about-us-create` | `N/A` | `api` | `MasterReferenceController` | `addAboutUs` | Public | None | `Traced` |
| 147 | `POST` | `api/property/m-about-us-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAboutUs` | Public | None | `Traced` |
| 148 | `POST` | `api/property/m-about-us-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `aboutUsbyId` | Public | None | `Traced` |
| 149 | `POST` | `api/property/m-about-us-list` | `N/A` | `api` | `MasterReferenceController` | `listAboutUs` | Public | None | `Traced` |
| 150 | `POST` | `api/property/m-about-us-update` | `N/A` | `api` | `MasterReferenceController` | `updateAboutUs` | Public | None | `Traced` |
| 151 | `POST` | `api/property/m-act-rules-create` | `N/A` | `api` | `MasterReferenceController` | `addActRule` | Public | None | `Traced` |
| 152 | `POST` | `api/property/m-act-rules-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteActRule` | Public | None | `Traced` |
| 153 | `POST` | `api/property/m-act-rules-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `actRulebyId` | Public | None | `Traced` |
| 154 | `POST` | `api/property/m-act-rules-list` | `N/A` | `api` | `MasterReferenceController` | `listActRule` | Public | None | `Traced` |
| 155 | `POST` | `api/property/m-act-rules-update` | `N/A` | `api` | `MasterReferenceController` | `updateActRule` | Public | None | `Traced` |
| 156 | `POST` | `api/property/m-administrative-create` | `N/A` | `api` | `MasterReferenceController` | `addAdministrative` | Public | None | `Traced` |
| 157 | `POST` | `api/property/m-administrative-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAdministrative` | Public | None | `Traced` |
| 158 | `POST` | `api/property/m-administrative-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `administrativebyId` | Public | None | `Traced` |
| 159 | `POST` | `api/property/m-administrative-list` | `N/A` | `api` | `MasterReferenceController` | `listAdministrative` | Public | None | `Traced` |
| 160 | `POST` | `api/property/m-administrative-update` | `N/A` | `api` | `MasterReferenceController` | `updateAdministrative` | Public | None | `Traced` |
| 161 | `POST` | `api/property/m-announcement-create` | `N/A` | `api` | `MasterReferenceController` | `addAnnouncement` | Public | None | `Traced` |
| 162 | `POST` | `api/property/m-announcement-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAnnouncementType` | Public | None | `Traced` |
| 163 | `POST` | `api/property/m-announcement-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `announcementTypebyId` | Public | None | `Traced` |
| 164 | `POST` | `api/property/m-announcement-list` | `N/A` | `api` | `MasterReferenceController` | `announcementList` | Public | None | `Traced` |
| 165 | `POST` | `api/property/m-announcement-update` | `N/A` | `api` | `MasterReferenceController` | `updateAnnouncementType` | Public | None | `Traced` |
| 166 | `POST` | `api/property/m-app-create` | `N/A` | `api` | `MasterReferenceController` | `addapp` | Public | None | `Traced` |
| 167 | `POST` | `api/property/m-app-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteapp` | Public | None | `Traced` |
| 168 | `POST` | `api/property/m-app-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `appbyId` | Public | None | `Traced` |
| 169 | `POST` | `api/property/m-app-list` | `N/A` | `api` | `MasterReferenceController` | `appList` | Public | None | `Traced` |
| 170 | `POST` | `api/property/m-app-update` | `N/A` | `api` | `MasterReferenceController` | `updateapp` | Public | None | `Traced` |
| 171 | `POST` | `api/property/m-assets-create` | `N/A` | `api` | `MasterReferenceController` | `addAssetesv3` | Public | None | `Traced` |
| 172 | `POST` | `api/property/m-assets-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAssetesv3` | Public | None | `Traced` |
| 173 | `POST` | `api/property/m-assets-get` | `N/A` | `api` | `MasterReferenceController` | `allListAssetesv3` | Public | None | `Traced` |
| 174 | `POST` | `api/property/m-assets-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `Assetesv3ById` | Public | None | `Traced` |
| 175 | `POST` | `api/property/m-assets-update` | `N/A` | `api` | `MasterReferenceController` | `editAssetesv3` | Public | None | `Traced` |
| 176 | `POST` | `api/property/m-c-desk-create` | `N/A` | `api` | `MasterReferenceController` | `addCDesk` | Public | None | `Traced` |
| 177 | `POST` | `api/property/m-c-desk-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteCDesk` | Public | None | `Traced` |
| 178 | `POST` | `api/property/m-c-desk-des-create` | `N/A` | `api` | `MasterReferenceController` | `addCDeskDesc` | Public | None | `Traced` |
| 179 | `POST` | `api/property/m-c-desk-des-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteCDeskDesc` | Public | None | `Traced` |
| 180 | `POST` | `api/property/m-c-desk-des-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `CDeskDescbyId` | Public | None | `Traced` |
| 181 | `POST` | `api/property/m-c-desk-des-update` | `N/A` | `api` | `MasterReferenceController` | `updateCDeskDesc` | Public | None | `Traced` |
| 182 | `POST` | `api/property/m-c-desk-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `CDeskbyId` | Public | None | `Traced` |
| 183 | `POST` | `api/property/m-c-desk-list` | `N/A` | `api` | `MasterReferenceController` | `CDeskList` | Public | None | `Traced` |
| 184 | `POST` | `api/property/m-c-desk-update` | `N/A` | `api` | `MasterReferenceController` | `updateCDesk` | Public | None | `Traced` |
| 185 | `POST` | `api/property/m-capital-value-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MCapitalValurRateById` | Public | None | `Traced` |
| 186 | `POST` | `api/property/m-capital-value-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMCapitalValurRateList` | Public | None | `Traced` |
| 187 | `POST` | `api/property/m-contact-create` | `N/A` | `api` | `MasterReferenceController` | `addContact` | Public | None | `Traced` |
| 188 | `POST` | `api/property/m-contact-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteContact` | Public | None | `Traced` |
| 189 | `POST` | `api/property/m-contact-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `ContactbyId` | Public | None | `Traced` |
| 190 | `POST` | `api/property/m-contact-list` | `N/A` | `api` | `MasterReferenceController` | `ContactList` | Public | None | `Traced` |
| 191 | `POST` | `api/property/m-contact-update` | `N/A` | `api` | `MasterReferenceController` | `updateContact` | Public | None | `Traced` |
| 192 | `POST` | `api/property/m-dashboard-data` | `N/A` | `api` | `MasterReferenceController` | `dashboardData` | Public | None | `Traced` |
| 193 | `POST` | `api/property/m-dashboard-slider-data` | `N/A` | `api` | `MasterReferenceController` | `dashboardSliderData` | Public | None | `Traced` |
| 194 | `POST` | `api/property/m-delete-blog` | `N/A` | `api` | `MasterReferenceController` | `deleteBlog` | Public | None | `Traced` |
| 195 | `POST` | `api/property/m-department-create` | `N/A` | `api` | `MasterReferenceController` | `addDepartment` | Public | None | `Traced` |
| 196 | `POST` | `api/property/m-department-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteDepartment` | Public | None | `Traced` |
| 197 | `POST` | `api/property/m-department-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `departmentbyId` | Public | None | `Traced` |
| 198 | `POST` | `api/property/m-department-list` | `N/A` | `api` | `MasterReferenceController` | `departmentList` | Public | None | `Traced` |
| 199 | `POST` | `api/property/m-department-update` | `N/A` | `api` | `MasterReferenceController` | `updateDepartment` | Public | None | `Traced` |
| 200 | `POST` | `api/property/m-e-service-create` | `N/A` | `api` | `MasterReferenceController` | `addService` | Public | None | `Traced` |
| 201 | `POST` | `api/property/m-e-service-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteService` | Public | None | `Traced` |
| 202 | `POST` | `api/property/m-e-service-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `ServicebyId` | Public | None | `Traced` |
| 203 | `POST` | `api/property/m-e-service-list` | `N/A` | `api` | `MasterReferenceController` | `ServiceList` | Public | None | `Traced` |
| 204 | `POST` | `api/property/m-e-service-update` | `N/A` | `api` | `MasterReferenceController` | `updateService` | Public | None | `Traced` |
| 205 | `POST` | `api/property/m-get-active-blog` | `N/A` | `api` | `MasterReferenceController` | `activeBlogsList` | Public | None | `Traced` |
| 206 | `POST` | `api/property/m-get-blog-by-Id` | `N/A` | `api` | `MasterReferenceController` | `blogById` | Public | None | `Traced` |
| 207 | `POST` | `api/property/m-heading-create` | `N/A` | `api` | `MasterReferenceController` | `addUserManualHeading` | Public | None | `Traced` |
| 208 | `POST` | `api/property/m-heading-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteUserManualHeading` | Public | None | `Traced` |
| 209 | `POST` | `api/property/m-heading-description-create` | `N/A` | `api` | `MasterReferenceController` | `addHeadingDescription` | Public | None | `Traced` |
| 210 | `POST` | `api/property/m-heading-description-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteHeading` | Public | None | `Traced` |
| 211 | `POST` | `api/property/m-heading-description-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `userHeadingbyId` | Public | None | `Traced` |
| 212 | `POST` | `api/property/m-heading-description-list` | `N/A` | `api` | `MasterReferenceController` | `userHeadingList` | Public | None | `Traced` |
| 213 | `POST` | `api/property/m-heading-description-update` | `N/A` | `api` | `MasterReferenceController` | `updateHeading` | Public | None | `Traced` |
| 214 | `POST` | `api/property/m-heading-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingbyId` | Public | None | `Traced` |
| 215 | `POST` | `api/property/m-heading-list` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingList` | Public | None | `Traced` |
| 216 | `POST` | `api/property/m-heading-list-master` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingListMaster` | Public | None | `Traced` |
| 217 | `POST` | `api/property/m-heading-list-master-desc` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingListMasterDesc` | Public | None | `Traced` |
| 218 | `POST` | `api/property/m-heading-update` | `N/A` | `api` | `MasterReferenceController` | `updateUserManualHeading` | Public | None | `Traced` |
| 219 | `POST` | `api/property/m-important-link-create` | `N/A` | `api` | `MasterReferenceController` | `addImportantLink` | Public | None | `Traced` |
| 220 | `POST` | `api/property/m-important-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteImportantLink` | Public | None | `Traced` |
| 221 | `POST` | `api/property/m-important-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `importantLinkbyId` | Public | None | `Traced` |
| 222 | `POST` | `api/property/m-important-link-list` | `N/A` | `api` | `MasterReferenceController` | `importantLinkList` | Public | None | `Traced` |
| 223 | `POST` | `api/property/m-important-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateImportantLink` | Public | None | `Traced` |
| 224 | `POST` | `api/property/m-list-of-all-blog` | `N/A` | `api` | `MasterReferenceController` | `allBlogs` | Public | None | `Traced` |
| 225 | `POST` | `api/property/m-news-create` | `N/A` | `api` | `MasterReferenceController` | `addnews` | Public | None | `Traced` |
| 226 | `POST` | `api/property/m-news-delete` | `N/A` | `api` | `MasterReferenceController` | `deletenews` | Public | None | `Traced` |
| 227 | `POST` | `api/property/m-news-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `newsbyId` | Public | None | `Traced` |
| 228 | `POST` | `api/property/m-news-list` | `N/A` | `api` | `MasterReferenceController` | `newsList` | Public | None | `Traced` |
| 229 | `POST` | `api/property/m-news-update` | `N/A` | `api` | `MasterReferenceController` | `updatenews` | Public | None | `Traced` |
| 230 | `POST` | `api/property/m-notice-create` | `N/A` | `api` | `MasterReferenceController` | `addNotice` | Public | None | `Traced` |
| 231 | `POST` | `api/property/m-notice-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteNoticeType` | Public | None | `Traced` |
| 232 | `POST` | `api/property/m-notice-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `noticeTypebyId` | Public | None | `Traced` |
| 233 | `POST` | `api/property/m-notice-list` | `N/A` | `api` | `MasterReferenceController` | `noticeList` | Public | None | `Traced` |
| 234 | `POST` | `api/property/m-notice-update` | `N/A` | `api` | `MasterReferenceController` | `updateNoticeType` | Public | None | `Traced` |
| 235 | `POST` | `api/property/m-prop-building-reantal-const-get` | `N/A` | `api` | `MasterReferenceController` | `MPropBuildingRentalconstsById` | Public | None | `Traced` |
| 236 | `POST` | `api/property/m-prop-building-reantal-const-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropBuildingRentalconstsList` | Public | None | `Traced` |
| 237 | `POST` | `api/property/m-prop-building-reantal-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MPropBuildingRentalRatesById` | Public | None | `Traced` |
| 238 | `POST` | `api/property/m-prop-building-reantal-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropBuildingRentalRatesList` | Public | None | `Traced` |
| 239 | `POST` | `api/property/m-prop-cv-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MPropCvRatesById` | Public | None | `Traced` |
| 240 | `POST` | `api/property/m-prop-cv-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropCvRatesList` | Public | None | `Traced` |
| 241 | `POST` | `api/property/m-prop-forgery-type-create` | `N/A` | `api` | `MasterReferenceController` | `createForgeryType` | Public | None | `Traced` |
| 242 | `POST` | `api/property/m-prop-forgery-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteForgeryType` | Public | None | `Traced` |
| 243 | `POST` | `api/property/m-prop-forgery-type-get` | `N/A` | `api` | `MasterReferenceController` | `ForgeryTypebyId` | Public | None | `Traced` |
| 244 | `POST` | `api/property/m-prop-forgery-type-list` | `N/A` | `api` | `MasterReferenceController` | `allForgeryTypelist` | Public | None | `Traced` |
| 245 | `POST` | `api/property/m-prop-forgery-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateForgeryType` | Public | None | `Traced` |
| 246 | `POST` | `api/property/m-prop-multi-factor-get` | `N/A` | `api` | `MasterReferenceController` | `MPropMultiFactorById` | Public | None | `Traced` |
| 247 | `POST` | `api/property/m-prop-multi-factor-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropMultiFactorList` | Public | None | `Traced` |
| 248 | `POST` | `api/property/m-prop-rental-value-get` | `N/A` | `api` | `MasterReferenceController` | `MPropRentalValueById` | Public | None | `Traced` |
| 249 | `POST` | `api/property/m-prop-rental-value-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropRentalValueList` | Public | None | `Traced` |
| 250 | `POST` | `api/property/m-prop-road-types-get` | `N/A` | `api` | `MasterReferenceController` | `MPropRoadTypeById` | Public | None | `Traced` |
| 251 | `POST` | `api/property/m-prop-road-types-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropRoadTypeList` | Public | None | `Traced` |
| 252 | `POST` | `api/property/m-prop-vacant-rentalrates-get` | `N/A` | `api` | `MasterReferenceController` | `MPropVacantRentalrateById` | Public | None | `Traced` |
| 253 | `POST` | `api/property/m-prop-vacant-rentalrates-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropVacantRentalrateList` | Public | None | `Traced` |
| 254 | `POST` | `api/property/m-quick-link-create` | `N/A` | `api` | `MasterReferenceController` | `addQuickLink` | Public | None | `Traced` |
| 255 | `POST` | `api/property/m-quick-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteQuickLink` | Public | None | `Traced` |
| 256 | `POST` | `api/property/m-quick-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `quickLinkbyId` | Public | None | `Traced` |
| 257 | `POST` | `api/property/m-quick-link-list` | `N/A` | `api` | `MasterReferenceController` | `quickLinkList` | Public | None | `Traced` |
| 258 | `POST` | `api/property/m-quick-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateQuickLink` | Public | None | `Traced` |
| 259 | `POST` | `api/property/m-scheme-create` | `N/A` | `api` | `MasterReferenceController` | `addscheme` | Public | None | `Traced` |
| 260 | `POST` | `api/property/m-scheme-delete` | `N/A` | `api` | `MasterReferenceController` | `deletescheme` | Public | None | `Traced` |
| 261 | `POST` | `api/property/m-scheme-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `schemebyId` | Public | None | `Traced` |
| 262 | `POST` | `api/property/m-scheme-list` | `N/A` | `api` | `MasterReferenceController` | `schemeList` | Public | None | `Traced` |
| 263 | `POST` | `api/property/m-scheme-update` | `N/A` | `api` | `MasterReferenceController` | `updatescheme` | Public | None | `Traced` |
| 264 | `POST` | `api/property/m-slider-create` | `N/A` | `api` | `MasterReferenceController` | `createSlider` | Public | None | `Traced` |
| 265 | `POST` | `api/property/m-slider-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteSlider` | Public | None | `Traced` |
| 266 | `POST` | `api/property/m-slider-get` | `N/A` | `api` | `MasterReferenceController` | `allSliderList` | Public | None | `Traced` |
| 267 | `POST` | `api/property/m-slider-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `sliderById` | Public | None | `Traced` |
| 268 | `POST` | `api/property/m-slider-update` | `N/A` | `api` | `MasterReferenceController` | `updateSlider` | Public | None | `Traced` |
| 269 | `POST` | `api/property/m-store-blog-post` | `N/A` | `api` | `MasterReferenceController` | `storeBlogPost` | Public | None | `Traced` |
| 270 | `POST` | `api/property/m-update-blog` | `N/A` | `api` | `MasterReferenceController` | `editBlog` | Public | None | `Traced` |
| 271 | `POST` | `api/property/m-useful-link-create` | `N/A` | `api` | `MasterReferenceController` | `addUsefulLink` | Public | None | `Traced` |
| 272 | `POST` | `api/property/m-useful-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteUsefulLink` | Public | None | `Traced` |
| 273 | `POST` | `api/property/m-useful-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `usefulLinkbyId` | Public | None | `Traced` |
| 274 | `POST` | `api/property/m-useful-link-list` | `N/A` | `api` | `MasterReferenceController` | `usefulLinkList` | Public | None | `Traced` |
| 275 | `POST` | `api/property/m-useful-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateUsefulLink` | Public | None | `Traced` |
| 276 | `POST` | `api/property/m-whats-new-create` | `N/A` | `api` | `MasterReferenceController` | `addWhatsNew` | Public | None | `Traced` |
| 277 | `POST` | `api/property/m-whats-new-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteWhatsNew` | Public | None | `Traced` |
| 278 | `POST` | `api/property/m-whats-new-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `WhatsNewbyId` | Public | None | `Traced` |
| 279 | `POST` | `api/property/m-whats-new-list` | `N/A` | `api` | `MasterReferenceController` | `WhatsNewList` | Public | None | `Traced` |
| 280 | `POST` | `api/property/m-whats-new-update` | `N/A` | `api` | `MasterReferenceController` | `updateWhatsNew` | Public | None | `Traced` |
| 281 | `POST` | `api/property/map/level1` | `N/A` | `api` | `LocationController` | `mapLevel1` | Public | None | `Traced` |
| 282 | `POST` | `api/property/master-holding-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `masterHoldingData` | AuthMaker | None | `Traced` |
| 283 | `POST` | `api/property/objection/add-members` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `addMembers` | AuthMaker | None | `Traced` |
| 284 | `POST` | `api/property/objection/apply-objection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `applyObjection` | AuthMaker | None | `Traced` |
| 285 | `POST` | `api/property/objection/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `approvalRejection` | AuthMaker | None | `Traced` |
| 286 | `POST` | `api/property/objection/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 287 | `POST` | `api/property/objection/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `btcInboxList` | AuthMaker | None | `Traced` |
| 288 | `POST` | `api/property/objection/citizen-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `citizenDocList` | AuthMaker | None | `Traced` |
| 289 | `POST` | `api/property/objection/citizen-forgery-doclist` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `citizenForgeryDocList` | AuthMaker | None | `Traced` |
| 290 | `POST` | `api/property/objection/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 291 | `POST` | `api/property/objection/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `getDetailsById` | AuthMaker | None | `Traced` |
| 292 | `POST` | `api/property/objection/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `objectionDocList` | AuthMaker | None | `Traced` |
| 293 | `POST` | `api/property/objection/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 294 | `POST` | `api/property/objection/forgery-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `forgeryType` | AuthMaker | None | `Traced` |
| 295 | `POST` | `api/property/objection/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `getUploadedDocuments` | AuthMaker | None | `Traced` |
| 296 | `POST` | `api/property/objection/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `inbox` | AuthMaker | None | `Traced` |
| 297 | `POST` | `api/property/objection/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 298 | `GET|HEAD` | `api/property/objection/objection-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `objectionType` | AuthMaker | None | `Traced` |
| 299 | `POST` | `api/property/objection/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `outbox` | AuthMaker | None | `Traced` |
| 300 | `POST` | `api/property/objection/owner-detailById` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `ownerDetailById` | AuthMaker | None | `Traced` |
| 301 | `POST` | `api/property/objection/post-escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `postEscalate` | AuthMaker | None | `Traced` |
| 302 | `POST` | `api/property/objection/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `specialInbox` | AuthMaker | None | `Traced` |
| 303 | `POST` | `api/property/objection/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `uploadDocument` | AuthMaker | None | `Traced` |
| 304 | `POST` | `api/property/offline-payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `offlinePaymentHolding` | AuthMaker | None | `Traced` |
| 305 | `POST` | `api/property/outboxDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `outbox` | AuthMaker | None | `Traced` |
| 306 | `POST` | `api/property/payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `paymentHolding` | AuthMaker | None | `Traced` |
| 307 | `POST` | `api/property/postEscalateDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `postEscalate` | AuthMaker | None | `Traced` |
| 308 | `POST` | `api/property/postNextDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 309 | `POST` | `api/property/prop-comparative-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `comparativeDemand` | AuthMaker | None | `Traced` |
| 310 | `GET|HEAD` | `api/property/prop-const-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propConstructionType` | AuthMaker | None | `Traced` |
| 311 | `POST` | `api/property/prop-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `propertyDues` | AuthMaker | None | `Traced` |
| 312 | `POST` | `api/property/prop-objection-type` | `N/A` | `api` | `ReferenceController` | `listPropObjectiontype` | Public | None | `Traced` |
| 313 | `POST` | `api/property/prop-occupancy-factor` | `N/A` | `api` | `ReferenceController` | `listPropOccupancyFactor` | Public | None | `Traced` |
| 314 | `POST` | `api/property/prop-occupancy-type` | `N/A` | `api` | `ReferenceController` | `listPropOccupancytype` | Public | None | `Traced` |
| 315 | `GET|HEAD` | `api/property/prop-occupancy-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propOccupancyType` | AuthMaker | None | `Traced` |
| 316 | `POST` | `api/property/prop-ownership-type` | `N/A` | `api` | `ReferenceController` | `listPropOwnershiptype` | Public | None | `Traced` |
| 317 | `POST` | `api/property/prop-payment-history` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `propPaymentHistory` | AuthMaker | None | `Traced` |
| 318 | `POST` | `api/property/prop-payment-receipt` | `N/A` | `api` | `HoldingTaxController` | `propPaymentReceipt` | Public | None | `Traced` |
| 319 | `POST` | `api/property/prop-penalty-type` | `N/A` | `api` | `ReferenceController` | `listPropPenaltytype` | Public | None | `Traced` |
| 320 | `GET|HEAD` | `api/property/prop-property-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propPropertyType` | AuthMaker | None | `Traced` |
| 321 | `POST` | `api/property/prop-rebate-type` | `N/A` | `api` | `ReferenceController` | `listPropRebatetype` | Public | None | `Traced` |
| 322 | `POST` | `api/property/prop-road-type` | `N/A` | `api` | `ReferenceController` | `listPropRoadtype` | Public | None | `Traced` |
| 323 | `GET|HEAD` | `api/property/prop-road-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propRoadType` | AuthMaker | None | `Traced` |
| 324 | `POST` | `api/property/prop-transfer-mode` | `N/A` | `api` | `ReferenceController` | `listPropTransfermode` | Public | None | `Traced` |
| 325 | `POST` | `api/property/prop-ulb-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `proUlbReceipt` | AuthMaker | None | `Traced` |
| 326 | `POST` | `api/property/prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropUsagetype` | Public | None | `Traced` |
| 327 | `GET|HEAD` | `api/property/prop-usage-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propUsageType` | AuthMaker | None | `Traced` |
| 328 | `POST` | `api/property/prop-water-payment-receipt` | `N/A` | `api` | `HoldingTaxController` | `propPaymentReceiptv1` | Public | None | `Traced` |
| 329 | `POST` | `api/property/prop/cluster-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPayment` | AuthMaker | None | `Traced` |
| 330 | `POST` | `api/property/prop/get-cluster-holding-due` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getClusterHoldingDues` | AuthMaker | None | `Traced` |
| 331 | `POST` | `api/property/propertyHoldingInfoWatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyHoldingInfoWatsappChat` | AuthMaker | None | `Traced` |
| 332 | `POST` | `api/property/propertyPaymentStatusWatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyPaymentStatusWatsappChat` | AuthMaker | None | `Traced` |
| 333 | `POST` | `api/property/ref-prop-construction-type-create` | `N/A` | `api` | `MasterReferenceController` | `createConstructionType` | Public | None | `Traced` |
| 334 | `POST` | `api/property/ref-prop-construction-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteConstructionType` | Public | None | `Traced` |
| 335 | `POST` | `api/property/ref-prop-construction-type-get` | `N/A` | `api` | `MasterReferenceController` | `constructiontypebyId` | Public | None | `Traced` |
| 336 | `POST` | `api/property/ref-prop-construction-type-list` | `N/A` | `api` | `MasterReferenceController` | `allConstructiontypelist` | Public | None | `Traced` |
| 337 | `POST` | `api/property/ref-prop-construction-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateConstructionType` | Public | None | `Traced` |
| 338 | `POST` | `api/property/ref-prop-floor-type-create` | `N/A` | `api` | `MasterReferenceController` | `createFloorType` | Public | None | `Traced` |
| 339 | `POST` | `api/property/ref-prop-floor-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteFloorType` | Public | None | `Traced` |
| 340 | `POST` | `api/property/ref-prop-floor-type-get` | `N/A` | `api` | `MasterReferenceController` | `floortypebyId` | Public | None | `Traced` |
| 341 | `POST` | `api/property/ref-prop-floor-type-list` | `N/A` | `api` | `MasterReferenceController` | `allFloortypelist` | Public | None | `Traced` |
| 342 | `POST` | `api/property/ref-prop-floor-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateFloorType` | Public | None | `Traced` |
| 343 | `POST` | `api/property/ref-prop-gbbuilding-type-create` | `N/A` | `api` | `MasterReferenceController` | `createGbBuildingType` | Public | None | `Traced` |
| 344 | `POST` | `api/property/ref-prop-gbbuilding-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteGbBuildingType` | Public | None | `Traced` |
| 345 | `POST` | `api/property/ref-prop-gbbuilding-type-get` | `N/A` | `api` | `MasterReferenceController` | `GbBuildingtypebyId` | Public | None | `Traced` |
| 346 | `POST` | `api/property/ref-prop-gbbuilding-type-list` | `N/A` | `api` | `MasterReferenceController` | `allGbBuildingtypelist` | Public | None | `Traced` |
| 347 | `POST` | `api/property/ref-prop-gbbuilding-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateGbBuildingType` | Public | None | `Traced` |
| 348 | `POST` | `api/property/ref-prop-gbpropusage-type-create` | `N/A` | `api` | `MasterReferenceController` | `createGbPropUsageType` | Public | None | `Traced` |
| 349 | `POST` | `api/property/ref-prop-gbpropusage-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteGbPropUsageType` | Public | None | `Traced` |
| 350 | `POST` | `api/property/ref-prop-gbpropusage-type-get` | `N/A` | `api` | `MasterReferenceController` | `GbPropUsagetypebyId` | Public | None | `Traced` |
| 351 | `POST` | `api/property/ref-prop-gbpropusage-type-list` | `N/A` | `api` | `MasterReferenceController` | `allGbPropUsagetypelist` | Public | None | `Traced` |
| 352 | `POST` | `api/property/ref-prop-gbpropusage-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateGbPropUsageType` | Public | None | `Traced` |
| 353 | `POST` | `api/property/ref-prop-objection-type-create` | `N/A` | `api` | `MasterReferenceController` | `createObjectionType` | Public | None | `Traced` |
| 354 | `POST` | `api/property/ref-prop-objection-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteObjectionType` | Public | None | `Traced` |
| 355 | `POST` | `api/property/ref-prop-objection-type-get` | `N/A` | `api` | `MasterReferenceController` | `ObjectiontypebyId` | Public | None | `Traced` |
| 356 | `POST` | `api/property/ref-prop-objection-type-list` | `N/A` | `api` | `MasterReferenceController` | `allObjectiontypelist` | Public | None | `Traced` |
| 357 | `POST` | `api/property/ref-prop-objection-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateObjectionType` | Public | None | `Traced` |
| 358 | `POST` | `api/property/ref-prop-occupancy-factor-create` | `N/A` | `api` | `MasterReferenceController` | `createOccupancyFactor` | Public | None | `Traced` |
| 359 | `POST` | `api/property/ref-prop-occupancy-factor-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOccupancyFactor` | Public | None | `Traced` |
| 360 | `POST` | `api/property/ref-prop-occupancy-factor-get` | `N/A` | `api` | `MasterReferenceController` | `OccupancyFactorbyId` | Public | None | `Traced` |
| 361 | `POST` | `api/property/ref-prop-occupancy-factor-list` | `N/A` | `api` | `MasterReferenceController` | `allOccupancyFactorlist` | Public | None | `Traced` |
| 362 | `POST` | `api/property/ref-prop-occupancy-factor-update` | `N/A` | `api` | `MasterReferenceController` | `updateOccupancyFactor` | Public | None | `Traced` |
| 363 | `POST` | `api/property/ref-prop-occupancy-type-create` | `N/A` | `api` | `MasterReferenceController` | `createOccupancyType` | Public | None | `Traced` |
| 364 | `POST` | `api/property/ref-prop-occupancy-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOccupancyType` | Public | None | `Traced` |
| 365 | `POST` | `api/property/ref-prop-occupancy-type-get` | `N/A` | `api` | `MasterReferenceController` | `OccupancyTypebyId` | Public | None | `Traced` |
| 366 | `POST` | `api/property/ref-prop-occupancy-type-list` | `N/A` | `api` | `MasterReferenceController` | `allOccupancyTypelist` | Public | None | `Traced` |
| 367 | `POST` | `api/property/ref-prop-occupancy-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateOccupancyType` | Public | None | `Traced` |
| 368 | `POST` | `api/property/ref-prop-ownership-type-create` | `N/A` | `api` | `MasterReferenceController` | `createOwnershipType` | Public | None | `Traced` |
| 369 | `POST` | `api/property/ref-prop-ownership-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOwnershipType` | Public | None | `Traced` |
| 370 | `POST` | `api/property/ref-prop-ownership-type-get` | `N/A` | `api` | `MasterReferenceController` | `OwnershipTypebyId` | Public | None | `Traced` |
| 371 | `POST` | `api/property/ref-prop-ownership-type-list` | `N/A` | `api` | `MasterReferenceController` | `allOwnershipTypelist` | Public | None | `Traced` |
| 372 | `POST` | `api/property/ref-prop-ownership-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateOwnershipType` | Public | None | `Traced` |
| 373 | `POST` | `api/property/ref-prop-penalty-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPenaltyType` | Public | None | `Traced` |
| 374 | `POST` | `api/property/ref-prop-penalty-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletePenaltyType` | Public | None | `Traced` |
| 375 | `POST` | `api/property/ref-prop-penalty-type-get` | `N/A` | `api` | `MasterReferenceController` | `PenaltyTypebyId` | Public | None | `Traced` |
| 376 | `POST` | `api/property/ref-prop-penalty-type-list` | `N/A` | `api` | `MasterReferenceController` | `allPenaltyTypelist` | Public | None | `Traced` |
| 377 | `POST` | `api/property/ref-prop-penalty-type-update` | `N/A` | `api` | `MasterReferenceController` | `updatePenaltyType` | Public | None | `Traced` |
| 378 | `POST` | `api/property/ref-prop-property-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPropertyType` | Public | None | `Traced` |
| 379 | `POST` | `api/property/ref-prop-property-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletepropertyType` | Public | None | `Traced` |
| 380 | `POST` | `api/property/ref-prop-property-type-get` | `N/A` | `api` | `MasterReferenceController` | `propertyTypebyId` | Public | None | `Traced` |
| 381 | `POST` | `api/property/ref-prop-property-type-list` | `N/A` | `api` | `MasterReferenceController` | `allpropertyTypelist` | Public | None | `Traced` |
| 382 | `POST` | `api/property/ref-prop-property-type-update` | `N/A` | `api` | `MasterReferenceController` | `updatePropertyType` | Public | None | `Traced` |
| 383 | `POST` | `api/property/ref-prop-rebate-type-create` | `N/A` | `api` | `MasterReferenceController` | `createRebateType` | Public | None | `Traced` |
| 384 | `POST` | `api/property/ref-prop-rebate-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteRebateType` | Public | None | `Traced` |
| 385 | `POST` | `api/property/ref-prop-rebate-type-get` | `N/A` | `api` | `MasterReferenceController` | `RebateTypebyId` | Public | None | `Traced` |
| 386 | `POST` | `api/property/ref-prop-rebate-type-list` | `N/A` | `api` | `MasterReferenceController` | `allRebateTypelist` | Public | None | `Traced` |
| 387 | `POST` | `api/property/ref-prop-rebate-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateRebateType` | Public | None | `Traced` |
| 388 | `POST` | `api/property/ref-prop-road-type-create` | `N/A` | `api` | `MasterReferenceController` | `createRoadType` | Public | None | `Traced` |
| 389 | `POST` | `api/property/ref-prop-road-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteroadType` | Public | None | `Traced` |
| 390 | `POST` | `api/property/ref-prop-road-type-get` | `N/A` | `api` | `MasterReferenceController` | `roadTypebyId` | Public | None | `Traced` |
| 391 | `POST` | `api/property/ref-prop-road-type-list` | `N/A` | `api` | `MasterReferenceController` | `allroadTypelist` | Public | None | `Traced` |
| 392 | `POST` | `api/property/ref-prop-road-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateroadType` | Public | None | `Traced` |
| 393 | `POST` | `api/property/ref-prop-transfer-mode-create` | `N/A` | `api` | `MasterReferenceController` | `createPropTransferMode` | Public | None | `Traced` |
| 394 | `POST` | `api/property/ref-prop-transfer-mode-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteTransferMode` | Public | None | `Traced` |
| 395 | `POST` | `api/property/ref-prop-transfer-mode-get` | `N/A` | `api` | `MasterReferenceController` | `TransferModebyId` | Public | None | `Traced` |
| 396 | `POST` | `api/property/ref-prop-transfer-mode-list` | `N/A` | `api` | `MasterReferenceController` | `allTransferModelist` | Public | None | `Traced` |
| 397 | `POST` | `api/property/ref-prop-transfer-mode-update` | `N/A` | `api` | `MasterReferenceController` | `updateTransferMode` | Public | None | `Traced` |
| 398 | `POST` | `api/property/ref-prop-usage-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPropUsageType` | Public | None | `Traced` |
| 399 | `POST` | `api/property/ref-prop-usage-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletePropUsageType` | Public | None | `Traced` |
| 400 | `POST` | `api/property/ref-prop-usage-type-get` | `N/A` | `api` | `MasterReferenceController` | `PropUsageTypebyId` | Public | None | `Traced` |
| 401 | `POST` | `api/property/ref-prop-usage-type-list` | `N/A` | `api` | `MasterReferenceController` | `allPropUsageTypelist` | Public | None | `Traced` |
| 402 | `POST` | `api/property/ref-prop-usage-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateUsageType` | Public | None | `Traced` |
| 403 | `POST` | `api/property/report/mpl-todayCollection-new` | `N/A` | `api` | `ReportController` | `mplReportCollectionNew` | Public | None | `Traced` |
| 404 | `POST` | `api/property/report/ulb-list` | `N/A` | `api` | `ReportController` | `ulbList` | Public | None | `Traced` |
| 405 | `POST` | `api/property/reports/dcb-piechart` | `N/A` | `api` | `ReportController` | `dcbPieChart` | Public | None | `Traced` |
| 406 | `POST` | `api/property/reports/list-fy` | `N/A` | `api` | `ReportController` | `listFY` | Public | None | `Traced` |
| 407 | `POST` | `api/property/reports/mpl` | `N/A` | `api` | `ReportController` | `mplReport` | Public | None | `Traced` |
| 408 | `POST` | `api/property/reports/mpl2` | `N/A` | `api` | `ReportController` | `mplReport2` | Public | None | `Untraced (Method mplReport2 not found in ReportController)` |
| 409 | `POST` | `api/property/reports/not-paid-from-2016` | `N/A` | `api` | `ReportController` | `notPaidFrom2016` | Public | None | `Traced` |
| 410 | `POST` | `api/property/reports/oldHolding` | `N/A` | `api` | `ReportController` | `oldHolding` | Public | None | `Traced` |
| 411 | `POST` | `api/property/reports/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `PaymentModeWiseSummery` | Public | None | `Traced` |
| 412 | `POST` | `api/property/reports/previous-year-paid-not-current-year` | `N/A` | `api` | `ReportController` | `previousYearPaidButnotCurrentYear` | Public | None | `Traced` |
| 413 | `POST` | `api/property/reports/print-bulk-receipt` | `N/A` | `api` | `ReportController` | `bulkReceipt` | Public | None | `Traced` |
| 414 | `POST` | `api/property/reports/prop/saf/collection` | `N/A` | `api` | `ReportController` | `propSafCollection` | Public | None | `Traced` |
| 415 | `POST` | `api/property/reports/property/collection` | `N/A` | `api` | `ReportController` | `collectionReport` | Public | None | `Traced` |
| 416 | `POST` | `api/property/reports/property/dcb` | `N/A` | `api` | `ReportController` | `PropDCB` | Public | None | `Traced` |
| 417 | `POST` | `api/property/reports/property/deactivated-list` | `N/A` | `api` | `ReportController` | `PropDeactedList` | Public | None | `Traced` |
| 418 | `POST` | `api/property/reports/property/gbsaf-collection` | `N/A` | `api` | `ReportController` | `gbSafCollection` | Public | None | `Traced` |
| 419 | `POST` | `api/property/reports/property/gbsaf-individual-demand-collection` | `N/A` | `api` | `ReportController` | `gbsafIndividualDemandCollection` | Public | None | `Traced` |
| 420 | `POST` | `api/property/reports/property/holding-wise-fine-rebate` | `N/A` | `api` | `ReportController` | `PropFineRebate` | Public | None | `Traced` |
| 421 | `POST` | `api/property/reports/property/individual-demand-collection` | `N/A` | `api` | `ReportController` | `propIndividualDemandCollection` | Public | None | `Traced` |
| 422 | `POST` | `api/property/reports/property/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `PropPaymentModeWiseSummery` | Public | None | `Traced` |
| 423 | `POST` | `api/property/reports/property/prop-saf-individual-demand-collection` | `N/A` | `api` | `ReportController` | `safPropIndividualDemandAndCollection` | Public | None | `Traced` |
| 424 | `POST` | `api/property/reports/property/ward-wise-dcb` | `N/A` | `api` | `ReportController` | `PropWardWiseDCB` | Public | None | `Traced` |
| 425 | `POST` | `api/property/reports/rebate/penalty` | `N/A` | `api` | `ReportController` | `rebateNpenalty` | Public | None | `Traced` |
| 426 | `POST` | `api/property/reports/saf/collection` | `N/A` | `api` | `ReportController` | `safCollection` | Public | None | `Traced` |
| 427 | `POST` | `api/property/reports/saf/levelformdetail` | `N/A` | `api` | `ReportController` | `levelformdetail` | Public | None | `Traced` |
| 428 | `POST` | `api/property/reports/saf/leveluserpending` | `N/A` | `api` | `ReportController` | `levelUserPending` | Public | None | `Traced` |
| 429 | `POST` | `api/property/reports/saf/levelwisependingform` | `N/A` | `api` | `ReportController` | `levelwisependingform` | Public | None | `Traced` |
| 430 | `POST` | `api/property/reports/saf/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `SafPaymentModeWiseSummery` | Public | None | `Traced` |
| 431 | `POST` | `api/property/reports/saf/saf-sam-fam-geotagging` | `N/A` | `api` | `ReportController` | `safSamFamGeotagging` | Public | None | `Traced` |
| 432 | `POST` | `api/property/reports/saf/userWiseWardWireLevelPending` | `N/A` | `api` | `ReportController` | `userWiseWardWireLevelPending` | Public | None | `Traced` |
| 433 | `POST` | `api/property/reports/saf/userwiselevelpending` | `N/A` | `api` | `ReportController` | `userWiseLevelPending` | Public | None | `Traced` |
| 434 | `POST` | `api/property/reports/ward-wise-holding` | `N/A` | `api` | `ReportController` | `wardWiseHoldingReport` | Public | None | `Traced` |
| 435 | `POST` | `api/property/review-calculation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `reviewCalculation` | AuthMaker | None | `Traced` |
| 436 | `POST` | `api/property/roles-by-ulb-module` | `N/A` | `api` | `ReportController` | `rolesByUlbAndModule` | Public | None | `Traced` |
| 437 | `POST` | `api/property/saf-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `safDetails` | AuthMaker | None | `Traced` |
| 438 | `POST` | `api/property/saf/IndiVerificationsList` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getSafVerificationList` | AuthMaker | None | `Traced` |
| 439 | `POST` | `api/property/saf/apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ApplySafController` | `applySafv1` | AuthMaker | None | `Traced` |
| 440 | `POST` | `api/property/saf/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `approvalRejectionSaf` | AuthMaker | None | `Traced` |
| 441 | `POST` | `api/property/saf/back-to-citizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `backToCitizen` | AuthMaker | None | `Traced` |
| 442 | `POST` | `api/property/saf/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `btcInbox` | AuthMaker | None | `Traced` |
| 443 | `POST` | `api/property/saf/calculate-by-saf-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `calculateSafBySafId` | AuthMaker | None | `Traced` |
| 444 | `POST` | `api/property/saf/cluster-saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `clusterSafPayment` | AuthMaker | None | `Traced` |
| 445 | `POST` | `api/property/saf/delete-citizen-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `deleteCitizenSaf` | AuthMaker | None | `Traced` |
| 446 | `POST` | `api/property/saf/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 447 | `POST` | `api/property/saf/document-upload` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `docUpload` | AuthMaker | None | `Traced` |
| 448 | `POST` | `api/property/saf/edit` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `editSaf` | AuthMaker | None | `Traced` |
| 449 | `POST` | `api/property/saf/edit-citizen-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `editCitizenSaf` | AuthMaker | None | `Traced` |
| 450 | `POST` | `api/property/saf/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `postEscalate` | AuthMaker | None | `Traced` |
| 451 | `POST` | `api/property/saf/escalate/inbox/{key?}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `specialInbox` | AuthMaker | None | `Traced` |
| 452 | `POST` | `api/property/saf/field-verified-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `fieldVerifiedInbox` | AuthMaker | None | `Traced` |
| 453 | `POST` | `api/property/saf/gb-apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ApplySafController` | `applyGbSaf` | AuthMaker | None | `Traced` |
| 454 | `POST` | `api/property/saf/generate-order-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `generateOrderId` | AuthMaker | None | `Traced` |
| 455 | `POST` | `api/property/saf/geotagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `geoTagging` | AuthMaker | None | `Traced` |
| 456 | `POST` | `api/property/saf/get-cluster-saf-due` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getClusterSafDues` | AuthMaker | None | `Traced` |
| 457 | `POST` | `api/property/saf/get-demand-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getDemandBySafId` | AuthMaker | None | `Traced` |
| 458 | `POST` | `api/property/saf/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `getDocList` | AuthMaker | None | `Traced` |
| 459 | `POST` | `api/property/saf/get-gb-prop-byholding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getGbPropByHoldingNo` | AuthMaker | None | `Traced` |
| 460 | `POST` | `api/property/saf/get-prop-byholding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getPropByHoldingNo` | AuthMaker | None | `Traced` |
| 461 | `POST` | `api/property/saf/get-tc-verifications` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getTcVerifications` | AuthMaker | None | `Traced` |
| 462 | `POST` | `api/property/saf/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `getUploadDocuments` | AuthMaker | None | `Traced` |
| 463 | `POST` | `api/property/saf/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `inbox` | AuthMaker | None | `Traced` |
| 464 | `POST` | `api/property/saf/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `commentIndependent` | AuthMaker | None | `Traced` |
| 465 | `POST` | `api/property/saf/independent/generate-order-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `generateOrderId` | AuthMaker | None | `Traced` |
| 466 | `POST` | `api/property/saf/list-apartment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getAptList` | AuthMaker | None | `Traced` |
| 467 | `GET|HEAD` | `api/property/saf/master-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `masterSaf` | AuthMaker | None | `Traced` |
| 468 | `POST` | `api/property/saf/master-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `masterSaf` | AuthMaker | None | `Traced` |
| 469 | `POST` | `api/property/saf/memo-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `memoReceipt` | AuthMaker | None | `Traced` |
| 470 | `POST` | `api/property/saf/offline-saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `offlinePaymentSaf` | AuthMaker | None | `Traced` |
| 471 | `POST` | `api/property/saf/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `outbox` | AuthMaker | None | `Traced` |
| 472 | `POST` | `api/property/saf/payment-receipt` | `N/A` | `api` | `ActiveSafController` | `generatePaymentReceipt` | Public | None | `Traced` |
| 473 | `POST` | `api/property/saf/pending-geotagging-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `pendingGeoTaggingList` | AuthMaker | None | `Traced` |
| 474 | `POST` | `api/property/saf/post/level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `postNextLevel` | AuthMaker | None | `Traced` |
| 475 | `GET|HEAD` | `api/property/saf/prop-transactions` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getPropTransactions` | AuthMaker | None | `Traced` |
| 476 | `POST` | `api/property/saf/proptransaction-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getTransactionBySafPropId` | AuthMaker | None | `Traced` |
| 477 | `POST` | `api/property/saf/rejected-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `rejectedList` | AuthMaker | None | `Traced` |
| 478 | `POST` | `api/property/saf/rejected-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `rejectedList` | AuthMaker | None | `Traced` |
| 479 | `POST` | `api/property/saf/saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `paymentSaf` | AuthMaker | None | `Traced` |
| 480 | `POST` | `api/property/saf/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `siteVerification` | AuthMaker | None | `Traced` |
| 481 | `POST` | `api/property/saf/static-saf-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getStaticSafDetails` | AuthMaker | None | `Traced` |
| 482 | `POST` | `api/property/saf/verifications-comp` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getVerifications` | AuthMaker | None | `Traced` |
| 483 | `POST` | `api/property/saf/verify-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `verifyHoldingNo` | AuthMaker | None | `Traced` |
| 484 | `POST` | `api/property/search-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `searchHolding` | AuthMaker | None | `Traced` |
| 485 | `POST` | `api/property/search-transaction` | `N/A` | `api` | `BankReconcillationController` | `searchTransaction` | Public | None | `Traced` |
| 486 | `POST` | `api/property/search-transaction-no` | `N/A` | `api` | `BankReconcillationController` | `searchTransactionNo` | Public | None | `Traced` |
| 487 | `POST` | `api/property/searchByHoldingNo` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readHoldigbyNo` | AuthMaker | None | `Traced` |
| 488 | `POST` | `api/property/searchByHoldingNoBi` | `N/A` | `api` | `PropertyBifurcationController` | `readHoldigbyNo` | Public | None | `Traced` |
| 489 | `POST` | `api/property/specialDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `specialInbox` | AuthMaker | None | `Traced` |
| 490 | `POST` | `api/property/tc-collections` | `N/A` | `api` | `CashVerificationController` | `tcCollectionDtl` | Public | None | `Traced` |
| 491 | `POST` | `api/property/today-collection-dashboard` | `N/A` | `api` | `ReportController` | `todayCollectionDashboard` | Public | None | `Traced` |
| 492 | `POST` | `api/property/ulb-module-role-count-dashboard` | `N/A` | `api` | `ReportController` | `ulbModuleRoleCount` | Public | None | `Traced` |
| 493 | `POST` | `api/property/ulb-wise-count-dashboard` | `N/A` | `api` | `ReportController` | `ulbWiseApplicationCount` | Public | None | `Traced` |
| 494 | `POST` | `api/property/v1/building-rental-const` | `N/A` | `api` | `ReferenceController` | `listBuildingRentalconst` | Public | None | `Traced` |
| 495 | `POST` | `api/property/v1/building-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropBuildingRentalrate` | Public | None | `Traced` |
| 496 | `POST` | `api/property/v1/floor-type` | `N/A` | `api` | `ReferenceController` | `listPropFloor` | Public | None | `Traced` |
| 497 | `POST` | `api/property/v1/gb-building-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbBuildingUsagetype` | Public | None | `Traced` |
| 498 | `POST` | `api/property/v1/gb-prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbPropUsagetype` | Public | None | `Traced` |
| 499 | `POST` | `api/property/v1/generate-holding-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateHoldingDemand` | AuthMaker | None | `Traced` |
| 500 | `POST` | `api/property/v1/get-construction-list` | `N/A` | `api` | `ReferenceController` | `listPropConstructiontype` | Public | None | `Traced` |
| 501 | `POST` | `api/property/v1/get-forgery-type` | `N/A` | `api` | `ReferenceController` | `listpropForgeryType` | Public | None | `Traced` |
| 502 | `POST` | `api/property/v1/get-prop-type` | `N/A` | `api` | `ReferenceController` | `listProptype` | Public | None | `Traced` |
| 503 | `POST` | `api/property/v1/get-rental-value` | `N/A` | `api` | `ReferenceController` | `listPropRentalValue` | Public | None | `Traced` |
| 504 | `POST` | `api/property/v1/prop-objection-type` | `N/A` | `api` | `ReferenceController` | `listPropObjectiontype` | Public | None | `Traced` |
| 505 | `POST` | `api/property/v1/prop-occupancy-factor` | `N/A` | `api` | `ReferenceController` | `listPropOccupancyFactor` | Public | None | `Traced` |
| 506 | `POST` | `api/property/v1/prop-occupancy-type` | `N/A` | `api` | `ReferenceController` | `listPropOccupancytype` | Public | None | `Traced` |
| 507 | `POST` | `api/property/v1/prop-ownership-type` | `N/A` | `api` | `ReferenceController` | `listPropOwnershiptype` | Public | None | `Traced` |
| 508 | `POST` | `api/property/v1/prop-penalty-type` | `N/A` | `api` | `ReferenceController` | `listPropPenaltytype` | Public | None | `Traced` |
| 509 | `POST` | `api/property/v1/prop-rebate-type` | `N/A` | `api` | `ReferenceController` | `listPropRebatetype` | Public | None | `Traced` |
| 510 | `POST` | `api/property/v1/prop-road-type` | `N/A` | `api` | `ReferenceController` | `listPropRoadtype` | Public | None | `Traced` |
| 511 | `POST` | `api/property/v1/prop-transfer-mode` | `N/A` | `api` | `ReferenceController` | `listPropTransfermode` | Public | None | `Traced` |
| 512 | `POST` | `api/property/v1/prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropUsagetype` | Public | None | `Traced` |
| 513 | `POST` | `api/property/v1/vacant-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropVacantRentalrate` | Public | None | `Traced` |
| 514 | `POST` | `api/property/v2/saf/list-apartment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getAptList` | AuthMaker | None | `Traced` |
| 515 | `POST` | `api/property/vacant-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropVacantRentalrate` | Public | None | `Traced` |
| 516 | `POST` | `api/property/verified-cash-verification` | `N/A` | `api` | `CashVerificationController` | `verifiedCashVerificationList` | Public | None | `Traced` |
| 517 | `POST` | `api/property/verified-tc-collections` | `N/A` | `api` | `CashVerificationController` | `verifiedTcCollectionDtl` | Public | None | `Traced` |
| 518 | `POST` | `api/property/verify-cash` | `N/A` | `api` | `CashVerificationController` | `cashVerify` | Public | None | `Traced` |
| 519 | `POST` | `api/property/waiver/application-detail` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `applicationDetails` | AuthMaker | None | `Traced` |
| 520 | `POST` | `api/property/waiver/apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `apply` | AuthMaker | None | `Traced` |
| 521 | `POST` | `api/property/waiver/approved-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `approvedApplication` | AuthMaker | None | `Traced` |
| 522 | `POST` | `api/property/waiver/final-approval` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `approvalRejection` | AuthMaker | None | `Traced` |
| 523 | `POST` | `api/property/waiver/final-waived` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `finalWaivedAmount` | AuthMaker | None | `Traced` |
| 524 | `POST` | `api/property/waiver/list-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `inbox` | AuthMaker | None | `Traced` |
| 525 | `POST` | `api/property/waiver/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `staticDetails` | AuthMaker | None | `Traced` |
| 526 | `POST` | `api/property/waiver/uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `getUploadedDocuments` | AuthMaker | None | `Traced` |
| 527 | `POST` | `api/property/waiver/verify-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `docVerifyReject` | AuthMaker | None | `Traced` |
| 528 | `POST` | `api/property/water-harvesting-application` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `waterHarvestingApplication` | AuthMaker | None | `Traced` |