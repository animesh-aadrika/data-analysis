# Phase 1 Discovery: API Execution Flows (End-to-End Traces)

## 1. Overview & Execution Flow Standard

Every incoming HTTP request to `egov-backend` transitions through a deterministic sequence:
```text
Route → Middleware → Controller → Validation → Service/BLL → Repository/Model → Database → Response
```
When an intermediate architectural layer (such as a separate Service or Repository) is omitted in legacy or simpler endpoints, this document reflects the literal implementation rather than inventing hypothetical layers.

---

## 2. Property Module Execution Flows

### Flow P-01: Apply New Self Assessment Form (SAF)
- **Endpoint**: `POST /api/property/apply-saf`
- **Purpose**: Citizen or Dealing Assistant submits a new property assessment declaration.
- **Execution Path**:
  ```text
  Route: POST api/property/apply-saf
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker (Hydrates User / ActiveCitizen) → ApiLogger
    │
    ▼
  Controller: App\Http\Controllers\Property\ApplySafController@applySaf
    │
    ▼
  Validation: App\Http\Requests\Property\reqApplySaf
    ├── Checks required: prop_type_mstr_id, road_type_mstr_id, ward_mstr_id, is_transfer, floor details array
    └── Custom rules: Carpet area <= Builtup area, valid mobile number
    │
    ▼
  Service / BLL: App\BLL\Property\CalculateSafById
    ├── Invokes: App\EloquentClass\Property\SafCalculation (ARV = Area * Unit Rate * Usage * Occupancy * Road Factors)
    └── Invokes: App\BLL\Property\GenerateSafApplyDemandResponse
    │
    ▼
  Repository: App\Repository\Property\Concrete\SafRepository@applySaf
    ├── Generates temporary SAF Application No: MicroServices\IdGeneration
    ├── Begins Database Transaction: DB::beginTransaction()
    ├── Inserts into Models:
    │   ├── PropActiveSaf (Primary application record)
    │   ├── PropActiveSafFloor (Floor-wise structural and usage attributes)
    │   ├── PropActiveSafOwner (Owner identity and contact information)
    │   ├── PropActiveSafTax (Quarterly tax assessment breakdown)
    │   └── PropActiveSafDemand (Calculated municipal tax demands)
    ├── Initializes Workflow:
    │   ├── App\Models\Workflows\WfTrack (Action: Submitted, Forwarded to DA)
    │   └── App\Models\Workflows\WfRoleUserMap (Resolves Dealing Assistant role)
    └── DB::commit()
    │
    ▼
  Database: PostgreSQL connection `pgsql` (Tables: prop_active_safs, prop_active_saf_floors, prop_active_saf_owners, prop_active_saf_taxes, prop_active_saf_demands, wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "SAF Application Submitted Successfully", ["safNo" => "SAF-RMC-2024-00123", "demand" => 4250.00], 200)
  ```

---

### Flow P-02: Property Tax Calculation Simulation
- **Endpoint**: `POST /api/property/calculatePropertyTax`
- **Purpose**: Public/Citizen tax simulator calculating projected holding tax before form submission.
- **Execution Path**:
  ```text
  Route: POST api/property/calculatePropertyTax
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker → ApiLogger
    │
    ▼
  Controller: App\Http\Controllers\Property\CalculatorController@calculator
    │
    ▼
  Validation: Inline Validator::make($request->all(), ['prop_type_mstr_id' => 'required', 'road_type_mstr_id' => 'required', 'floors' => 'required|array'])
    │
    ▼
  Service / BLL: App\EloquentClass\Property\SafCalculation@calculateTax
    ├── Fetches Unit Rental Rate: MPropBuildingRentalrate / MPropVacantRentalrate
    ├── Computes ARV: builtup_area * rental_rate * occupancy_factor * usage_factor * construction_type_factor
    └── Evaluates Tax Component: Holding Tax (2%), Latrine Tax (2%), Water Tax (2%)
    │
    ▼
  Repository: App\Repository\Property\Concrete\CalculatorRepository@calculatePropertyTax
    └── Read-only query on reference tables in `pgsql`
    │
    ▼
  Database: PostgreSQL connection `pgsql` (Tables: m_prop_building_rentalrates, ref_prop_occupancy_factors, ref_prop_gbpropusagetypes)
    │
    ▼
  Response: responseMsgs(true, "Tax Calculated Successfully", ["annualTax" => 1200.00, "quarterlyTax" => 300.00, "arv" => 60000.00], 200)
  ```

---

