/**
 * Defines the data structure for the Purchase History table.
 * This schema serves as the source of truth for API responses and database mapping.
 */

export interface PurchaseHistory {
  purchase_history_id: number;
  product_id: number;
  purchase_date: string; // ISO 8601 format
  supplier_id: number;
  purchase_delivery_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  tax: number;
  total: number;
}

/**
 * Validation logic for the Purchase History record.
 * Ensures that calculated fields (subtotal, total) are consistent with input values.
 */
export const validatePurchaseHistory = (data: PurchaseHistory): boolean => {
  const expectedSubtotal = data.quantity * data.unit_price;
  const expectedTotal = expectedSubtotal + data.tax;

  return (
    data.subtotal === expectedSubtotal &&
    data.total === expectedTotal
  );
};