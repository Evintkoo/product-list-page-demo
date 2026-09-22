/**
 * Represents the API response structure for the Franchise Purchase Order Detail.
 */
interface FranchisePurchaseOrderResponse {
  id: string;
  ref_code: string;
  supplier_ref_code: string;
  warehouse_name: string;
  store_name: string;
  supplier_name: string;
  creator_name: string;
  updater_name: string;
  notes: string;
  created_at: string;
  updated_at: string;
  due_at: string;
  sent_at: string | null;
  received_at: string | null;
  workflow_state: string;
  items: FranchisePurchaseOrderItem[];
}

interface FranchisePurchaseOrderItem {
  sku: string;
  product_name: string;
  product_code: string;
  order_qty: number;
  sent_qty: number;
  received_qty: number;
  supply_price_including_tax: number;
  order_amount: number;
  sent_amount: number;
  receive_amount: number;
  store_remark: string | null;
  warehouse_remark: string | null;
}