/**
 * Component: StockReturnTable
 * Asset: assets/d26fac38-3733-4761-b42b-18c5782c1a24.svg
 * 
 * This component manages the dynamic list of StockReturnItem entries.
 */

interface StockReturnRow {
  rowId: string; // Internal identifier for UI state management
  product_id: string | null;
  store_qty: number;
  return_qty: number;
  type: 'Return' | 'Claim';
  reason: string;
}

// State: Array of rows
const [rows, setRows] = useState<StockReturnRow[]>([{ 
  rowId: generateUUID(), 
  product_id: null, 
  store_qty: 0, 
  return_qty: 0, 
  type: 'Return', 
  reason: '' 
}]);

// Handler: Add Row
const handleAddRow = () => {
  setRows([...rows, { rowId: generateUUID(), product_id: null, store_qty: 0, return_qty: 0, type: 'Return', reason: '' }]);
};

// Handler: Remove Row
const handleRemoveRow = (rowId: string) => {
  setRows(rows.filter(r => r.rowId !== rowId));
};