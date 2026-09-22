/**
 * Utility to ensure the UI state aligns with the backend schema requirements.
 */
export const mapFormToStockOrderPayload = (warehouseForm, productList) => {
    return {
        workflow_state: warehouseForm.workflow_state,
        from_warehouse_id: warehouseForm.from_warehouse_id,
        to_store_id: warehouseForm.to_store_id,
        ref_code: warehouseForm.ref_code,
        due_at: warehouseForm.due_at,
        notes: warehouseForm.notes,
        items: productList.map(p => ({
            product_id: p.product_id,
            store_qty: p.store_qty,
            order_qty: p.order_qty,
            company_average_cost: p.company_average_cost,
            store_remark: p.store_remark
        }))
    };
};