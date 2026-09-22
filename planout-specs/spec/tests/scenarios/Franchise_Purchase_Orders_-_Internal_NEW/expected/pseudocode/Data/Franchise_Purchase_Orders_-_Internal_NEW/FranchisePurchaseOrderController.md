/**
 * Handles the creation of a new internal Franchise Purchase Order.
 * Endpoint: POST /api/franchise_purchase_orders
 */
function createFranchisePurchaseOrder(requestBody) {
    // 1. Validate incoming payload against FranchisePurchaseOrder and LineItem schemas
    const { 
        workflow_state, 
        order_type, 
        warehouse_id, 
        store_id, 
        supplier_id, 
        supplier_ref_code, 
        due_at, 
        notes,
        line_items // Array of product objects
    } = requestBody;

    // 2. Begin Database Transaction
    return transaction(async (db) => {
        
        // 3. Create the parent Purchase Order record
        const newOrder = await db.FranchisePurchaseOrder.insert({
            workflow_state,
            order_type,
            warehouse_id,
            store_id,
            supplier_id,
            supplier_ref_code,
            due_at,
            notes,
            created_at: now()
        });

        // 4. Map and insert line items associated with the new order ID
        const itemsToInsert = line_items.map(item => ({
            purchase_order_id: newOrder.id,
            product_id: item.product_id,
            store_qty: item.store_qty,
            order_qty: item.order_qty,
            supply_price: item.supply_price,
            store_remark: item.store_remark
        }));

        await db.FranchisePurchaseOrderLineItem.insertMany(itemsToInsert);

        // 5. Return the full object shape as defined in the response contract
        return {
            ...newOrder,
            line_items: itemsToInsert
        };
    });
}