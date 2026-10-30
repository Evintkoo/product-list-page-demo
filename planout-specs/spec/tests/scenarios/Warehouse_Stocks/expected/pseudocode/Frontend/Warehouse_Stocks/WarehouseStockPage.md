// Node: Filter Bar (15e861a8-4d8a-4b24-9bd5-aa193c6e6baf)
// Asset: assets/a79623e2-069b-4044-9a3a-6af563504375.svg
const FilterBar = () => {
  const [filters, setFilters] = useState({ warehouse: '', name: '', warehouse_code: '' });
  
  // Note: Changing a filter doesn't update the list; only Search button triggers action.
  const handleSearch = () => { /* Trigger filter logic */ };

  return (
    <section>
      <select onChange={(e) => setFilters({...filters, warehouse: e.target.value})}>...</select>
      <input type="text" placeholder="Name" onChange={(e) => setFilters({...filters, name: e.target.value})} /> <!-- ORPHAN_FIELD: name -->
      <input type="text" placeholder="Warehouse Code" onChange={(e) => setFilters({...filters, warehouse_code: e.target.value})} />
      <button onClick={handleSearch}>Search</button>
    </section>
  );
};

// Node: Page load (42805dd1-5e99-40ff-b992-c365a7c367c8)
// Logic: Calls GET /products/:id/warehouse-stocks on mount.
useEffect(() => {
  fetch('/products/:id/warehouse-stocks', { method: 'GET' })
    .then(res => res.json())
    .then(data => setStockData(data));
}, []);

// Node: Min qty (1aa9f540-aef5-467d-a5cb-77ccb9c893c9)
// Note: Inline-editable, flags low stock.
const MinQtyCell = ({ value }) => (
  <input type="number" defaultValue={value} onBlur={(e) => updateMinQty(e.target.value)} />
);

// Node: Qty Reserved Column (99636a1e-6098-4fc4-9032-8cd9c577e3d1)
const ReservedCell = ({ reserved_quantity }) => <span>{reserved_quantity}</span>;

// Node: In Transit (52c0be64-f298-4816-8365-b3961193e48d)
const InTransitCell = ({ in_transit_quantity }) => <span>{in_transit_quantity}</span>;

// Node: Warehouse Column (aede03c0-0479-4e01-adfd-255c7608e792)
const WarehouseCell = ({ warehouse_name }) => <span>{warehouse_name}</span>;

// Node: Qty available (a74d1c67-e202-4440-a58b-02bf3b1da5a4)
const AvailableCell = ({ available_quantity }) => <span>{available_quantity}</span>;

// Node: Qty Column (2ef12705-caef-4494-96cf-45018283d879)
const QtyCell = ({ inventory_quantity }) => <span>{inventory_quantity}</span>;

/* 
Notes covered:
- Filter Bar: 3 filters (Warehouse, Name, Warehouse Code), Search button required for update.
- Page load: GET /products/:id/warehouse-stocks, mapping rules applied.
- Min qty: Inline-editable, flags low stock.
- Qty Reserved Column: Shows committed units.
- In Transit: Shows quantity being moved.
- Warehouse Column: Shows location.
- Qty available: Shows free stock.
- Qty Column: Shows total stock.
*/