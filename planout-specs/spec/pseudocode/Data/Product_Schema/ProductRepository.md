/**
 * Fetches a consolidated product record by joining core product data 
 * with store stocks, warehouse inventory, brand, and type metadata.
 */
function getProductDetails(storeId: integer, productId: integer, limit: integer, offset: integer) {
  return db.query(`
    SELECT 
      ss.product_id, ss.sku, ss.store_id, ss.quantity, ss.updated_at, 
      p.productID, p.SKU, p.productName, p.brand, p.type, p.category, 
      p.storePricing, p.productDescription, p.updatedAt, p.createdAt, 
      json_agg(t.name) AS tags, 
      wi.warehouse_id, wi.warehouse_name, wi.inventory_quantity, 
      wi.reserved_quantity, wi.consignment_quantity, 
      (wi.inventory_quantity - wi.reserved_quantity - wi.consignment_quantity) AS available_quantity, 
      pb.productBrandID, pb.brandName, pb.productBrandDescription, pb.updated_at AS brand_updated_at, 
      pt.productTypeID, pt.productTypeName, pt.productTypeDesc
    FROM store_stocks ss
    JOIN products p ON ss.product_id = p.productID AND ss.sku = p.SKU
    LEFT JOIN ProductTagMapping ptm ON p.productID = ptm.productId
    LEFT JOIN Tag t ON ptm.tagId = t.id
    LEFT JOIN warehouse_inventory wi ON wi.sku = p.SKU
    JOIN ProductBrand pb ON p.brand = pb.brandName
    JOIN ProductType pt ON p.type = pt.productTypeID
    WHERE ss.store_id = $1 AND p.productID = $2
    GROUP BY ss.product_id, ss.sku, ss.store_id, ss.quantity, ss.updated_at, p.productID, p.SKU, p.productName, p.brand, p.type, p.category, p.storePricing, p.productDescription, p.updatedAt, p.createdAt, wi.warehouse_id, wi.warehouse_name, wi.inventory_quantity, wi.reserved_quantity, wi.consignment_quantity, pb.productBrandID, pb.brandName, pb.productBrandDescription, pb.updated_at, pt.productTypeID, pt.productTypeName, pt.productTypeDesc
    ORDER BY ss.product_id
    LIMIT $3 OFFSET $4
  `, [storeId, productId, limit, offset]);
}

/**
 * Fetches historical audit logs for a specific product.
 */
function getProductHistory(productId: integer, limit: integer, offset: integer) {
  return db.query(`
    SELECT history_id, product_id, updated_at, updated_by, company_supply_price, 
           wholesale_price, supply_price, retail_price, is_taxed, trade_in, 
           warranty, is_active, is_tracked, is_bundle
    FROM product_history
    WHERE product_id = $1
    ORDER BY updated_at DESC
    LIMIT $2 OFFSET $3
  `, [productId, limit, offset]);
}

/**
 * Fetches detailed warehouse stock levels for a specific product.
 */
function getWarehouseStock(productId: integer, companyId: integer, filters: object) {
  return db.query(`
    SELECT w.id AS warehouse_id, w.warehouse_code, w.name AS warehouse_name, 
           ws.inventory_quantity, ws.min_quantity, ws.max_quantity, ws.average_cost,
           COALESCE(res.reserved_quantity, 0) AS reserved_quantity,
           COALESCE(itr.in_transit_quantity, 0) AS in_transit_quantity,
           (ws.inventory_quantity - COALESCE(res.reserved_quantity, 0) - COALESCE(ws.consignment_quantity, 0)) AS available_quantity,
           (ws.inventory_quantity * ws.average_cost) AS total_cost
    FROM warehouse_stocks ws
    JOIN warehouses w ON ws.warehouse_id = w.id
    LEFT JOIN LATERAL (...) res ON TRUE
    LEFT JOIN LATERAL (...) itr ON TRUE
    WHERE ws.product_id = $1 AND ws.company_id = $2
    LIMIT $6 OFFSET $7
  `, [productId, companyId, ...filters]);
}