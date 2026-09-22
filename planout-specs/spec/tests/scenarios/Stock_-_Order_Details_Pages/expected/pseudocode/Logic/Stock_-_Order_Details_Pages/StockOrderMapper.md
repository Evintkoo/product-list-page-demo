/**
 * Maps API response data to the UI table structure.
 */
function mapItemsToTable(items) {
    return items.map(item => ({
        no: item.line_no,
        sku: item.sku,
        product: item.product_name,
        productCode: item.product_code,
        orderQty: item.order_qty,
        averageCost: item.company_average_cost,
        storeRemark: item.store_remark
    }));
}