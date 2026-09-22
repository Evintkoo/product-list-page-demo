/**
 * Component: FranchisePurchaseOrderTable
 * Renders the internal details table for Franchise Purchase Orders.
 * Asset: assets/d1c3f421-2c12-4b31-848a-cfbed552b396.svg
 */

import React, { useMemo } from 'react';

export const FranchisePurchaseOrderTable = ({ purchaseOrderItems }) => {
  
  // Calculate summary totals across all rows
  const totals = useMemo(() => {
    return purchaseOrderItems.reduce((acc, item) => ({
      totalOrder: acc.totalOrder + (item.order || 0),
      totalSent: acc.totalSent + (item.sent || 0),
      totalReceive: acc.totalReceive + (item.receive || 0),
      totalOrderAmount: acc.totalOrderAmount + (item.order_amount || 0),
      totalSentAmount: acc.totalSentAmount + (item.sent_amount || 0),
      totalReceiveAmount: acc.totalReceiveAmount + (item.receive_amount || 0),
    }), { 
      totalOrder: 0, totalSent: 0, totalReceive: 0, 
      totalOrderAmount: 0, totalSentAmount: 0, totalReceiveAmount: 0 
    });
  }, [purchaseOrderItems]);

  return (
    <table className="franchise-purchase-details-table">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product</th>
          <th>Product Code</th>
          <th>Order</th>
          <th>Sent</th>
          <th>Receive</th>
          <th>Supply Price Inc. Tax (Rp)</th>
          <th>Order Amount</th>
          <th>Sent Amount</th>
          <th>Receive Amount (Rp)</th>
          <th>Store Remark</th>
          <th>Warehouse Remark</th>
        </tr>
      </thead>
      <tbody>
        {purchaseOrderItems.map((item, index) => (
          <tr key={index}>
            <td>{item.sku}</td> <!-- ORPHAN_FIELD: sku -->
            <td>{item.product_name}</td> <!-- ORPHAN_FIELD: product_name -->
            <td>{item.product_code}</td> <!-- ORPHAN_FIELD: product_code -->
            <td>{item.order}</td> <!-- ORPHAN_FIELD: order -->
            <td>{item.sent}</td> <!-- ORPHAN_FIELD: sent -->
            <td>{item.receive}</td> <!-- ORPHAN_FIELD: receive -->
            <td>{item.supply_price_inc_tax}</td> <!-- ORPHAN_FIELD: supply_price_inc_tax -->
            <td>{item.order_amount}</td> <!-- ORPHAN_FIELD: order_amount -->
            <td>{item.sent_amount}</td> <!-- ORPHAN_FIELD: sent_amount -->
            <td>{item.receive_amount}</td> <!-- ORPHAN_FIELD: receive_amount -->
            <td>{item.store_remark}</td> <!-- ORPHAN_FIELD: store_remark -->
            <td>{item.warehouse_remark}</td> <!-- ORPHAN_FIELD: warehouse_remark -->
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="summary-row">
          <td colSpan={3}>Total</td>
          <td>{totals.totalOrder}</td>
          <td>{totals.totalSent}</td>
          <td>{totals.totalReceive}</td>
          <td>-</td>
          <td>{totals.totalOrderAmount}</td>
          <td>{totals.totalSentAmount}</td>
          <td>{totals.totalReceiveAmount}</td>
          <td colSpan={2}></td>
        </tr>
      </tfoot>
    </table>
  );
};

// Note: The fields above are marked as ORPHAN_FIELD because the provided 
// DATA SCHEMAS block was empty. These fields represent the logical 
// requirements defined in the node descriptions.