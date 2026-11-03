# Phase 1 Discovery: Service and Repository Inventory (Verified & Corrected)

## 1. Architectural Overview & Service Container Bindings

The `egov-backend` application decomposes business and data logic into distinct layers:
1. **Business Logic Layer (BLL)** (`app/BLL/`): Encapsulates complex domain workflows, state transitions, yearly tax batch runs, and approval triggers.
2. **Domain Calculation Entities** (`app/EloquentClass/`): Pure arithmetic and rate matrix evaluators for property tax, penalties, and rebates.
3. **Repository Layer** (`app/Repository/`): Strict Interface + Concrete implementation pattern isolating database querying, multi-table joins, and transaction management.
4. **Microservices Clients & Generators** (`app/MicroServices/`): Standalone utility services for document upload orchestration and sequential ID/holding number generation.
5. **Query Pipelines** (`app/Pipelines/`): Pipeline design pattern implementations for composable query filtering across inboxes and search screens.

### Service Container Repository Bindings (`RepositoryServiceProvider.php:98-160`)

| Interface Class | Concrete Implementation | Verification Status |
|---|---|:---:|
| `App\Repository\Trade\ITrade` | `App\Repository\Trade\Trade` | `VERIFIED` |
| `App\Repository\Trade\ITradeCitizen` | `App\Repository\Trade\TradeCitizen` | `VERIFIED` |
| `App\Repository\Trade\ITradeNotice` | `App\Repository\Trade\TradeNotice` | `VERIFIED` |
| `App\Repository\Trade\IReport` (Trade) | `App\Repository\Trade\Report` | `VERIFIED` |
| `App\Repository\Water\Interfaces\iNewConnection` | `App\Repository\Water\Concrete\NewConnectionRepository` | `VERIFIED` |
| `App\Repository\Water\Interfaces\IWaterNewConnection` | `App\Repository\Water\Concrete\WaterNewConnection` | `VERIFIED` |
| `App\Repository\Water\Interfaces\IConsumer` | `App\Repository\Water\Concrete\Consumer` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iSafRepository` | `App\Repository\Property\Concrete\SafRepository` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iSafReassessRepo` | `App\Repository\Property\Concrete\SafReassessRepo` | `VERIFIED` |
| `App\Repository\Property\Interfaces\IPropertyDeactivate`| `App\Repository\Property\Concrete\PropertyDeactivate` | `VERIFIED` |
| `App\Repository\Property\Interfaces\IPropertyBifurcation`| `App\Repository\Property\Concrete\PropertyBifurcation` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iPropertyDetailsRepo`| `App\Repository\Property\Concrete\PropertyDetailsRepo` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iDocumentOperationRepo`| `App\Repository\Property\Concrete\DocumentOperationRepo` | `VERIFIED` |
| `App\Repository\Property\Interfaces\IReport` (Property) | `App\Repository\Property\Concrete\Report` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iCalculatorRepository`| `App\Repository\Property\Concrete\CalculatorRepository` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iConcessionRepository`| `App\Repository\Property\Concrete\ConcessionRepository` | `VERIFIED` |
| `App\Repository\Property\Interfaces\iObjectionRepository` | `App\Repository\Property\Concrete\ObjectionRepository` | `VERIFIED` |
| `App\Repository\Cluster\Interfaces\iCluster` | `App\Repository\Cluster\Concrete\ClusterRepository` | `VERIFIED` |
| `App\Repository\Payment\Interfaces\iPayment` | `App\Repository\Payment\Concrete\PaymentRepository` | `VERIFIED` |
| `App\Repository\Citizen\iCitizenRepository` | `App\Repository\Citizen\CitizenRepository` | `VERIFIED` |

> [!NOTE]
> **Architectural Finding (Repository Bypass)**: Several property controllers (notably `ApplySafController`, `GbSafController`, and `ActiveSafControllerV2`) do not inject `iSafRepository`. They instantiate Eloquent models and BLL classes directly, performing transaction management within the controller.

---

## 2. Business Logic Layer (BLL) Inventory

