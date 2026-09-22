export const useSalesOrderReturns = (filters) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 20 });
  const [sort, setSort] = useState({ column: 'created_at', direction: 'desc' });

  const fetchData = async () => {
    // API Call: GET /sales_order_returns
    // Query params: ref_code, created_at_from, created_at_to, warehouse_id, customer_name, workflow_state
    // Plus pagination/sort params (offset, sort_by, sort_dir)
    const response = await api.get('/sales_order_returns', { 
      params: { ...filters, ...pagination, ...sort } 
    });
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [filters, pagination, sort]);

  return { data, isLoading, setPagination, setSort };
};

/**
 * VALIDATION RULES:
 * 1. Date Range: created_at_to must be greater than or equal to created_at_from.
 *    Validation triggers on change of either field in the FilterBar.
 * 2. Pagination: Page size is fixed at 20.
 * 3. Sorting: Sales Order column is non-sortable. All other columns are sortable.
 * 4. Workflow States: 'Draft', 'Received', 'Approved', 'Cancelled'.
 */

// ORPHAN_FIELD: sort_by <!-- Used in Table logic for API request -->
// ORPHAN_FIELD: sort_dir <!-- Used in Table logic for API request -->
// ORPHAN_FIELD: offset <!-- Used in Table logic for API request -->