/**
 * Mapping logic to transform API response entities to UI Table props.
 * 
 * Mapping Rules:
 * - customer_purchase_document_id -> Document Number Cell
 * - customer_purchase_status      -> Status Cell
 * - customer_purchase_amount      -> Amount Cell
 * - store_id                      -> Store Cell
 * - customer_id                   -> Created By cell
 */
export const mapPurchaseToTable = (purchase) => {
  return {
    documentNumber: purchase.customer_purchase_document_id,
    status: purchase.customer_purchase_status,
    amount: purchase.customer_purchase_amount,
    store: purchase.store_id,
    createdBy: purchase.customer_id
  };
};