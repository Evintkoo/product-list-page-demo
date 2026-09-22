/**
 * Orchestrates the transformation of raw database rows into the 
 * Discrepancy Stock List Response JSON structure.
 */
function formatListResponse(rows: any[], limit: number, offset: number) {
  const total = rows.length > 0 ? rows[0].total_count : 0;
  
  return {
    data: rows.map(row => ({
      discrepancy_stock_id: row.discrepancy_stock_id,
      discrepancy_stock_item_id: row.discrepancy_stock_item_id,
      created_at: row.created_at,
      entity_id: row.entity_id,
      entity_name: row.entity_name,
      ref_code: row.ref_code,
      reference: row.reference,
      product_id: row.product_id,
      product_sku: row.product_sku,
      product_name: row.product_name,
      quantity: row.quantity,
      notes: row.notes,
      feedback: row.feedback,
      aasm_state: row.aasm_state
    })),
    pagination: {
      limit,
      offset,
      total
    }
  };
}