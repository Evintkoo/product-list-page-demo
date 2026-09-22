/**
 * Fetches a complete Sales Delivery aggregate including header and line items.
 * Ensures the record belongs to the authenticated user's company scope.
 */
function getSalesDeliveryById(deliveryId: uuid, companyId: uuid) {
  // 1. Query the SalesDelivery header
  const delivery = database.table("SalesDelivery")
    .where("id", deliveryId)
    .where("company_id", companyId)
    .first();

  if (!delivery) {
    return null;
  }

  // 2. Query associated line items
  const items = database.table("SalesDeliveryItem")
    .where("sales_delivery_id", deliveryId)
    .fetchAll();

  // 3. Return combined aggregate
  return {
    ...delivery,
    items: items
  };
}