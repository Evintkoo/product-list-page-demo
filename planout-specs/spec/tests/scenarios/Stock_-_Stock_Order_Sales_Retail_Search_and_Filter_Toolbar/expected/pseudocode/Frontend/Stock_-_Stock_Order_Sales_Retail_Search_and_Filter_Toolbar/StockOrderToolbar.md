/**
 * Component: StockOrderToolbar
 * Description: A search and filter toolbar for Stock Order Sales Retail records.
 * Asset: assets/3648cbe8-5194-41f3-b0ea-af645a5c2f35.svg
 */

import React, { useState } from 'react';

export const StockOrderToolbar = ({ onSearch }) => {
  // State management for filter criteria
  const [filters, setFilters] = useState({
    warehouse_id: '',      // ORPHAN_FIELD: warehouse_id
    stock_order_number: '', // ORPHAN_FIELD: stock_order_number
    from_date: '',         // ORPHAN_FIELD: from_date
    to_date: '',           // ORPHAN_FIELD: to_date
    store_id: '',          // ORPHAN_FIELD: store_id
    status: '',            // ORPHAN_FIELD: status
    sales_type: ''         // ORPHAN_FIELD: sales_type
  });

  // Validation Logic
  const validateDateRange = (from, to) => {
    if (from && to && new Date(from) > new Date(to)) {
      return "From Date cannot be later than To Date.";
    }
    return null;
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    const dateError = validateDateRange(filters.from_date, filters.to_date);
    if (dateError) {
      alert(dateError); // Replace with UI toast/error notification
      return;
    }
    onSearch(filters);
  };

  return (
    <div className="toolbar-container">
      {/* Warehouse Dropdown */}
      <select onChange={(e) => handleFilterChange('warehouse_id', e.target.value)}>
        <option value="">Select Warehouse</option>
        {/* Options populated via data fetch */}
      </select>

      {/* Stock Order Input */}
      <input 
        type="text" 
        placeholder="Stock Order #" 
        onChange={(e) => handleFilterChange('stock_order_number', e.target.value)} 
      />

      {/* Date Range Filter */}
      <input 
        type="date" 
        placeholder="From Date" 
        onChange={(e) => handleFilterChange('from_date', e.target.value)} 
      />
      <input 
        type="date" 
        placeholder="To Date" 
        onChange={(e) => handleFilterChange('to_date', e.target.value)} 
      />

      {/* Store Dropdown */}
      <select onChange={(e) => handleFilterChange('store_id', e.target.value)}>
        <option value="">Select Store</option>
      </select>

      {/* Status Dropdown */}
      <select onChange={(e) => handleFilterChange('status', e.target.value)}>
        <option value="">Select Status</option>
      </select>

      {/* Sales Type Dropdown */}
      <select onChange={(e) => handleFilterChange('sales_type', e.target.value)}>
        <option value="">Select Sales Type</option>
      </select>

      {/* Search Button */}
      <button onClick={handleSearch}>
        <span className="magnifying-glass-icon" />
        Search
      </button>
    </div>
  );
};