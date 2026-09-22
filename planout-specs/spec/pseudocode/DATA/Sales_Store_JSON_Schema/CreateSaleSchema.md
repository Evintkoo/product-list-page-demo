// Defines the request payload for creating a new sale, mapping to Sale, SaleItem, and SalePayment entities.

export interface CreateSaleRequest {
  store_id: string;
  customer_id?: string | null;
  vehicle_id?: string | null;
  salesperson_id: string;
  source: 'POS' | 'ecommerce' | 'other';
  workflow_state: 'draft' | 'pending' | 'completed' | 'voided';
  total: number;
  discount_total: number;
  tax_total: number;
  ecommerce_ref_code?: string | null;
  items: Array<{
    product_id: string;
    quantity: number;
    unit_price: number;
    discount_rate: number;
    tax_rate: number;
    discount_amount: number;
    subtotal: number;
    tax: number;
  }>;
  payments: Array<{
    coa_id: string;
    payment_method: 'cash' | 'card' | 'bank_transfer' | 'voucher' | 'deposit';
    amount: number;
    reference_no?: string | null;
  }>;
}