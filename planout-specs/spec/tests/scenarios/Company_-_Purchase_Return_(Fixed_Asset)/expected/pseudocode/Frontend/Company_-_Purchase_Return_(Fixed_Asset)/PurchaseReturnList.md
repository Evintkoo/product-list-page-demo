import React, { useState, useEffect } from 'react';
import { fetchPurchaseReturns } from './api'; // Derived from GET /api/purchase-returns

/**
 * Asset: assets/260ee17f-7caa-43c7-9eec-0c9687e64c07.svg
 * Component: Purchase Return (Fixed Asset) List View
 */
export const PurchaseReturnList = () => {
  const [returns, setReturns] = useState([]);
  const [filters, setFilters] = useState({
    ref_code: '',
    from_date: '', // ORPHAN_FIELD: from_date
    to_date: '',   // ORPHAN_FIELD: to_date
    supplier_id: '',
    status: ''
  });

  const loadData = async () => {
    const data = await fetchPurchaseReturns(filters);
    setReturns(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Header />
      <NavigationTabs active="Fixed Asset" />
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={loadData} 
      />
      <NewPurchaseReturnButton />
      
      <table>
        <thead>
          <tr>
            <th>Document Number</th>
            <th>Created At</th>
            <th>Sent At</th>
            <th>Approved Date</th>
            <th>To Supplier</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((item) => (
            <tr key={item.id}>
              <td onClick={() => navigateToDetail(item.id)}>
                {item.ref_code}
              </td>
              <td>{item.created_at}</td>
              <td>{item.sent_at}</td>
              <td>{item.approved_at}</td>
              <td>{item.supplier_id}</td>
              <td><StatusBadge status={item.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <Pagination totalRows={returns.length} pageSize={20} />
    </div>
  );
};