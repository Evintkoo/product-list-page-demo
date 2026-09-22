// This file defines the TypeScript interfaces for the API request and response shapes.

interface StockOutgoingHeader {
  stock_outgoing_id: string;
  ref_code: string;
  supplier_ref_code: string | null;
  source_id: number;
  source_type: 'store' | 'warehouse';
  entity_id: number;
  workflow_state: 'draft' | 'confirmed' | 'approved' | 'cancelled';
  due_at: string | null;
  notes: string | null;
  approved_at: string | null;
  journal_id: string | null;
  company_id: string;
  creator_id: string;
  updater_id: string;
  created_at: string;
  updated_at: string;
}

interface StockOutgoingItem {
  stock_outgoing_item_id: string;
  stock_outgoing_id: string;
  product_id: number;
  order_quantity: number;
  average_cost: number;
  order_amount: number;
  coa_id: string;
  coa_reversal_id: string | null;
  unit_conversion_id: string | null;
  source_line_type: string | null;
  source_line_id: string | null;
}