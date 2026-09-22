// API endpoint definition for the Service Product List Page.

ENDPOINT GET /api/service_products
    INPUT: 
        page (query param, default: 1)
        pageSize (query param, default: 20)
    
    // Validate inputs
    CURRENT_PAGE = PARSE_INT(page)
    SIZE = PARSE_INT(pageSize)
    
    // Fetch data from repository
    RESULT = CALL getServiceProducts(CURRENT_PAGE, SIZE)
    
    // Return JSON response matching the Service Product Table requirements
    RETURN JSON {
        "data": RESULT.items.map(item => ({
            "sku": item.sku,
            "name": item.name,
            "description": item.description,
            "service_product_type": item.service_product_type,
            "service_product_tag": item.service_product_tag,
            "estimated_time_in_minutes": item.estimated_time_in_minutes,
            "tax_name": item.tax_name,
            "other_tax_name": item.other_tax_name,
            "price_ex_tax": item.price_ex_tax,
            "open_price": item.open_price,
            "open_tax_account": item.open_tax_account,
            "open_tax_refund_account": item.open_tax_refund_account
        })),
        "pagination": {
            "total": RESULT.total,
            "current_page": RESULT.page,
            "page_size": RESULT.pageSize
        }
    }