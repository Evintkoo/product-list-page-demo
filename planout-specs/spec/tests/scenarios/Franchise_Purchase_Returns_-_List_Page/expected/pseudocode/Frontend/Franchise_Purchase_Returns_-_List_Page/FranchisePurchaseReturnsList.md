import React, { useState, useEffect } from 'react';
import { useApi } from './hooks/useApi';

/**
 * Asset: assets/9c86b8f8-daec-46c2-af65-4268cf2a2ddb.svg
 * Feature: Franchise Purchase Returns - List Page
 */
export const FranchisePurchaseReturnsList = () => {
  // State for filters
  const [filters, setFilters] = useState({
    ref_code: '',
    workflow_state: '',
    // ORPHAN_FIELD: source_order_ref_code
    // ORPHAN_FIELD: from_store_name
    // ORPHAN_FIELD: supplier_name
    // ORPHAN_FIELD: warehouse_name
    // ORPHAN_FIELD: from_date
    // ORPHAN_FIELD: to_date
    // ORPHAN_FIELD: order_type
  });

  const [pagination, setPagination] = useState({ page: 1, limit: 20 });
  const [returns, setReturns] = useState([]);
  
  const { get } = useApi();

  const fetchReturns = async () => {
    const params = {
      ...pagination,
      ref_code: filters.ref_code,
      workflow_state: filters.workflow_state,
    };
    
    const response = await get('/api/franchise-purchase-returns', { params });
    setReturns(response.data);
  };

  useEffect(() => {
    fetchReturns();
  }, [pagination.page]);

  return (
    <div className="page-container">
      <header>
        <h1>Franchise Purchase Returns</h1>
        <button aria-label="Add to favorites">★</button>
        <button onClick={() => {/* Trigger Add Return Options Dropdown */}}>
          New Franchise Purchase Return
        </button>
      </header>

      <section className="filters">
        <input 
          placeholder="Search by Return No" 
          value={filters.ref_code}
          onChange={(e) => setFilters({...filters, ref_code: e.target.value})}
        />
        {/* Additional filters for Order No, Store, Supplier, Warehouse, Status, Order Type, Dates */}
        <button onClick={fetchReturns}>Search</button>
      </section>

      <table>
        <thead>
          <tr>
            <th>Return No</th>
            <th>Order No</th>
            <th>Date</th>
            <th>Sent At</th>
            <th>Approved Date</th>
            <th>From Store</th>
            <th>Supplier</th>
            <th>Warehouse</th>
            <th>Status</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {returns.map((item) => (
            <tr key={item.id}>
              <td><a href={`/returns/${item.id}`}>{item.ref_code}</a></td>
              <td><a href={`/orders/${item.source_order_ref_code}`}>{item.source_order_ref_code}</a></td>
              <td>{item.created_at}</td>
              <td>{item.sent_at}</td>
              <td>{item.approved_at}</td>
              <td>{item.from_store_name}</td>
              <td>{item.supplier_name}</td>
              <td>{item.warehouse_name}</td>
              <td><span className={`badge-${item.workflow_state}`}>{item.workflow_state}</span></td>
              <td>{item.user_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination 
        currentPage={pagination.page} 
        onPageChange={(page) => setPagination({...pagination, page})} 
      />
    </div>
  );
};