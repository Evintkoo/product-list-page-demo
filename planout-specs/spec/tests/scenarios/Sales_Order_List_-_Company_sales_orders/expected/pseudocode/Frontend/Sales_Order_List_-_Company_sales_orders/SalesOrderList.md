import React, { useState, useEffect } from 'react';
import { fetchSalesOrders } from './api';

/**
 * Asset: assets/2cbba5f3-4904-48ab-8953-4e79060375ce.svg
 */
export const SalesOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 });
  const [filters, setFilters] = useState({
    document_number: '',
    purchase_order_number: '',
    date_from: null,
    date_to: null,
    warehouse_id: null,
    customer_id: null,
    salesperson_id: null,
    status: ''
  });

  const loadOrders = async (params = {}) => {
    const query = {
      limit: 20,
      offset: 0,
      sort: 'created_at',
      direction: 'desc',
      ...params
    };
    
    const response = await fetchSalesOrders(query);
    setOrders(response.data);
    setPagination(response.pagination);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <SalesOrderFilter onSearch={(f) => loadOrders(f)} />
      <table>
        <thead>
          <tr>
            <th>Document Number</th>
            <th>Purchase Order No.</th>
            <th>Created At</th>
            <th>Delivery Due Date</th>
            <th>From Warehouse</th>
            <th>Customer</th>
            <th>Salesperson</th>
            <th>Status</th>
            <th>Closed</th>
            <th>Deliveries</th>
            <th>Invoices</th>
            <th>Returns</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} onClick={() => window.location.href = `/sales_orders/${order.id}`}>
              <td>{order.document_number}</td>
              <td>{order.purchase_order_number}</td>
              <td>{order.created_at}</td>
              <td>{order.due_at}</td> <!-- ORPHAN_FIELD: due_at -->
              <td>{order.warehouse_name}</td> <!-- ORPHAN_FIELD: warehouse_name -->
              <td>{order.customer_name}</td> <!-- ORPHAN_FIELD: customer_name -->
              <td>{order.salesperson_name}</td> <!-- ORPHAN_FIELD: salesperson_name -->
              <td>{order.status}</td>
              <td>{order.closed ? '✓' : ''}</td> <!-- ORPHAN_FIELD: closed -->
              <td>{order.delivery_count}</td> <!-- ORPHAN_FIELD: delivery_count -->
              <td>{order.invoice_count}</td> <!-- ORPHAN_FIELD: invoice_count -->
              <td>{order.return_count}</td> <!-- ORPHAN_FIELD: return_count -->
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};