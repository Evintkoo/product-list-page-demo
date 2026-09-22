/**
 * Fetches the full sales transaction details including store context.
 * Maps internal database fields to the UI schema.
 */
function getSalesDetails(transactionId) {
    const transaction = db.SalesTransaction.find({ id: transactionId });
    const store = db.Store.find({ id: transaction.store_id });

    return {
        ref_code: transaction.id,
        date: transaction.transaction_date,
        store: store.name,
        total_amount: transaction.total_amount,
        currency: transaction.currency,
        status: transaction.status,
        // <!-- MISSING_FIELD: SalesTransaction.customer -->
        // <!-- MISSING_FIELD: SalesTransaction.vehicle -->
        // <!-- MISSING_FIELD: SalesTransaction.salesperson -->
        // ... mapping remaining fields per JSON Schema Mapping Rules
    };
}

/**
 * Updates the status of a sales transaction.
 * Triggered by the Workflow Status Bar.
 */
function updateSalesStatus(transactionId, newStatus) {
    // Validate status transition (Draft -> Completed)
    const currentTransaction = db.SalesTransaction.find({ id: transactionId });
    
    if (currentTransaction.status === 'Completed') {
        throw new Error("Cannot modify a completed sale.");
    }

    return db.SalesTransaction.update(
        { id: transactionId },
        { status: newStatus }
    );
}