### Flow P-03: Tax Collector Site Inspection Verification
- **Endpoint**: `POST /api/property/saf/site-verification`
- **Purpose**: Tax Collector submits physical ground verification findings (measurements, usage, occupancy).
- **Execution Path**:
  ```text
  Route: POST api/property/saf/site-verification
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker → ApiLogger
    │
    ▼
  Controller: App\Http\Controllers\Property\ActiveSafController@siteVerification
    │
    ▼
  Validation: App\Http\Requests\Property\ReqSiteVerification
    └── Validates inspected built-up area, physical floor counts, commercial usage percentage, site photos
    │
    ▼
  Service / BLL: App\BLL\Property\TcVerificationDemandAdjust
    ├── Compares self-declared area vs inspected area
    ├── Recomputes ARV using verified dimensions
    └── Computes Variance Demand: Adjusts PropActiveSafDemand if area discrepancy exceeds municipal threshold
    │
    ▼
  Repository: App\Repository\Property\Concrete\SafRepository@siteVerification
    ├── Inserts into Model: PropTcVerification (Stores physical inspection measurements & GPS geo-coordinates)
    ├── Uploads Photos: MicroServices\DocUpload (Front elevation, street view)
    └── Logs Workflow: WfTrack (Action: Site Inspection Completed)
    │
    ▼
  Database: PostgreSQL connection `pgsql` (Tables: prop_tc_verifications, prop_active_saf_floors, prop_active_saf_demands, wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "Site Verification Recorded Successfully", ["variancePercentage" => 5.2, "adjustedDemand" => 4600.00], 200)
  ```

---

### Flow P-04: SAF Final Approval & Holding Number Generation
- **Endpoint**: `POST /api/property/saf/approval-rejection`
- **Purpose**: Executive Officer grants final approval to SAF, converting active application to permanent property holding.
- **Execution Path**:
  ```text
  Route: POST api/property/saf/approval-rejection
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker → ApiLogger
    │
    ▼
  Controller: App\Http\Controllers\Property\ActiveSafController@approvalRejection
    │
    ▼
  Validation: Inline Validator ($request->safId required, $request->status in ['APPROVE', 'REJECT'])
    │
    ▼
  Service / BLL: App\BLL\Property\SafApprovalBll@approveSaf
    ├── Calls: App\MicroServices\IdGenerator\HoldingNoGenerator::generateHoldingNo($ulbId, $wardId)
    │   └── Formats sequential Holding No: e.g. "RMC-W12-00452"
    ├── Moves application data:
    │   ├── PropActiveSaf -> PropProperty (Status: Active)
    │   ├── PropActiveSafFloor -> PropFloor
    │   ├── PropActiveSafOwner -> PropOwner
    │   └── PropActiveSafDemand -> PropDemand
    └── Marks PropActiveSaf as `is_approved = true`, `status = 1`
    │
    ▼
  Repository: App\Repository\Property\Concrete\SafRepository@approvalRejection
    ├── Wraps in DB::beginTransaction()
    ├── Inserts: WfTrack (Action: Final Approved by EO)
    ├── Dispatches Notification: App\BLL\AddNotification (SMS to citizen with Holding Number)
    └── DB::commit()
    │
    ▼
  Database: PostgreSQL connection `pgsql` (Tables: prop_properties, prop_floors, prop_owners, prop_demands, prop_active_safs, wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "Application Approved Successfully", ["holdingNo" => "RMC-W12-00452", "propertyId" => 8492], 200)
  ```

---

## 3. Trade Module Execution Flows

### Flow T-01: Apply New Trade License
- **Endpoint**: `POST /api/trade/application/add`
- **Purpose**: Citizen or Agent applies for a commercial Municipal Trade License.
- **Execution Path**:
  ```text
  Route: POST api/trade/application/add
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker (Hydrates User / ActiveCitizen)
    │
    ▼
  Controller: App\Http\Controllers\Trade\TradeApplication@applyApplication
    │
    ▼
  Validation: App\Http\Requests\Trade\ReqAddRecorde
    ├── Validates: firm_name, category_type_id, firm_type_id, ownership_type_id, holding_no, ward_id, premises_type
    └── Validates Owner array: name, guardian_name, mobile, aadhaar_no
    │
    ▼
  Holding Verification (Cross-Database):
    └── Queries `pgsql` (prop_properties) to verify holding_no exists in the ward and has no unpaid holding tax lock
    │
    ▼
  Service / BLL: App\Repository\Trade\Trade@applyApplication
    ├── Calls: App\MicroServices\IdGeneration (Generates Application No: "TL-RMC-2024-00891")
    ├── Calculates License Fee: TradeParamLicenceRate based on category_type_id, item_type_id, and area_in_sqft
    ├── Wraps in DB::connection('pgsql_trade')->beginTransaction()
    ├── Inserts into Models:
    │   ├── ActiveTradeLicence (Primary trade application record)
    │   ├── ActiveTradeOwner (Firm owners / directors)
    │   └── TradeTransaction (Initial application fee / demand ledger)
    ├── Workflow Initialization:
    │   └── Inserts into `pgsql` wf_tracks (Workflow ID: Trade New License, Forwarded to Dealing Assistant)
    └── DB::connection('pgsql_trade')->commit()
    │
    ▼
  Database: Dual-Database write (`pgsql_trade` for trade tables, `pgsql` for wf_tracks and holding check)
    │
    ▼
  Response: responseMsgs(true, "Trade License Application Created", ["applicationNo" => "TL-RMC-2024-00891", "payableAmount" => 1500.00], 200)
  ```

