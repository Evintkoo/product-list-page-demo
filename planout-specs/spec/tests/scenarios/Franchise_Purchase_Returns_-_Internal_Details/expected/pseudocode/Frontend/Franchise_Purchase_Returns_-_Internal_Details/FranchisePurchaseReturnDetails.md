/**
 * Component: FranchisePurchaseReturnDetails
 * Displays the full internal details of a specific Franchise Purchase Return.
 * Asset: assets/4f0f936e-53cd-4bce-8345-c7be63a29188.svg
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FranchisePurchaseReturnDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState(null);

  // Fetching data on mount
  useEffect(() => {
    // API call to fetch internal details
    // GET /franchise-purchase-returns/{id}
    fetch(`/franchise-purchase-returns/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <MainMenuNavigation />
      <InventorySubMenu />
      
      <header>
        <BackButton label="Franchise Purchase Orders" />
        <h1>Franchise Purchase Return (Internal) <StarIcon /></h1>
      </header>

      <WorkflowStatusBar status={data.status} />

      <nav>
        <Tab active>Details</Tab>
      </nav>

      <section className="details-panel">
        {/* Metadata split into two columns */}
        <div className="grid-2-col">
          <Field label="Document Number" value={data.document_number} />
          <Field label="Franchise PO Number" value={data.franchise_po_number} />
          <Field label="Reference Number" value={data.reference_number} />
          <Field label="From Store" value={data.from_store} />
          <Field label="To Supplier" value={data.to_supplier} />
          <Field label="To Warehouse" value={data.to_warehouse} />
          <Field label="Created By" value={data.created_by} />
          <Field label="Updated By" value={data.updated_by} />
          <Field label="Created At" value={data.created_at} />
          <Field label="Updated At" value={data.updated_at} />
          <Field label="Sent Date" value={data.sent_date} />
          <Field label="Approved Date" value={data.approved_date} />
          <Field label="Journals" value={data.journals} />
        </div>
      </section>

      <table className="purchase-return-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Store Qty</th>
            <th>Order Qty</th>
            <th>Order Return Qty</th>
            <th>Return Qty</th>
            <th>Supply Price</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>{item.sku}</td>
              <td>{item.store_qty}</td>
              <td>{item.order_qty}</td>
              <td>{item.order_return_qty}</td>
              <td>{item.return_qty}</td>
              <td>{item.supply_price}</td>
              <td>{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ===== ORPHAN_FIELD LOG =====
// The following fields were referenced in the UI but are not explicitly defined in the provided DATA SCHEMAS:
// - status (WorkflowStatusBar)
// - items (Table rows)
// - document_number, franchise_po_number, reference_number, from_store, to_supplier, to_warehouse, created_by, updated_by, created_at, updated_at, sent_date, approved_date, journals (Details Panel)
// - product, sku, store_qty, order_qty, order_return_qty, return_qty, supply_price, reason (Table columns)