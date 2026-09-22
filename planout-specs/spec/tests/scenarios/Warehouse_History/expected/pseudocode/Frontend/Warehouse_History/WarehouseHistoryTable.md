/**
 * Component: WarehouseHistoryTable
 * Asset: assets/23b2c0ff-f404-44a1-8f5d-0521c5d5caab.svg
 * 
 * Displays the stock activity history for a specific product.
 */

import { useState, useEffect } from 'react';

export const WarehouseHistoryTable = ({ productId }) => {
  const [historyData, setHistoryData] = useState([]);
  const [filters, setFilters] = useState({
    warehouseId: '', // Pre-filled from context
    type: '',
    fromDate: '',
    toDate: '',
    createdBy: ''
  });

  // Fetch data on mount and when filters change
  const fetchHistory = async () => {
    const response = await fetch(`/products/${productId}/warehouse_stock_history`);
    const data = await response.json();
    setHistoryData(data);
  };

  useEffect(() => {
    fetchHistory();
  }, [productId]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="filter-bar">
        <select 
          value={filters.warehouseId} 
          onChange={(e) => setFilters({...filters, warehouseId: e.target.value})}
        >
          <option value="">All Warehouses</option>
          {/* Warehouse options populated from Warehouse entity */}
        </select>

        <select 
          value={filters.type} 
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="">All Types</option>
          {/* Transaction types */}
        </select>

        <input 
          type="date" 
          value={filters.fromDate} 
          onChange={(e) => setFilters({...filters, fromDate: e.target.value})} 
        />
        
        <input 
          type="date" 
          value={filters.toDate} 
          onChange={(e) => setFilters({...filters, toDate: e.target.value})} 
        />

        <input 
          type="text" 
          placeholder="Created By"
          value={filters.createdBy} 
          onChange={(e) => setFilters({...filters, createdBy: e.target.value})} 
        />

        <button onClick={fetchHistory}>Search</button>
      </div>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Warehouse</th>
            <th>Type</th>
            <th>Qty Changed</th>
            <th>Notes</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {historyData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.createdAt}</td>
              <td>{row.warehouseId}</td>
              <td>{row.type}</td>
              <td>{row.quantityChanged}</td>
              <td>{row.notes} <!-- ORPHAN_FIELD: notes --></td>
              <td>{row.createdBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};