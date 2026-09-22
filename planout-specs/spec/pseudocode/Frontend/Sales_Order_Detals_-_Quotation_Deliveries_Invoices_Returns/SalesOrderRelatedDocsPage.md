/**
 * Page: Sales Order - Quotation/Deliveries/Invoices/Returns
 * Displays related documents for a specific Sales Order.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuthMe, getSalesOrder, getSalesQuotations, getSalesDeliveries, getSalesInvoices, getSalesReturns } from './api';

export const SalesOrderRelatedDocsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for data
  const [salesOrder, setSalesOrder] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Auth Check
      try {
        await getAuthMe();
      } catch {
        navigate('/login');
        return;
      }

      // 2. Load Data in parallel
      if (id) {
        const [orderRes, quotRes, delRes, invRes, retRes] = await Promise.all([
          getSalesOrder(id),
          getSalesQuotations({ sales_order_id: id }),
          getSalesDeliveries({ sales_order_id: id }),
          getSalesInvoices({ sales_order_id: id }),
          getSalesReturns({ sales_order_id: id })
        ]);

        setSalesOrder(orderRes);
        setQuotations(quotRes);
        setDeliveries(delRes);
        setInvoices(invRes);
        setReturns(retRes);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <MainMenu activeTab="Sales" />
      <SubMenu activeTab="Company" />
      
      <h1>Sales Order</h1>
      
      {/* Navigation Tabs */}
      <nav>
        <button onClick={() => navigate(`/sales-orders/${id}/details`)}>Details</button>
        <button disabled>Quotation/Deliveries/Invoices/Returns</button>
      </nav>

      {/* Sales Quotation Section */}
      <section>
        <h2>Sales Quotation</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Document Number</th>
              <th>Customer Ref Code</th>
              <th>Created Date</th>
              <th>Delivery Due Date</th>
              <th>To Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {quotations.map((q, index) => (
              <tr key={q.id}>
                <td>{index + 1}</td>
                <td>{q.ref_code}</td>
                <td>{q.customer_ref_code}</td>
                <td>{q.created_at}</td>
                <td>{q.due_at}</td>
                <td>{q.customer_id}</td> {/* Mapping: customer_id -> customer link */}
                <td>{q.workflow_state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sales Deliveries Section */}
      <section>
        <h2>Sales Deliveries</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Document Number</th>
              <th>Purchase Order No.</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Delivered At</th>
              <th>Updated By</th>
              <th>Journal</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((d, index) => (
              <tr key={d.id}>
                <td>{index + 1}</td>
                <td onClick={() => navigate(`/sales-deliveries/${d.id}`)}>{d.ref_code}</td>
                <td>{d.customer_ref_code}</td>
                <td>{d.status}</td>
                <td>{d.created_at}</td>
                <td>{d.delivered_at}</td>
                <td>{d.updated_by}</td>
                <td onClick={() => navigate(`/journals/${d.journal}`)}>{d.journal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sales Invoices Section */}
      <section>
        <h2>Sales Invoices</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Document Number</th>
              <th>Purchase Order No.</th>
              <th>Status</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Total (Rp)</th>
              <th>Due (Rp)</th>
              <th>Paid (Rp)</th>
              <th>Credited (Rp)</th>
              <th>Updated By</th>
              <th>Journal</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((i, index) => (
              <tr key={i.id}>
                <td>{index + 1}</td>
                <td onClick={() => navigate(`/sales-invoices/${i.id}`)}>{i.ref_code}</td>
                <td>{i.customer_po_number}</td>
                <td>{i.workflow_state}</td>
                <td>{i.invoice_date}</td>
                <td>{i.due_at}</td>
                <td>{i.total}</td>
                <td>{i.amount_due}</td>
                <td>{i.amount_paid}</td>
                <td>{i.credit_note_total}</td>
                <td>{i.updated_by}</td>
                <td onClick={() => navigate(`/journals/${i.journal}`)}>{i.journal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sales Order Returns Section */}
      <section>
        <h2>Sales Order Returns</h2>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Document Number</th>
              <th>Return From</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Received At</th>
              <th>Approved At</th>
              <th>Paid Return (Rp)</th>
              <th>Updated By</th>
              <th>Journal</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((r, index) => (
              <tr key={r.id}>
                <td>{index + 1}</td>
                <td onClick={() => navigate(`/sales-returns/${r.id}`)}>{r.ref_code}</td>
                <td>{r.return_from}</td>
                <td>{r.status}</td>
                <td>{r.created_at}</td>
                <td>{r.received_at}</td>
                <td>{r.approved_at}</td>
                <td>{r.paid_return ? 'Yes' : 'No'}</td>
                <td>{r.updated_by}</td>
                <td onClick={() => navigate(`/journals/${r.journal}`)}>{r.journal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};