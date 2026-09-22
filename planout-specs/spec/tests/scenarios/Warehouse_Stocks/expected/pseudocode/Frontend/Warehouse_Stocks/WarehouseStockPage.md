/**
 * Asset: assets/a79623e2-069b-4044-9a3a-6af563504375.svg
 * Page: Warehouse Stocks View
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const WarehouseStockPage = () => {
  const { id } = useParams<{ id: string }>();
  const [stocks, setStocks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Filter state
  const [filterWarehouse, setFilterWarehouse] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterCode, setFilterCode] = useState('');

  // Fetch data on load
  useEffect(() => {
    fetchWarehouseStocks();
  }, [id]);

  const fetchWarehouseStocks = async () => {
    const response = await fetch(`/api/products/${id}/warehouse-stocks`);
    const data = await response.json();
    setStocks(data);
  };

  // Validation logic for Min/Max Qty
  const validateQuantities = (min, max) => {
    if (min < 0 || max < 0) return "Quantities cannot be negative.";
    if (max < min) return "Max Qty cannot be less than Min Qty.";
    return null;
  };

  return (
    <div>
      <MainMenu activeTab="Products" />
      <SubMenu activeTab="Products" />

      {/* Filter Bar */}
      <div className="filter-bar">
        <select onChange={(e) => setFilterWarehouse(e.target.value)}>
          {/* Options populated from Warehouse entity */}
        </select>
        <input type="text" placeholder="Name" onChange={(e) => setFilterName(e.target.value)} />
        <input type="text" placeholder="Warehouse Code" onChange={(e) => setFilterCode(e.target.value)} />
        <button onClick={fetchWarehouseStocks}>Search</button>
      </div>

      {/* Summary Section */}
      <div className="summary">
        <span>Total Qty: {stocks.reduce((acc, curr) => acc + curr.inventory_quantity, 0)}</span>
        <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      </div>

      {/* Stock Table */}
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
          {stocks.map((item, index) => (
            <tr key={item.warehouse_code}>
              <td>{index + 1}</td>
              <td>{item.warehouse_code}</td>
              <td>{item.warehouse_name}</td>
              <td>{item.inventory_quantity}</td>
              <td>{item.available_quantity}</td>
              <td>{item.reserved_quantity}</td>
              <td>{item.in_transit_quantity}</td>
              
              {/* Editable Cells */}
              <td>
                {isEditing ? (
                  <input 
                    type="number" 
                    defaultValue={item.min_quantity}
                    onChange={(e) => validateQuantities(e.target.value, item.max_quantity)}
                  />
                ) : item.min_quantity}
              </td>
              <td>
                {isEditing ? (
                  <input 
                    type="number" 
                    defaultValue={item.max_quantity}
                    onChange={(e) => validateQuantities(item.min_quantity, e.target.value)}
                  />
                ) : item.max_quantity}
              </td>
              
              <td>{item.average_cost}</td>
              <td>{item.inventory_quantity * item.average_cost}</td> <!-- ORPHAN_FIELD: total_cost -->
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};