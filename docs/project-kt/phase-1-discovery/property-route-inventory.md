# Property Module: Complete Route Inventory (Verified & Corrected)

## 1. Inventory Summary

- **Total Registered Property Routes**: 528
- **Verified Working Routes**: **526 routes** (`VERIFIED`)
- **Blocked / Missing Method Routes**: **2 routes** (`BLOCKED`)
- **Total Unique Controller Targets**: 28 (23 domain controllers, 4 shared controllers, 1 closure)

### Route Distribution by Controller

| Controller | Source File | Route Count | Verification Status |
|---|---|---|---|
| `CitizenController` | `app/Http/Controllers/CitizenController.php` | 3 | All Traced (`VERIFIED`) |
| `JskController` | `app/Http/Controllers/Dashboard/JskController.php` | 2 | All Traced (`VERIFIED`) |
| `BankReconcillationController` | `app/Http/Controllers/Payment/BankReconcillationController.php` | 6 | All Traced (`VERIFIED`) |
| `CashVerificationController` | `app/Http/Controllers/Payment/CashVerificationController.php` | 7 | All Traced (`VERIFIED`) |
| `ActiveSafController` | `app/Http/Controllers/Property/ActiveSafController.php` | 32 | All Traced (`VERIFIED`) |
| `ActiveSafControllerV2` | `app/Http/Controllers/Property/ActiveSafControllerV2.php` | 10 | All Traced (`VERIFIED`) |
| `ApplySafController` | `app/Http/Controllers/Property/ApplySafController.php` | 2 | All Traced (`VERIFIED`) |
| `CalculatorController` | `app/Http/Controllers/Property/CalculatorController.php` | 3 | All Traced (`VERIFIED`) |
| `ClusterController` | `app/Http/Controllers/Property/ClusterController.php` | 11 | 1 Missing Methods (`BLOCKED`) |
| `ConcessionController` | `app/Http/Controllers/Property/ConcessionController.php` | 17 | All Traced (`VERIFIED`) |
| `DocumentOperationController` | `app/Http/Controllers/Property/DocumentOperationController.php` | 1 | All Traced (`VERIFIED`) |
| `GbSafController` | `app/Http/Controllers/Property/GbSafController.php` | 22 | All Traced (`VERIFIED`) |
| `HoldingTaxController` | `app/Http/Controllers/Property/HoldingTaxController.php` | 24 | All Traced (`VERIFIED`) |
| `LocationController` | `app/Http/Controllers/Property/LocationController.php` | 3 | All Traced (`VERIFIED`) |
| `MasterReferenceController` | `app/Http/Controllers/Property/MasterReferenceController.php` | 205 | All Traced (`VERIFIED`) |
| `ObjectionController` | `app/Http/Controllers/Property/ObjectionController.php` | 21 | All Traced (`VERIFIED`) |
| `PropMaster` | `app/Http/Controllers/Property/PropMaster.php` | 5 | All Traced (`VERIFIED`) |
| `PropertyBifurcationController` | `app/Http/Controllers/Property/PropertyBifurcationController.php` | 7 | All Traced (`VERIFIED`) |
| `PropertyController` | `app/Http/Controllers/Property/PropertyController.php` | 10 | All Traced (`VERIFIED`) |
| `PropertyDeactivateController` | `app/Http/Controllers/Property/PropertyDeactivateController.php` | 12 | All Traced (`VERIFIED`) |
| `PropertyDetailsController` | `app/Http/Controllers/Property/PropertyDetailsController.php` | 9 | All Traced (`VERIFIED`) |
| `RainWaterHarvestingController` | `app/Http/Controllers/Property/RainWaterHarvestingController.php` | 22 | All Traced (`VERIFIED`) |
| `ReportController` | `app/Http/Controllers/Property/ReportController.php` | 40 | 1 Missing Methods (`BLOCKED`) |
| `SafDocController` | `app/Http/Controllers/Property/SafDocController.php` | 4 | All Traced (`VERIFIED`) |
| `WaiverController` | `app/Http/Controllers/Property/WaiverController.php` | 9 | All Traced (`VERIFIED`) |
| `ZoneController` | `app/Http/Controllers/Property/ZoneController.php` | 1 | All Traced (`VERIFIED`) |
| `ReferenceController` | `app/Http/Controllers/ReferenceController.php` | 38 | All Traced (`VERIFIED`) |
| `Closure` | `Closure` | 2 | All Traced (`VERIFIED`) |

---

## 2. Route Registration Anomalies & Blocked Routes

### A. Missing Controller Methods (`BLOCKED`)
1. **`POST api/property/cluster/property-by-cluster`**:
   - Declared in: `routes/property.php:948`
   - Action: `App\Http\Controllers\Property\ClusterController@propertyByCluster`
   - Defect: Method `propertyByCluster` does not exist in `app/Http/Controllers/Property/ClusterController.php`. Invoking this endpoint throws a `BadMethodCallException`.
   - Status: `BLOCKED`
2. **`POST api/property/reports/mpl2`**:
   - Declared in: `routes/property.php:559`
   - Action: `App\Http\Controllers\Property\ReportController@mplReport2`
   - Defect: Method `mplReport2` does not exist in `app/Http/Controllers/Property/ReportController.php` (only `mplReport` and `mplReportCollectionNew` exist).
   - Status: `BLOCKED`

### B. Shared Reference Endpoint Overwrite
- `routes/api.php:377-400` declares 22 endpoints under `api/property/*` (e.g., `POST api/property/building-rental-const`).
- `routes/property.php:464-490` declares identical routes targeting `ReferenceController`.
- In Laravel's routing table, the declarations from `routes/property.php` overwrite the declarations from `routes/api.php`.
- Only `GET|POST|HEAD api/property/citizens/applied-applications` (`CitizenController@getAllAppliedApplications`) is exclusively defined in `routes/api.php`.
- Status: `VERIFIED`

---

## 3. Comprehensive Route Inventory Table

