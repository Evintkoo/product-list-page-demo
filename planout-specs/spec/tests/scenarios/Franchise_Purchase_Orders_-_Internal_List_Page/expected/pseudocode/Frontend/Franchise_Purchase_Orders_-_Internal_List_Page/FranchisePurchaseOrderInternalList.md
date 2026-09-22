import React, { useState, useEffect, useCallback } from 'react';
import { fetchFranchisePurchaseOrders } from './api';

/**
 * Asset: assets/81ac4aa3-32cc-4f2e-aa4a-d3a68883b316.svg
 */
export const FranchisePurchaseOrderInternalList = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    ref_code: '',
    from_date: '', // ORPHAN_FIELD: from_date
    to_date: '',   // ORPHAN_FIELD: to_date
    store_name: '',
    warehouse_name: '',
    workflow_state: '',
    source: ''     // ORPHAN_FIELD: source
  });
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, currentPage: 1 });
  const [sorting, setSorting] = useState({ sort_by: 'created_at', sort_order: 'desc' });

  const loadData = useCallback(async (newFilters = filters, newPagination = pagination, newSorting = sorting) => {
    const params = {
      ...newFilters,
      ...newPagination,
      ...newSorting,
      order_type: 'internal'
    };
    
    // Remove empty filter values
    Object.keys(params).forEach(key => !params[key] && delete params[key]);

    const response = await fetchFranchisePurchaseOrders(params);
    setOrders(response.data);
  }, [filters, pagination, sorting]);

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, offset: 0, currentPage: 1 }));
    loadData(filters, { limit: 20, offset: 0, currentPage: 1 }, sorting);
  };

  const handleSort = (field) => {
    const newOrder = (sorting.sort_by === field && sorting.sort_order === 'asc') ? 'desc' : 'asc';
    setSorting({ sort_by: field, sort_order: newOrder });
    loadData(filters, { ...pagination, offset: 0 }, { sort_by: field, sort_order: newOrder });
  };

  return (
    <div>
      {/* Filter Bar Implementation */}
      <div className="filter-bar">
        <input placeholder="Document Number" onChange={(e) => setFilters({...filters, ref_code: e.target.value})} />
        {/* Additional inputs for From Date, To Date, Store, Warehouse, Status, Source */}
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Table Implementation */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('ref_code')}>Document Number</th>
            <th onClick={() => handleSort('supplier_ref_code')}>Reference No</th>
            <th onClick={() => handleSort('created_at')}>Created At</th>
            <th onClick={() => handleSort('due_at')}>Due At</th>
            <th onClick={() => handleSort('received_at')}>Received At</th>
            <th onClick={() => handleSort('store_name')}>Store</th>
            <th onClick={() => handleSort('supplier_name')}>Supplier</th>
            <th onClick={() => handleSort('warehouse_name')}>Warehouse</th>
            <th onClick={() => handleSort('workflow_state')}>Status</th>
            <th>Order Amount</th>
            <th>Receive Amount</th>
            <th onClick={() => handleSort('updater_name')}>User</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} onClick={() => window.location.href = `/orders/${order.id}`}>
              <td>{order.ref_code}</td>
              <td>{order.supplier_ref_code}</td>
              <td>{order.created_at}</td>
              <td>{order.due_at}</td>
              <td>{order.received_at}</td>
              <td>{order.store_name}</td>
              <td>{order.supplier_name}</td>
              <td>{order.warehouse_name}</td>
              <td>
                <span className={`badge-${order.workflow_state}`}>
                  {order.workflow_state === 'placed' ? 'Ordered' : order.workflow_state}
                </span>
              </td>
              <td>{order.order_amount.toFixed(2)}</td>
              <td>{order.receive_amount.toFixed(2)}</td>
              <td>{order.updater_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};