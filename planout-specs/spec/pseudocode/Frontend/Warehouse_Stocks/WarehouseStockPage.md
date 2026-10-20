import React, { useState, useEffect } from 'react';
import { fetchWarehouseStocks } from './api';

/**
 * Asset: assets/a79623e2-069b-4044-9a3a-6af563504375.svg
 */
export const WarehouseStockPage = ({ productId }) => {
  const [stocks, setStocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    warehouse_id: '', // ORPHAN_FIELD: warehouse_id
    warehouse_name: '',
    warehouse_code: ''
  });

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [productId]);

  const loadData = async () => {
    const data = await fetchWarehouseStocks(productId);
    setStocks(data);
  };

  const handleSearch = () => {
    // Logic to filter local state or re-fetch with query params
    // based on filters state
  };

  const calculateTotalQty = () => {
    return stocks.reduce((acc, curr) => acc + Number(curr.inventory_quantity), 0);
  };

  return (
    <div>
      <MainMenu activeTab="Products" />
      <SubMenu activeTab="Products" />
      
      <div className="summary-bar">
        <span>Total Qty: {calculateTotalQty()}</span> <!-- ORPHAN_FIELD: total_quantity -->
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="filter-bar">
        <select onChange={(e) => setFilters({...filters, warehouse_id: e.target.value})}>
          {/* Options populated from Warehouse entity */}
        </select>
        <input 
          placeholder="Name" 
          onChange={(e) => setFilters({...filters, warehouse_name: e.target.value})} 
        />
        <input 
          placeholder="Warehouse Code" 
          onChange={(e) => setFilters({...filters, warehouse_code: e.target.value})} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Code</th>
            <th>Warehouse</th>
            <th>Qty</th>
            <th>Qty Available</th>
            <th>Reserved</th>
            <th>In Transit</th>
            <th>Min Qty</th>
            <th>Max Qty</th>
            <th>Average Cost (Rp)</th>
            <th>Total Cost (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={stock.id}>
              <td>{index + 1}</td>
              <td>{stock.warehouse_code}</td>
              <td>{stock.warehouse_name}</td>
              <td>{stock.inventory_quantity}</td>
              <td>{stock.available_quantity}</td>
              <td>{stock.reserved_quantity}</td>
              <td>{stock.in_transit_quantity}</td>
              <td>
                {isEditing ? (
                  <input 
                    type="number" 
                    defaultValue={stock.min_quantity}
                    onChange={(e) => validateMinMax(e.target.value, stock.max_quantity)}
                  />
                ) : stock.min_quantity}
              </td>
              <td>
                {isEditing ? (
                  <input 
                    type="number" 
                    defaultValue={stock.max_quantity}
                    onChange={(e) => validateMinMax(stock.min_quantity, e.target.value)}
                  />
                ) : stock.max_quantity}
              </td>
              <td>{stock.average_cost}</td>
              <td>{Number(stock.inventory_quantity) * Number(stock.average_cost)}</td> <!-- ORPHAN_FIELD: total_cost -->
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};