/**
 * Payment Types List Page
 * Displays a paginated table of payment types with filtering capabilities.
 */

import { useState, useEffect, useCallback } from 'react';
import { fetchPaymentTypes } from './api'; // Logic layer

export const PaymentTypesList = () => {
  // State for filters and pagination
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    enable_refund: null, // boolean | null
    skip_invoice_receivables: null, // boolean | null
    is_active: true,
  });
  
  const [pagination, setPagination] = useState({ page: 1, page_size: 20 });
  const [data, setData] = useState([]);

  // Fetch data from API
  const loadData = useCallback(async (params) => {
    const response = await fetchPaymentTypes({
      ...params,
      ...pagination
    });
    setData(response.data);
  }, [pagination]);

  // Initial Load
  useEffect(() => {
    loadData({ is_active: true });
  }, [loadData]);

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    loadData(filters);
  };

  return (
    <div>
      <MainMenu activeTab="Setup" />
      <SubMenu activeTab="Finances" />
      
      {/* Navigation Tabs */}
      <div className="tabs">
        <button 
          className={filters.is_active ? 'active' : ''} 
          onClick={() => setFilters(f => ({...f, is_active: true}))}
        >
          Active
        </button>
        <button 
          className={!filters.is_active ? 'active' : ''} 
          onClick={() => setFilters(f => ({...f, is_active: false}))}
        >
          Inactive
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input 
          type="text" 
          placeholder="Name" 
          value={filters.name}
          onChange={(e) => setFilters(f => ({...f, name: e.target.value}))}
        />
        <select onChange={(e) => setFilters(f => ({...f, type: e.target.value}))}>
          <option value="">Type</option>
          <option value="Cash">Cash</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
        </select>
        {/* ... other dropdowns for enable_refund and skip_invoice_receivables ... */}
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Type</th>
            <th>Card Provider / Payment Gateway</th>
            <th>Payment Provider (Receivable From)</th>
            <th>Provider Fee Rate</th>
            <th>Enabled Refund</th>
            <th>Skip Create Invoice Receivables</th>
            <th>Stores</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{(pagination.page - 1) * pagination.page_size + index + 1}</td>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.card_provider}</td>
              <td className="clickable" onClick={() => navigateToCustomer(item.payment_provider)}>
                {item.payment_provider}
              </td>
              <td>{item.provider_fee_rate}%</td>
              <td>{item.enable_refund ? 'Yes' : 'No'}</td>
              <td>{item.skip_invoice_receivables ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => navigateToMapping(item.id)}>Show</button>
                <button onClick={() => navigateToEdit(item.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};