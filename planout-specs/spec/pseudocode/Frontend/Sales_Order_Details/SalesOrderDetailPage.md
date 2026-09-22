import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './api'; // Assuming standard axios/fetch wrapper

export const SalesOrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        // 1. Auth Check
        await api.get('/api/auth/me');
        
        // 2. Fetch Data
        const response = await api.get(`/api/sales-orders/${id}`);
        setOrder(response.data);
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="sales-order-detail">
      <MainMenu />
      <SubMenu activeTab="Company" />
      
      <h1>Sales Order</h1>
      
      {/* Workflow Status Bar */}
      <WorkflowStatusBar status={order.status} />

      {/* Header Information */}
      <div className="header-grid">
        <Field label="Document Number" value={order.ref_code} />
        <Field label="Purchase Order No." value={order.external_ref_code} />
        <Field label="From Warehouse" value={order.warehouse_id} /> <!-- Link to Warehouse -->
        <Field label="To Customer" value={order.customer_id} /> <!-- Link to Customer -->
        <Field label="Notes" value={order.notes} />
        <Field label="Salesperson" value={order.salesperson_name} />
        <Field label="Source" value={order.source} />
        <Field label="Due Date" value={order.due_at} />
        <Field label="Approved Date" value={order.approved_at} />
        <Field label="Created By" value={order.created_by} />
        <Field label="Updated By" value={order.updated_by} />
        <Field label="Created At" value={order.created_at} />
        <Field label="Updated At" value={order.updated_at} />
        <Field label="Closed" value={order.closed ? "Yes" : "No"} />
      </div>

      {/* Tabs */}
      <TabComponent active="Details" />

      {/* Items Table */}
      <table className="order-items-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>SKU</th>
            <th>Product</th>
            <th>Product Code</th>
            <th>Order Qty</th>
            <th>Delivered Qty</th>
            <th>Price (Rp)</th>
            <th>Discount</th>
            <th>Amount (Rp)</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={item.sku}>
              <td>{index + 1}</td>
              <td>{item.sku}</td>
              <td>{item.product_name}</td>
              <td>{item.product_code}</td>
              <td>{item.order_qty}</td>
              <td>{item.delivered_qty}</td>
              <td>{item.price}</td>
              <td>{item.discount_rate}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="totals-section">
        <p>Subtotal: {order.subtotal}</p>
        <p>Tax: {order.tax}</p>
        <p>Total: {order.total}</p>
      </div>

      {/* Actions */}
      <div className="actions">
        <button onClick={() => window.print()}>Print</button>
        {(order.status === 'DRAFT' || order.status === 'APPROVED') && (
          <button onClick={handleCancel}>Cancel</button>
        )}
        {order.status === 'DRAFT' && (
          <button onClick={handleApprove}>Approve</button>
        )}
        {order.status === 'APPROVED' && (
          <button onClick={handleDeliver}>Deliver</button>
        )}
      </div>
    </div>
  );
};