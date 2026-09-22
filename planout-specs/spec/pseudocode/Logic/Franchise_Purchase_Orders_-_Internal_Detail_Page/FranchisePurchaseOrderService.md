/**
 * Fetches the detailed view of a specific Franchise Purchase Order.
 * Validates that the order is of type 'franchise_internal'.
 */
async function getFranchisePurchaseOrder(id: string) {
  const response = await fetch(`/api/franchise-purchase-orders/${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch Franchise Purchase Order details");
  }

  const data = await response.json();

  // Validation: Ensure the order type is internal
  // <!-- MISSING_FIELD: FranchisePurchaseOrder.stock_order_type -->
  if (data.stock_order_type !== 'franchise_internal') {
    throw new Error("Invalid order type: Expected franchise_internal");
  }

  return mapToInternalDetailView(data);
}

/**
 * Maps the API response to the UI components:
 * - Header Panel
 * - Workflow Status
 * - Items Table
 */
function mapToInternalDetailView(data: any) {
  return {
    header: {
      documentNo: data.ref_code,
      referenceNumber: data.supplier_ref_code,
      fromWarehouse: data.warehouse_name,
      deliverTo: data.store_name,
      fromSupplier: data.supplier_name,
      createdBy: data.creator_name,
      updatedBy: data.updater_name,
      notes: data.notes,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      dueDate: data.due_at,
      sentAt: data.sent_at,
      receivedDate: data.received_at,
      journal: "N/A" // Temporary static value
    },
    workflow: {
      state: data.workflow_state
    },
    items: data.items.map((item: any) => ({
      sku: item.sku,
      productName: item.product_name,
      productCode: item.product_code,
      orderQty: item.order_qty,
      sentQty: item.sent_qty,
      receivedQty: item.received_qty,
      supplyPriceIncTax: item.supply_price_including_tax,
      orderAmount: item.order_amount,
      sentAmount: item.sent_amount,
      receiveAmount: item.receive_amount,
      storeRemark: item.store_remark,
      warehouseRemark: item.warehouse_remark
    })),
    summary: {
      totalOrderQty: data.items.reduce((sum: number, i: any) => sum + i.order_qty, 0),
      totalSentQty: data.items.reduce((sum: number, i: any) => sum + i.sent_qty, 0),
      totalReceivedQty: data.items.reduce((sum: number, i: any) => sum + i.received_qty, 0),
      totalOrderAmount: data.items.reduce((sum: number, i: any) => sum + i.order_amount, 0),
      totalSentAmount: data.items.reduce((sum: number, i: any) => sum + i.sent_amount, 0),
      totalReceiveAmount: data.items.reduce((sum: number, i: any) => sum + i.receive_amount, 0)
    }
  };
}