import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductHistory } from './api/productService';

/**
 * Product History Page
 * Asset: assets/f34d4771-71ad-4daf-bb22-8bd2a90dbd87.svg
 */
export const ProductHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await fetchProductHistory(id);
        setHistory(data);
      }
    };
    loadData();
  }, [id]);

  return (
    <div className="product-history-container">
      <MainMenu activeTab="Products" />
      <SubMenu activeTab="Products" />
      <DetailHeader activeTab="Product History" />
      
      <table className="history-table">
        <thead>
          <tr>
            <th>Updated At</th>
            <th>Updated By</th>
            <th>Company Supply Price</th>
            <th>Wholesale Price</th>
            <th>Supply Price</th>
            <th>Retail Price</th>
            <th>Trade In</th>
            <th>Warranty</th>
            <th>Active</th>
            <th>Track</th>
            <th>Bundle</th>
          </tr>
        </thead>
        <tbody>
          {history.map((entry, index) => (
            <tr key={index}>
              <td>
                <div>{formatDate(entry.updated_at)}</div>
                <div>{formatTime(entry.updated_at)}</div>
              </td>
              <td>{entry.updated_by}</td>
              <td>{entry.company_supply_price} <Tooltip text="Company Purchase Price from Supplier (Includes Tax)" /></td>
              <td className="text-right">{entry.wholesale_price}</td>
              <td>{entry.supply_price} <Tooltip text="Store Purchase Price (Includes Tax)" /></td>
              <td>{entry.retail_price}</td>
              <td>{entry.trade_in ? 'Yes' : 'No'}</td>
              <td>{entry.warranty}</td>
              <td>{entry.is_active ? 'Active' : 'Inactive'}</td>
              <td>
                {entry.is_tracked ? 'Yes' : 'No'} 
                <Tooltip text="When enabled, the system will automatically reduce stock during sales. Disable for services." />
              </td>
              <td>{entry.is_bundle ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};