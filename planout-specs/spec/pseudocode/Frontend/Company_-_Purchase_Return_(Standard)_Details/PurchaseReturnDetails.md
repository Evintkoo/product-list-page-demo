// Component: PurchaseReturnDetails
// Fetches and displays the Purchase Return document details.
// Asset: assets/45d3a057-bbcf-4287-9046-e9bf1660186f.svg (Draft)
// Asset: assets/43d29e9e-d7a8-4000-bda7-53c4fc33ab7c.svg (Sent to Supplier)
// Asset: assets/12ddd189-5f62-45ec-acea-26f00255b288.svg (Approved)

function PurchaseReturnDetails({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // On Page Load: Fetch document details
  useEffect(() => {
    fetch(`GET /inventory/purchase-returns/standard/${id}`)
      .then(response => setData(response))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <Page>
      <TopNavigationBar />
      <SubMenu activeTab="Company" />
      
      <Header>
        <DocumentNumber>{data.document_number}</DocumentNumber>
        <WorkflowStatusTracker status={data.status} />
        <ActionButtons>
          {data.status === 'draft' && (
            <>
              <Button onClick={handleEdit}>Edit</Button>
              <Button onClick={handlePrint}>Print</Button>
              <Button onClick={handleSendToSupplier}>Send to Supplier</Button>
            </>
          )}
          {data.status === 'sent_to_supplier' && (
            <>
              <Button onClick={handlePrint}>Print</Button>
              <Button onClick={handleApproveStart}>Approve</Button>
            </>
          )}
        </ActionButtons>
      </Header>

      <DetailsGrid>
        <InfoCard title="General Info">
          <Field label="Reference Number" value={data.reference_number} />
          <Field label="Type" value={data.type} />
          <Field label="Purchase Order" link={data.purchase_order_id} />
          <Field label="Purchase Deliveries" link={data.purchase_delivery_id} /> <!-- ORPHAN_FIELD: purchase_delivery_id -->
          <Field label="Invoice" link={data.invoice_id} />
          <Field label="AP Payment" link={data.ap_payment_id} />
          <Field label="From Warehouse" link={data.warehouse_id} />
          <Field label="To Supplier" link={data.supplier_id} />
        </InfoCard>

        <AuditCard>
          <Field label="Created At" value={data.created_at} />
          <Field label="Created By" value={data.created_by} />
          <Field label="Updated At" value={data.updated_at} />
          <Field label="Updated By" value={data.updated_by} />
          <Field label="Sent At" value={data.sent_at} />
          <Field label="Approved Date" value={data.approved_at} />
        </AuditCard>
      </DetailsGrid>

      <ReturnItemsTable items={data.items} status={data.status} />
      
      <FinancialSummary>
        <AmountsCard data={data} />
        <PaymentsCard data={data} />
      </FinancialSummary>
    </Page>
  );
}