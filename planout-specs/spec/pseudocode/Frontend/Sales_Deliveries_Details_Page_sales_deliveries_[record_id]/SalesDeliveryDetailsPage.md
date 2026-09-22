// On page load:
// 1. Call GET /auth/me. If 401, redirect to Login.
// 2. Extract :id from URL.
// 3. Call GET /sales-deliveries/:id.
// 4. Map response to UI components:
//    - Header: ref_code, customer_po_number, sales_order_id, sales_invoice_id, 
//      warehouse_id, customer_id, notes, created_by, updated_by, 
//      created_at, updated_at, delivered_at, journal_id, workflow_state.
//    - Table: lines (sku, product_name, product_code, available_quantity, 
//      quantity, unit_price, discount_rate, subtotal).
//    - Footer: subtotal, tax, total.

Component SalesDeliveryDetailsPage {
  State deliveryData = null;
  State isLoading = true;

  Effect onMount {
    fetchDeliveryDetails();
  }

  Function fetchDeliveryDetails() {
    GET /sales-deliveries/:id -> response;
    deliveryData = response;
    isLoading = false;
  }

  Render {
    if (isLoading) return <LoadingSpinner />;

    return (
      <Page>
        <BackButton label="Sales Deliveries" />
        <WorkflowActionBar 
          status={deliveryData.workflow_state}
          onDeliver={() => openModal(DeliverConfirmationModal)}
          onCancel={() => openModal(CancelConfirmationModal)}
          onPrintBarcodes={() => navigateTo("/print-barcodes")}
        />
        
        <Tabs>
          <Tab label="Details" active>
            <HeaderSection data={deliveryData} />
            <DeliveryItemsTable lines={deliveryData.lines} />
            <SummarySection 
              subtotal={deliveryData.subtotal}
              tax={deliveryData.tax}
              total={deliveryData.total}
            />
          </Tab>
        </Tabs>
      </Page>
    );
  }
}