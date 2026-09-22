// Schema-derived interfaces
interface SalesOrderReturnItem {
  sales_invoice_item_id: string;
  returned_quantity: number;
  reason: string;
}

interface SalesOrderReturnRequest {
  warehouse_id: string;
  customer_id: string;
  sales_invoice_id: string;
  notes: string;
  items: SalesOrderReturnItem[];
}