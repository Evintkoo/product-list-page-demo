// Component: SalesOrderReturnDetails
// Fetches and displays details for a specific SalesOrderReturn record.
// Uses GET /api/sales-order-returns/:id to load data.

Component SalesOrderReturnDetails(record_id):
  State returnData = useFetch("/api/sales-order-returns/" + record_id)
  State workflowState = returnData.workflow_state
  
  // Navigation & Layout
  Render MainMenu(activeTab: "Sales")
  Render SalesSubMenu(activeTab: "Company", activeEntry: "Sales Order Returns")
  Render BackButton(label: "Sales Order Returns", onClick: navigateToList)

  // Header Section
  Render DocumentNumber(value: returnData.ref_code) // With copy button
  Render WorkflowBar(state: workflowState)
    // Asset: workflow_state-draft (if state == 'draft')
    // Asset: workflow_state-received (if state == 'received')
    // Asset: workflow_state-approved (if state == 'approved')
    // Asset: workflow_state-cancelled (if state == 'cancelled')
    
    // Action Buttons based on state:
    If workflowState == 'draft':
      Render Button("Receive Returned Items", onClick: openReceiveModal)
      Render Button("Cancel", onClick: openCancelModal)
    If workflowState == 'received':
      Render Button("Approve", onClick: openApproveModal)
      Render Button("Cancel", onClick: openCancelModal)
    If workflowState == 'cancelled':
      Render Button("Reset", onClick: openResetModal)
    Render Button("Print", onClick: handlePrint)

  // Details Panel
  Render InfoGrid:
    Field("Sales Order", returnData.sales_order_id) // With copy button
    Field("Invoice", returnData.sales_invoice_id)   // With copy button
    Field("From Customer", returnData.customer_id)
    Field("To Warehouse", returnData.warehouse_id)
    Field("Created Date", returnData.created_at)
    Field("Received Date", returnData.received_at)
    Field("Approved Date", returnData.approved_at)
    Field("Created By", returnData.created_by)
    Field("Updated By", returnData.updated_by)
    Field("Updated At", returnData.updated_at)
    Field("Journal", returnData.journal_id)
    Field("Notes", returnData.notes)

  // Items Table
  Render SectionHeader("Order Items")
  Render ExportButton()
  Render Table(items: returnData.items):
    Column("No")
    Column("SKU")
    Column("Product")
    Column("Stock")
    Column("Return")
    Column("Original Price")
    Column("Discount")
    Column("Price (Rp)")
    Column("Reason")
  Render FooterRow(TotalQuantity: sum(items.quantity))

  // Amount Summary
  Render AmountHeader("Amount")
  Render SummaryFields:
    Field("SubTotal", returnData.subtotal)
    Field("Discount", returnData.discount)
    Field("Invoice Credit Note", returnData.invoice_credit_note)
    Field("Net Subtotal", returnData.net_subtotal)
    Field("Tax", returnData.tax)
    Field("Total", returnData.total)
    Field("Allocated Credit Amount", returnData.allocated_credit_amount)

  // Modals
  If isReceiveModalOpen:
    Render ReceiveModal(onConfirm: patchStatus('received')) // Asset: assets/modal-receive-returned-items.svg
  If isApproveModalOpen:
    Render ApproveModal(onConfirm: patchStatus('approved')) // Asset: assets/modal-approve.svg
  If isCancelModalOpen:
    Render CancelModal(onConfirm: patchStatus('cancelled')) // Asset: assets/modal-cancel.svg
  If isResetModalOpen:
    Render ResetModal(onConfirm: patchStatus('draft'))