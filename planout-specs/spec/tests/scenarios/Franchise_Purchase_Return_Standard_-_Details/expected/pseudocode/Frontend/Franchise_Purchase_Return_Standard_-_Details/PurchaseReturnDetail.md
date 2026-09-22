/**
 * Component: PurchaseReturnDetail
 * Displays the detailed information for a specific Franchise Purchase Return.
 * Asset: assets/650b2beb-ef07-43e0-a9ad-da052c9338ad.svg (Draft state)
 * Asset: assets/ab7a0a5d-8cae-4fd0-aecf-764011a8afc1.svg (Confirmed state)
 * Asset: assets/84ab5efc-1d68-4c8d-9605-fb7da7a5447c.svg (Sent state)
 * Asset: assets/62fb0340-01e6-418f-a9c0-9a58278ddb1d.svg (Approved state)
 */

import { useEffect, useState } from 'react';

export const PurchaseReturnDetail = ({ returnId }) => {
  const [purchaseReturn, setPurchaseReturn] = useState(null);
  const [items, setItems] = useState([]);

  // On Page Load: Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      // Fetch PurchaseReturn header
      const returnResponse = await fetch(`/purchase-returns/${returnId}`);
      const returnData = await returnResponse.json();
      setPurchaseReturn(returnData);

      // Fetch PurchaseReturnItem list
      const itemsResponse = await fetch(`/purchase-returns/${returnId}/items`);
      const itemsData = await itemsResponse.json();
      setItems(itemsData);
    };
    fetchData();
  }, [returnId]);

  if (!purchaseReturn) return <div>Loading...</div>;

  return (
    <div className="purchase-return-detail-page">
      <TopNavigationBar />
      <InventorySubMenu activeTab="Store" />
      
      <button onClick={() => navigate('/purchase-returns')}>Back to Purchase Returns</button>
      
      <WorkflowStatusTracker status={purchaseReturn.status} />

      <section className="header-info">
        <h1>Return: {purchaseReturn.return_number}</h1>
        <p>Return Date: {purchaseReturn.return_date}</p>
        <p>Total Amount: {purchaseReturn.total_amount}</p>
        
        {/* Reference Links */}
        <a href={`/purchase-orders/${purchaseReturn.purchase_order_id}`}>Purchase Order</a>
        <a href={`/invoices/${purchaseReturn.invoice_id}`}>Invoice</a> <!-- ORPHAN_FIELD: invoice_id -->
        <a href={`/warehouses/${purchaseReturn.warehouse_id}`}>Warehouse</a> <!-- ORPHAN_FIELD: warehouse_id -->
        <a href={`/suppliers/${purchaseReturn.supplier_id}`}>Supplier</a> <!-- ORPHAN_FIELD: supplier_id -->
        
        <div className="metadata">
          <span>Created At: {purchaseReturn.created_at}</span>
          <span>Updated At: {purchaseReturn.updated_at}</span> <!-- ORPHAN_FIELD: updated_at -->
          <span>Sent At: {purchaseReturn.sent_at}</span> <!-- ORPHAN_FIELD: sent_at -->
          <span>Created By: {purchaseReturn.created_by}</span> <!-- ORPHAN_FIELD: created_by -->
          <span>Updated By: {purchaseReturn.updated_by}</span> <!-- ORPHAN_FIELD: updated_by -->
        </div>
      </section>

      <ReturnItemsTable items={items} />
      
      <JournalsList journalEntryId={purchaseReturn.journal_entry_id} /> <!-- ORPHAN_FIELD: journal_entry_id -->
      
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};