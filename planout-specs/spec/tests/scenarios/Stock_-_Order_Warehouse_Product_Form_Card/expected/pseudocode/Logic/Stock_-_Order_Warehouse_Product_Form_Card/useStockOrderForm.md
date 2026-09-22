/**
 * Logic for handling the Stock Order Warehouse Product Form.
 * Maps UI inputs to the WarehouseOrder entity schema.
 */

export const useStockOrderForm = () => {
  
  const submitOrder = async (formData: {
    product_id: string; // Maps to WarehouseOrder.warehouse_product_id
    store_qty: number;
    order_qty: number; // Maps to WarehouseOrder.quantity
    company_average_cost: number; // <!-- MISSING_FIELD: WarehouseOrder.company_average_cost -->
    store_remark: string; // <!-- MISSING_FIELD: WarehouseOrder.store_remark -->
  }) => {
    
    // 1. Validate required fields
    if (!formData.product_id || formData.order_qty <= 0) {
      throw new Error("Invalid order data: Product and Quantity are required.");
    }

    // 2. Prepare payload for API
    const payload = {
      warehouse_product_id: formData.product_id,
      quantity: formData.order_qty,
      status: "pending", // Default status for new orders
      company_average_cost: formData.company_average_cost,
      store_remark: formData.store_remark
    };

    // 3. Execute API call
    const response = await fetch("/warehouse-orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to create warehouse order");
    }

    return await response.json();
  };

  return {
    submitOrder
  };
};