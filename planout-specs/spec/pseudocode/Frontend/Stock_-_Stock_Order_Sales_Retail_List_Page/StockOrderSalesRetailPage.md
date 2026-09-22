import React, { useEffect, useState } from 'react';
import { fetchStockOrders } from './api/stockOrderService';

/**
 * Component: StockOrderSalesRetailPage
 * Displays the list of Sales Retail Stock Orders.
 * Asset: assets/a3c578ef-97e3-42fd-b7e2-dd7517346f47.svg
 */
export const StockOrderSalesRetailPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial Page Load: Fetch default list
    loadStockOrders();
  }, []);

  const loadStockOrders = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await fetchStockOrders({
        stock_type: 'sales_retail',
        limit: 20,
        offset: 0,
        ...filters
      });
      setOrders(response);
    } catch (error) {
      console.error("Failed to fetch stock orders", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-order-page">
      <header>
        <h1>Stock Orders</h1>
        {/* Icons: Box (left), Star (right) */}
      </header>

      <SearchToolbar onSearch={loadStockOrders} />

      <table className="stock-order-table">
        <thead>
          <tr>
            <th>Stock Order</th>
            <th>Sales E-Commerce</th>
            <th>Date</th>
            <th>Due At</th>
            <th>Received At</th>
            <th>Store</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>Order Amount</th>
            <th>Received Amount</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.ref_code}</td>
              <td>{order.source_ref_code}</td>
              <td>{order.created_at}</td>
              <td>{order.due_at}</td>
              <td>{order.received_at}</td>
              <td>{order.store_name}</td>
              <td>{order.warehouse_name}</td>
              <td>{order.workflow_state}</td>
              <td>{order.order_amount}</td>
              <td>{order.receive_amount}</td>
              <td>{order.updater_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};