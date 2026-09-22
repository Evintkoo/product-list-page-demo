/**
 * Data access layer for Purchase Order operations.
 * Note: The feature description implies a GET list operation, 
 * but the provided context nodes describe a POST (creation) flow.
 * This implementation supports the retrieval and persistence of orders.
 */

function fetchPurchaseOrdersByCompany(companyId) {
  // Returns a list of PurchaseOrder records filtered by company_id
  return db.table("PurchaseOrder")
    .where("company_id", companyId)
    .orderBy("created_at", "desc");
}

function createPurchaseOrder(orderData) {
  // Persists a new PurchaseOrder and its associated PurchaseOrderItems
  return db.transaction(async (trx) => {
    const order = await trx("PurchaseOrder").insert({
      id: generateUuid(),
      company_id: orderData.companyId,
      status: "pending",
      created_at: new Date()
    }).returning("*");

    const items = orderData.items.map(item => ({
      id: generateUuid(),
      purchase_order_id: order[0].id,
      product_id: item.productId,
      quantity: item.quantity
    }));

    await trx("PurchaseOrderItem").insert(items);
    
    return { ...order[0], items };
  });
}

function checkProductExists(productId) {
  // Validates existence of product in inventory
  return db.table("Product").where("id", productId).first();
}

function checkStockAvailability(productId, requestedQuantity) {
  // Validates if stock is sufficient for the requested quantity
  const product = db.table("Product").where("id", productId).first();
  return product.stock_level >= requestedQuantity;
}