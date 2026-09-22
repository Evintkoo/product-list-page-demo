/**
 * API Interaction Layer
 * Endpoint: POST /warehouse-orders
 */

export const submitWarehouseOrder = async (payload) => {
  // Payload structure enforced by API PAYLOADS
  // status is defaulted to 'pending' by the backend/transform logic
  const response = await fetch('/warehouse-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      warehouse_product_id: payload.warehouse_product_id,
      quantity: payload.quantity,
      status: 'pending',
      company_average_cost: payload.company_average_cost,
      store_remark: payload.store_remark
    })
  });

  if (!response.ok) throw new Error('Failed to submit order');
  return response.json();
};