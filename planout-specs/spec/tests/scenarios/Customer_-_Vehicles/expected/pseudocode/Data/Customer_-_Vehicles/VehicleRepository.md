/**
 * Data access layer for Vehicle entities.
 * Handles filtering logic for the Customer Vehicles list view.
 */

FUNCTION getVehicles(filterStatus: string | null):
  SELECT 
    v.id AS vehicle_id,
    v.registration_no,
    v.hull_number,
    v.vin,
    v.fin,
    v.vehicle_type,
    v.make,
    v.model,
    v.year,
    c.name AS customer,
    sc.contract_name AS service_contract,
    s.store_name,
    v.created_date
  FROM Vehicle v
  LEFT JOIN Customer c ON v.customer_id = c.id
  LEFT JOIN ServiceContract sc ON v.service_contract_id = sc.id
  LEFT JOIN Store s ON v.store_id = s.id
  WHERE (filterStatus IS NULL OR v.status = filterStatus)
  ORDER BY v.created_date DESC;