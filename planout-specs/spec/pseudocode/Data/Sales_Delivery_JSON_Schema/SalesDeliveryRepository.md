/**
 * Fetches a paginated or filtered list of sales deliveries.
 * Used by the list view API endpoint.
 */
FUNCTION getSalesDeliveries(filters: {
  ref_code?: string,
  customer_ref_code?: string,
  warehouse_id?: uuid,
  workflow_state?: string
}) {
  RETURN DB.sales_deliveries
    .SELECT(
      sales_delivery_id,
      ref_code,
      customer_ref_code,
      sales_order_id,
      sales_order_ref_code,
      sales_invoice_id,
      sales_invoice_ref_code,
      customer_id,
      customer_name,
      warehouse_id,
      warehouse_name,
      workflow_state,
      creator_id,
      updater_id,
      created_at,
      updated_at
    )
    .WHERE(
      (filters.ref_code IS NULL OR ref_code == filters.ref_code) AND
      (filters.customer_ref_code IS NULL OR customer_ref_code == filters.customer_ref_code) AND
      (filters.warehouse_id IS NULL OR warehouse_id == filters.warehouse_id) AND
      (filters.workflow_state IS NULL OR workflow_state == filters.workflow_state)
    )
    .ORDER_BY(created_at, DESC);
}

/**
 * Fetches the full detail of a specific sales delivery including line items.
 * Scoped by company_id to ensure multi-tenant security.
 */
FUNCTION getSalesDeliveryDetail(sales_delivery_id: uuid, company_id: uuid) {
  // 1. Fetch Header
  header = DB.sales_deliveries
    .JOIN(warehouses, ON: warehouses.warehouse_id == sales_deliveries.warehouse_id)
    .JOIN(users AS creator, ON: creator.user_id == sales_deliveries.creator_id)
    .JOIN(users AS updater, ON: updater.user_id == sales_deliveries.updater_id)
    .SELECT(
      sales_deliveries.*,
      warehouses.address AS warehouse_address,
      creator.name AS created_by,
      updater.name AS updated_by
    )
    .WHERE(sales_delivery_id == sales_delivery_id AND company_id == company_id)
    .FIRST();

  IF (header IS NULL) THROW NotFoundException;

  // 2. Fetch Line Items
  items = DB.sales_delivery_items
    .SELECT(*)
    .WHERE(sales_delivery_id == sales_delivery_id)
    .ORDER_BY(created_at, ASC);

  // 3. Assemble Response
  RETURN {
    ...header,
    items: items
  };
}