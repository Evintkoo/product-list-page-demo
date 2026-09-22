const FilterBar = ({ onApply }) => {
  const [filters, setFilters] = useState({
    customer_group_id: '',
    store_id: '',
    is_active: null,
    customer_code: '',
    tax_no: '',
    birthdate: '',
    phone: '',
    address: ''
  });

  return (
    <div className="filter-bar">
      <input type="text" placeholder="Group" onChange={(e) => setFilters({...filters, customer_group_id: e.target.value})} />
      <input type="text" placeholder="Store" onChange={(e) => setFilters({...filters, store_id: e.target.value})} />
      <select onChange={(e) => setFilters({...filters, is_active: e.target.value === 'true'})}>
        <option value="">All Status</option>
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
      <input type="text" placeholder="Code" onChange={(e) => setFilters({...filters, customer_code: e.target.value})} />
      <input type="text" placeholder="Tax Number" onChange={(e) => setFilters({...filters, tax_no: e.target.value})} />
      <input type="date" onChange={(e) => setFilters({...filters, birthdate: e.target.value})} />
      <input type="tel" placeholder="Phone" onChange={(e) => setFilters({...filters, phone: e.target.value})} />
      <input type="text" placeholder="Address" onChange={(e) => setFilters({...filters, address: e.target.value})} />
      
      <button onClick={() => onApply(filters)}>Apply Search</button>
    </div>
  );
};