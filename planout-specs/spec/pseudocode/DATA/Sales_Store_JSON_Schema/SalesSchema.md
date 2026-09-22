// Defines the shape of the Sales List API response for type safety across the stack.

export interface SalesListResponse {
  data: SaleRow[];
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface SaleRow {
  sale_id: string;
  ref_code: string;
  created_at: string;
  completed_at: string | null;
  customer_id: string | null;
  customer_name: string | null;
  vehicle_id: string | null;
  vehicle_registration: string | null;
  workflow_state: 'draft' | 'pending' | 'completed' | 'voided';
  store_id: string;
  store_name: string;
  salesperson_name: string | null;
  source: 'POS' | 'ecommerce' | 'other';
  total: number;
}