| Class Name | Location | Primary Responsibility | Downstream Models & Repositories | Status |
|---|---|---|---|:---:|
| `AddNotification` | `app/BLL/AddNotification.php` | Dispatches in-app, SMS, and WhatsApp alerts for application status changes | `MirrorUserNotification, sms_helper` | `VERIFIED` |
| `DocUrl` | `app/BLL/DocUrl.php` | Resolves public and pre-signed URLs for documents uploaded to DMS microservice | `DocUpload microservice` | `VERIFIED` |
| `CalculatePropById` | `app/BLL/Property/CalculatePropById.php` | Recalculates property tax, current dues, and arrears for established properties | `PropProperty, PropFloor, InsertTax` | `VERIFIED` |
| `CalculateSafById` | `app/BLL/Property/CalculateSafById.php` | Evaluates self-assessment tax for unapproved SAFs using formula: ARV * Rate | `PropActiveSaf, PropActiveSafFloor, SafCalculation` | `VERIFIED` |
| `CalculationByUlbTc` | `app/BLL/Property/CalculationByUlbTc.php` | Re-evaluates tax demands following field verification by Tax Collector | `PropActiveSafFloor, TcVerificationDemandAdjust` | `VERIFIED` |
| `DeactivateTran` | `app/BLL/Property/DeactivateTran.php` | Reverses transaction ledgers and cancels demands when a property is deactivated | `PropTran, PropTranDetail, PropDemand` | `VERIFIED` |
| `EditSafBll` | `app/BLL/Property/EditSafBll.php` | Recomputes tax demands and updates floor snapshots when SAF is edited by user | `PropActiveSaf, PropActiveSafFloor, UpdateSafDemand` | `VERIFIED` |
| `GenerateSafApplyDemandResponse` | `app/BLL/Property/GenerateSafApplyDemandResponse.php` | Builds upfront payment demand payload upon SAF form submission | `PropActiveSafDemand, PropActiveSafTax` | `VERIFIED` |
| `PaymentReceiptHelper` | `app/BLL/Property/PaymentReceiptHelper.php` | Formats transaction receipts and generates printable HTML/PDF views | `PropTran, PropProperty` | `VERIFIED` |
| `PostRazorPayPenaltyRebate` | `app/BLL/Property/PostRazorPayPenaltyRebate.php` | Updates transaction adjustments and reconciles penalty/rebate upon Razorpay webhook | `PropActiveSafTax, PropActiveSaf` | `VERIFIED` |
| `PostSafPropTaxes` | `app/BLL/Property/PostSafPropTaxes.php` | Persists quarterly tax installments into active saf tax tables | `PropActiveSafTax` | `VERIFIED` |
| `PreviousHoldingDeactivation` | `app/BLL/Property/PreviousHoldingDeactivation.php` | Deactivates predecessor holding upon final approval of reassessment/bifurcation | `PropProperty, PropDeactiveHolding` | `VERIFIED` |
| `SafApprovalBll` | `app/BLL/Property/SafApprovalBll.php` | Executes final approval: transitions PropActiveSaf -> PropProperty and generates Holding Number | `PropProperty, PropFloor, HoldingNoGenerator, PropOwner` | `VERIFIED` |
| `TcVerificationDemandAdjust` | `app/BLL/Property/TcVerificationDemandAdjust.php` | Computes tax variance between citizen self-declaration and TC physical inspection | `PropActiveSafFloor, PropTcVerification` | `VERIFIED` |
| `UpdateSafDemand` | `app/BLL/Property/UpdateSafDemand.php` | Updates quarterly and annual demand ledgers | `PropActiveSafDemand` | `VERIFIED` |
| `YearlyDemandGeneration` | `app/BLL/Property/YearlyDemandGeneration.php` | Batch scheduled command logic generating new financial year tax demands for all properties | `PropProperty, PropDemand, PropFloor` | `VERIFIED` |
| `WaterTranDeactivate` | `app/BLL/Water/WaterTranDeactivate.php` | Reverses water billing transactions and cancels meter demands on connection deactivation | `WaterTran, WaterConsumerDemand` | `VERIFIED` |

---

## 3. Domain Calculation Engines (`app/EloquentClass/`)

1. **`SafCalculation`** (`app/EloquentClass/Property/SafCalculation.php`):
   - Formula: `ARV = Builtup_Area * Unit_Rate * (1 + Usage_Factor) * (1 + Occupancy_Factor) * (1 + Construction_Factor)`.
   - Calculates holding tax, latrine tax, and water tax components.
   - Status: `VERIFIED`
2. **`InsertTax`** (`app/EloquentClass/Property/InsertTax.php`):
   - Segments annual demand into 4 quarterly installments.
   - Evaluates early-payment rebate and compounding penalty.
   - Status: `VERIFIED`
3. **`PenaltyRebateCalculation`** (`app/EloquentClass/Property/PenaltyRebateCalculation.php`):
   - Computes adjustment penalties for unauthorized construction.
   - Status: `VERIFIED`