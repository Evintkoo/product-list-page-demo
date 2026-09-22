import React, { useState, useEffect } from 'react';
import { fetchStockReturns, fetchStores, fetchWarehouses } from './api';

/**
 * Asset: assets/34bd6ada-6c52-4d3e-8361-234743165249.svg
 */
export const StockReturnListPage = () => {
  // State for filters
  const [ref_code, setRefCode] = useState('');
  const [warehouse_id, setWarehouseId] = useState('');
  const [store_id, setStoreId] = useState('');
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const [workflow_state, setWorkflowState] = useState('');
  
  const [stockReturns, setStockReturns] = useState([]);
  const [stores, setStores] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  // Initial Load
  useEffect(() => {
    // Authentication check logic handled by router/auth guard
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [returns, storeList, warehouseList] = await Promise.all([
      fetchStockReturns({}),
      fetchStores(),
      fetchWarehouses()
    ]);
    setStockReturns(returns);
    setStores(storeList);
    setWarehouses(warehouseList);
  };

  const handleSearch = async () => {
    // Validation: From Date vs To Date
    if (from_date && to_date && new Date(from_date) > new Date(to_date)) {
      alert("from date cannot be greater than to date");
      return;
    }

    const results = await fetchStockReturns({
      ref_code,
      warehouse_id,
      store_id,
      from_date,
      to_date,
      workflow_state
    });
    setStockReturns(results);
  };

  return (
    <div>
      <h1>Stock Return</h1>
      
      {/* Tabs: Warehouse (Active) / Franchisee */}
      <nav>
        <button className="active">Warehouse</button>
        <button onClick={() => window.location.href = '/franchise-purchase-return'}>Franchisee</button>
      </nav>

      {/* Filters */}
      <input placeholder="Reference Code" onChange={(e) => setRefCode(e.target.value)} />
      
      <select onChange={(e) => setWarehouseId(e.target.value)}>
        {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
      </select>

      <select onChange={(e) => setStoreId(e.target.value)}>
        {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <input type="date" onChange={(e) => setFromDate(e.target.value)} />
      <input type="date" onChange={(e) => setToDate(e.target.value)} />

      <select onChange={(e) => setWorkflowState(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="confirmed">Confirmed</option>
        <option value="sent">Sent</option>
        <option value="approval">Approval</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <button onClick={handleSearch}>Search</button>
      <button onClick={() => window.location.href = '/new-stock-return'}>New Stock Order</button>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Stock Return</th>
            <th>Date</th>
            <th>Sent At</th>
            <th>Approved Date</th>
            <th>From Store</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {stockReturns.map((item) => (
            <tr key={item.id}>
              <td>{item.ref_code}</td>
              <td>{item.created_at}</td>
              <td>{item.sent_at}</td>
              <td>{item.approved_at}</td>
              <td>{item.from_store_name}</td>
              <td>{item.warehouse_name}</td>
              <td>{item.workflow_state}</td>
              <td>{item.created_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};