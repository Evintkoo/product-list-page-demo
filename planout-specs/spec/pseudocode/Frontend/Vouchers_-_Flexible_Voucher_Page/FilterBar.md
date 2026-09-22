export const FilterBar = ({ filters, setFilters, onSearch }) => {
  return (
    <div>
      <input 
        name="sku" 
        value={filters.sku} 
        onChange={(e) => setFilters({...filters, sku: e.target.value})} 
        placeholder="SKU" 
      />
      <input 
        name="name" 
        value={filters.name} 
        onChange={(e) => setFilters({...filters, name: e.target.value})} 
        placeholder="Name" 
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};