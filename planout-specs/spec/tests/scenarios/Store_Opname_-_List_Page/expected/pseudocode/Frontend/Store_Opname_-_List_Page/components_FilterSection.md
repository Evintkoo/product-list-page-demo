export const FilterSection = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="filter-bar">
      <input 
        placeholder="Document Number" 
        value={filters.ref_code}
        onChange={(e) => setFilters({...filters, ref_code: e.target.value})}
      />
      <input type="date" onChange={(e) => setFilters({...filters, from_date: e.target.value})} />
      <input type="date" onChange={(e) => setFilters({...filters, to_date: e.target.value})} />
      
      <select onChange={(e) => setFilters({...filters, store_id: e.target.value})}>
        {/* Options mapped from Warehouse entity */}
      </select>

      <select onChange={(e) => setFilters({...filters, status: e.target.value})}>
        <option value="draft">Draft</option>
        <option value="completed">Completed</option>
        <option value="approved">Approved</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button onClick={onSearch}>Search</button>
    </div>
  );
};