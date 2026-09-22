/**
 * Data Access Layer for Product entity.
 * Handles persistence logic for the POST /api/products endpoint.
 */

FUNCTION createProduct(productData):
    // Generate unique identifier for the new product
    SET newId = GENERATE_UUID()
    
    // Map incoming JSON payload to Product entity fields
    INSERT INTO Product (
        id, sku, name, description, type, brand, tags, product_code, 
        supplier_product_code, supplier, tax, tax_product_code, 
        tax_unit_of_measure, company_supply_price, wholesale_price, 
        wholesale_including_tax, supply_price, retail_price, 
        retail_including_tax, mrp, images, attributes, weight, 
        volume, valid_from, valid_to, quick_button, quick_button_order, 
        barcode_type, stock_tracking, bundle_flexible, bundle, 
        is_active, internal_product, open_price, can_order, 
        product_freeze, warranty_period, return_days_limit, created_at
    ) VALUES (
        newId, 
        productData.sku, 
        productData.name, 
        productData.description, 
        productData.type, 
        productData.brand, 
        productData.tags, 
        productData.product_code, 
        productData.supplier_product_code, 
        productData.supplier, 
        productData.tax, 
        productData.tax_product_code, 
        productData.tax_unit_of_measure, 
        productData.company_supply_price, 
        productData.wholesale_price, 
        productData.wholesale_including_tax, 
        productData.supply_price, 
        productData.retail_price, 
        productData.retail_including_tax, 
        productData.mrp, 
        JSON_BUILD_OBJECT(
            'images', [productData.image_1...5],
            'urls', [productData.image_url_1...5],
            'thumbnails', [productData.thumbnail_url_1...5]
        ),
        JSON_BUILD_ARRAY(productData.attribute_1...6),
        productData.weight, 
        productData.volume, 
        productData.valid_from, 
        productData.valid_to, 
        productData.quick_button, 
        productData.quick_button_order, 
        productData.barcode_type, 
        productData.stock_tracking, 
        productData.bundle_flexible, 
        productData.bundle, 
        productData.is_active, 
        productData.internal_product, 
        productData.open_price, 
        productData.can_order, 
        productData.product_freeze, 
        productData.warranty_period, 
        productData.return_days_limit, 
        CURRENT_TIMESTAMP
    )
    
    RETURN FETCH_BY_ID(newId)

END FUNCTION