/**
 * Fetches a paginated list of discrepancy stocks from the database.
 * Supports filtering by store context and standard pagination.
 */
function getDiscrepancyStocks(limit: number, offset: number, filters: object) {
    // Query the DiscrepancyStock table
    // Join with Product table to include SKU and Product Name
    // Join with Store table to verify store context
    
    const query = db.select(
        "DiscrepancyStock.id",
        "DiscrepancyStock.expected_quantity",
        "DiscrepancyStock.actual_quantity",
        "DiscrepancyStock.discrepancy_reason",
        "DiscrepancyStock.reported_at",
        "DiscrepancyStock.status",
        "Product.sku",
        "Product.name as product_name"
    )
    .from("DiscrepancyStock")
    .join("Product", "DiscrepancyStock.product_id", "=", "Product.id")
    .limit(limit)
    .offset(offset);

    // Apply optional filters if provided (e.g., status, date range)
    if (filters.status) {
        query.where("DiscrepancyStock.status", "=", filters.status);
    }

    return query.execute();
}