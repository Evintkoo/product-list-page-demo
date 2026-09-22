-- Retrieves a list of all warehouses for selection UI
SELECT 
    id AS warehouse_id, 
    name AS warehouse_name
FROM warehouse
ORDER BY name ASC;