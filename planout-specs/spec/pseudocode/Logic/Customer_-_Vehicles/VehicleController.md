/**
 * Handles the retrieval of vehicle records based on status filters.
 * @param {Object} query - The request query parameters.
 * @param {boolean} [query.is_active] - Filter for vehicle status.
 */
function getVehicles(query) {
    const isActive = query.is_active;
    
    // Fetch vehicles joined with related entities
    // Logic: Filter by Vehicle.status based on is_active boolean
    // If is_active is true, status = 'active', else status = 'inactive'
    const statusFilter = isActive ? 'active' : 'inactive';
    
    const vehicles = Database.query(`
        SELECT 
            v.id, v.registration_no, v.hull_number, v.vin, v.fin, 
            v.vehicle_type, v.make, v.model, v.year, v.created_date,
            c.name as customer,
            sc.contract_name as service_contract,
            s.store_name
        FROM Vehicle v
        LEFT JOIN Customer c ON v.customer_id = c.id
        LEFT JOIN ServiceContract sc ON v.service_contract_id = sc.id
        LEFT JOIN Store s ON v.store_id = s.id
        WHERE v.status = :statusFilter
    `, { statusFilter });

    return vehicles;
}