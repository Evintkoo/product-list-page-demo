import React, { useState, useEffect } from 'react';
import { fetchStockOrders, checkAuth } from './api';

// Asset: assets/13722545-3ae3-4120-bda0-595fccbff526.svg

export const StockOrderListPage = () => {
  const [filters, setFilters] = useState({
    ref_code: '',
    created_at_from: '',
    created_at_to: '',
    store_id: '',
    warehouse_id: '',
    workflow_state: ''
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Page Load Logic
    checkAuth().catch(() => window.location.href = '/login');
    loadOrders({});
  }, []);

  const loadOrders = async (params) => {
    const query = {
      ...params,
      source_type: 'stock_order',
      limit: 20,
      offset: 0
    };
    const data = await fetchStockOrders(query);
    setOrders(data);
  };

  const handleSearch = () => {
    // Only include filters with values
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    loadOrders(activeFilters);
  };

  return (
    <div>
      <MainMenu activeTab="Inventory" />
      <SubMenu activeTab="Store" />
      <NavigationTab active="Warehouse" />
      
      {/* Search Section */}
      <div className="filter-section">
        <input 
          placeholder="Stock Order" 
          onChange={(e) => setFilters({...filters, ref_code: e.target.value})} 
        />
        <DatePicker 
          onChange={(d) => setFilters({...filters, created_at_from: d})} 
        />
        <DatePicker 
          onChange={(d) => setFilters({...filters, created_at_to: d})} 
        />
        <StoreDropdown 
          onChange={(id) => setFilters({...filters, store_id: id})} 
        />
        <WarehouseDropdown 
          onChange={(id) => setFilters({...filters, warehouse_id: id})} 
        />
        <StatusDropdown 
          onChange={(val) => setFilters({...filters, workflow_state: val})} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <NewStockOrderButton onClick={() => navigate('/new-stock-order')} />

      {/* Stock Order Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => sort('ref_code')}>Stock Order</th>
            <th onClick={() => sort('supplier_ref_code')}>Reference No.</th> <!-- ORPHAN_FIELD: supplier_ref_code -->
            <th onClick={() => sort('created_at')}>Date</th>
            <th onClick={() => sort('due_at')}>Due At</th> <!-- ORPHAN_FIELD: due_at -->
            <th onClick={() => sort('received_at')}>Received At</th> <!-- ORPHAN_FIELD: received_at -->
            <th onClick={() => sort('store_name')}>Store</th> <!-- ORPHAN_FIELD: store_name -->
            <th onClick={() => sort('warehouse_name')}>Warehouse</th> <!-- ORPHAN_FIELD: warehouse_name -->
            <th onClick={() => sort('workflow_state')}>Status</th>
            <th onClick={() => sort('order_amount')}>Order Amount</th> <!-- ORPHAN_FIELD: order_amount -->
            <th onClick={() => sort('receive_amount')}>Receive Amount</th> <!-- ORPHAN_FIELD: receive_amount -->
            <th onClick={() => sort('created_by')}>User</th> <!-- ORPHAN_FIELD: created_by -->
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} onClick={() => navigate(`/details/${order.id}`)}>
              <td>{order.ref_code}</td>
              <td>{/* supplier_ref_code */}</td>
              <td>{order.created_at}</td>
              <td>{/* due_at */}</td>
              <td>{/* received_at */}</td>
              <td>{/* store_name */}</td>
              <td>{/* warehouse_name */}</td>
              <td><StatusBadge state={order.workflow_state} /></td>
              <td>{/* order_amount */}</td>
              <td>{/* receive_amount */}</td>
              <td>{/* created_by */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};