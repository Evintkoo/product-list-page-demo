/**
 * Transforms database entities into the Sale Ecommerce List Response shape.
 */
FUNCTION mapToSaleResponse(saleEntities: Array<Sale>) {
  RETURN saleEntities.map(sale => ({
    id: sale.id,
    amount: sale.amount,
    currency: sale.currency,
    status: sale.status,
    createdAt: sale.created_at,
    customerId: sale.customer_id
  }))
}