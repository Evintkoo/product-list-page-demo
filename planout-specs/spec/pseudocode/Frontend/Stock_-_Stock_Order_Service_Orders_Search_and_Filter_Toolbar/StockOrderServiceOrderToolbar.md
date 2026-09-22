/**
 * Component: StockOrderServiceOrderToolbar
 * Description: A toolbar containing filters for Warehouse, Store, Date Range, 
 * Service Order ID, Stock Order ID, and Status to query inventory records.
 * Asset: assets/9bab7b2a-f681-40e8-a565-0dcd280b9056.svg
 */

import React, { useState } from 'react';

export const StockOrderServiceOrderToolbar = () => {
  // State management for filter criteria
  // Note: Field names are derived from expected API request parameters
  const [filters, setFilters] = useState({
    warehouse_id: '',      // ORPHAN_FIELD: warehouse_id
    store_id: '',          // ORPHAN_FIELD: store_id
    from_date: '',         // ORPHAN_FIELD: from_date
    to_date: '',           // ORPHAN_FIELD: to_date
    service_order_id: '',  // ORPHAN_FIELD: service_order_id
    stock_order_id: '',    // ORPHAN_FIELD: stock_order_id
    status: ''             // ORPHAN_FIELD: status
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
    
    // Immediate validation for date range
    if (field === 'from_date' || field === 'to_date') {
      const error = validateDateRange(
        field === 'from_date' ? value : filters.from_date,
        field === 'to_date' ? value : filters.to_date
      );
      if (error) {
        // Trigger UI error state for date inputs
        console.error(error);
      }
    }
  };

  const handleSearch = () => {
    // Execute search logic
    // API call would be triggered here using the current 'filters' state
    console.log("Applying filters:", filters);
  };

  return (
    <div className="toolbar-container">
      {/* Warehouse Dropdown */}
      <select onChange={(e) => handleFilterChange('warehouse_id', e.target.value)}>
        <option value="">Select Warehouse</option>
      </select>

      {/* Store Dropdown */}
      <select onChange={(e) => handleFilterChange('store_id', e.target.value)}>
        <option value="">Select Store</option>
      </select>

      {/* Date Range Filter */}
      <input type="date" onChange={(e) => handleFilterChange('from_date', e.target.value)} />
      <input type="date" onChange={(e) => handleFilterChange('to_date', e.target.value)} />

      {/* Service Order Input */}
      <input 
        type="text" 
        placeholder="Service Order ID" 
        onChange={(e) => handleFilterChange('service_order_id', e.target.value)} 
      />

      {/* Stock Order Input */}
      <input 
        type="text" 
        placeholder="Stock Order ID" 
        onChange={(e) => handleFilterChange('stock_order_id', e.target.value)} 
      />

      {/* Status Dropdown */}
      <select onChange={(e) => handleFilterChange('status', e.target.value)}>
        <option value="">Select Status</option>
      </select>

      {/* Search Button */}
      <button onClick={handleSearch}>
        <span className="magnifying-glass-icon" />
        Search
      </button>
    </div>
  );
};