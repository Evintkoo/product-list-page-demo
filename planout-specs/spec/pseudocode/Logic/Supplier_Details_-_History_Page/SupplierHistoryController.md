/**
 * Logic for handling the Supplier History page lifecycle.
 */
async function onSupplierHistoryPageLoad(supplierId) {
    // 1. Verify authentication
    const authResponse = await fetch("/api/auth/me");
    if (authResponse.status !== 200) {
        redirectTo("/login");
        return;
    }

    // 2. Fetch history data
    const historyResponse = await fetch(`/api/suppliers/${supplierId}/history`);
    
    if (historyResponse.status === 404) {
        renderNotFoundState();
        return;
    }

    const data = await historyResponse.json();
    
    // 3. Process and map data
    const mappedData = mapSupplierHistory(data.history);
    renderHistoryTable(mappedData);
}

/**
 * Maps raw SupplierHistory entities to the UI table structure.
 */
function mapSupplierHistory(historyList) {
    // Sort by updated_at descending to identify the latest state
    const sortedHistory = [...historyList].sort((a, b) => 
        new Date(b.updated_at) - new Date(a.updated_at)
    );

    // Update header with the most recent name
    if (sortedHistory.length > 0) {
        const latest = sortedHistory[0].changed_fields;
        updateHeaderSupplierName(latest.name);
    }

    return sortedHistory.map(entry => {
        const fields = entry.changed_fields;
        return {
            updatedAt: entry.updated_at,
            updatedBy: entry.updated_by,
            name: fields.name,
            address: fields.address,
            phone: fields.phone,
            fax: fields.fax,
            email: fields.email,
            contactName: fields.contact_name,
            registrationNo: fields.registration_no,
            taxNo: fields.tax_no,
            creditTermDays: fields.credit_term_days,
            creditLimit: fields.credit_limit
        };
    });
}