---

### Flow T-02: Trade License Citizen Renewal & Online Payment
- **Endpoint**: `POST /api/trade/application/pay-razorpay-charge`
- **Purpose**: Citizen pays annual trade license renewal fee via Razorpay payment gateway.
- **Execution Path**:
  ```text
  Route: POST api/trade/application/pay-razorpay-charge
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker
    │
    ▼
  Controller: App\Http\Controllers\Trade\TradeCitizenController@handeRazorPay
    │
    ▼
  Validation: Inline Validator ($request->applicationId required, $request->amount required)
    │
    ▼
  Service: Razorpay API Client (Razorpay\Api\Api)
    ├── Fetches active credentials for ULB from `payment_gateway_masters`
    ├── Calls: $razorpay->order->create([receipt => $appNo, amount => $amount * 100, currency => 'INR'])
    └── Generates Razorpay Order ID: "order_K8J2k3m4L9"
    │
    ▼
  Repository: App\Repository\Trade\TradeCitizen@handeRazorPay
    └── Inserts into Model: TradeRazorPayRequest (`order_id`, `amount`, `application_id`, `status` = 'INITIATED')
    │
    ▼
  Database: PostgreSQL connection `pgsql_trade` (Table: trade_razor_pay_requests)
    │
    ▼
  Response: responseMsgs(true, "Razorpay Order Generated", ["orderId" => "order_K8J2k3m4L9", "amount" => 150000, "key" => "rzp_live_xxx"], 200)
  ```

---

### Flow T-03: Trade Denial & Violation Notice Issuance
- **Endpoint**: `POST /api/trade/notice/add`
- **Purpose**: Municipal enforcement officer issues notice to an establishment operating without a valid license.
- **Execution Path**:
  ```text
  Route: POST api/trade/notice/add
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker
    │
    ▼
  Controller: App\Http\Controllers\Trade\TradeNoticeController@applyDenail
    │
    ▼
  Validation: App\Http\Requests\Trade\ReqApplyDenail
    └── Validates firm name, proprietor name, address, ward ID, nature of violation, inspection photos
    │
    ▼
  Repository: App\Repository\Trade\TradeNotice@applyDenial
    ├── Begins DB::connection('pgsql_trade')->beginTransaction()
    ├── Inserts into Model: ActiveTradeNoticeConsumerDtl (Notice record, penalty amount, response deadline)
    ├── Uploads Evidence: MicroServices\DocUpload (Site inspection photographs)
    ├── Logs Workflow: `pgsql` wf_tracks (Notice initiated, sent to Section Officer for sign-off)
    └── DB::connection('pgsql_trade')->commit()
    │
    ▼
  Database: PostgreSQL connection `pgsql_trade` (Table: active_trade_notice_consumer_dtls) and `pgsql` (wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "Notice Dispatched Successfully", ["noticeNo" => "NOTICE-TL-2024-0012"], 200)
  ```

---

## 4. Water Module Execution Flows

