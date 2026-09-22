/**
 * Data access layer for Franchise Purchase Orders.
 * Maps database records to the standardized FranchisePurchaseOrderResponse shape.
 */

interface FranchisePurchaseOrderRecord {
  franchise_purchase_order_id: string;
  ref_code: string;
  workflow_state: 'draft' | 'store_confirmed' | 'warehouse_sent' | 'store_received';
  from_warehouse_id: number;
  to_store_id: number;
  from_supplier_id: number | null;
  due_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

/**
 * Retrieves a single franchise purchase order by its unique identifier.
 * @param id - The UUID of the purchase order to fetch.
 * @returns A promise resolving to the formatted response object.
 */
async function getFranchisePurchaseOrderById(id: string): Promise<FranchisePurchaseOrderRecord> {
  const query = `
    SELECT 
      id AS franchise_purchase_order_id,
      ref_code,
      workflow_state,
      from_warehouse_id,
      to_store_id,
      from_supplier_id,
      due_at,
      notes,
      created_at,
      updated_at
    FROM franchise_purchase_order
    WHERE id = $1;
  `;

  const result = await database.execute(query, [id]);

  if (result.rows.length === 0) {
    throw new Error(`Franchise Purchase Order with ID ${id} not found.`);
  }

  return result.rows[0];
}