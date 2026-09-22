import React from 'react';
import { format } from 'date-fns'; // Assuming date-fns for formatting

/**
 * Component: FixedAssetPurchaseOrderTable
 * Asset: assets/81a03b50-da85-4b35-8a75-891759928cc2.svg
 * 
 * Displays a list of Fixed Asset Purchase Orders.
 * All fields are read-only as per requirements.
 */

export const FixedAssetPurchaseOrderTable = ({ data }) => {
  
  // Helper to format dates: dd-mmm-yyyy hh:mm aa
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd-MMM-yyyy hh:mm a');
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Document Number</th>
          <th>Reference Number</th>
          <th>From Supplier</th>
          <th>Amount</th>
          <th>Created At</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Returns</th>
          <th>Invoices</th>
          <th>Deliveries</th>
          <th>Closed</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            {/* Document Number Field: Clickable redirect */}
            <td>
              <a href={`/fixed-asset-purchase-orders/${order.id}`}>
                {order.document_number}
              </a>
            </td>

            {/* Reference Number Field */}
            <td>{order.reference_number}</td>

            {/* From Supplier Field */}
            <td>{order.supplier_name}</td>

            {/* Amount Field (Rupiah) */}
            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(order.amount)}</td>

            {/* Created At Field */}
            <td>{formatDate(order.created_at)}</td>

            {/* Due Date Field */}
            <td>{formatDate(order.due_date)}</td>

            {/* Status Field: Badge display */}
            <td>
              <span className={`badge-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </td>

            {/* Returns Field */}
            <td>{order.returns_count}</td>

            {/* Invoices Field */}
            <td>{order.invoices_count}</td>

            {/* Deliveries Field */}
            <td>{order.deliveries_count}</td>

            {/* Closed Field: Icon logic */}
            <td>
              {order.is_closed ? (
                <Icon name="check-circle" color="green" />
              ) : (
                <Icon name="x-circle" color="red" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// ORPHAN_FIELD: id
// ORPHAN_FIELD: supplier_name
// ORPHAN_FIELD: returns_count
// ORPHAN_FIELD: invoices_count
// ORPHAN_FIELD: deliveries_count
// ORPHAN_FIELD: is_closed
// ORPHAN_FIELD: document_number
// ORPHAN_FIELD: reference_number
// ORPHAN_FIELD: amount
// ORPHAN_FIELD: created_at
// ORPHAN_FIELD: due_date
// ORPHAN_FIELD: status