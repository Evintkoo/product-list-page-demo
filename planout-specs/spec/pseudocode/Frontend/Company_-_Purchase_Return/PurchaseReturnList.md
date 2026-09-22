/**
 * Component: PurchaseReturnList
 * Asset: assets/ec6b9589-d626-45ea-83df-51e095482d00.svg
 */

// State Management
const [filters, setFilters] = useState({
  ref_code: "",
  return_type: "",
  warehouse_name: "",
  supplier_name: "",
  workflow_state: "",
  from_date: "", // ORPHAN_FIELD: from_date
  to_date: ""    // ORPHAN_FIELD: to_date
});
const [purchaseReturns, setPurchaseReturns] = useState([]);
const [isLoading, setIsLoading] = useState(false);

// Initial Load
useEffect(() => {
  const init = async () => {
    try {
      await api.get("/api/auth/me");
      fetchData({ is_fixed_asset: false });
    } catch (error) {
      redirectTo("/login");
    }
  };
  init();
}, []);

// Data Fetching
const fetchData = async (params) => {
  setIsLoading(true);
  // Only include non-empty filters in the request
  const query = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== "" && v !== null)
  );
  
  const response = await api.get("/api/purchase-returns", { params: query });
  setPurchaseReturns(response.data);
  setIsLoading(false);
};

// Event Handlers
const handleSearch = () => {
  fetchData({
    is_fixed_asset: false,
    ...filters
  });
};

const handleSort = (column) => {
  // Logic: Re-request with sort parameters, offset = 0
  fetchData({ ...filters, is_fixed_asset: false, sort_by: column });
};

// Render Logic
return (
  <Layout>
    <Header title="Purchase Return" />
    <NavigationTabs active="Standard" />
    
    <FilterBar>
      <Input name="ref_code" onChange={updateFilter} />
      <Dropdown name="return_type" options={["Return", "Claim"]} />
      <DatePicker name="from_date" />
      <DatePicker name="to_date" />
      <Dropdown name="warehouse_name" />
      <Dropdown name="supplier_name" />
      <Dropdown name="workflow_state" options={["Draft", "Sent", "Approved", "Cancelled"]} />
      <Button onClick={handleSearch} icon="search" />
    </FilterBar>

    <Table>
      {purchaseReturns.map((row) => (
        <Row key={row.id}>
          <Cell onClick={() => navigateToDetails(row.id)}>{row.ref_code}</Cell>
          <Cell>{row.return_type}</Cell>
          <Cell>{formatDate(row.created_at)}</Cell>
          <Cell>{formatDate(row.sent_at)}</Cell>
          <Cell>{formatDate(row.approved_at)}</Cell>
          <Cell>{row.warehouse_name}</Cell>
          <Cell>{row.supplier_name}</Cell>
          <Cell><Badge>{row.workflow_state}</Badge></Cell>
        </Row>
      ))}
    </Table>

    <Pagination pageSize={20} />
  </Layout>
);