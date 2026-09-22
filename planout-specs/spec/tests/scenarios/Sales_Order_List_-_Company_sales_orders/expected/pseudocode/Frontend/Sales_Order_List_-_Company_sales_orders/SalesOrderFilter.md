export const SalesOrderFilter = ({ onSearch }) => {
  const [form, setForm] = useState({
    document_number: '',
    purchase_order_number: '',
    date_from: '',
    date_to: '',
    warehouse_id: '',
    customer_id: '',
    salesperson_id: '',
    status: ''
  });

  const handleSearch = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(form).filter(([_, v]) => v !== '' && v !== null)
    );
    onSearch(activeFilters);
  };

  return (
    <div className="filter-bar">
      <input name="document_number" onChange={(e) => setForm({...form, document_number: e.target.value})} />
      <input name="purchase_order_number" onChange={(e) => setForm({...form, purchase_order_number: e.target.value})} />
      {/* Date, Warehouse, Customer, Salesperson, Status inputs follow same pattern */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};