import { useSalesOrderReturns } from './hooks/useSalesOrderReturns';

export const SalesOrderReturnsPage = () => {
  // State for filters, pagination, and sorting
  const [filters, setFilters] = useState({
    ref_code: '',
    created_at_from: null,
    created_at_to: null,
    warehouse_id: '',
    customer_name: '',
    workflow_state: ''
  });

  const { data, isLoading, setPagination, setSort } = useSalesOrderReturns(filters);

  return (
    <Layout>
      <MainMenu activeTab="Sales" />
      <SubMenu activeTab="Company" activeEntry="Sales Order Returns" />
      
      <FilterBar 
        onApply={(newFilters) => setFilters(newFilters)}
        // Fields: ref_code, created_at_from, created_at_to, warehouse_id, customer_name, workflow_state
      />

      <NewSalesOrderReturnButton onClick={() => navigate('/sales_order_returns/new')} />

      <Table 
        data={data}
        onSort={(column, direction) => setSort(column, direction)}
        onPageChange={(page) => setPagination(page)}
      >
        <Column header="Document Number" accessor="ref_code" sortable />
        <Column header="Sales Invoice" accessor="sales_invoice_ref_code" sortable />
        <Column header="Sales Order" accessor="sales_order_ref_code" />
        <Column header="Created At" accessor="created_at" sortable />
        <Column header="Received Date" accessor="received_at" sortable />
        <Column header="Approved Date" accessor="approved_at" sortable />
        <Column header="Return To" accessor="warehouse_name" sortable />
        <Column header="From Customer" accessor="customer_name" sortable />
        <Column header="Status" accessor="workflow_state" sortable />
        <Column header="User" accessor="updated_by" sortable />
      </Table>
    </Layout>
  );
};