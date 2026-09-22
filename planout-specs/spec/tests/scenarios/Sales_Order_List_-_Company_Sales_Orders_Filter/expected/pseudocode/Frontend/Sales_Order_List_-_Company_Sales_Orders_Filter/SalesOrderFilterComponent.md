/**
 * Component: SalesOrderFilterComponent
 * Asset: assets/525c45a7-3bd2-4e8d-a1f8-461d94858d69.svg
 * 
 * Manages the filter state for the Sales Order list.
 */

import { useState } from 'react';

export const SalesOrderFilterComponent = ({ onSearch }) => {
  // State management for filter fields
  const [filters, setFilters] = useState({
    document_number: '',
    purchase_order_number: '',
    from_date: null,
    to_date: null,
    warehouse_id: '',
    customer: '',
    salesperson: '',
    status: ''
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    // Construct query parameters, excluding empty/null values
    const queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '' && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Add pagination defaults for new search
    queryParams.limit = 20;
    queryParams.offset = 0;

    // Execute API call
    // GET /sales-orders
    const response = await fetchSalesOrders(queryParams);
    onSearch(response);
  };

  return (
    <div className="filter-container">
      {/* Document Number Filter */}
      <input 
        type="text" 
        placeholder="Document Number"
        value={filters.document_number}
        onChange={(e) => handleInputChange('document_number', e.target.value)}
      />

      {/* Purchase Order No. Filter */}
      <input 
        type="text" 
        placeholder="PO Number"
        value={filters.purchase_order_number}
        onChange={(e) => handleInputChange('purchase_order_number', e.target.value)}
      />

      {/* From Date Picker */}
      <input 
        type="date" 
        value={filters.from_date || ''}
        onChange={(e) => handleInputChange('from_date', e.target.value)}
      />

      {/* To Date Picker */}
      <input 
        type="date" 
        value={filters.to_date || ''}
        onChange={(e) => handleInputChange('to_date', e.target.value)}
      />

      {/* From Warehouse Dropdown */}
      <select 
        value={filters.warehouse_id}
        onChange={(e) => handleInputChange('warehouse_id', e.target.value)}
      >
        <option value="">Select Warehouse</option>
        {/* Options populated from warehouse service */}
      </select>

      {/* To Customer Filter */}
      <input 
        type="text" 
        placeholder="Customer"
        value={filters.customer}
        onChange={(e) => handleInputChange('customer', e.target.value)}
      />

      {/* Salesperson Filter */}
      <input 
        type="text" 
        placeholder="Salesperson"
        value={filters.salesperson}
        onChange={(e) => handleInputChange('salesperson', e.target.value)}
      />

      {/* Status Filter */}
      <select 
        value={filters.status}
        onChange={(e) => handleInputChange('status', e.target.value)}
      >
        <option value="">Select Status</option>
        {/* Options: Draft, Confirmed, Shipped, etc. */}
      </select>

      {/* Search Action Button */}
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};