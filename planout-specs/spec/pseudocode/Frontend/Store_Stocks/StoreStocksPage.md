import React, { useState, useEffect } from 'react';
import { fetchProductStocks, fetchStores, updateProductStocks } from './api';

// Asset: assets/3a88b812-7748-4d8a-be5e-0c77d1eb6a9e.svg

export const StoreStocksPage = ({ productId }) => {
  const [stocks, setStocks] = useState([]);
  const [stores, setStores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  
  // Filter State
  const [filters, setFilters] = useState({
    store_id: '',
    name: '',
    store_code: '',
    show_stock: false
  });

  // Load initial data
  useEffect(() => {
    loadData();
    fetchStores().then(setStores);
  }, [productId]);

  const loadData = async (page = 1) => {
    const response = await fetchProductStocks(productId, { ...filters, page });
    setStocks(response); // Mapping handled by component logic
    setPagination({ page: response.page, totalPages: response.pages });
  };

  const handleSave = async () => {
    // Collect modified rows (Min Qty/Max Qty)
    const itemsToUpdate = stocks.filter(s => s.isDirty); 
    await updateProductStocks(productId, { items: itemsToUpdate });
    setIsEditing(false);
    loadData();
  };

  return (
    <div>
      <h1>Product Stocks</h1>
      <div className="product-header">
        {/* SKU and Code display */}
        <button onClick={() => navigateToQR(productId)}>QR Codes</button>
        <button onClick={() => navigateToBarcodes(productId)}>Barcodes</button>
      </div>

      <div className="filter-bar">
        <select onChange={(e) => setFilters({...filters, store_id: e.target.value})}>
          {stores.map(s => <option value={s.id}>{s.name}</option>)}
        </select>
        <input type="text" placeholder="Name" onChange={(e) => setFilters({...filters, name: e.target.value})} />
        <input type="text" placeholder="Store Code" onChange={(e) => setFilters({...filters, store_code: e.target.value})} />
        <input type="checkbox" onChange={(e) => setFilters({...filters, show_stock: e.target.checked})} />
        <button onClick={() => loadData(1)}>Search</button>
      </div>

      <button onClick={() => setIsEditing(true)}>Edit</button>
      
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Store</th>
            <th>Qty</th>
            <th>Reserved</th>
            <th>In Transit</th>
            <th>Min Qty</th>
            <th>Max Qty</th>
            <th>Average Cost</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(row => (
            <tr key={row.store_code}>
              <td>{row.store_code}</td>
              <td>{row.store_name}</td>
              <td>{row.quantity}</td>
              <td>{row.reserved}</td>
              <td>{row.in_transit}</td>
              <td>
                {isEditing ? <input type="number" defaultValue={row.min_qty} /> : row.min_qty}
              </td>
              <td>
                {isEditing ? <input type="number" defaultValue={row.max_qty} /> : row.max_qty}
              </td>
              <td>{row.average_cost}</td>
              <td>{row.total_cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}

      <div className="pagination">
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button onClick={() => loadData(pagination.page - 1)}>Previous</button>
        <button onClick={() => loadData(pagination.page + 1)}>Next</button>
      </div>
    </div>
  );
};