import React, { useState, useEffect, useCallback } from 'react';
import { fetchSalesInvoices } from './api'; // Logic layer implementation

/**
 * Asset: assets/5244c798-afab-4569-b404-696f255b0a9e.svg
 * Sales Invoice List Component
 */
export const SalesInvoiceList = () => {
  // State for filters and pagination
  const [filters, setFilters] = useState({
    search_term: '',
    // ORPHAN_FIELD: purchase_order
    // ORPHAN_FIELD: sales_order
    // ORPHAN_FIELD: customer_name
    // ORPHAN_FIELD: from_date
    // ORPHAN_FIELD: to_date
    // ORPHAN_FIELD: status
  });
  
  const [pagination, setPagination] = useState({ page: 1, page_size: 20 });
  const [sorting, setSorting] = useState({ sort_by: 'issue_date', sort_order: 'desc' });
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const loadData = useCallback(async (params) => {
    const response = await fetchSalesInvoices({
      ...params,
      ...pagination,
      ...sorting
    });
    setData(response.data);
    setTotalCount(response.total_count);
  }, [pagination, sorting]);

  // Initial Load
  useEffect(() => {
    loadData({ search_term: filters.search_term });
  }, []);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    loadData({ search_term: filters.search_term });
  };

  const handleSort = (column) => {
    const newOrder = (sorting.sort_by === column && sorting.sort_order === 'asc') ? 'desc' : 'asc';
    setSorting({ sort_by: column, sort_order: newOrder });
  };

  return (
    <div>
      {/* Filter Bar */}
      <input 
        value={filters.search_term} 
        onChange={(e) => setFilters({...filters, search_term: e.target.value})}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('invoice_number')}>Sales Invoice Number</th>
            <th onClick={() => handleSort('customer_po_number')}>Purchase Order</th> <!-- ORPHAN_FIELD: customer_po_number -->
            <th onClick={() => handleSort('sales_order_ref_code')}>Sales Order</th> <!-- ORPHAN_FIELD: sales_order_ref_code -->
            <th onClick={() => handleSort('created_at')}>Created At</th> <!-- ORPHAN_FIELD: created_at -->
            <th onClick={() => handleSort('issue_date')}>Invoice Date</th>
            <th onClick={() => handleSort('due_date')}>Due Date</th>
            <th onClick={() => handleSort('customer_name')}>For Customer</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('total_amount')}>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoice_number}</td>
              <td>{/* Display mapped Purchase Order */}</td>
              <td>{/* Display mapped Sales Order */}</td>
              <td>{/* Display mapped Created At */}</td>
              <td>{invoice.issue_date}</td>
              <td>{invoice.due_date}</td>
              <td>{invoice.customer_name}</td>
              <td>{invoice.status}</td>
              <td>{invoice.total_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination 
        currentPage={pagination.page} 
        totalCount={totalCount} 
        onPageChange={(p) => setPagination({...pagination, page: p})} 
      />
    </div>
  );
};