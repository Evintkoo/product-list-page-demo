/**
 * Triggered by the Search Button.
 * Collects values from the seven UI controls and refreshes the table.
 */
async function handleSearchClick(controls) {
    const filters = {
        ref_code: controls.refCodeInput.value,
        return_type: controls.typeInput.value,
        warehouse_name: controls.warehouseInput.value,
        supplier_name: controls.supplierInput.value,
        workflow_state: controls.statusInput.value,
        // Add other controls as needed
    };

    const results = await fetchPurchaseReturns(filters);
    renderTable(mapPurchaseReturnToTable(results));
}