import React, { useState, useEffect } from 'react';

/**
 * Component: PurchaseOrderList
 * Displays a searchable, filterable list of Standard Purchase Orders.
 * Asset: assets/be8cab3e-75b8-4dbe-bdc8-b3f97e3b0659.svg
 */
export const PurchaseOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    ref_code: '',           // <!-- ORPHAN_FIELD: ref_code (filter) -->
    supplier_ref_code: '',  // <!-- ORPHAN_FIELD: supplier_ref_code (filter) -->
    from_date: '',          // <!-- ORPHAN_FIELD: from_date -->
    to_date: '',            // <!-- ORPHAN_FIELD: to_date -->
    supplier_id: '',
    warehouse_id: '',
    workflow_state: ''      // <!-- ORPHAN_FIELD: workflow_state (filter) -->
  });

  // Fetch data on load and when search is triggered
  const fetchPurchaseOrders = async (params = {}) => {
    // API call using GET /purchase_orders
    const response = await fetch('/purchase_orders', {
      method: 'GET',
      body: JSON.stringify(params)
    });
    const data = await response.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const handleSearch = () => {
    fetchPurchaseOrders({
      supplier_id: filters.supplier_id,
      warehouse_id: filters.warehouse_id
    });
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="filter-bar">
        <input placeholder="Ref Code" onChange={(e) => setFilters({...filters, ref_code: e.target.value})} />
        <input placeholder="Reference No" onChange={(e) => setFilters({...filters, supplier_ref_code: e.target.value})} />
        <input type="date" onChange={(e) => setFilters({...filters, from_date: e.target.value})} />
        <input type="date" onChange={(e) => setFilters({...filters, to_date: e.target.value})} />
        
        <select onChange={(e) => setFilters({...filters, supplier_id: e.target.value})}>
          {/* Options populated via Supplier API */}
        </select>
        
        <select onChange={(e) => setFilters({...filters, warehouse_id: e.target.value})}>
          {/* Options populated via Warehouse API */}
        </select>

        <select onChange={(e) => setFilters({...filters, workflow_state: e.target.value})}>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Received">Received</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>Ref Code</th>
            <th>Reference No</th>
            <th>Date</th>
            <th>Due At</th>
            <th>Warehouse</th>
            <th>Supplier</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Closed</th>
            <th>Returns</th>
            <th>Invoices</th>
            <th>Deliveries</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ref_code}</td>
              <td>{order.supplier_ref_code}</td>
              <td>{order.created_at}</td>
              <td>{order.due_at}</td>
              <td>{order.warehouse_id}</td>
              <td>{order.supplier_id}</td>
              <td><span className={`badge-${order.workflow_state}`}>{order.workflow_state}</span></td>
              <td>{order.total}</td>
              <td>{order.is_closed ? '✅' : '❌'}</td>
              <td>{/* Derived count */}</td>
              <td>{/* Derived count */}</td>
              <td>{/* Derived count */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};