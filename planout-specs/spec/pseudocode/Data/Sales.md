<!-- SCHEMA
{
  "entities": {
    "SalesDelivery": {
      "fields": [
        { "name": "sales_delivery_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "customer_ref_code", "type": "string" },
        { "name": "sales_order_id", "type": "uuid", "nullable": true, "foreign_key": "SalesOrder.sales_order_id" },
        { "name": "sales_order_ref_code", "type": "string" },
        { "name": "sales_invoice_id", "type": "uuid", "nullable": true, "foreign_key": "SalesInvoice.sales_invoice_id" },
        { "name": "sales_invoice_ref_code", "type": "string" },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "warehouse_id", "type": "uuid", "foreign_key": "Warehouse.warehouse_id" },
        { "name": "warehouse_name", "type": "string" },
        { "name": "workflow_state", "type": "string" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "Sale": {
      "fields": [
        { "name": "sale_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "ecommerce_ref_code", "type": "string", "nullable": true },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "customer_id", "type": "uuid", "nullable": true, "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "vehicle_id", "type": "uuid", "nullable": true, "foreign_key": "Vehicle.vehicle_id" },
        { "name": "vehicle_registration", "type": "string" },
        { "name": "salesperson_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "salesperson_name", "type": "string" },
        { "name": "source", "type": "string" },
        { "name": "workflow_state", "type": "string" },
        { "name": "total", "type": "numeric" },
        { "name": "discount_total", "type": "numeric" },
        { "name": "tax_total", "type": "numeric" },
        { "name": "completed_at", "type": "datetime" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SaleItem": {
      "fields": [
        { "name": "sale_item_id", "type": "uuid", "primary": true },
        { "name": "sale_id", "type": "uuid", "foreign_key": "Sale.sale_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "unit_price", "type": "numeric" },
        { "name": "discount_rate", "type": "numeric" },
        { "name": "discount_amount", "type": "numeric" },
        { "name": "tax_rate", "type": "numeric" },
        { "name": "tax_amount", "type": "numeric" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalePayment": {
      "fields": [
        { "name": "sale_payment_id", "type": "uuid", "primary": true },
        { "name": "sale_id", "type": "uuid", "foreign_key": "Sale.sale_id" },
        { "name": "coa_id", "type": "uuid", "foreign_key": "ChartOfAccount.coa_id" },
        { "name": "payment_method", "type": "string" },
        { "name": "amount", "type": "numeric" },
        { "name": "reference_no", "type": "string", "nullable": true },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesOrder": {
      "fields": [
        { "name": "sales_order_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "customer_ref_code", "type": "string" },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "warehouse_id", "type": "uuid", "foreign_key": "Warehouse.warehouse_id" },
        { "name": "warehouse_name", "type": "string" },
        { "name": "salesperson_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "salesperson_name", "type": "string" },
        { "name": "due_at", "type": "date" },
        { "name": "workflow_state", "type": "string" },
        { "name": "closed", "type": "boolean" },
        { "name": "is_backdate", "type": "boolean" },
        { "name": "total", "type": "numeric" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "tax", "type": "numeric" },
        { "name": "approved_at", "type": "datetime", "nullable": true },
        { "name": "notes", "type": "text", "nullable": true },
        { "name": "delivery_address", "type": "text", "nullable": true },
        { "name": "document_source", "type": "string" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesOrderItem": {
      "fields": [
        { "name": "sales_order_item_id", "type": "uuid", "primary": true },
        { "name": "sales_order_id", "type": "uuid", "foreign_key": "SalesOrder.sales_order_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "quantity_delivered", "type": "numeric" },
        { "name": "quantity_invoiced", "type": "numeric" },
        { "name": "unit_price", "type": "numeric" },
        { "name": "discount_rate", "type": "numeric" },
        { "name": "discount_type", "type": "string" },
        { "name": "unit_discount_amount", "type": "numeric" },
        { "name": "discount_including_tax", "type": "boolean" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesDeliveryItem": {
      "fields": [
        { "name": "sales_delivery_item_id", "type": "uuid", "primary": true },
        { "name": "sales_delivery_id", "type": "uuid", "foreign_key": "SalesDelivery.sales_delivery_id" },
        { "name": "sales_order_item_id", "type": "uuid", "nullable": true, "foreign_key": "SalesOrderItem.sales_order_item_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesInvoice": {
      "fields": [
        { "name": "sales_invoice_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "customer_ref_code", "type": "string" },
        { "name": "sales_order_id", "type": "uuid", "nullable": true, "foreign_key": "SalesOrder.sales_order_id" },
        { "name": "sales_order_ref_code", "type": "string" },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "invoice_date", "type": "date" },
        { "name": "due_date", "type": "date" },
        { "name": "total", "type": "numeric" },
        { "name": "workflow_state", "type": "string" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesInvoiceItem": {
      "fields": [
        { "name": "sales_invoice_item_id", "type": "uuid", "primary": true },
        { "name": "sales_invoice_id", "type": "uuid", "foreign_key": "SalesInvoice.sales_invoice_id" },
        { "name": "sales_delivery_item_id", "type": "uuid", "nullable": true, "foreign_key": "SalesDeliveryItem.sales_delivery_item_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "unit_price", "type": "numeric" },
        { "name": "discount_rate", "type": "numeric" },
        { "name": "tax_rate", "type": "numeric" },
        { "name": "tax_amount", "type": "numeric" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "InvoiceReceivable": {
      "fields": [
        { "name": "invoice_receivable_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "customer_ref_code", "type": "string" },
        { "name": "reference_path", "type": "string" },
        { "name": "sale_ref_code", "type": "string", "nullable": true },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "invoice_date", "type": "date" },
        { "name": "due_date", "type": "date" },
        { "name": "expected_payment_date", "type": "date", "nullable": true },
        { "name": "sent_at", "type": "datetime", "nullable": true },
        { "name": "total", "type": "numeric" },
        { "name": "workflow_state", "type": "string" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "CreditNote": {
      "fields": [
        { "name": "credit_note_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "source_ref_code", "type": "string" },
        { "name": "purpose_type", "type": "integer" },
        { "name": "sourceable_type", "type": "string" },
        { "name": "sourceable_id", "type": "uuid" },
        { "name": "credit_note_type", "type": "string" },
        { "name": "customer_id", "type": "uuid", "nullable": true, "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "document_date", "type": "date" },
        { "name": "total", "type": "numeric" },
        { "name": "amount_allocated", "type": "numeric" },
        { "name": "aasm_state", "type": "string" },
        { "name": "approved_at", "type": "datetime", "nullable": true },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "Claim": {
      "fields": [
        { "name": "claim_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "claimable_type", "type": "string" },
        { "name": "claimable_id", "type": "uuid" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "customer_id", "type": "uuid", "nullable": true, "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "vehicle_registration", "type": "string" },
        { "name": "workflow_state", "type": "string" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "LossSale": {
      "fields": [
        { "name": "loss_sale_id", "type": "uuid", "primary": true },
        { "name": "loss_date", "type": "date" },
        { "name": "loss_type", "type": "string" },
        { "name": "reason", "type": "text" },
        { "name": "customer_id", "type": "uuid", "nullable": true, "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "customer_phone", "type": "string" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "sku", "type": "string" },
        { "name": "details", "type": "text" },
        { "name": "quantity", "type": "numeric" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "notes", "type": "text" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SaleReturn": {
      "fields": [
        { "name": "sale_return_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "sale_id", "type": "uuid", "foreign_key": "Sale.sale_id" },
        { "name": "sale_ref_code", "type": "string" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "customer_id", "type": "uuid", "nullable": true, "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "vehicle_registration", "type": "string" },
        { "name": "workflow_state", "type": "string" },
        { "name": "allocated", "type": "boolean" },
        { "name": "register_closure_id", "type": "uuid", "nullable": true, "foreign_key": "RegisterClosure.register_closure_id" },
        { "name": "completed_at", "type": "datetime" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SaleReturnItem": {
      "fields": [
        { "name": "sale_return_item_id", "type": "uuid", "primary": true },
        { "name": "sale_return_id", "type": "uuid", "foreign_key": "SaleReturn.sale_return_id" },
        { "name": "sale_item_id", "type": "uuid", "nullable": true, "foreign_key": "SaleItem.sale_item_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "unit_price", "type": "numeric" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesOrderReturn": {
      "fields": [
        { "name": "sales_order_return_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "company_id", "type": "uuid", "foreign_key": "Company.company_id" },
        { "name": "sales_invoice_id", "type": "uuid", "foreign_key": "SalesInvoice.sales_invoice_id" },
        { "name": "sales_invoice_ref_code", "type": "string" },
        { "name": "sales_order_id", "type": "uuid", "nullable": true, "foreign_key": "SalesOrder.sales_order_id" },
        { "name": "sales_order_ref_code", "type": "string" },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "warehouse_id", "type": "uuid", "foreign_key": "Warehouse.warehouse_id" },
        { "name": "warehouse_name", "type": "string" },
        { "name": "notes", "type": "text", "nullable": true },
        { "name": "subtotal", "type": "numeric" },
        { "name": "discount", "type": "numeric" },
        { "name": "invoice_credit_note", "type": "numeric" },
        { "name": "net_subtotal", "type": "numeric" },
        { "name": "tax", "type": "numeric" },
        { "name": "total", "type": "numeric" },
        { "name": "allocated_credit_amount", "type": "numeric" },
        { "name": "journal_id", "type": "uuid", "nullable": true },
        { "name": "journal_ref_code", "type": "string", "nullable": true },
        { "name": "received_at", "type": "datetime", "nullable": true },
        { "name": "approved_at", "type": "datetime", "nullable": true },
        { "name": "workflow_state", "type": "string" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesOrderReturnItem": {
      "fields": [
        { "name": "sales_order_return_item_id", "type": "uuid", "primary": true },
        { "name": "sales_order_return_id", "type": "uuid", "foreign_key": "SalesOrderReturn.sales_order_return_id" },
        { "name": "sales_invoice_item_id", "type": "uuid", "nullable": true, "foreign_key": "SalesInvoiceItem.sales_invoice_item_id" },
        { "name": "product_id", "type": "uuid", "foreign_key": "Product.product_id" },
        { "name": "product_name", "type": "string" },
        { "name": "sku", "type": "string" },
        { "name": "quantity", "type": "numeric" },
        { "name": "original_price", "type": "numeric" },
        { "name": "discount_rate", "type": "numeric" },
        { "name": "unit_price", "type": "numeric" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "reason", "type": "string" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "ARPayment": {
      "fields": [
        { "name": "ar_payment_id", "type": "uuid", "primary": true },
        { "name": "ref_code", "type": "string", "unique": true },
        { "name": "payment_ref_code", "type": "string" },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "store_id", "type": "uuid", "foreign_key": "Store.store_id" },
        { "name": "payment_date", "type": "date" },
        { "name": "paid_amount", "type": "numeric" },
        { "name": "allocated_amount", "type": "numeric" },
        { "name": "variance_amount", "type": "numeric" },
        { "name": "use_cheque_bg", "type": "boolean" },
        { "name": "cheque_bg_received_at", "type": "date", "nullable": true },
        { "name": "cheque_bg_disbursement_at", "type": "date", "nullable": true },
        { "name": "workflow_state", "type": "string" },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "ARPaymentAllocation": {
      "fields": [
        { "name": "ar_payment_allocation_id", "type": "uuid", "primary": true },
        { "name": "ar_payment_id", "type": "uuid", "foreign_key": "ARPayment.ar_payment_id" },
        { "name": "invoice_receivable_id", "type": "uuid", "foreign_key": "InvoiceReceivable.invoice_receivable_id" },
        { "name": "allocated_amount", "type": "numeric" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    },
    "SalesQuotation": {
      "fields": [
        { "name": "sales_quotation_id", "type": "uuid", "primary": true },
        { "name": "company_id", "type": "uuid" },
        { "name": "ref_code", "type": "string" },
        { "name": "sales_order_id", "type": "uuid", "nullable": true, "foreign_key": "SalesOrder.sales_order_id" },
        { "name": "sales_order_ref_code", "type": "string", "nullable": true },
        { "name": "customer_id", "type": "uuid", "foreign_key": "Customer.customer_id" },
        { "name": "customer_name", "type": "string" },
        { "name": "customer_ref_code", "type": "string", "nullable": true },
        { "name": "due_at", "type": "date", "nullable": true },
        { "name": "sent_at", "type": "datetime", "nullable": true },
        { "name": "workflow_state", "type": "string" },
        { "name": "subtotal", "type": "numeric" },
        { "name": "discount_total", "type": "numeric" },
        { "name": "tax_total", "type": "numeric" },
        { "name": "total", "type": "numeric" },
        { "name": "notes", "type": "text", "nullable": true },
        { "name": "creator_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "updater_id", "type": "uuid", "foreign_key": "User.user_id" },
        { "name": "created_at", "type": "datetime" },
        { "name": "updated_at", "type": "datetime" }
      ]
    }
  }
}
-->

The Data layer for the Sales module manages a comprehensive set of tables covering the full lifecycle of sales, from initial quotations and orders to delivery, invoicing, returns, and accounts receivable (AR) settlement.

### Core Sales Entities
- **Sale**: The primary record for retail/POS and e-commerce transactions. It links to `Store`, `Customer`, `Vehicle`, and `User` (salesperson).
- **SaleItem**: Line items for a `Sale`, capturing product snapshots (name, SKU) and pricing details at the time of transaction.
- **SalePayment**: Records payments applied to a `Sale`, linked to a `ChartOfAccount` (e.g., cash or bank account).

### Wholesale Workflow
- **SalesOrder**: The central document for wholesale transactions. It tracks fulfillment status, warehouse allocation, and financial totals.
- **SalesOrderItem**: Line items for `SalesOrder`. It includes trigger-maintained fields (`quantity_delivered`, `quantity_invoiced`) to ensure business rules (e.g., preventing over-delivery or over-invoicing) are enforced.
- **SalesDelivery**: Tracks the dispatch of goods. It links to the parent `SalesOrder` and the resulting `SalesInvoice`.
- **SalesDeliveryItem**: Line items for a delivery, mapping back to `SalesOrderItem`.

### Invoicing & Receivables
- **SalesInvoice**: The billing document generated from a `SalesDelivery` or `SalesOrder`.
- **SalesInvoiceItem**: Line items for an invoice, linking to `SalesDeliveryItem` for traceability.
- **InvoiceReceivable**: The AR ageing record. It acts as a polymorphic source for payments, tracking the outstanding balance for customers.
- **ARPayment**: Records customer remittances.
- **ARPaymentAllocation**: A mapping table that links `ARPayment` to `InvoiceReceivable`, allowing partial or full settlement of invoices.

### Returns & Claims
- **SaleReturn / SaleReturnItem**: Handles returns for retail `Sale` records.
- **SalesOrderReturn / SalesOrderReturnItem**: Handles returns for wholesale `SalesOrder` records, linking back to the original `SalesInvoiceItem`.
- **CreditNote**: A shared entity for AR/AP purposes, used to issue credit against invoices.
- **Claim**: A polymorphic entity tracking issues linked to `Sale`, `SalesOrder`, or `Service` events.
- **LossSale**: Tracks unfulfilled demand (lost sales) for inventory and demand planning analysis.

### Quotations
- **SalesQuotation**: A pre-order document used for wholesale offers. It can be converted into a `SalesOrder`.

### Data Integrity & Maintenance
- All tables utilize `created_at` and `updated_at` timestamps, with `updated_at` maintained by database triggers.
- Denormalization (e.g., `customer_name`, `sku`, `warehouse_name`) is used extensively to optimize read performance for list views and search queries.
- Foreign keys are indexed to support efficient filtering and joins across the module.