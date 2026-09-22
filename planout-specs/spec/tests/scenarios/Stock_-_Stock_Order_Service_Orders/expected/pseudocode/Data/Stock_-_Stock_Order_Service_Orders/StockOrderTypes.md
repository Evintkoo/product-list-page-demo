/**
 * Interface representing the Stock Order record as consumed by the UI components.
 */
interface StockOrder {
  id: string;
  ref_code: string;
  source_ref_code: string;
  reference_path: string;
  created_at: string;
  due_at: string;
  received_at: string | null;
  store_name: string;
  warehouse_name: string;
  workflow_state: string;
  order_amount: number;
  receive_amount: number;
  updater_name: string;
}