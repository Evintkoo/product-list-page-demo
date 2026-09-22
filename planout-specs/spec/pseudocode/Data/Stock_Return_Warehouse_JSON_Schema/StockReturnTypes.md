/**
 * API Response shape for Stock Return Warehouse.
 * Used by the logic layer to ensure consistency across the application.
 */

export interface StockReturnWarehouseResponse {
  stock_return_id: string;
  ref_code: string;
  workflow_state: 'draft' | 'confirmed' | 'sent' | 'approved';
  type: 'return' | 'claim';
  from_store_id: number;
  to_internal_supplier_id: number;
  to_warehouse_id: number;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  products: Array<{
    product_id: number;
    store_quantity: number;
    quantity: number;
    reason: string | null;
  }>;
}