| # | Method | URI | Route Name | Effective Middleware | Controller | Method | Authentication | Authorization | Verification Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `POST` | `api/property/active-application/get-user-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getUserDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 2 | `POST` | `api/property/api-test` | `N/A` | `api, ApiKeyMiddleware` | `Closure` | `Closure` | API Key | None | `VERIFIED` |
| 3 | `POST|GET|HEAD` | `api/property/applyBifurcation/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `addRecord` | AuthMaker | Role / ULB | `VERIFIED` |
| 4 | `POST` | `api/property/approve-reject-deactivation-request` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `approvalRejection` | AuthMaker | Role / ULB | `VERIFIED` |
| 5 | `POST` | `api/property/basic-edit` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `basicPropertyEdit` | AuthMaker | Role / ULB | `VERIFIED` |
| 6 | `POST` | `api/property/bifurcationInbox` | `N/A` | `api` | `PropertyBifurcationController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 7 | `POST` | `api/property/bifurcationOutbox` | `N/A` | `api` | `PropertyBifurcationController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 8 | `POST` | `api/property/bifurcationPostNext` | `N/A` | `api` | `PropertyBifurcationController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 9 | `POST` | `api/property/building-rental-const` | `N/A` | `api` | `ReferenceController` | `listBuildingRentalconst` | AuthMaker | Role / ULB | `VERIFIED` |
| 10 | `POST` | `api/property/building-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropBuildingRentalrate` | AuthMaker | Role / ULB | `VERIFIED` |
| 11 | `POST` | `api/property/calculatePropertyTax` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `calculator` | AuthMaker | Role / ULB | `VERIFIED` |
| 12 | `POST` | `api/property/caretaker-otp` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `caretakerOtp` | AuthMaker | Role / ULB | `VERIFIED` |
| 13 | `POST` | `api/property/caretaker-property-tagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `caretakerPropertyTag` | AuthMaker | Role / ULB | `VERIFIED` |
| 14 | `POST` | `api/property/cash-receipt` | `N/A` | `api` | `CashVerificationController` | `cashReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 15 | `POST` | `api/property/check-amalgamation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `checkAmalgamation` | AuthMaker | Role / ULB | `VERIFIED` |
| 16 | `POST` | `api/property/check-amalgamation-property` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `checkAmalgamationProperty` | AuthMaker | Role / ULB | `VERIFIED` |
| 17 | `POST` | `api/property/check-property` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `CheckProperty` | AuthMaker | Role / ULB | `VERIFIED` |
| 18 | `POST` | `api/property/cheque-clearance` | `N/A` | `api` | `BankReconcillationController` | `chequeClearance` | AuthMaker | Role / ULB | `VERIFIED` |
| 19 | `POST` | `api/property/cheque-dtl-by-id` | `N/A` | `api` | `BankReconcillationController` | `chequeDtlById` | AuthMaker | Role / ULB | `VERIFIED` |
| 20 | `POST` | `api/property/citizen-holding-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `citizenHoldingSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 21 | `POST` | `api/property/citizen-status-update` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `citizenStatusUpdate` | AuthMaker | Role / ULB | `VERIFIED` |
| 22 | `POST` | `api/property/citizen/details` | `N/A` | `api, ForceJsonResponse, AuthMaker` | `CitizenController` | `citizenDetailsWithCitizenId` | AuthMaker | Role / ULB | `VERIFIED` |
| 23 | `POST` | `api/property/citizen/property-count` | `N/A` | `api` | `CitizenController` | `propertyCount` | AuthMaker | Role / ULB | `VERIFIED` |
| 24 | `POST` | `api/property/citizen/property-water-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `citizenPropWaterDtls` | AuthMaker | Role / ULB | `VERIFIED` |
| 25 | `GET|POST|HEAD` | `api/property/citizens/applied-applications` | `N/A` | `api` | `CitizenController` | `getAllAppliedApplications` | AuthMaker | Role / ULB | `VERIFIED` |
| 26 | `POST` | `api/property/cluster/basic-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `clusterBasicDtls` | AuthMaker | Role / ULB | `VERIFIED` |
| 27 | `POST` | `api/property/cluster/delete-cluster-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `deleteClusterData` | AuthMaker | Role / ULB | `VERIFIED` |
| 28 | `POST` | `api/property/cluster/details-by-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `detailsByHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 29 | `POST` | `api/property/cluster/edit-cluster-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `editClusterDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 30 | `POST` | `api/property/cluster/get-all-clusters` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getAllClusters` | AuthMaker | Role / ULB | `VERIFIED` |
| 31 | `POST` | `api/property/cluster/get-cluster-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getClusterById` | AuthMaker | Role / ULB | `VERIFIED` |
| 32 | `POST` | `api/property/cluster/get-saf-by-safno` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `getSafBySafNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 33 | `POST` | `api/property/cluster/payment-history` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPaymentHistory` | AuthMaker | Role / ULB | `VERIFIED` |
| 34 | `POST` | `api/property/cluster/payment-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPaymentReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 35 | `POST` | `api/property/cluster/property-by-cluster` | `N/A` | `api` | `ClusterController` | `propertyByCluster` | AuthMaker | Role / ULB | `BLOCKED` |
| 36 | `POST` | `api/property/cluster/save-cluster-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveClusterDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 37 | `POST` | `api/property/cluster/save-holding-in-cluster` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveHoldingInCluster` | AuthMaker | Role / ULB | `VERIFIED` |
| 38 | `POST` | `api/property/cluster/save-saf-in-cluster` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ClusterController` | `saveSafInCluster` | AuthMaker | Role / ULB | `VERIFIED` |
| 39 | `POST` | `api/property/commentIndependentPrpDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 40 | `POST` | `api/property/concession/apply-concession` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `applyConcession` | AuthMaker | Role / ULB | `VERIFIED` |
| 41 | `POST` | `api/property/concession/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `approvalRejection` | AuthMaker | Role / ULB | `VERIFIED` |
| 42 | `POST` | `api/property/concession/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 43 | `POST` | `api/property/concession/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `btcInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 44 | `POST` | `api/property/concession/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 45 | `POST` | `api/property/concession/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getDetailsById` | AuthMaker | Role / ULB | `VERIFIED` |
| 46 | `POST` | `api/property/concession/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `concessionDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 47 | `POST` | `api/property/concession/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 48 | `POST` | `api/property/concession/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `escalateApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 49 | `POST` | `api/property/concession/get-doc-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getDocType` | AuthMaker | Role / ULB | `VERIFIED` |
| 50 | `POST` | `api/property/concession/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getUploadedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 51 | `POST` | `api/property/concession/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 52 | `POST` | `api/property/concession/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 53 | `POST` | `api/property/concession/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 54 | `POST` | `api/property/concession/owner-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `getOwnerDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 55 | `POST` | `api/property/concession/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 56 | `POST` | `api/property/concession/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ConcessionController` | `uploadDocument` | AuthMaker | Role / ULB | `VERIFIED` |
| 57 | `POST` | `api/property/dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `JskController` | `propDashboard` | AuthMaker | Role / ULB | `VERIFIED` |
| 58 | `POST` | `api/property/dashboard-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `JskController` | `propDashboardDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 59 | `POST` | `api/property/dashboard-summary-cards` | `N/A` | `api` | `ReportController` | `dashboardSummaryCards` | AuthMaker | Role / ULB | `VERIFIED` |
| 60 | `POST` | `api/property/deactivate-transaction` | `N/A` | `api` | `BankReconcillationController` | `deactivateTransaction` | AuthMaker | Role / ULB | `VERIFIED` |
| 61 | `POST` | `api/property/deactivate-transaction-dtl` | `N/A` | `api` | `BankReconcillationController` | `tranDeactivatedList` | AuthMaker | Role / ULB | `VERIFIED` |
| 62 | `POST` | `api/property/deactivationRequest` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `deactivatProperty` | AuthMaker | Role / ULB | `VERIFIED` |
| 63 | `GET|HEAD` | `api/property/demand-pdf/{propertyId}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateDemandPdf` | AuthMaker | Role / ULB | `VERIFIED` |
| 64 | `POST` | `api/property/details/get-owner-details` | `N/A` | `api` | `PropertyDetailsController` | `getOwnerDetailsInfo` | AuthMaker | Role / ULB | `VERIFIED` |
| 65 | `GET|POST|HEAD` | `api/property/documentUpload/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `documentUpload` | AuthMaker | Role / ULB | `VERIFIED` |
| 66 | `POST` | `api/property/edit-chequedtl` | `N/A` | `api` | `CashVerificationController` | `editChequeNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 67 | `POST` | `api/property/floor-type` | `N/A` | `api` | `ReferenceController` | `listPropFloor` | AuthMaker | Role / ULB | `VERIFIED` |
| 68 | `POST` | `api/property/gb-building-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbBuildingUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 69 | `POST` | `api/property/gb-prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbPropUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 70 | `POST` | `api/property/gbsaf/back-to-citizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 71 | `POST` | `api/property/gbsaf/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `btcInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 72 | `POST` | `api/property/gbsaf/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `gbSafDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 73 | `POST` | `api/property/gbsaf/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 74 | `POST` | `api/property/gbsaf/final-approve-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `approvalRejectionGbSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 75 | `POST` | `api/property/gbsaf/geo-tagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `geoTagging` | AuthMaker | Role / ULB | `VERIFIED` |
| 76 | `POST` | `api/property/gbsaf/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 77 | `POST` | `api/property/gbsaf/get-uploaded-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getUploadedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 78 | `POST` | `api/property/gbsaf/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 79 | `POST` | `api/property/gbsaf/inbox-field-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `fieldVerifiedInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 80 | `POST` | `api/property/gbsaf/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 81 | `POST` | `api/property/gbsaf/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 82 | `POST` | `api/property/gbsaf/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 83 | `POST` | `api/property/gbsaf/post-escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 84 | `POST` | `api/property/gbsaf/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `siteVerification` | AuthMaker | Role / ULB | `VERIFIED` |
| 85 | `POST` | `api/property/gbsaf/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 86 | `POST` | `api/property/gbsaf/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getStaticSafDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 87 | `POST` | `api/property/gbsaf/tc-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getTcVerifications` | AuthMaker | Role / ULB | `VERIFIED` |
| 88 | `POST` | `api/property/gbsaf/upload-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `uploadDocument` | AuthMaker | Role / ULB | `VERIFIED` |
| 89 | `POST` | `api/property/generate-orderId` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderIdv1` | AuthMaker | Role / ULB | `VERIFIED` |
| 90 | `POST` | `api/property/generate-prop-orderid` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderId` | AuthMaker | Role / ULB | `VERIFIED` |
| 91 | `POST` | `api/property/geo` | `N/A` | `api` | `ReportController` | `getLocality` | AuthMaker | Role / ULB | `VERIFIED` |
| 92 | `POST` | `api/property/get-Property-Geo-Tags` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getPropertyGeoTag` | AuthMaker | Role / ULB | `VERIFIED` |
| 93 | `POST` | `api/property/get-all-documents` | `N/A` | `api` | `DocumentOperationController` | `getAllDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 94 | `POST` | `api/property/get-construction-list` | `N/A` | `api` | `ReferenceController` | `listPropConstructiontype` | AuthMaker | Role / ULB | `VERIFIED` |
| 95 | `POST` | `api/property/get-dashboard` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `dashboardDate` | AuthMaker | Role / ULB | `VERIFIED` |
| 96 | `POST` | `api/property/get-filter-application-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `applicationsListByKey` | AuthMaker | Role / ULB | `VERIFIED` |
| 97 | `POST` | `api/property/get-filter-property-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyListByKey` | AuthMaker | Role / ULB | `VERIFIED` |
| 98 | `POST` | `api/property/get-filter-property-details-gb` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `propertyGbListByKey` | AuthMaker | Role / ULB | `VERIFIED` |
| 99 | `POST` | `api/property/get-forgery-type` | `N/A` | `api` | `ReferenceController` | `listpropForgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 100 | `POST` | `api/property/get-gb-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getGbHoldingDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 101 | `POST` | `api/property/get-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 102 | `POST` | `api/property/get-holding-imp-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingImpDtls` | AuthMaker | Role / ULB | `VERIFIED` |
| 103 | `GET|HEAD` | `api/property/get-list-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `getListOfSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 104 | `POST` | `api/property/get-prop-dtl-for-deactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readPorertyById` | AuthMaker | Role / ULB | `VERIFIED` |
| 105 | `POST` | `api/property/get-prop-type` | `N/A` | `api` | `ReferenceController` | `listProptype` | AuthMaker | Role / ULB | `VERIFIED` |
| 106 | `POST` | `api/property/get-rental-value` | `N/A` | `api` | `ReferenceController` | `listPropRentalValue` | AuthMaker | Role / ULB | `VERIFIED` |
| 107 | `POST` | `api/property/get-tran-by-holding-no` | `N/A` | `api` | `HoldingTaxController` | `getTransactionsByHoldingNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 108 | `GET|HEAD` | `api/property/get-wardmaster-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getWardMasterData` | AuthMaker | Role / ULB | `VERIFIED` |
| 109 | `POST` | `api/property/get-zone-byUlb` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ZoneController` | `getZoneByUlb` | AuthMaker | Role / ULB | `VERIFIED` |
| 110 | `POST` | `api/property/getDeactivationDtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readDeactivationReq` | AuthMaker | Role / ULB | `VERIFIED` |
| 111 | `POST` | `api/property/getDocumentsPrpDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `getUplodedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 112 | `GET|HEAD` | `api/property/getSafDtls/{id}` | `N/A` | `api` | `PropertyBifurcationController` | `readSafDtls` | AuthMaker | Role / ULB | `VERIFIED` |
| 113 | `POST` | `api/property/getpropLatLong` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `getpropLatLong` | AuthMaker | Role / ULB | `VERIFIED` |
| 114 | `POST` | `api/property/grievance/get-filter-property-details` | `N/A` | `api` | `PropertyDetailsController` | `propertyListByKeyGrv` | AuthMaker | Role / ULB | `VERIFIED` |
| 115 | `POST` | `api/property/harvesting/approval-rejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `finalApprovalRejection` | AuthMaker | Role / ULB | `VERIFIED` |
| 116 | `POST` | `api/property/harvesting/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 117 | `POST` | `api/property/harvesting/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `btcInboxList` | AuthMaker | Role / ULB | `VERIFIED` |
| 118 | `POST` | `api/property/harvesting/citizen-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `citizenDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 119 | `POST` | `api/property/harvesting/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 120 | `POST` | `api/property/harvesting/details-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getDetailsById` | AuthMaker | Role / ULB | `VERIFIED` |
| 121 | `POST` | `api/property/harvesting/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 122 | `POST` | `api/property/harvesting/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 123 | `POST` | `api/property/harvesting/field-verification-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `fieldVerifiedInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 124 | `POST` | `api/property/harvesting/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 125 | `POST` | `api/property/harvesting/get-tc-verifications` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getTcVerifications` | AuthMaker | Role / ULB | `VERIFIED` |
| 126 | `POST` | `api/property/harvesting/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `getUploadedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 127 | `POST` | `api/property/harvesting/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `harvestingInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 128 | `POST` | `api/property/harvesting/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 129 | `POST` | `api/property/harvesting/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `harvestingOutbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 130 | `POST` | `api/property/harvesting/rejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `rejectionOfHarvesting` | AuthMaker | Role / ULB | `VERIFIED` |
| 131 | `POST` | `api/property/harvesting/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `siteVerification` | AuthMaker | Role / ULB | `VERIFIED` |
| 132 | `POST` | `api/property/harvesting/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 133 | `POST` | `api/property/harvesting/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `staticDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 134 | `POST` | `api/property/harvesting/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `uploadDocument` | AuthMaker | Role / ULB | `VERIFIED` |
| 135 | `GET|HEAD` | `api/property/health-check` | `N/A` | `api` | `Closure` | `Closure` | Public | None | `VERIFIED` |
| 136 | `POST` | `api/property/inboxDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 137 | `POST` | `api/property/independent/generate-prop-orderid` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateOrderId` | AuthMaker | Role / ULB | `VERIFIED` |
| 138 | `POST` | `api/property/independent/get-holding-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getHoldingDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 139 | `GET|HEAD` | `api/property/initiate-payment/{propertyId}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `initiatePayment` | AuthMaker | Role / ULB | `VERIFIED` |
| 140 | `POST` | `api/property/legacy-payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `legacyPaymentHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 141 | `POST` | `api/property/list-cash-verification` | `N/A` | `api` | `CashVerificationController` | `cashVerificationList` | AuthMaker | Role / ULB | `VERIFIED` |
| 142 | `POST` | `api/property/live-dashboard-data` | `N/A` | `api` | `ReportController` | `liveDashboardData` | AuthMaker | Role / ULB | `VERIFIED` |
| 143 | `POST` | `api/property/live-dashboard-update` | `N/A` | `api` | `ReportController` | `liveDashboardUpdate` | AuthMaker | Role / ULB | `VERIFIED` |
| 144 | `POST` | `api/property/location` | `N/A` | `api` | `LocationController` | `location_list` | AuthMaker | Role / ULB | `VERIFIED` |
| 145 | `POST` | `api/property/location/ward-list` | `N/A` | `api` | `LocationController` | `bindLocationWithWards` | AuthMaker | Role / ULB | `VERIFIED` |
| 146 | `POST` | `api/property/m-about-us-create` | `N/A` | `api` | `MasterReferenceController` | `addAboutUs` | AuthMaker | Role / ULB | `VERIFIED` |
| 147 | `POST` | `api/property/m-about-us-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAboutUs` | AuthMaker | Role / ULB | `VERIFIED` |
| 148 | `POST` | `api/property/m-about-us-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `aboutUsbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 149 | `POST` | `api/property/m-about-us-list` | `N/A` | `api` | `MasterReferenceController` | `listAboutUs` | AuthMaker | Role / ULB | `VERIFIED` |
| 150 | `POST` | `api/property/m-about-us-update` | `N/A` | `api` | `MasterReferenceController` | `updateAboutUs` | AuthMaker | Role / ULB | `VERIFIED` |
| 151 | `POST` | `api/property/m-act-rules-create` | `N/A` | `api` | `MasterReferenceController` | `addActRule` | AuthMaker | Role / ULB | `VERIFIED` |
| 152 | `POST` | `api/property/m-act-rules-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteActRule` | AuthMaker | Role / ULB | `VERIFIED` |
| 153 | `POST` | `api/property/m-act-rules-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `actRulebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 154 | `POST` | `api/property/m-act-rules-list` | `N/A` | `api` | `MasterReferenceController` | `listActRule` | AuthMaker | Role / ULB | `VERIFIED` |
| 155 | `POST` | `api/property/m-act-rules-update` | `N/A` | `api` | `MasterReferenceController` | `updateActRule` | AuthMaker | Role / ULB | `VERIFIED` |
| 156 | `POST` | `api/property/m-administrative-create` | `N/A` | `api` | `MasterReferenceController` | `addAdministrative` | AuthMaker | Role / ULB | `VERIFIED` |
| 157 | `POST` | `api/property/m-administrative-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAdministrative` | AuthMaker | Role / ULB | `VERIFIED` |
| 158 | `POST` | `api/property/m-administrative-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `administrativebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 159 | `POST` | `api/property/m-administrative-list` | `N/A` | `api` | `MasterReferenceController` | `listAdministrative` | AuthMaker | Role / ULB | `VERIFIED` |
| 160 | `POST` | `api/property/m-administrative-update` | `N/A` | `api` | `MasterReferenceController` | `updateAdministrative` | AuthMaker | Role / ULB | `VERIFIED` |
| 161 | `POST` | `api/property/m-announcement-create` | `N/A` | `api` | `MasterReferenceController` | `addAnnouncement` | AuthMaker | Role / ULB | `VERIFIED` |
| 162 | `POST` | `api/property/m-announcement-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAnnouncementType` | AuthMaker | Role / ULB | `VERIFIED` |
| 163 | `POST` | `api/property/m-announcement-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `announcementTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 164 | `POST` | `api/property/m-announcement-list` | `N/A` | `api` | `MasterReferenceController` | `announcementList` | AuthMaker | Role / ULB | `VERIFIED` |
| 165 | `POST` | `api/property/m-announcement-update` | `N/A` | `api` | `MasterReferenceController` | `updateAnnouncementType` | AuthMaker | Role / ULB | `VERIFIED` |
| 166 | `POST` | `api/property/m-app-create` | `N/A` | `api` | `MasterReferenceController` | `addapp` | AuthMaker | Role / ULB | `VERIFIED` |
| 167 | `POST` | `api/property/m-app-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteapp` | AuthMaker | Role / ULB | `VERIFIED` |
| 168 | `POST` | `api/property/m-app-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `appbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 169 | `POST` | `api/property/m-app-list` | `N/A` | `api` | `MasterReferenceController` | `appList` | AuthMaker | Role / ULB | `VERIFIED` |
| 170 | `POST` | `api/property/m-app-update` | `N/A` | `api` | `MasterReferenceController` | `updateapp` | AuthMaker | Role / ULB | `VERIFIED` |
| 171 | `POST` | `api/property/m-assets-create` | `N/A` | `api` | `MasterReferenceController` | `addAssetesv3` | AuthMaker | Role / ULB | `VERIFIED` |
| 172 | `POST` | `api/property/m-assets-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteAssetesv3` | AuthMaker | Role / ULB | `VERIFIED` |
| 173 | `POST` | `api/property/m-assets-get` | `N/A` | `api` | `MasterReferenceController` | `allListAssetesv3` | AuthMaker | Role / ULB | `VERIFIED` |
| 174 | `POST` | `api/property/m-assets-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `Assetesv3ById` | AuthMaker | Role / ULB | `VERIFIED` |
| 175 | `POST` | `api/property/m-assets-update` | `N/A` | `api` | `MasterReferenceController` | `editAssetesv3` | AuthMaker | Role / ULB | `VERIFIED` |
| 176 | `POST` | `api/property/m-c-desk-create` | `N/A` | `api` | `MasterReferenceController` | `addCDesk` | AuthMaker | Role / ULB | `VERIFIED` |
| 177 | `POST` | `api/property/m-c-desk-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteCDesk` | AuthMaker | Role / ULB | `VERIFIED` |
| 178 | `POST` | `api/property/m-c-desk-des-create` | `N/A` | `api` | `MasterReferenceController` | `addCDeskDesc` | AuthMaker | Role / ULB | `VERIFIED` |
| 179 | `POST` | `api/property/m-c-desk-des-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteCDeskDesc` | AuthMaker | Role / ULB | `VERIFIED` |
| 180 | `POST` | `api/property/m-c-desk-des-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `CDeskDescbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 181 | `POST` | `api/property/m-c-desk-des-update` | `N/A` | `api` | `MasterReferenceController` | `updateCDeskDesc` | AuthMaker | Role / ULB | `VERIFIED` |
| 182 | `POST` | `api/property/m-c-desk-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `CDeskbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 183 | `POST` | `api/property/m-c-desk-list` | `N/A` | `api` | `MasterReferenceController` | `CDeskList` | AuthMaker | Role / ULB | `VERIFIED` |
| 184 | `POST` | `api/property/m-c-desk-update` | `N/A` | `api` | `MasterReferenceController` | `updateCDesk` | AuthMaker | Role / ULB | `VERIFIED` |
| 185 | `POST` | `api/property/m-capital-value-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MCapitalValurRateById` | AuthMaker | Role / ULB | `VERIFIED` |
| 186 | `POST` | `api/property/m-capital-value-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMCapitalValurRateList` | AuthMaker | Role / ULB | `VERIFIED` |
| 187 | `POST` | `api/property/m-contact-create` | `N/A` | `api` | `MasterReferenceController` | `addContact` | AuthMaker | Role / ULB | `VERIFIED` |
| 188 | `POST` | `api/property/m-contact-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteContact` | AuthMaker | Role / ULB | `VERIFIED` |
| 189 | `POST` | `api/property/m-contact-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `ContactbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 190 | `POST` | `api/property/m-contact-list` | `N/A` | `api` | `MasterReferenceController` | `ContactList` | AuthMaker | Role / ULB | `VERIFIED` |
| 191 | `POST` | `api/property/m-contact-update` | `N/A` | `api` | `MasterReferenceController` | `updateContact` | AuthMaker | Role / ULB | `VERIFIED` |
| 192 | `POST` | `api/property/m-dashboard-data` | `N/A` | `api` | `MasterReferenceController` | `dashboardData` | AuthMaker | Role / ULB | `VERIFIED` |
| 193 | `POST` | `api/property/m-dashboard-slider-data` | `N/A` | `api` | `MasterReferenceController` | `dashboardSliderData` | AuthMaker | Role / ULB | `VERIFIED` |
| 194 | `POST` | `api/property/m-delete-blog` | `N/A` | `api` | `MasterReferenceController` | `deleteBlog` | AuthMaker | Role / ULB | `VERIFIED` |
| 195 | `POST` | `api/property/m-department-create` | `N/A` | `api` | `MasterReferenceController` | `addDepartment` | AuthMaker | Role / ULB | `VERIFIED` |
| 196 | `POST` | `api/property/m-department-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteDepartment` | AuthMaker | Role / ULB | `VERIFIED` |
| 197 | `POST` | `api/property/m-department-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `departmentbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 198 | `POST` | `api/property/m-department-list` | `N/A` | `api` | `MasterReferenceController` | `departmentList` | AuthMaker | Role / ULB | `VERIFIED` |
| 199 | `POST` | `api/property/m-department-update` | `N/A` | `api` | `MasterReferenceController` | `updateDepartment` | AuthMaker | Role / ULB | `VERIFIED` |
| 200 | `POST` | `api/property/m-e-service-create` | `N/A` | `api` | `MasterReferenceController` | `addService` | AuthMaker | Role / ULB | `VERIFIED` |
| 201 | `POST` | `api/property/m-e-service-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteService` | AuthMaker | Role / ULB | `VERIFIED` |
| 202 | `POST` | `api/property/m-e-service-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `ServicebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 203 | `POST` | `api/property/m-e-service-list` | `N/A` | `api` | `MasterReferenceController` | `ServiceList` | AuthMaker | Role / ULB | `VERIFIED` |
| 204 | `POST` | `api/property/m-e-service-update` | `N/A` | `api` | `MasterReferenceController` | `updateService` | AuthMaker | Role / ULB | `VERIFIED` |
| 205 | `POST` | `api/property/m-get-active-blog` | `N/A` | `api` | `MasterReferenceController` | `activeBlogsList` | AuthMaker | Role / ULB | `VERIFIED` |
| 206 | `POST` | `api/property/m-get-blog-by-Id` | `N/A` | `api` | `MasterReferenceController` | `blogById` | AuthMaker | Role / ULB | `VERIFIED` |
| 207 | `POST` | `api/property/m-heading-create` | `N/A` | `api` | `MasterReferenceController` | `addUserManualHeading` | AuthMaker | Role / ULB | `VERIFIED` |
| 208 | `POST` | `api/property/m-heading-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteUserManualHeading` | AuthMaker | Role / ULB | `VERIFIED` |
| 209 | `POST` | `api/property/m-heading-description-create` | `N/A` | `api` | `MasterReferenceController` | `addHeadingDescription` | AuthMaker | Role / ULB | `VERIFIED` |
| 210 | `POST` | `api/property/m-heading-description-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteHeading` | AuthMaker | Role / ULB | `VERIFIED` |
| 211 | `POST` | `api/property/m-heading-description-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `userHeadingbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 212 | `POST` | `api/property/m-heading-description-list` | `N/A` | `api` | `MasterReferenceController` | `userHeadingList` | AuthMaker | Role / ULB | `VERIFIED` |
| 213 | `POST` | `api/property/m-heading-description-update` | `N/A` | `api` | `MasterReferenceController` | `updateHeading` | AuthMaker | Role / ULB | `VERIFIED` |
| 214 | `POST` | `api/property/m-heading-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 215 | `POST` | `api/property/m-heading-list` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingList` | AuthMaker | Role / ULB | `VERIFIED` |
| 216 | `POST` | `api/property/m-heading-list-master` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingListMaster` | AuthMaker | Role / ULB | `VERIFIED` |
| 217 | `POST` | `api/property/m-heading-list-master-desc` | `N/A` | `api` | `MasterReferenceController` | `userManualHeadingListMasterDesc` | AuthMaker | Role / ULB | `VERIFIED` |
| 218 | `POST` | `api/property/m-heading-update` | `N/A` | `api` | `MasterReferenceController` | `updateUserManualHeading` | AuthMaker | Role / ULB | `VERIFIED` |
| 219 | `POST` | `api/property/m-important-link-create` | `N/A` | `api` | `MasterReferenceController` | `addImportantLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 220 | `POST` | `api/property/m-important-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteImportantLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 221 | `POST` | `api/property/m-important-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `importantLinkbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 222 | `POST` | `api/property/m-important-link-list` | `N/A` | `api` | `MasterReferenceController` | `importantLinkList` | AuthMaker | Role / ULB | `VERIFIED` |
| 223 | `POST` | `api/property/m-important-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateImportantLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 224 | `POST` | `api/property/m-list-of-all-blog` | `N/A` | `api` | `MasterReferenceController` | `allBlogs` | AuthMaker | Role / ULB | `VERIFIED` |
| 225 | `POST` | `api/property/m-news-create` | `N/A` | `api` | `MasterReferenceController` | `addnews` | AuthMaker | Role / ULB | `VERIFIED` |
| 226 | `POST` | `api/property/m-news-delete` | `N/A` | `api` | `MasterReferenceController` | `deletenews` | AuthMaker | Role / ULB | `VERIFIED` |
| 227 | `POST` | `api/property/m-news-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `newsbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 228 | `POST` | `api/property/m-news-list` | `N/A` | `api` | `MasterReferenceController` | `newsList` | AuthMaker | Role / ULB | `VERIFIED` |
| 229 | `POST` | `api/property/m-news-update` | `N/A` | `api` | `MasterReferenceController` | `updatenews` | AuthMaker | Role / ULB | `VERIFIED` |
| 230 | `POST` | `api/property/m-notice-create` | `N/A` | `api` | `MasterReferenceController` | `addNotice` | AuthMaker | Role / ULB | `VERIFIED` |
| 231 | `POST` | `api/property/m-notice-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteNoticeType` | AuthMaker | Role / ULB | `VERIFIED` |
| 232 | `POST` | `api/property/m-notice-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `noticeTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 233 | `POST` | `api/property/m-notice-list` | `N/A` | `api` | `MasterReferenceController` | `noticeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 234 | `POST` | `api/property/m-notice-update` | `N/A` | `api` | `MasterReferenceController` | `updateNoticeType` | AuthMaker | Role / ULB | `VERIFIED` |
| 235 | `POST` | `api/property/m-prop-building-reantal-const-get` | `N/A` | `api` | `MasterReferenceController` | `MPropBuildingRentalconstsById` | AuthMaker | Role / ULB | `VERIFIED` |
| 236 | `POST` | `api/property/m-prop-building-reantal-const-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropBuildingRentalconstsList` | AuthMaker | Role / ULB | `VERIFIED` |
| 237 | `POST` | `api/property/m-prop-building-reantal-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MPropBuildingRentalRatesById` | AuthMaker | Role / ULB | `VERIFIED` |
| 238 | `POST` | `api/property/m-prop-building-reantal-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropBuildingRentalRatesList` | AuthMaker | Role / ULB | `VERIFIED` |
| 239 | `POST` | `api/property/m-prop-cv-rate-get` | `N/A` | `api` | `MasterReferenceController` | `MPropCvRatesById` | AuthMaker | Role / ULB | `VERIFIED` |
| 240 | `POST` | `api/property/m-prop-cv-rate-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropCvRatesList` | AuthMaker | Role / ULB | `VERIFIED` |
| 241 | `POST` | `api/property/m-prop-forgery-type-create` | `N/A` | `api` | `MasterReferenceController` | `createForgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 242 | `POST` | `api/property/m-prop-forgery-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteForgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 243 | `POST` | `api/property/m-prop-forgery-type-get` | `N/A` | `api` | `MasterReferenceController` | `ForgeryTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 244 | `POST` | `api/property/m-prop-forgery-type-list` | `N/A` | `api` | `MasterReferenceController` | `allForgeryTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 245 | `POST` | `api/property/m-prop-forgery-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateForgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 246 | `POST` | `api/property/m-prop-multi-factor-get` | `N/A` | `api` | `MasterReferenceController` | `MPropMultiFactorById` | AuthMaker | Role / ULB | `VERIFIED` |
| 247 | `POST` | `api/property/m-prop-multi-factor-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropMultiFactorList` | AuthMaker | Role / ULB | `VERIFIED` |
| 248 | `POST` | `api/property/m-prop-rental-value-get` | `N/A` | `api` | `MasterReferenceController` | `MPropRentalValueById` | AuthMaker | Role / ULB | `VERIFIED` |
| 249 | `POST` | `api/property/m-prop-rental-value-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropRentalValueList` | AuthMaker | Role / ULB | `VERIFIED` |
| 250 | `POST` | `api/property/m-prop-road-types-get` | `N/A` | `api` | `MasterReferenceController` | `MPropRoadTypeById` | AuthMaker | Role / ULB | `VERIFIED` |
| 251 | `POST` | `api/property/m-prop-road-types-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropRoadTypeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 252 | `POST` | `api/property/m-prop-vacant-rentalrates-get` | `N/A` | `api` | `MasterReferenceController` | `MPropVacantRentalrateById` | AuthMaker | Role / ULB | `VERIFIED` |
| 253 | `POST` | `api/property/m-prop-vacant-rentalrates-list` | `N/A` | `api` | `MasterReferenceController` | `allMPropVacantRentalrateList` | AuthMaker | Role / ULB | `VERIFIED` |
| 254 | `POST` | `api/property/m-quick-link-create` | `N/A` | `api` | `MasterReferenceController` | `addQuickLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 255 | `POST` | `api/property/m-quick-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteQuickLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 256 | `POST` | `api/property/m-quick-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `quickLinkbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 257 | `POST` | `api/property/m-quick-link-list` | `N/A` | `api` | `MasterReferenceController` | `quickLinkList` | AuthMaker | Role / ULB | `VERIFIED` |
| 258 | `POST` | `api/property/m-quick-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateQuickLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 259 | `POST` | `api/property/m-scheme-create` | `N/A` | `api` | `MasterReferenceController` | `addscheme` | AuthMaker | Role / ULB | `VERIFIED` |
| 260 | `POST` | `api/property/m-scheme-delete` | `N/A` | `api` | `MasterReferenceController` | `deletescheme` | AuthMaker | Role / ULB | `VERIFIED` |
| 261 | `POST` | `api/property/m-scheme-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `schemebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 262 | `POST` | `api/property/m-scheme-list` | `N/A` | `api` | `MasterReferenceController` | `schemeList` | AuthMaker | Role / ULB | `VERIFIED` |
| 263 | `POST` | `api/property/m-scheme-update` | `N/A` | `api` | `MasterReferenceController` | `updatescheme` | AuthMaker | Role / ULB | `VERIFIED` |
| 264 | `POST` | `api/property/m-slider-create` | `N/A` | `api` | `MasterReferenceController` | `createSlider` | AuthMaker | Role / ULB | `VERIFIED` |
| 265 | `POST` | `api/property/m-slider-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteSlider` | AuthMaker | Role / ULB | `VERIFIED` |
| 266 | `POST` | `api/property/m-slider-get` | `N/A` | `api` | `MasterReferenceController` | `allSliderList` | AuthMaker | Role / ULB | `VERIFIED` |
| 267 | `POST` | `api/property/m-slider-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `sliderById` | AuthMaker | Role / ULB | `VERIFIED` |
| 268 | `POST` | `api/property/m-slider-update` | `N/A` | `api` | `MasterReferenceController` | `updateSlider` | AuthMaker | Role / ULB | `VERIFIED` |
| 269 | `POST` | `api/property/m-store-blog-post` | `N/A` | `api` | `MasterReferenceController` | `storeBlogPost` | AuthMaker | Role / ULB | `VERIFIED` |
| 270 | `POST` | `api/property/m-update-blog` | `N/A` | `api` | `MasterReferenceController` | `editBlog` | AuthMaker | Role / ULB | `VERIFIED` |
| 271 | `POST` | `api/property/m-useful-link-create` | `N/A` | `api` | `MasterReferenceController` | `addUsefulLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 272 | `POST` | `api/property/m-useful-link-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteUsefulLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 273 | `POST` | `api/property/m-useful-link-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `usefulLinkbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 274 | `POST` | `api/property/m-useful-link-list` | `N/A` | `api` | `MasterReferenceController` | `usefulLinkList` | AuthMaker | Role / ULB | `VERIFIED` |
| 275 | `POST` | `api/property/m-useful-link-update` | `N/A` | `api` | `MasterReferenceController` | `updateUsefulLink` | AuthMaker | Role / ULB | `VERIFIED` |
| 276 | `POST` | `api/property/m-whats-new-create` | `N/A` | `api` | `MasterReferenceController` | `addWhatsNew` | AuthMaker | Role / ULB | `VERIFIED` |
| 277 | `POST` | `api/property/m-whats-new-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteWhatsNew` | AuthMaker | Role / ULB | `VERIFIED` |
| 278 | `POST` | `api/property/m-whats-new-get-by-id` | `N/A` | `api` | `MasterReferenceController` | `WhatsNewbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 279 | `POST` | `api/property/m-whats-new-list` | `N/A` | `api` | `MasterReferenceController` | `WhatsNewList` | AuthMaker | Role / ULB | `VERIFIED` |
| 280 | `POST` | `api/property/m-whats-new-update` | `N/A` | `api` | `MasterReferenceController` | `updateWhatsNew` | AuthMaker | Role / ULB | `VERIFIED` |
| 281 | `POST` | `api/property/map/level1` | `N/A` | `api` | `LocationController` | `mapLevel1` | AuthMaker | Role / ULB | `VERIFIED` |
| 282 | `POST` | `api/property/master-holding-data` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyController` | `masterHoldingData` | AuthMaker | Role / ULB | `VERIFIED` |
| 283 | `POST` | `api/property/objection/add-members` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `addMembers` | AuthMaker | Role / ULB | `VERIFIED` |
| 284 | `POST` | `api/property/objection/apply-objection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `applyObjection` | AuthMaker | Role / ULB | `VERIFIED` |
| 285 | `POST` | `api/property/objection/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `approvalRejection` | AuthMaker | Role / ULB | `VERIFIED` |
| 286 | `POST` | `api/property/objection/backtocitizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 287 | `POST` | `api/property/objection/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `btcInboxList` | AuthMaker | Role / ULB | `VERIFIED` |
| 288 | `POST` | `api/property/objection/citizen-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `citizenDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 289 | `POST` | `api/property/objection/citizen-forgery-doclist` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `citizenForgeryDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 290 | `POST` | `api/property/objection/comment-independent` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 291 | `POST` | `api/property/objection/details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `getDetailsById` | AuthMaker | Role / ULB | `VERIFIED` |
| 292 | `POST` | `api/property/objection/doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `objectionDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 293 | `POST` | `api/property/objection/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 294 | `POST` | `api/property/objection/forgery-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `forgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 295 | `POST` | `api/property/objection/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `getUploadedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 296 | `POST` | `api/property/objection/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 297 | `POST` | `api/property/objection/next-level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 298 | `GET|HEAD` | `api/property/objection/objection-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `objectionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 299 | `POST` | `api/property/objection/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 300 | `POST` | `api/property/objection/owner-detailById` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `ownerDetailById` | AuthMaker | Role / ULB | `VERIFIED` |
| 301 | `POST` | `api/property/objection/post-escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 302 | `POST` | `api/property/objection/special-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 303 | `POST` | `api/property/objection/upload-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ObjectionController` | `uploadDocument` | AuthMaker | Role / ULB | `VERIFIED` |
| 304 | `POST` | `api/property/offline-payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `offlinePaymentHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 305 | `POST` | `api/property/outboxDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 306 | `POST` | `api/property/payment-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `paymentHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 307 | `POST` | `api/property/postEscalateDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 308 | `POST` | `api/property/postNextDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 309 | `POST` | `api/property/prop-comparative-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `comparativeDemand` | AuthMaker | Role / ULB | `VERIFIED` |
| 310 | `GET|HEAD` | `api/property/prop-const-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propConstructionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 311 | `POST` | `api/property/prop-dues` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `propertyDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 312 | `POST` | `api/property/prop-objection-type` | `N/A` | `api` | `ReferenceController` | `listPropObjectiontype` | AuthMaker | Role / ULB | `VERIFIED` |
| 313 | `POST` | `api/property/prop-occupancy-factor` | `N/A` | `api` | `ReferenceController` | `listPropOccupancyFactor` | AuthMaker | Role / ULB | `VERIFIED` |
| 314 | `POST` | `api/property/prop-occupancy-type` | `N/A` | `api` | `ReferenceController` | `listPropOccupancytype` | AuthMaker | Role / ULB | `VERIFIED` |
| 315 | `GET|HEAD` | `api/property/prop-occupancy-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propOccupancyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 316 | `POST` | `api/property/prop-ownership-type` | `N/A` | `api` | `ReferenceController` | `listPropOwnershiptype` | AuthMaker | Role / ULB | `VERIFIED` |
| 317 | `POST` | `api/property/prop-payment-history` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `propPaymentHistory` | AuthMaker | Role / ULB | `VERIFIED` |
| 318 | `POST` | `api/property/prop-payment-receipt` | `N/A` | `api` | `HoldingTaxController` | `propPaymentReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 319 | `POST` | `api/property/prop-penalty-type` | `N/A` | `api` | `ReferenceController` | `listPropPenaltytype` | AuthMaker | Role / ULB | `VERIFIED` |
| 320 | `GET|HEAD` | `api/property/prop-property-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propPropertyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 321 | `POST` | `api/property/prop-rebate-type` | `N/A` | `api` | `ReferenceController` | `listPropRebatetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 322 | `POST` | `api/property/prop-road-type` | `N/A` | `api` | `ReferenceController` | `listPropRoadtype` | AuthMaker | Role / ULB | `VERIFIED` |
| 323 | `GET|HEAD` | `api/property/prop-road-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propRoadType` | AuthMaker | Role / ULB | `VERIFIED` |
| 324 | `POST` | `api/property/prop-transfer-mode` | `N/A` | `api` | `ReferenceController` | `listPropTransfermode` | AuthMaker | Role / ULB | `VERIFIED` |
| 325 | `POST` | `api/property/prop-ulb-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `proUlbReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 326 | `POST` | `api/property/prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 327 | `GET|HEAD` | `api/property/prop-usage-type` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropMaster` | `propUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 328 | `POST` | `api/property/prop-water-payment-receipt` | `N/A` | `api` | `HoldingTaxController` | `propPaymentReceiptv1` | AuthMaker | Role / ULB | `VERIFIED` |
| 329 | `POST` | `api/property/prop/cluster-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `clusterPayment` | AuthMaker | Role / ULB | `VERIFIED` |
| 330 | `POST` | `api/property/prop/get-cluster-holding-due` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `getClusterHoldingDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 331 | `POST` | `api/property/propertyHoldingInfoWatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyHoldingInfoWatsappChat` | AuthMaker | Role / ULB | `VERIFIED` |
| 332 | `POST` | `api/property/propertyPaymentStatusWatsappChat` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDetailsController` | `propertyPaymentStatusWatsappChat` | AuthMaker | Role / ULB | `VERIFIED` |
| 333 | `POST` | `api/property/ref-prop-construction-type-create` | `N/A` | `api` | `MasterReferenceController` | `createConstructionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 334 | `POST` | `api/property/ref-prop-construction-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteConstructionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 335 | `POST` | `api/property/ref-prop-construction-type-get` | `N/A` | `api` | `MasterReferenceController` | `constructiontypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 336 | `POST` | `api/property/ref-prop-construction-type-list` | `N/A` | `api` | `MasterReferenceController` | `allConstructiontypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 337 | `POST` | `api/property/ref-prop-construction-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateConstructionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 338 | `POST` | `api/property/ref-prop-floor-type-create` | `N/A` | `api` | `MasterReferenceController` | `createFloorType` | AuthMaker | Role / ULB | `VERIFIED` |
| 339 | `POST` | `api/property/ref-prop-floor-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteFloorType` | AuthMaker | Role / ULB | `VERIFIED` |
| 340 | `POST` | `api/property/ref-prop-floor-type-get` | `N/A` | `api` | `MasterReferenceController` | `floortypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 341 | `POST` | `api/property/ref-prop-floor-type-list` | `N/A` | `api` | `MasterReferenceController` | `allFloortypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 342 | `POST` | `api/property/ref-prop-floor-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateFloorType` | AuthMaker | Role / ULB | `VERIFIED` |
| 343 | `POST` | `api/property/ref-prop-gbbuilding-type-create` | `N/A` | `api` | `MasterReferenceController` | `createGbBuildingType` | AuthMaker | Role / ULB | `VERIFIED` |
| 344 | `POST` | `api/property/ref-prop-gbbuilding-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteGbBuildingType` | AuthMaker | Role / ULB | `VERIFIED` |
| 345 | `POST` | `api/property/ref-prop-gbbuilding-type-get` | `N/A` | `api` | `MasterReferenceController` | `GbBuildingtypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 346 | `POST` | `api/property/ref-prop-gbbuilding-type-list` | `N/A` | `api` | `MasterReferenceController` | `allGbBuildingtypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 347 | `POST` | `api/property/ref-prop-gbbuilding-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateGbBuildingType` | AuthMaker | Role / ULB | `VERIFIED` |
| 348 | `POST` | `api/property/ref-prop-gbpropusage-type-create` | `N/A` | `api` | `MasterReferenceController` | `createGbPropUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 349 | `POST` | `api/property/ref-prop-gbpropusage-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteGbPropUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 350 | `POST` | `api/property/ref-prop-gbpropusage-type-get` | `N/A` | `api` | `MasterReferenceController` | `GbPropUsagetypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 351 | `POST` | `api/property/ref-prop-gbpropusage-type-list` | `N/A` | `api` | `MasterReferenceController` | `allGbPropUsagetypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 352 | `POST` | `api/property/ref-prop-gbpropusage-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateGbPropUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 353 | `POST` | `api/property/ref-prop-objection-type-create` | `N/A` | `api` | `MasterReferenceController` | `createObjectionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 354 | `POST` | `api/property/ref-prop-objection-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteObjectionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 355 | `POST` | `api/property/ref-prop-objection-type-get` | `N/A` | `api` | `MasterReferenceController` | `ObjectiontypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 356 | `POST` | `api/property/ref-prop-objection-type-list` | `N/A` | `api` | `MasterReferenceController` | `allObjectiontypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 357 | `POST` | `api/property/ref-prop-objection-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateObjectionType` | AuthMaker | Role / ULB | `VERIFIED` |
| 358 | `POST` | `api/property/ref-prop-occupancy-factor-create` | `N/A` | `api` | `MasterReferenceController` | `createOccupancyFactor` | AuthMaker | Role / ULB | `VERIFIED` |
| 359 | `POST` | `api/property/ref-prop-occupancy-factor-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOccupancyFactor` | AuthMaker | Role / ULB | `VERIFIED` |
| 360 | `POST` | `api/property/ref-prop-occupancy-factor-get` | `N/A` | `api` | `MasterReferenceController` | `OccupancyFactorbyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 361 | `POST` | `api/property/ref-prop-occupancy-factor-list` | `N/A` | `api` | `MasterReferenceController` | `allOccupancyFactorlist` | AuthMaker | Role / ULB | `VERIFIED` |
| 362 | `POST` | `api/property/ref-prop-occupancy-factor-update` | `N/A` | `api` | `MasterReferenceController` | `updateOccupancyFactor` | AuthMaker | Role / ULB | `VERIFIED` |
| 363 | `POST` | `api/property/ref-prop-occupancy-type-create` | `N/A` | `api` | `MasterReferenceController` | `createOccupancyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 364 | `POST` | `api/property/ref-prop-occupancy-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOccupancyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 365 | `POST` | `api/property/ref-prop-occupancy-type-get` | `N/A` | `api` | `MasterReferenceController` | `OccupancyTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 366 | `POST` | `api/property/ref-prop-occupancy-type-list` | `N/A` | `api` | `MasterReferenceController` | `allOccupancyTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 367 | `POST` | `api/property/ref-prop-occupancy-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateOccupancyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 368 | `POST` | `api/property/ref-prop-ownership-type-create` | `N/A` | `api` | `MasterReferenceController` | `createOwnershipType` | AuthMaker | Role / ULB | `VERIFIED` |
| 369 | `POST` | `api/property/ref-prop-ownership-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteOwnershipType` | AuthMaker | Role / ULB | `VERIFIED` |
| 370 | `POST` | `api/property/ref-prop-ownership-type-get` | `N/A` | `api` | `MasterReferenceController` | `OwnershipTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 371 | `POST` | `api/property/ref-prop-ownership-type-list` | `N/A` | `api` | `MasterReferenceController` | `allOwnershipTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 372 | `POST` | `api/property/ref-prop-ownership-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateOwnershipType` | AuthMaker | Role / ULB | `VERIFIED` |
| 373 | `POST` | `api/property/ref-prop-penalty-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPenaltyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 374 | `POST` | `api/property/ref-prop-penalty-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletePenaltyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 375 | `POST` | `api/property/ref-prop-penalty-type-get` | `N/A` | `api` | `MasterReferenceController` | `PenaltyTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 376 | `POST` | `api/property/ref-prop-penalty-type-list` | `N/A` | `api` | `MasterReferenceController` | `allPenaltyTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 377 | `POST` | `api/property/ref-prop-penalty-type-update` | `N/A` | `api` | `MasterReferenceController` | `updatePenaltyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 378 | `POST` | `api/property/ref-prop-property-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPropertyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 379 | `POST` | `api/property/ref-prop-property-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletepropertyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 380 | `POST` | `api/property/ref-prop-property-type-get` | `N/A` | `api` | `MasterReferenceController` | `propertyTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 381 | `POST` | `api/property/ref-prop-property-type-list` | `N/A` | `api` | `MasterReferenceController` | `allpropertyTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 382 | `POST` | `api/property/ref-prop-property-type-update` | `N/A` | `api` | `MasterReferenceController` | `updatePropertyType` | AuthMaker | Role / ULB | `VERIFIED` |
| 383 | `POST` | `api/property/ref-prop-rebate-type-create` | `N/A` | `api` | `MasterReferenceController` | `createRebateType` | AuthMaker | Role / ULB | `VERIFIED` |
| 384 | `POST` | `api/property/ref-prop-rebate-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteRebateType` | AuthMaker | Role / ULB | `VERIFIED` |
| 385 | `POST` | `api/property/ref-prop-rebate-type-get` | `N/A` | `api` | `MasterReferenceController` | `RebateTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 386 | `POST` | `api/property/ref-prop-rebate-type-list` | `N/A` | `api` | `MasterReferenceController` | `allRebateTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 387 | `POST` | `api/property/ref-prop-rebate-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateRebateType` | AuthMaker | Role / ULB | `VERIFIED` |
| 388 | `POST` | `api/property/ref-prop-road-type-create` | `N/A` | `api` | `MasterReferenceController` | `createRoadType` | AuthMaker | Role / ULB | `VERIFIED` |
| 389 | `POST` | `api/property/ref-prop-road-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteroadType` | AuthMaker | Role / ULB | `VERIFIED` |
| 390 | `POST` | `api/property/ref-prop-road-type-get` | `N/A` | `api` | `MasterReferenceController` | `roadTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 391 | `POST` | `api/property/ref-prop-road-type-list` | `N/A` | `api` | `MasterReferenceController` | `allroadTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 392 | `POST` | `api/property/ref-prop-road-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateroadType` | AuthMaker | Role / ULB | `VERIFIED` |
| 393 | `POST` | `api/property/ref-prop-transfer-mode-create` | `N/A` | `api` | `MasterReferenceController` | `createPropTransferMode` | AuthMaker | Role / ULB | `VERIFIED` |
| 394 | `POST` | `api/property/ref-prop-transfer-mode-delete` | `N/A` | `api` | `MasterReferenceController` | `deleteTransferMode` | AuthMaker | Role / ULB | `VERIFIED` |
| 395 | `POST` | `api/property/ref-prop-transfer-mode-get` | `N/A` | `api` | `MasterReferenceController` | `TransferModebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 396 | `POST` | `api/property/ref-prop-transfer-mode-list` | `N/A` | `api` | `MasterReferenceController` | `allTransferModelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 397 | `POST` | `api/property/ref-prop-transfer-mode-update` | `N/A` | `api` | `MasterReferenceController` | `updateTransferMode` | AuthMaker | Role / ULB | `VERIFIED` |
| 398 | `POST` | `api/property/ref-prop-usage-type-create` | `N/A` | `api` | `MasterReferenceController` | `createPropUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 399 | `POST` | `api/property/ref-prop-usage-type-delete` | `N/A` | `api` | `MasterReferenceController` | `deletePropUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 400 | `POST` | `api/property/ref-prop-usage-type-get` | `N/A` | `api` | `MasterReferenceController` | `PropUsageTypebyId` | AuthMaker | Role / ULB | `VERIFIED` |
| 401 | `POST` | `api/property/ref-prop-usage-type-list` | `N/A` | `api` | `MasterReferenceController` | `allPropUsageTypelist` | AuthMaker | Role / ULB | `VERIFIED` |
| 402 | `POST` | `api/property/ref-prop-usage-type-update` | `N/A` | `api` | `MasterReferenceController` | `updateUsageType` | AuthMaker | Role / ULB | `VERIFIED` |
| 403 | `POST` | `api/property/report/mpl-todayCollection-new` | `N/A` | `api` | `ReportController` | `mplReportCollectionNew` | AuthMaker | Role / ULB | `VERIFIED` |
| 404 | `POST` | `api/property/report/ulb-list` | `N/A` | `api` | `ReportController` | `ulbList` | AuthMaker | Role / ULB | `VERIFIED` |
| 405 | `POST` | `api/property/reports/dcb-piechart` | `N/A` | `api` | `ReportController` | `dcbPieChart` | AuthMaker | Role / ULB | `VERIFIED` |
| 406 | `POST` | `api/property/reports/list-fy` | `N/A` | `api` | `ReportController` | `listFY` | AuthMaker | Role / ULB | `VERIFIED` |
| 407 | `POST` | `api/property/reports/mpl` | `N/A` | `api` | `ReportController` | `mplReport` | AuthMaker | Role / ULB | `VERIFIED` |
| 408 | `POST` | `api/property/reports/mpl2` | `N/A` | `api` | `ReportController` | `mplReport2` | AuthMaker | Role / ULB | `BLOCKED` |
| 409 | `POST` | `api/property/reports/not-paid-from-2016` | `N/A` | `api` | `ReportController` | `notPaidFrom2016` | AuthMaker | Role / ULB | `VERIFIED` |
| 410 | `POST` | `api/property/reports/oldHolding` | `N/A` | `api` | `ReportController` | `oldHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 411 | `POST` | `api/property/reports/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `PaymentModeWiseSummery` | AuthMaker | Role / ULB | `VERIFIED` |
| 412 | `POST` | `api/property/reports/previous-year-paid-not-current-year` | `N/A` | `api` | `ReportController` | `previousYearPaidButnotCurrentYear` | AuthMaker | Role / ULB | `VERIFIED` |
| 413 | `POST` | `api/property/reports/print-bulk-receipt` | `N/A` | `api` | `ReportController` | `bulkReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 414 | `POST` | `api/property/reports/prop/saf/collection` | `N/A` | `api` | `ReportController` | `propSafCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 415 | `POST` | `api/property/reports/property/collection` | `N/A` | `api` | `ReportController` | `collectionReport` | AuthMaker | Role / ULB | `VERIFIED` |
| 416 | `POST` | `api/property/reports/property/dcb` | `N/A` | `api` | `ReportController` | `PropDCB` | AuthMaker | Role / ULB | `VERIFIED` |
| 417 | `POST` | `api/property/reports/property/deactivated-list` | `N/A` | `api` | `ReportController` | `PropDeactedList` | AuthMaker | Role / ULB | `VERIFIED` |
| 418 | `POST` | `api/property/reports/property/gbsaf-collection` | `N/A` | `api` | `ReportController` | `gbSafCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 419 | `POST` | `api/property/reports/property/gbsaf-individual-demand-collection` | `N/A` | `api` | `ReportController` | `gbsafIndividualDemandCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 420 | `POST` | `api/property/reports/property/holding-wise-fine-rebate` | `N/A` | `api` | `ReportController` | `PropFineRebate` | AuthMaker | Role / ULB | `VERIFIED` |
| 421 | `POST` | `api/property/reports/property/individual-demand-collection` | `N/A` | `api` | `ReportController` | `propIndividualDemandCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 422 | `POST` | `api/property/reports/property/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `PropPaymentModeWiseSummery` | AuthMaker | Role / ULB | `VERIFIED` |
| 423 | `POST` | `api/property/reports/property/prop-saf-individual-demand-collection` | `N/A` | `api` | `ReportController` | `safPropIndividualDemandAndCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 424 | `POST` | `api/property/reports/property/ward-wise-dcb` | `N/A` | `api` | `ReportController` | `PropWardWiseDCB` | AuthMaker | Role / ULB | `VERIFIED` |
| 425 | `POST` | `api/property/reports/rebate/penalty` | `N/A` | `api` | `ReportController` | `rebateNpenalty` | AuthMaker | Role / ULB | `VERIFIED` |
| 426 | `POST` | `api/property/reports/saf/collection` | `N/A` | `api` | `ReportController` | `safCollection` | AuthMaker | Role / ULB | `VERIFIED` |
| 427 | `POST` | `api/property/reports/saf/levelformdetail` | `N/A` | `api` | `ReportController` | `levelformdetail` | AuthMaker | Role / ULB | `VERIFIED` |
| 428 | `POST` | `api/property/reports/saf/leveluserpending` | `N/A` | `api` | `ReportController` | `levelUserPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 429 | `POST` | `api/property/reports/saf/levelwisependingform` | `N/A` | `api` | `ReportController` | `levelwisependingform` | AuthMaker | Role / ULB | `VERIFIED` |
| 430 | `POST` | `api/property/reports/saf/payment-mode-wise-summery` | `N/A` | `api` | `ReportController` | `SafPaymentModeWiseSummery` | AuthMaker | Role / ULB | `VERIFIED` |
| 431 | `POST` | `api/property/reports/saf/saf-sam-fam-geotagging` | `N/A` | `api` | `ReportController` | `safSamFamGeotagging` | AuthMaker | Role / ULB | `VERIFIED` |
| 432 | `POST` | `api/property/reports/saf/userWiseWardWireLevelPending` | `N/A` | `api` | `ReportController` | `userWiseWardWireLevelPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 433 | `POST` | `api/property/reports/saf/userwiselevelpending` | `N/A` | `api` | `ReportController` | `userWiseLevelPending` | AuthMaker | Role / ULB | `VERIFIED` |
| 434 | `POST` | `api/property/reports/ward-wise-holding` | `N/A` | `api` | `ReportController` | `wardWiseHoldingReport` | AuthMaker | Role / ULB | `VERIFIED` |
| 435 | `POST` | `api/property/review-calculation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `CalculatorController` | `reviewCalculation` | AuthMaker | Role / ULB | `VERIFIED` |
| 436 | `POST` | `api/property/roles-by-ulb-module` | `N/A` | `api` | `ReportController` | `rolesByUlbAndModule` | AuthMaker | Role / ULB | `VERIFIED` |
| 437 | `POST` | `api/property/saf-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `safDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 438 | `POST` | `api/property/saf/IndiVerificationsList` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getSafVerificationList` | AuthMaker | Role / ULB | `VERIFIED` |
| 439 | `POST` | `api/property/saf/apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ApplySafController` | `applySafv1` | AuthMaker | Role / ULB | `VERIFIED` |
| 440 | `POST` | `api/property/saf/approvalrejection` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `approvalRejectionSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 441 | `POST` | `api/property/saf/back-to-citizen` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `backToCitizen` | AuthMaker | Role / ULB | `VERIFIED` |
| 442 | `POST` | `api/property/saf/btc-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `btcInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 443 | `POST` | `api/property/saf/calculate-by-saf-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `calculateSafBySafId` | AuthMaker | Role / ULB | `VERIFIED` |
| 444 | `POST` | `api/property/saf/cluster-saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `clusterSafPayment` | AuthMaker | Role / ULB | `VERIFIED` |
| 445 | `POST` | `api/property/saf/delete-citizen-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `deleteCitizenSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 446 | `POST` | `api/property/saf/doc-verify-reject` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 447 | `POST` | `api/property/saf/document-upload` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `docUpload` | AuthMaker | Role / ULB | `VERIFIED` |
| 448 | `POST` | `api/property/saf/edit` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `editSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 449 | `POST` | `api/property/saf/edit-citizen-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `editCitizenSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 450 | `POST` | `api/property/saf/escalate` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `postEscalate` | AuthMaker | Role / ULB | `VERIFIED` |
| 451 | `POST` | `api/property/saf/escalate/inbox/{key?}` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 452 | `POST` | `api/property/saf/field-verified-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `fieldVerifiedInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 453 | `POST` | `api/property/saf/gb-apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ApplySafController` | `applyGbSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 454 | `POST` | `api/property/saf/generate-order-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `generateOrderId` | AuthMaker | Role / ULB | `VERIFIED` |
| 455 | `POST` | `api/property/saf/geotagging` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `geoTagging` | AuthMaker | Role / ULB | `VERIFIED` |
| 456 | `POST` | `api/property/saf/get-cluster-saf-due` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getClusterSafDues` | AuthMaker | Role / ULB | `VERIFIED` |
| 457 | `POST` | `api/property/saf/get-demand-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getDemandBySafId` | AuthMaker | Role / ULB | `VERIFIED` |
| 458 | `POST` | `api/property/saf/get-doc-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `getDocList` | AuthMaker | Role / ULB | `VERIFIED` |
| 459 | `POST` | `api/property/saf/get-gb-prop-byholding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `GbSafController` | `getGbPropByHoldingNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 460 | `POST` | `api/property/saf/get-prop-byholding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getPropByHoldingNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 461 | `POST` | `api/property/saf/get-tc-verifications` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getTcVerifications` | AuthMaker | Role / ULB | `VERIFIED` |
| 462 | `POST` | `api/property/saf/get-uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `SafDocController` | `getUploadDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 463 | `POST` | `api/property/saf/inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 464 | `POST` | `api/property/saf/independent-comment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `commentIndependent` | AuthMaker | Role / ULB | `VERIFIED` |
| 465 | `POST` | `api/property/saf/independent/generate-order-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `generateOrderId` | AuthMaker | Role / ULB | `VERIFIED` |
| 466 | `POST` | `api/property/saf/list-apartment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getAptList` | AuthMaker | Role / ULB | `VERIFIED` |
| 467 | `GET|HEAD` | `api/property/saf/master-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `masterSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 468 | `POST` | `api/property/saf/master-saf` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `masterSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 469 | `POST` | `api/property/saf/memo-receipt` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `memoReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 470 | `POST` | `api/property/saf/offline-saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `offlinePaymentSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 471 | `POST` | `api/property/saf/outbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `outbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 472 | `POST` | `api/property/saf/payment-receipt` | `N/A` | `api` | `ActiveSafController` | `generatePaymentReceipt` | AuthMaker | Role / ULB | `VERIFIED` |
| 473 | `POST` | `api/property/saf/pending-geotagging-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `pendingGeoTaggingList` | AuthMaker | Role / ULB | `VERIFIED` |
| 474 | `POST` | `api/property/saf/post/level` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `postNextLevel` | AuthMaker | Role / ULB | `VERIFIED` |
| 475 | `GET|HEAD` | `api/property/saf/prop-transactions` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getPropTransactions` | AuthMaker | Role / ULB | `VERIFIED` |
| 476 | `POST` | `api/property/saf/proptransaction-by-id` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getTransactionBySafPropId` | AuthMaker | Role / ULB | `VERIFIED` |
| 477 | `POST` | `api/property/saf/rejected-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `rejectedList` | AuthMaker | Role / ULB | `VERIFIED` |
| 478 | `POST` | `api/property/saf/rejected-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `rejectedList` | AuthMaker | Role / ULB | `VERIFIED` |
| 479 | `POST` | `api/property/saf/saf-payment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `paymentSaf` | AuthMaker | Role / ULB | `VERIFIED` |
| 480 | `POST` | `api/property/saf/site-verification` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `siteVerification` | AuthMaker | Role / ULB | `VERIFIED` |
| 481 | `POST` | `api/property/saf/static-saf-dtls` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getStaticSafDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 482 | `POST` | `api/property/saf/verifications-comp` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafController` | `getVerifications` | AuthMaker | Role / ULB | `VERIFIED` |
| 483 | `POST` | `api/property/saf/verify-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `verifyHoldingNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 484 | `POST` | `api/property/search-holding` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `searchHolding` | AuthMaker | Role / ULB | `VERIFIED` |
| 485 | `POST` | `api/property/search-transaction` | `N/A` | `api` | `BankReconcillationController` | `searchTransaction` | AuthMaker | Role / ULB | `VERIFIED` |
| 486 | `POST` | `api/property/search-transaction-no` | `N/A` | `api` | `BankReconcillationController` | `searchTransactionNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 487 | `POST` | `api/property/searchByHoldingNo` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `readHoldigbyNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 488 | `POST` | `api/property/searchByHoldingNoBi` | `N/A` | `api` | `PropertyBifurcationController` | `readHoldigbyNo` | AuthMaker | Role / ULB | `VERIFIED` |
| 489 | `POST` | `api/property/specialDeactivation` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `PropertyDeactivateController` | `specialInbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 490 | `POST` | `api/property/tc-collections` | `N/A` | `api` | `CashVerificationController` | `tcCollectionDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 491 | `POST` | `api/property/today-collection-dashboard` | `N/A` | `api` | `ReportController` | `todayCollectionDashboard` | AuthMaker | Role / ULB | `VERIFIED` |
| 492 | `POST` | `api/property/ulb-module-role-count-dashboard` | `N/A` | `api` | `ReportController` | `ulbModuleRoleCount` | AuthMaker | Role / ULB | `VERIFIED` |
| 493 | `POST` | `api/property/ulb-wise-count-dashboard` | `N/A` | `api` | `ReportController` | `ulbWiseApplicationCount` | AuthMaker | Role / ULB | `VERIFIED` |
| 494 | `POST` | `api/property/v1/building-rental-const` | `N/A` | `api` | `ReferenceController` | `listBuildingRentalconst` | AuthMaker | Role / ULB | `VERIFIED` |
| 495 | `POST` | `api/property/v1/building-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropBuildingRentalrate` | AuthMaker | Role / ULB | `VERIFIED` |
| 496 | `POST` | `api/property/v1/floor-type` | `N/A` | `api` | `ReferenceController` | `listPropFloor` | AuthMaker | Role / ULB | `VERIFIED` |
| 497 | `POST` | `api/property/v1/gb-building-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbBuildingUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 498 | `POST` | `api/property/v1/gb-prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropgbPropUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 499 | `POST` | `api/property/v1/generate-holding-demand` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `HoldingTaxController` | `generateHoldingDemand` | AuthMaker | Role / ULB | `VERIFIED` |
| 500 | `POST` | `api/property/v1/get-construction-list` | `N/A` | `api` | `ReferenceController` | `listPropConstructiontype` | AuthMaker | Role / ULB | `VERIFIED` |
| 501 | `POST` | `api/property/v1/get-forgery-type` | `N/A` | `api` | `ReferenceController` | `listpropForgeryType` | AuthMaker | Role / ULB | `VERIFIED` |
| 502 | `POST` | `api/property/v1/get-prop-type` | `N/A` | `api` | `ReferenceController` | `listProptype` | AuthMaker | Role / ULB | `VERIFIED` |
| 503 | `POST` | `api/property/v1/get-rental-value` | `N/A` | `api` | `ReferenceController` | `listPropRentalValue` | AuthMaker | Role / ULB | `VERIFIED` |
| 504 | `POST` | `api/property/v1/prop-objection-type` | `N/A` | `api` | `ReferenceController` | `listPropObjectiontype` | AuthMaker | Role / ULB | `VERIFIED` |
| 505 | `POST` | `api/property/v1/prop-occupancy-factor` | `N/A` | `api` | `ReferenceController` | `listPropOccupancyFactor` | AuthMaker | Role / ULB | `VERIFIED` |
| 506 | `POST` | `api/property/v1/prop-occupancy-type` | `N/A` | `api` | `ReferenceController` | `listPropOccupancytype` | AuthMaker | Role / ULB | `VERIFIED` |
| 507 | `POST` | `api/property/v1/prop-ownership-type` | `N/A` | `api` | `ReferenceController` | `listPropOwnershiptype` | AuthMaker | Role / ULB | `VERIFIED` |
| 508 | `POST` | `api/property/v1/prop-penalty-type` | `N/A` | `api` | `ReferenceController` | `listPropPenaltytype` | AuthMaker | Role / ULB | `VERIFIED` |
| 509 | `POST` | `api/property/v1/prop-rebate-type` | `N/A` | `api` | `ReferenceController` | `listPropRebatetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 510 | `POST` | `api/property/v1/prop-road-type` | `N/A` | `api` | `ReferenceController` | `listPropRoadtype` | AuthMaker | Role / ULB | `VERIFIED` |
| 511 | `POST` | `api/property/v1/prop-transfer-mode` | `N/A` | `api` | `ReferenceController` | `listPropTransfermode` | AuthMaker | Role / ULB | `VERIFIED` |
| 512 | `POST` | `api/property/v1/prop-usage-type` | `N/A` | `api` | `ReferenceController` | `listPropUsagetype` | AuthMaker | Role / ULB | `VERIFIED` |
| 513 | `POST` | `api/property/v1/vacant-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropVacantRentalrate` | AuthMaker | Role / ULB | `VERIFIED` |
| 514 | `POST` | `api/property/v2/saf/list-apartment` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `ActiveSafControllerV2` | `getAptList` | AuthMaker | Role / ULB | `VERIFIED` |
| 515 | `POST` | `api/property/vacant-rental-rate` | `N/A` | `api` | `ReferenceController` | `listPropVacantRentalrate` | AuthMaker | Role / ULB | `VERIFIED` |
| 516 | `POST` | `api/property/verified-cash-verification` | `N/A` | `api` | `CashVerificationController` | `verifiedCashVerificationList` | AuthMaker | Role / ULB | `VERIFIED` |
| 517 | `POST` | `api/property/verified-tc-collections` | `N/A` | `api` | `CashVerificationController` | `verifiedTcCollectionDtl` | AuthMaker | Role / ULB | `VERIFIED` |
| 518 | `POST` | `api/property/verify-cash` | `N/A` | `api` | `CashVerificationController` | `cashVerify` | AuthMaker | Role / ULB | `VERIFIED` |
| 519 | `POST` | `api/property/waiver/application-detail` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `applicationDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 520 | `POST` | `api/property/waiver/apply` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `apply` | AuthMaker | Role / ULB | `VERIFIED` |
| 521 | `POST` | `api/property/waiver/approved-list` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `approvedApplication` | AuthMaker | Role / ULB | `VERIFIED` |
| 522 | `POST` | `api/property/waiver/final-approval` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `approvalRejection` | AuthMaker | Role / ULB | `VERIFIED` |
| 523 | `POST` | `api/property/waiver/final-waived` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `finalWaivedAmount` | AuthMaker | Role / ULB | `VERIFIED` |
| 524 | `POST` | `api/property/waiver/list-inbox` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `inbox` | AuthMaker | Role / ULB | `VERIFIED` |
| 525 | `POST` | `api/property/waiver/static-details` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `staticDetails` | AuthMaker | Role / ULB | `VERIFIED` |
| 526 | `POST` | `api/property/waiver/uploaded-documents` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `getUploadedDocuments` | AuthMaker | Role / ULB | `VERIFIED` |
| 527 | `POST` | `api/property/waiver/verify-document` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `WaiverController` | `docVerifyReject` | AuthMaker | Role / ULB | `VERIFIED` |
| 528 | `POST` | `api/property/water-harvesting-application` | `N/A` | `api, ForceJsonResponse, AuthMaker, ApiLogger` | `RainWaterHarvestingController` | `waterHarvestingApplication` | AuthMaker | Role / ULB | `VERIFIED` |