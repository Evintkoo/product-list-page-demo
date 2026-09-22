// This service handles the consolidated data retrieval for the full product record.

function getFullProductDetails(storeId: UUID, productId: UUID, limit: number, offset: number) {
  // Executes the consolidated join query across products, store_stocks, 
  // warehouse_inventory, ProductBrand, ProductType, and Tags.
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