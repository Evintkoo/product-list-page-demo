export const StockHistoryFilter = ({ filters, setFilters, onSearch, stores }) => {
  return (
    <div className="filter-row">
      <select 
        value={filters.store_id} 
        onChange={(e) => setFilters({...filters, store_id: e.target.value})}
      >
        <option value="">Select Store</option>
        {stores.map(s => <option key={s.id} value={s.id}>{s.store_name}</option>)}
      </select>

      <input 
        type="text" 
        placeholder="Type" 
        value={filters.type}
        onChange={(e) => setFilters({...filters, type: e.target.value})}
      />

      <input 
        type="datetime-local" 
        onChange={(e) => setFilters({...filters, from_date: e.target.value})}
      />

      <input 
        type="datetime-local" 
        onChange={(e) => setFilters({...filters, to_date: e.target.value})}
      />

      <input 
        type="text" 
        placeholder="Created By"
        value={filters.created_by}
        onChange={(e) => setFilters({...filters, created_by: e.target.value})}
      />

      <button onClick={onSearch}>Search</button>
    </div>
  );
};