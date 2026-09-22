-- Query to fetch metadata for the Add Vehicle form
-- Returns all active makes and models to populate dropdowns
SELECT 
  vehicle_make_id, name, vehicle_category 
FROM vehicle_make;

SELECT 
  vehicle_model_id, vehicle_make_id, name 
FROM vehicle_model;

-- Query to fetch paginated vehicle list for a specific customer
-- Joins with masters to resolve display names
SELECT
  v.vehicle_id, 
  v.registration_no, 
  v.vehicle_type,
  v.vehicle_make_id, 
  vm_make.name AS make,
  v.vehicle_model_id, 
  vm_model.name AS model,
  v.year, 
  v.engine_power, 
  v.engine_brand, 
  v.engine_model, 
  v.engine_year,
  COUNT(*) OVER() AS records
FROM vehicle v
LEFT JOIN vehicle_make vm_make ON vm_make.vehicle_make_id = v.vehicle_make_id
LEFT JOIN vehicle_model vm_model ON vm_model.vehicle_model_id = v.vehicle_model_id
WHERE v.customer_id = :customer_id
LIMIT :limit OFFSET :offset;

-- Query to insert a new vehicle
INSERT INTO vehicle (
  customer_id, vehicle_type, registration_no, hull_number, vin, 
  vehicle_make_id, vehicle_model_id, year, color, odometer, 
  engine_number, engine_capacity_cc, transmission_type, 
  registration_date, store_id, is_active, model_code, 
  last_service, next_service, notes, hour_meter, 
  engine_power, engine_brand, engine_model, engine_year, 
  created_at, updated_at
)
VALUES (
  :customer_id, :vehicle_type, :registration_no, :hull_number, :vin, 
  :vehicle_make_id, :vehicle_model_id, :year, :color, :odometer, 
  :engine_number, :engine_capacity_cc, :transmission_type, 
  :registration_date, :store_id, COALESCE(:is_active, TRUE), :model_code, 
  :last_service, :next_service, :notes, :hour_meter, 
  :engine_power, :engine_brand, :engine_model, :engine_year, 
  NOW(), NOW()
)
RETURNING *;