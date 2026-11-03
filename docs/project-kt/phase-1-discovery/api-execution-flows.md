# Phase 1 Discovery: API Execution Flows (Verified & Corrected)

## 1. Overview & Verification Standard

Every incoming HTTP request to `egov-backend` transitions through a deterministic sequence:
```text
Route → Middleware → Controller → Validation → Service/BLL → Repository/Model → Database → Response
```
In this correction pass, all invented intermediate layers have been removed. Where controllers directly execute domain logic, transactions, or model queries, the actual implementation is documented.
All sample data inputs/outputs are explicitly marked as `[Illustrative Sample Data]`.

---

## 2. Property Module Execution Flows

### Flow P-01: Apply New Self Assessment Form (SAF)
- **Verification Status**: `VERIFIED` (Corrected: Removed invented `SafRepository` layer)
- **Route & Middleware**:
  - Route: `POST api/property/apply-saf` (`routes/property.php:72`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker', 'App\Http\Middleware\ApiLogger']`
- **Controller & Method**: `App\Http\Controllers\Property\ApplySafController@applySaf` (`ApplySafController.php:48-185`)
- **Actual Validation**: FormRequest `App\Http\Requests\Property\reqApplySaf`
  - Checks: `prop_type_mstr_id`, `road_type_mstr_id`, `ward_mstr_id`, `floor` array, `owner` array
- **Actual Business Logic**:
  - `App\EloquentClass\Property\SafCalculation::calculateTax` (Computes ARV per floor and tax installment components)
  - `App\BLL\Property\CalculateSafById::generateSafDemand` (Applies quarter calculations, rebate/penalty eligibility)
  - `App\BLL\Property\GenerateSafApplyDemandResponse::generateResponse`
- **Actual Repository**: **NONE – Direct Controller Implementation** (`ApplySafController` directly instantiates models and handles transactions)
- **Actual Models**: `PropActiveSaf`, `PropActiveSafsOwner`, `PropActiveSafFloor`, `PropActiveSafTax`, `PropActiveSafDemand`, `WfRoleusermap`, `WfTrack`
- **Actual Database Connection**: `pgsql` (Default)
- **Actual Tables**: `prop_active_safs`, `prop_active_safs_owners`, `prop_active_saf_floors`, `prop_active_saf_taxes`, `prop_active_saf_demands`, `wf_tracks`, `wf_workflowrolemaps`, `ulb_workflow_masters`
- **Actual Transaction Handling**: Explicit `DB::beginTransaction()` ... `DB::commit()` with `DB::rollBack()` in catch block
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Successfully Applied", $demandResponse, "050101", "1.0", "", "POST", $request->deviceId ?? "");
  ```
  - Sample Payload `[Illustrative Sample Data]`: `{"status": true, "message": "Successfully Applied", "data": {"safNo": "SAF-00123", "demand": 4250.00}}`

---

### Flow P-02: Property Tax Calculation Simulation
- **Verification Status**: `VERIFIED`
- **Route & Middleware**:
  - Route: `POST api/property/calculatePropertyTax` (`routes/property.php:200`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker', 'App\Http\Middleware\ApiLogger']`
- **Controller & Method**: `App\Http\Controllers\Property\CalculatorController@calculator` (`CalculatorController.php:33-51`)
- **Actual Validation**: Inline `$this->_CALCULATOR_REPO->validation($request)`
- **Actual Repository**: Injected `App\Repository\Property\Interfaces\iCalculatorRepository` bound to `App\Repository\Property\Concrete\CalculatorRepository@calculatePropertyTax` (`CalculatorRepository.php:48-93`)
- **Actual Business Logic**: Fetches rental rate by road width & construction type, computes ARV = Area * Rate * Multipliers
- **Actual Models / Tables**: `m_capital_value_rates` / `m_prop_building_rentalrates`, `ref_prop_occupancy_factors`, `ref_prop_gbpropusagetypes`
- **Actual Database Connection**: `pgsql` (Default)
- **Actual Transaction Handling**: Read-only query – No transaction boundaries
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Calculation Successfull !!", $data, "050201", "1.0", responseTime(), "POST", $request->deviceId ?? "");
  ```

---

### Flow P-03: Tax Collector Site Inspection Verification
- **Verification Status**: `VERIFIED` (Corrected: Removed invented `SafRepository` layer)
- **Route & Middleware**:
  - Route: `POST api/property/saf/site-verification` (`routes/property.php:100`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker', 'App\Http\Middleware\ApiLogger']`
- **Controller & Method**: `App\Http\Controllers\Property\ActiveSafController@siteVerification` (`ActiveSafController.php:798-900`)
- **Actual Validation**: FormRequest `App\Http\Requests\Property\ReqSiteVerification`
- **Actual Business Logic**: Compares TC inspected floor dimensions against applicant self-declaration; executes `TcVerificationDemandAdjust`
- **Actual Repository**: **NONE – Direct Controller Implementation** (`ActiveSafController` directly manages verification models)
- **Actual Models**: `PropActiveSaf`, `PropSafVerification`, `PropSafVerificationDtl`, `WfRoleusermap`, `WorkflowTrack`
- **Actual Database Connection**: `pgsql` (Default)
- **Actual Tables**: `prop_active_safs`, `prop_saf_verifications`, `prop_saf_verification_dtls`, `wf_roleusermaps`, `wf_tracks`
- **Actual Transaction Handling**: Explicit `DB::beginTransaction()` ... `DB::commit()` with `DB::rollBack()` in catch block
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Data Fetched !!", $safDetails, "010111", "1.0", responseTime(), "POST", $req->deviceId);
  ```

---

### Flow P-04: SAF Final Approval & Holding Generation
- **Verification Status**: `VERIFIED` (Corrected: Fixed URI to `saf/approvalrejection`, method to `approvalRejectionSaf`, and identified dual database transaction)
- **Route & Middleware**:
  - Route: `POST api/property/saf/approvalrejection` (`routes/property.php:89`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker', 'App\Http\Middleware\ApiLogger']`
- **Controller & Method**: `App\Http\Controllers\Property\ActiveSafController@approvalRejectionSaf` (`ActiveSafController.php:1609-1830`)
- **Actual Validation**: Inline `$req->validate(['applicationId' => 'required|integer', 'status' => 'required|integer'])`
- **Actual Business Logic**:
  - Verifies current user has finisher role via `WfRoleusermap::getRoleByUserWfId`
  - Calls `App\MicroServices\IdGenerator\HoldingNoGenerator::generateHoldingNo`
  - Replicates verified SAF to permanent tables via `SafApprovalBll::approvalSaf`
  - If reassessment, deactivates predecessor holding via `PreviousHoldingDeactivation`
- **Actual Repository**: **NONE – Direct Controller and BLL Implementation**
- **Actual Models**: `PropActiveSaf`, `PropProperty`, `PropFloor`, `PropOwner`, `PropDemand`, `WorkflowTrack`, `WfRoleusermap`
- **Actual Database Connections**: **Dual Connection Architecture**: `pgsql` (Default) and `pgsql_master`
- **Actual Tables**: `prop_active_safs`, `prop_properties`, `prop_floors`, `prop_owners`, `prop_demands`, `wf_tracks`
- **Actual Transaction Handling**: Multi-database synchronized transactions:
  ```php
  DB::beginTransaction();
  DB::connection('pgsql_master')->beginTransaction();
  // ... persistence operations
  DB::commit();
  DB::connection('pgsql_master')->commit();
  ```
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Successfully Forwarded The Application!!", $samHoldingDtls, "010114", "1.0", responseTime(), "POST", $req->deviceId);
  ```

---

## 3. Trade Module Execution Flows

### Flow T-01: Apply New Trade License
- **Verification Status**: `VERIFIED` (Corrected: Repository method is `addRecord()`, not `applyApplication()`)
- **Route & Middleware**:
  - Route: `POST api/trade/application/add` (`routes/trade.php:26`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']`
- **Controller & Method**: `App\Http\Controllers\Trade\TradeApplication@applyApplication` (`TradeApplication.php:67-104`)
- **Actual Validation**: FormRequest `App\Http\Requests\Trade\ReqAddRecorde`
- **Actual Controller Logic**: Asserts backoffice user type, verifies workflow initiator/finisher roles via `CommonFunction`
- **Actual Repository**: Injected `App\Repository\Trade\ITrade` bound to `App\Repository\Trade\Trade@addRecord` (`Trade.php:67-330`)
- **Cross-Database Query**: Queries `pgsql.prop_properties` via `$this->propertyDetailsfortradebyHoldingNo` to validate property holding
- **Actual Models**: `ActiveTradeLicence`, `ActiveTradeOwner`, `TradeLicence`, `TradeOwner`, `WfWorkflow`, `UlbMaster`, `PropProperty` (on `pgsql`)
- **Actual Database Connections**: `pgsql_trade` (Trade data) and `pgsql` (Workflow tracks & property check)
- **Actual Tables**: `active_trade_licences`, `active_trade_owners`, `trade_licences`, `prop_properties` (on `pgsql`), `wf_tracks` (on `pgsql`)
- **Actual Transaction Handling**: `$this->begin()` (`DB::connection('pgsql_trade')->beginTransaction()`) ... `$this->commit()` / `$this->rollback()`
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Application Apply Successfully", $data, "020101", "1.0", responseTime(), "POST", $request->deviceId ?? "");
  ```

---

### Flow T-02: Trade License Citizen Payment (Razorpay Order Generation)
- **Verification Status**: `VERIFIED`
- **Route & Middleware**:
  - Route: `POST api/trade/application/pay-razorpay-charge` (`routes/trade.php:84`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']`
- **Controller & Method**: `App\Http\Controllers\Trade\TradeCitizenController@handeRazorPay` (`TradeCitizenController.php:79-88`)
- **Actual Validation**: Inline `$request->validate(['applicationId' => 'required|integer', 'amount' => 'required|numeric'])`
- **Actual Repository**: Delegates to `App\Repository\Trade\TradeCitizen@handeRazorPay` (`TradeCitizen.php:143-172`)
- **Actual Integration**: Instantiates `Razorpay\Api\Api`, fetches credentials from `payment_gateway_masters` on `pgsql`, logs request into `TradeRazorPayRequest`
- **Actual Database Connections**: `pgsql` (Gateway master) and `pgsql_trade` (Trade transaction)
- **Actual Tables**: `payment_gateway_masters` (on `pgsql`), `trade_razor_pay_requests` (on `pgsql_trade`)
- **Actual Transaction Handling**: Single row insert – No explicit transaction boundary
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Order Id Generated Successfully", $data, "020205", "1.0", responseTime(), "POST", $request->deviceId ?? "");
  ```

---

### Flow T-03: Trade Denial & Violation Notice Issuance
- **Verification Status**: `VERIFIED`
- **Route & Middleware**:
  - Route: `POST api/trade/notice/add` (`routes/trade.php:61`)
  - Effective Middleware: `['api', 'App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']`
- **Controller & Method**: `App\Http\Controllers\Trade\TradeNoticeController@applyDenail` (`TradeNoticeController.php:61-71`)
- **Actual Validation**: FormRequest `App\Http\Requests\Trade\ReqApplyDenail`
- **Actual Repository**: Delegates to `App\Repository\Trade\TradeNotice@applyDenial` (`TradeNotice.php:54-135`)
- **Actual Models**: `ActiveTradeNoticeConsumerDtl`, `TradeNoticeConsumerDtl`, `WfWorkflow`, `WorkflowTrack`
- **Actual Database Connections**: `pgsql_trade` (Notice table) and `pgsql` (Workflow tracks)
- **Actual Tables**: `active_trade_notice_consumer_dtls`, `wf_tracks` (on `pgsql`)
- **Actual Transaction Handling**: `$this->begin()` (`DB::connection('pgsql_trade')->beginTransaction()`)
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Notice Dispatched Successfully", $data, "020301", "1.0", responseTime(), "POST", $request->deviceId ?? "");
  ```

---

## 4. Water Module Execution Flows

### Flow W-01: Apply for New Water Connection
- **Verification Status**: `VERIFIED` (Documented absence of `'api'` middleware)
- **Route & Middleware**:
  - Route: `POST api/water/application/apply-new-connection` (`routes/water.php:38`)
  - Effective Middleware: `['App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']` (`api` group missing due to RouteServiceProvider duplicate overwrite)
- **Controller & Method**: `App\Http\Controllers\Water\NewConnectionController@store` (`NewConnectionController.php:41-49`)
- **Actual Validation**: FormRequest `App\Http\Requests\Water\newApplyRules`
- **Actual Repository**: Injected `iNewConnection` bound to `App\Repository\Water\Concrete\NewConnectionRepository@store` (`NewConnectionRepository.php:67-175`)
- **Actual Business Logic**: `calWaterConCharge` (Connection fee, pipeline rate, road cutting charges), `PrefixIdGenerator` (Generates application number with `WAPP` prefix)
- **Actual Models**: `WaterApplication`, `WaterApplicant`, `WaterConnectionCharge`, `WaterPenaltyInstallment`, `WfWorkflow`, `WorkflowTrack`
- **Actual Database Connections**: `pgsql_water` (Water data) and `pgsql` (Workflow tracks)
- **Actual Tables**: `water_applications`, `water_applicants`, `water_connection_charges`, `water_penalty_installments`, `wf_tracks` (on `pgsql`)
- **Actual Transaction Handling**: `$this->begin()` (`DB::connection('pgsql_water')->beginTransaction()`) ... `$this->commit()` / `$this->rollback()`
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Application Applied Successfully", $returnData, "030101", "1.0", responseTime(), "POST", $req->deviceId ?? "");
  ```

---

### Flow W-02: Water Junior Engineer (JE) Site Inspection
- **Verification Status**: `VERIFIED`
- **Route & Middleware**:
  - Route: `POST api/water/site-verification` (`routes/water.php:73`)
  - Effective Middleware: `['App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']` (No `api` throttle)
- **Controller & Method**: `App\Http\Controllers\Water\NewConnectionController@siteVerification` (`NewConnectionController.php:798-842`)
- **Actual Validation**: FormRequest `App\Http\Requests\Water\reqSiteVerification`
- **Actual Repository**: Delegates to `App\Repository\Water\Concrete\NewConnectionRepository@siteVerification`
- **Actual Models**: `WaterSiteInspection`, `WaterConnectionCharge`, `WaterApplication`, `WorkflowTrack`
- **Actual Database Connections**: `pgsql_water` (Inspections & charges) and `pgsql` (Workflow tracks)
- **Actual Tables**: `water_site_inspections`, `water_connection_charges`, `water_applications`, `wf_tracks` (on `pgsql`)
- **Actual Transaction Handling**: `$this->begin()` (`DB::connection('pgsql_water')->beginTransaction()`)
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Site Verification Recorded Successfully", $returnData, "030106", "1.0", responseTime(), "POST", $req->deviceId ?? "");
  ```

---

### Flow W-03: Water Meter Reading & Connection Meter Details
- **Verification Status**: `VERIFIED` (Corrected: URI is `api/water/admin/consumer/save-connection-meter`, method is `saveUpdateMeterDetails`)
- **Route & Middleware**:
  - Route: `POST api/water/admin/consumer/save-connection-meter` (`routes/water.php:126`)
  - Effective Middleware: `['App\Http\Middleware\ForceJsonResponse', 'App\Http\Middleware\AuthMaker']` (No `api` throttle)
- **Controller & Method**: `App\Http\Controllers\Water\WaterConsumer@saveUpdateMeterDetails` (`WaterConsumer.php:433-460`)
- **Actual Validation**: FormRequest `App\Http\Requests\Water\reqMeterEntry`
- **Actual Repository**: Injected `IConsumer` bound to `App\Repository\Water\Concrete\Consumer@saveUpdateMeterDetails`
- **Actual Models**: `WaterConsumerMeter`, `WaterConsumer`, `WaterConsumerInitialMeter`
- **Actual Database Connection**: `pgsql_water`
- **Actual Tables**: `water_consumer_meters`, `water_consumers`, `water_consumer_initial_meters`
- **Actual Transaction Handling**: `$this->begin()` (`DB::connection('pgsql_water')->beginTransaction()`)
- **Actual Response Structure**:
  ```php
  return responseMsgs(true, "Meter Details Saved Successfully", $data, "030207", "1.0", responseTime(), "POST", $request->deviceId ?? "");
  ```