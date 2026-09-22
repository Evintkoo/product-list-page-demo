/**
 * Main container for the Stock Outgoings list.
 * Asset: assets/a75ee8f2-b449-4bc0-98aa-b5527ae697e3.svg
 */
component StockOutgoingsPage {
  state filters = {
    search: "",
    status: "",
    from_date: null, // ORPHAN_FIELD: from_date
    to_date: null,   // ORPHAN_FIELD: to_date
    entity_id: null, // ORPHAN_FIELD: entity_id
    source_id: null  // ORPHAN_FIELD: source_id
  }
  state pagination = { page: 1, limit: 20 }
  state sort = { sort_by: "created_at", sort_order: "desc" }
  state data = []
  state isLoading = false

  onMount {
    fetchStockOutgoings()
  }

  function fetchStockOutgoings() {
    isLoading = true
    // Map state to API payload
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      search: filters.search,
      status: filters.status
      // Note: from_date, to_date, entity_id, source_id are included if present
    }
    
    // Call GET /stock-outgoings
    // Logic: Remove empty keys before request
    const response = API.get("/stock-outgoings", params)
    data = response.data
    isLoading = false
  }

  render {
    <MainMenu activeTab="Inventory" />
    <SubMenu activeTab="Company" />
    
    <FilterBar>
      <TextField name="search" label="Ref Code" onChange={...} />
      <DatePicker name="from_date" label="From Date" />
      <DatePicker name="to_date" label="To Date" />
      <Dropdown name="entity_id" label="Entity" />
      <Dropdown name="source_id" label="Source" />
      <Dropdown name="status" label="Status" />
      <Button onClick={() => { pagination.page = 1; fetchStockOutgoings(); }}>Search</Button>
    </FilterBar>

    <Button onClick={redirectToNewOutgoing}>New Stock Outgoing</Button>

    <Table>
      <TableHeader>
        <HeaderCell onClick={() => handleSort("reference_number")}>Reference Number</HeaderCell>
        <HeaderCell onClick={() => handleSort("created_at")}>Date</HeaderCell>
        <HeaderCell onClick={() => handleSort("status")}>Status</HeaderCell>
        {/* Additional columns: Due Date, Entity, Source, Users */}
      </TableHeader>
      
      {data.length > 0 ? (
        data.map(row => (
          <TableRow onClick={() => navigateToDetails(row.id)}>
            <Cell>{row.reference_number}</Cell>
            <Cell>{row.created_at}</Cell>
            <Cell>{row.status.toUpperCase()}</Cell>
          </TableRow>
        ))
      ) : (
        <EmptyState message="No stock outgoing matched" onClearFilters={clearFilters} />
      )}
    </Table>

    <Pagination 
      currentPage={pagination.page} 
      onPageChange={(p) => { pagination.page = p; fetchStockOutgoings(); }} 
    />
  }
}