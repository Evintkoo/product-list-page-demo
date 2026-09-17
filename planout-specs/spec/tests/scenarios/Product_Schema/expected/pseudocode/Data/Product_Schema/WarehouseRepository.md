-- Query for specific warehouse stock levels
SELECT
  w.id AS warehouse_id,
  w.warehouse_code,
  w.name AS warehouse_name,
  ws.inventory_quantity,
  ws.min_quantity,
  ws.max_quantity,
  ws.average_cost,
  COALESCE(res.reserved_quantity, 0) AS reserved_quantity,
  COALESCE(itr.in_transit_quantity, 0) AS in_transit_quantity,
  (ws.inventory_quantity - COALESCE(res.reserved_quantity, 0) - COALESCE(ws.consignment_quantity, 0)) AS available_quantity,
  (ws.inventory_quantity * ws.average_cost) AS total_cost
FROM warehouse_stocks ws
JOIN warehouses w ON ws.warehouse_id = w.id
LEFT JOIN LATERAL (SELECT SUM(quantity) AS reserved_quantity FROM reservations WHERE product_id = ws.product_id AND warehouse_id = ws.warehouse_id AND status = 'open') res ON TRUE
LEFT JOIN LATERAL (SELECT SUM(quantity) AS in_transit_quantity FROM in_transit_documents WHERE product_id = ws.product_id AND warehouse_id = ws.warehouse_id AND status = 'in_transit') itr ON TRUE
WHERE ws.product_id = $1 AND ws.company_id = $2
LIMIT $6 OFFSET $7;