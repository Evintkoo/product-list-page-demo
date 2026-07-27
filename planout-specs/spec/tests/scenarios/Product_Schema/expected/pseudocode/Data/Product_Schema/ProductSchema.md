This file describes the read/write access patterns (as pseudocode queries) that the Logic swimlane will call. Each query's output shape matches one of the SHAPE definitions above — keep names identical when wiring up the service layer.

FUNCTION getProductList(page, pageSize, filters)
  - Query the Product table (optionally joined to ProductBrand/ProductType for filtering by brand/type name).
  - Apply filters, then LIMIT pageSize OFFSET (page - 1) * pageSize.
  - Also run a COUNT(*) query with the same filters (without LIMIT/OFFSET) to populate total.
  - Return ProductListResponse { products, total, page, pageSize }.

FUNCTION getProductDetails(storeId, productId, limit, offset)
  - Run the Consolidated Product Data Query:
    - FROM StoreStock
    - JOIN Product ON StoreStock.product_id = Product.productID AND StoreStock.sku = Product.SKU
    - LEFT JOIN ProductTagMapping -> Tag, aggregated into a tags array
    - LEFT JOIN WarehouseStockEntry ON sku match, computing available_quantity = inventory_quantity - reserved_quantity - consignment_quantity
    - JOIN ProductBrand ON Product.brand = ProductBrand.brandName
    - JOIN ProductType ON Product.type = ProductType.productTypeID
    - WHERE StoreStock.store_id = storeId AND Product.productID = productId
    - GROUP BY all selected non-aggregated columns
    - ORDER BY StoreStock.product_id
    - LIMIT limit OFFSET offset (supports paginating multiple warehouse/tag rows for the same product)
  - Return one or more ProductDetailsResponse rows (the Logic layer collapses/normalizes this into a single Product-shaped record with nested tags and warehouse breakdown).

FUNCTION getWarehouseStockByProductId(productId)
  - Query the legacy `warehouse_stock` table: SELECT productID, productName, warehouseID, warehouseName, inventoryQuantity, reservedQuantity, consignementQuantity, availableQuantity WHERE productID = productId.
  - Return an array of WarehouseStock rows.

FUNCTION getWarehouseStockList()
  - Same as above but without the WHERE clause — returns all rows from `warehouse_stock` as an array of WarehouseStock.

FUNCTION getWarehouseStockDetail(productId, companyId, warehouseId?, nameFilter?, warehouseCodeFilter?, limit, offset)
  - Run the "warehouse data query":
    - FROM WarehouseStockEntry
    - JOIN Warehouse ON WarehouseStockEntry.warehouse_id = Warehouse.id
    - LEFT JOIN LATERAL sum of Reservation.quantity WHERE status = 'open' -> reserved_quantity
    - LEFT JOIN LATERAL sum of InTransitDocument.quantity WHERE status = 'in_transit' -> in_transit_quantity
    - Compute available_quantity = inventory_quantity - reserved_quantity - consignment_quantity
    - Compute total_cost = inventory_quantity * average_cost
    - WHERE product_id = productId AND company_id = companyId, optionally filtered by warehouseId (exact match), name (contains), warehouse_code (contains)
    - ORDER BY warehouse_code, LIMIT/OFFSET for pagination
  - Aggregate total_quantity = sum of inventory_quantity across the returned rows.
  - Return WarehouseStockResponse { total_quantity, data }.

FUNCTION getProductHistory(productId, limit, offset)
  - Query ProductHistory WHERE product_id = productId, ORDER BY updated_at DESC, LIMIT/OFFSET for pagination.
  - Return an array of ProductHistory rows matching the Product History Response Shape.