### Flow W-01: Apply for New Water Connection
- **Endpoint**: `POST /api/water/application/apply-new-connection`
- **Purpose**: Citizen or Plumber applies for domestic or commercial municipal piped water connection.
- **Execution Path**:
  ```text
  Route: POST api/water/application/apply-new-connection
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker
    │
    ▼
  Controller: App\Http\Controllers\Water\NewConnectionController@store
    │
    ▼
  Validation: App\Http\Requests\Water\newApplyRules
    ├── Validates: applicant_name, mobile, holding_no, ward_id, connection_type_id, pipeline_type_id, property_type_id
    └── Verifies Holding: Validates holding_no exists in `pgsql` (prop_properties)
    │
    ▼
  Repository: App\Repository\Water\Concrete\NewConnectionRepository@applyNewConnection
    ├── Generates Application No: MicroServices\IdGeneration ("WAT-RMC-2024-00431")
    ├── Wraps in DB::connection('pgsql_water')->beginTransaction()
    ├── Inserts into Models:
    │   ├── WaterApplication (Main connection application header)
    │   ├── WaterApplicant (Applicant personal & contact particulars)
    │   └── WaterConnectionCharge (Initial connection fees, road cutting charges, security deposit)
    ├── Workflow Initialization:
    │   └── Inserts into `pgsql` wf_tracks (Workflow ID: Water New Connection, Forwarded to Junior Engineer)
    └── DB::connection('pgsql_water')->commit()
    │
    ▼
  Database: PostgreSQL connection `pgsql_water` (Tables: water_applications, water_applicants, water_connection_charges) and `pgsql` (wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "Water Connection Application Submitted", ["applicationNo" => "WAT-RMC-2024-00431", "charges" => 3500.00], 200)
  ```

---

### Flow W-02: Water Junior Engineer (JE) Site Inspection
- **Endpoint**: `POST /api/water/site-verification`
- **Purpose**: Junior Engineer inspects physical pipeline distance, municipal main line diameter, and road restoration requirements.
- **Execution Path**:
  ```text
  Route: POST api/water/site-verification
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker
    │
    ▼
  Controller: App\Http\Controllers\Water\NewConnectionController@siteVerification
    │
    ▼
  Validation: App\Http\Requests\Water\reqSiteVerification
    └── Validates pipe diameter (mm), distance from main pipeline (meters), road cutting surface type (Bituminous, Concrete, Mud), site photo
    │
    ▼
  Repository: App\Repository\Water\Concrete\NewConnectionRepository@siteVerification
    ├── Inserts into Model: WaterSiteInspection (Stores technical inspection parameters & geo-coordinates)
    ├── Updates: WaterConnectionCharge (Calculates road restoration charges based on surface length & PWD rate chart)
    ├── Uploads Photos: MicroServices\DocUpload
    └── Logs Workflow: `pgsql` wf_tracks (Inspection completed, forwarded to Assistant Engineer / Executive Officer)
    │
    ▼
  Database: PostgreSQL connection `pgsql_water` (Tables: water_site_inspections, water_connection_charges) and `pgsql` (wf_tracks)
    │
    ▼
  Response: responseMsgs(true, "Site Inspection Details Saved", ["roadCuttingFee" => 1200.00, "totalCharge" => 4700.00], 200)
  ```

---

### Flow W-03: Monthly Water Meter Reading & Demand Generation
- **Endpoint**: `POST /api/water/consumer/meter-entry`
- **Purpose**: Meter Reader records monthly consumption units via mobile handheld device.
- **Execution Path**:
  ```text
  Route: POST api/water/consumer/meter-entry
    │
    ▼
  Middleware: ForceJsonResponse → AuthMaker
    │
    ▼
  Controller: App\Http\Controllers\Water\WaterConsumer@meterEntry
    │
    ▼
  Validation: App\Http\Requests\Water\reqMeterEntry
    └── Validates consumer_id, current_meter_reading, reading_date, meter_status (Working, Defective, Locked), meter_photo
    │
    ▼
  Service / BLL: App\Repository\Water\Concrete\Consumer@calConsumerDemand
    ├── Fetches Previous Reading from: WaterConsumerMeter
    ├── Computes Consumed Units: current_reading - previous_reading
    ├── Applies Slab Rate: WaterMeterRate / WaterFixedMeterRate based on connection_type_id
    └── Calculates Bill: Consumption_Charges + Meter_Rent - Adjustments + Arrears + Late_Fine
    │
    ▼
  Repository: App\Repository\Water\Concrete\Consumer@saveMeterReading
    ├── Wraps in DB::connection('pgsql_water')->beginTransaction()
    ├── Inserts: WaterConsumerMeter (Records reading snapshot and meter photo path)
    ├── Inserts / Updates: WaterConsumerDemand (Current active billing ledger for consumer)
    └── DB::connection('pgsql_water')->commit()
    │
    ▼
  Database: PostgreSQL connection `pgsql_water` (Tables: water_consumer_meters, water_consumer_demands, water_meter_rates)
    │
    ▼
  Response: responseMsgs(true, "Meter Reading Recorded & Demand Generated", ["consumedUnits" => 18, "demandAmount" => 270.00, "dueDate" => "2024-11-25"], 200)
  ```

