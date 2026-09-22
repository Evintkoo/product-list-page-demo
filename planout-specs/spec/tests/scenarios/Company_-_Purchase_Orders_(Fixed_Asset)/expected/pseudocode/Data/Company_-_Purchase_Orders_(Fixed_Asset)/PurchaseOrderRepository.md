/**
 * Fetches all Purchase Orders filtered by the Fixed Asset category.
 * Maps the database entity fields to the UI-ready structure.
 */
FUNCTION getFixedAssetPurchaseOrders():
    // Query the database for all records where is_fixed_asset is true
    SET raw_data = DATABASE.query(
        "SELECT * FROM PurchaseOrder WHERE is_fixed_asset = TRUE"
    )

    // Transform the raw database records into the UI-mapped format
    RETURN raw_data.map(record -> {
        RETURN {
            "Document Number": record.ref_code,
            "Reference Number": record.supplier_ref_code,
            "Created At": record.created_at,
            "Due Date": record.due_at,
            "From Supplier": record.supplier_name,
            "Status": record.workflow_state,
            "Amount": record.total,
            "Deliveries": record.delivery_count,
            "Invoices": record.invoices_count,
            "Returns": record.return_count
        }
    })