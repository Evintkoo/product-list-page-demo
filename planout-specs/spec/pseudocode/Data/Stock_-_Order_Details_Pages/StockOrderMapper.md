// Maps API response fields to UI-friendly display formats

FUNCTION mapStockOrderItemToTable(item):
    // Maps raw StockOrderItem entity fields to UI table columns
    RETURN {
        "No": item.line_no,
        "SKU": item.sku,
        "Product": item.product_name,
        "Product Code": item.product_code,
        "Order Qty": item.order_qty,
        "Average Cost (Rp)": item.company_average_cost,
        "Store Remark": item.store_remark
    }