import React, { useEffect, useState } from 'react';
import { fetchPurchases } from './api/purchaseService';

/**
 * PurchaseHistoryPage
 * Displays a list of purchase records for a specific product.
 * Asset: assets/5f296374-83c4-4b33-804f-f15d049e3c4e.svg
 */
export const PurchaseHistoryPage = ({ productId }: { productId: string }) => {
  const [purchases, setPurchases] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);

  // On page load, fetch initial data
  useEffect(() => {
    loadPurchases();
  }, [productId]);

  const loadPurchases = async () => {
    try {
      const data = await fetchPurchases(productId);
      setPurchases(data);
    } catch (error) {
      console.error("Failed to fetch purchase history", error);
    }
  };

  return (
    <div className="purchase-history-container">
      {/* Header Actions */}
      <div className="actions">
        <button onClick={() => alert('Displaying QR Code')}>QR Codes</button>
        <button onClick={() => alert('Displaying Barcode')}>Barcode</button>
      </div>

      {/* Filter Section */}
      <div className="filters">
        <select 
          onChange={(e) => setSelectedSupplier(e.target.value)}
          aria-label="Supplier filter dropdown"
        >
          <option value="">All Suppliers</option>
          {/* Supplier options would be populated here */}
        </select>
        <button onClick={loadPurchases}>Search</button>
      </div>

      {/* Purchase Table */}
      <table>
        <thead>
          <tr>
            <th>Purchase Delivery</th>
            <th>Supplier column header ^</th>
            <th>Quantity</th>
            <th>Price</th>
            <th onClick={() => {/* Sort logic */}}>Date ^</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td><a href={`/documents/${purchase.id}`}>{purchase.id}</a></td> <!-- ORPHAN_FIELD: document_number_link -->
              <td>{purchase.supplier_name}</td>
              <td>{purchase.quantity}</td>
              <td>{purchase.unit_price}</td>
              <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};