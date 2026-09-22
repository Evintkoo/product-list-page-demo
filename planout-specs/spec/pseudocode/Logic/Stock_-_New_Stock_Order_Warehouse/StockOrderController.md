/**
 * Handles the submission of the New Stock Order Warehouse form.
 * Orchestrates the creation of the StockOrder header and its associated StockOrderItems.
 */
async function handleCreateStockOrder(formData) {
    // 1. Extract header information from New Order Warehouse Component
    const stockOrderData = {
        workflow_state: formData.workflow_state,
        from_warehouse_id: formData.from_warehouse_id,
        to_store_id: formData.to_store_id,
        ref_code: formData.ref_code,
        due_at: formData.due_at,
        notes: formData.notes,
        created_at: new Date().toISOString()
    };

    // 2. Extract line items from Order Product Component
    // Each item maps to the StockOrderItem schema
    const itemsData = formData.items.map(item => ({
        product_id: item.product_id,
        store_qty: item.store_qty,
        order_qty: item.order_qty,
        company_average_cost: item.company_average_cost,
        store_remark: item.store_remark
    }));

    // 3. Execute API call to persist the order
    try {
        const response = await apiClient.post("/stock_orders", {
            ...stockOrderData,
            items: itemsData
        });

        if (response.status === 201) {
            // 4. Redirect to Stock Order List Page upon success
            router.push("/stock-orders");
        }
    } catch (error) {
        // Handle validation or server errors
        handleFormErrors(error);
    }
}