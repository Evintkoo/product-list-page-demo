/**
 * Maps raw API responses to UI-friendly structures based on defined rules.
 */
export const MappingService = {
  mapSalesOrder(data: any) {
    return {
      documentNumber: data.ref_code,
      purchaseOrderNo: data.external_ref_code,
      warehouse: { id: data.warehouse_id, address: data.delivery_address }, // <!-- MISSING_FIELD: Warehouse.name -->
      customer: { id: data.customer_id, address: data.delivery_address }, // <!-- MISSING_FIELD: Customer.name -->
      notes: data.notes,
      salesperson: data.salesperson_name,
      source: data.source,
      dueDate: data.due_at,
      approvedDate: data.approved_at,
      createdBy: data.created_by,
      updatedBy: data.updated_by,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      isClosed: data.closed,
      status: data.status
    };
  },

  mapReturnList(data: any[]) {
    return data.map(item => ({
      documentNumber: item.ref_code,
      returnFrom: item.return_from,
      status: item.status,
      createdAt: item.created_at,
      receivedAt: item.received_at,
      approvedAt: item.approved_at,
      paidReturn: item.paid_return,
      updatedBy: item.updated_by,
      journal: item.journal
    }));
  },

  mapDeliveryList(data: any[]) {
    return data.map(item => ({
      documentNumber: item.ref_code,
      purchaseOrderNo: item.customer_ref_code,
      status: item.status,
      createdAt: item.created_at,
      deliveredAt: item.delivered_at,
      updatedBy: item.updated_by,
      journal: item.journal
    }));
  },

  mapInvoiceList(data: any[]) {
    return data.map(item => ({
      id: item.id,
      documentNumber: item.ref_code,
      purchaseOrder: item.customer_po_number,
      invoiceDate: item.invoice_date,
      dueDate: item.due_at,
      status: item.workflow_state,
      total: item.total,
      due: item.amount_due,
      paid: item.amount_paid,
      credited: item.credit_note_total,
      updatedBy: item.updated_by,
      journal: item.journal
    }));
  },

  mapQuotationList(data: any[]) {
    return data.map(item => ({
      id: item.id,
      documentNumber: item.ref_code,
      customerRefCode: item.customer_ref_code,
      deliveryDueDate: item.due_at,
      toCustomer: item.sent_at,
      status: item.workflow_state,
      total: item.total,
      updatedBy: item.updated_by,
      createdDate: item.created_at
    }));
  }
};