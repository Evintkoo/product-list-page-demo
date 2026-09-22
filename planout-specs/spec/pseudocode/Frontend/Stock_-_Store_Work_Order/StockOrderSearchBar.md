/**
 * Search Toolbar Component
 * Maps UI inputs to API request parameters.
 */
export const StockOrderSearchBar = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="search-toolbar">
      <input 
        placeholder="Stock Order" 
        value={filters.ref_code} 
        onChange={(e) => setFilters({...filters, ref_code: e.target.value})} 
      />
      <input 
        placeholder="Service Work Order" 
        value={filters.source_ref_code} 
        onChange={(e) => setFilters({...filters, source_ref_code: e.target.value})} 
      />
      {/* Additional inputs for created_at_from, created_at_to, store_id, warehouse_id, workflow_state */}
      <button onClick={onSearch}>Search</button>
    </div>
  );
};