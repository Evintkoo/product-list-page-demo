export const FilterBar = ({ filters, setFilters, onSearch }) => {
  return (
    <div className="filter-bar">
      <input 
        placeholder="Document Number" 
        value={filters.ref_code}
        onChange={(e) => setFilters({...filters, ref_code: e.target.value})}
      />
      <DatePicker 
        value={filters.from_date} 
        onChange={(val) => setFilters({...filters, from_date: val})} 
      />
      <DatePicker 
        value={filters.to_date} 
        onChange={(val) => setFilters({...filters, to_date: val})} 
      />
      <SupplierDropdown 
        value={filters.supplier_id} 
        onChange={(val) => setFilters({...filters, supplier_id: val})} 
      />
      <StatusDropdown 
        value={filters.status} 
        onChange={(val) => setFilters({...filters, status: val})} 
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};