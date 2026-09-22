/**
 * Component: PurchaseReturnFilterBar
 * Asset: assets/23b45a47-e8ff-4141-9d61-afde1cfb5d02.svg
 * 
 * This component provides a search and filter interface for the Purchase Return Fixed Assets list.
 * It maintains local state for query parameters and triggers a data fetch only upon explicit user action.
 */

import React, { useState } from 'react';

export const PurchaseReturnFilterBar = ({ onSearch }) => {
  // State management for filter parameters
  const [filters, setFilters] = useState({
    workflow_state: '',      // Maps to Status dropdown
    ref_code: '',            // Maps to Document Number field
    supplier_id: '',         // Maps to To Supplier dropdown
    created_at_from: '',     // Maps to From Date field
    created_at_to: ''        // Maps to To Date field
  });

  // Validation Logic: Ensure date range consistency
  const validateDates = (from, to) => {
    if (from && to && new Date(from) > new Date(to)) {
      return "From Date cannot be later than To Date.";
    }
    return null;
  };

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    const dateError = validateDates(filters.created_at_from, filters.created_at_to);
    if (dateError) {
      alert(dateError); // Or trigger UI error state
      return;
    }

    // Trigger API call via parent or context
    // Endpoint: GET /api/purchase-returns
    await onSearch(filters);
  };

  return (
    <div className="filter-bar-container">
      {/* Document Number field */}
      <input 
        type="text"
        placeholder="Document Number"
        value={filters.ref_code}
        onChange={(e) => handleInputChange('ref_code', e.target.value)}
      />

      {/* Status dropdown */}
      <select 
        value={filters.workflow_state}
        onChange={(e) => handleInputChange('workflow_state', e.target.value)}
      >
        <option value="">All States</option>
        <option value="Draft">Draft</option>
        <option value="Sent">Sent</option>
        <option value="Approved">Approved</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* To Supplier dropdown */}
      <select 
        value={filters.supplier_id}
        onChange={(e) => handleInputChange('supplier_id', e.target.value)}
      >
        <option value="">All Suppliers</option>
        {/* Supplier options would be populated via a separate fetch */}
      </select>

      {/* From Date field */}
      <input 
        type="date"
        value={filters.created_at_from}
        onChange={(e) => handleInputChange('created_at_from', e.target.value)}
      />

      {/* To Date field */}
      <input 
        type="date"
        value={filters.created_at_to}
        onChange={(e) => handleInputChange('created_at_to', e.target.value)}
      />

      {/* Search button */}
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};