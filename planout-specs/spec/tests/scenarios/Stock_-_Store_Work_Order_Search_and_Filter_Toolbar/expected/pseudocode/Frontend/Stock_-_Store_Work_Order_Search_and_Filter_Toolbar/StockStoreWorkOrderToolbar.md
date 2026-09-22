/**
 * Component: StockStoreWorkOrderToolbar
 * Asset: assets/b68623e5-c9e5-4b92-b1d2-e1bdf8cf29c9.svg
 * 
 * This component provides a filtering interface for Stock Store Work Orders.
 * It manages local state for search criteria and triggers a search action.
 */

import React, { useState } from 'react';

export const StockStoreWorkOrderToolbar = () => {
  // State management for filter fields
  // Note: Fields are derived from expected API request parameters
  const [filters, setFilters] = useState({
    stock_order_id: '',           // ORPHAN_FIELD: stock_order_id
    service_work_order_id: '',    // ORPHAN_FIELD: service_work_order_id
    status: '',                   // ORPHAN_FIELD: status
    store_id: '',                 // ORPHAN_FIELD: store_id
    warehouse_id: '',             // ORPHAN_FIELD: warehouse_id
    from_date: '',                // ORPHAN_FIELD: from_date
    to_date: ''                   // ORPHAN_FIELD: to_date
  });

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    // Validation: Ensure Date Range logic (From Date <= To Date)
    if (filters.from_date && filters.to_date) {
      if (new Date(filters.from_date) > new Date(filters.to_date)) {
        alert("From Date cannot be later than To Date.");
        return;
      }
    }
    
    // Trigger search logic (API call to be handled by parent/context)
    console.log("Executing search with filters:", filters);
  };

  return (
    <div className="toolbar-container">
      {/* Stock Order Input */}
      <input 
        placeholder="Search Stock Order"
        onChange={(e) => handleInputChange('stock_order_id', e.target.value)}
      />

      {/* Service Work Order Input */}
      <input 
        placeholder="Search Service Work Order"
        onChange={(e) => handleInputChange('service_work_order_id', e.target.value)}
      />

      {/* Status Dropdown */}
      <select onChange={(e) => handleInputChange('status', e.target.value)}>
        <option value="">Select Status</option>
        {/* Options populated from system constants */}
      </select>

      {/* Store Dropdown */}
      <select onChange={(e) => handleInputChange('store_id', e.target.value)}>
        <option value="">Select Store</option>
      </select>

      {/* Warehouse Dropdown */}
      <select onChange={(e) => handleInputChange('warehouse_id', e.target.value)}>
        <option value="">Select Warehouse</option>
      </select>

      {/* Date Range Filter */}
      <input 
        type="date" 
        onChange={(e) => handleInputChange('from_date', e.target.value)} 
      />
      <input 
        type="date" 
        onChange={(e) => handleInputChange('to_date', e.target.value)} 
      />

      {/* Search Button */}
      <button onClick={handleSearch}>
        <span className="magnifying-glass-icon" />
        Search
      </button>
    </div>
  );
};