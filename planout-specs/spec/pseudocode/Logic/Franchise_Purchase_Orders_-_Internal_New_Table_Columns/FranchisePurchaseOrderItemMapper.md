/**
 * Logic to handle the mapping and validation of Franchise Purchase Order Item inputs.
 * This ensures that the data captured in the UI table aligns with the 
 * FranchisePurchaseOrderItem entity schema before submission.
 */

function mapPurchaseOrderItem(formData: {
    product_id: string,
    store_qty: number,
    order_qty: number,
    supply_price: number,
    store_remark: string
}) {
    // Validate required fields based on FranchisePurchaseOrderItem schema
    const item = {
        product_id: formData.product_id, // Maps to FranchisePurchaseOrderItem.product_id
        store_qty: formData.store_qty,   // Maps to FranchisePurchaseOrderItem.store_qty
        order_qty: formData.order_qty,   // Maps to FranchisePurchaseOrderItem.order_qty
        supply_price: formData.supply_price, // Maps to FranchisePurchaseOrderItem.supply_price
        store_remark: formData.store_remark  // Maps to FranchisePurchaseOrderItem.store_remark
    };

    // Perform basic integrity checks
    if (!item.product_id) {
        throw new Error("Product ID is required.");
    }

    if (item.order_qty < 0) {
        throw new Error("Order quantity must be a positive integer.");
    }

    return item;
}

/**
 * Helper to initialize a new row state for the Franchise Purchase Order table
 */
function createEmptyRow() {
    return {
        product_id: "",
        store_qty: 0,
        order_qty: 0,
        supply_price: 0.00,
        store_remark: ""
    };
}