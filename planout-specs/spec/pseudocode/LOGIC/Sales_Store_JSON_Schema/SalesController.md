/**
 * Handles retrieval of paginated sales list for the POS interface.
 * Applies mandatory filters: source='POS' and workflow_state != 'voided'.
 */
function getSalesList(queryParams) {
  const { 
    ref_code, store_id, customer_name, vehicle_registration, 
    salesperson_id, workflow_state, ecommerce_ref_code, 
    from_date, to_date, limit, offset 
  } = queryParams;

  // Determine date column based on status
  const dateCol = (workflow_state === 'completed') ? 'completed_at' : 'created_at';

  const results = db.query(`
    SELECT s.*, st.store_name, COUNT(*) OVER() AS total_count
    FROM Sale s
    JOIN Store st ON st.store_id = s.store_id
    WHERE s.source = 'POS'
      AND s.workflow_state <> 'voided'
      AND ($1 IS NULL OR s.ref_code ILIKE $1 || '%')
      AND ($2 IS NULL OR s.store_id = $2)
      AND ($3 IS NULL OR s.customer_name ILIKE '%' || $3 || '%')
      AND ($4 IS NULL OR s.vehicle_registration ILIKE $4 || '%')
      AND ($5 IS NULL OR s.salesperson_id = $5)
      AND ($6 IS NULL OR s.workflow_state = $6)
      AND ($7 IS NULL OR s.ecommerce_ref_code ILIKE '%' || $7 || '%')
      AND ($8 IS NULL OR ${dateCol} >= $8)
      AND ($9 IS NULL OR ${dateCol} < $9 + 1)
    ORDER BY s.created_at DESC
    LIMIT $10 OFFSET $11
  `, [ref_code, store_id, customer_name, vehicle_registration, salesperson_id, workflow_state, ecommerce_ref_code, from_date, to_date, limit, offset]);

  return {
    data: results,
    pagination: { limit, offset, total: results[0]?.total_count || 0 }
  };
}

/**
 * Retrieves a single sale record with nested items and payments.
 */
function getSaleDetail(sale_id) {
  const sale = db.Sale.findUnique({ where: { sale_id }, include: { Store: true } });
  const items = db.SaleItem.findMany({ where: { sale_id } });
  const payments = db.SalePayment.findMany({ where: { sale_id } });

  // Note: product_name and sku are expected in response but missing from schema
  <!-- MISSING_FIELD: SaleItem.product_name -->
  <!-- MISSING_FIELD: SaleItem.sku -->
  <!-- MISSING_FIELD: SaleItem.tax_amount -->

  return { ...sale, items, payments };
}

/**
 * Creates a new sale record and associated items/payments.
 */
function createSale(payload) {
  return db.transaction(async (tx) => {
    const newSale = await tx.Sale.create({ data: payload.saleFields });
    
    await tx.SaleItem.createMany({ 
      data: payload.items.map(item => ({ ...item, sale_id: newSale.sale_id })) 
    });
    
    await tx.SalePayment.createMany({ 
      data: payload.payments.map(pay => ({ ...pay, sale_id: newSale.sale_id })) 
    });

    return { sale_id: newSale.sale_id };
  });
}