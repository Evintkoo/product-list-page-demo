import React, { useState } from 'react';

/**
 * Component: StockOutgoingFilterBar
 * Asset: assets/bb035bb3-9dfa-4c3d-b197-10470fb38870.svg
 * 
 * Manages the search and filter state for the Stock Outgoing list.
 * All fields are optional; empty values are excluded from the API request.
 */

export const StockOutgoingFilterBar = ({ onSearch }) => {
  // State management for filter parameters
  const [filters, setFilters] = useState({
    ref_code_start: '',
    workflow_state: '',
    source_id: null,
    source_type: '',
    entity_id: null,
    created_at_gt: '',
    created_at_lt: ''
  });

  const handleSearch = () => {
    // Construct query object, omitting empty/null values
    const queryParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );

    // Trigger API call: GET /api/stock-outgoings
    // Reset to page 1 logic handled by parent container
    onSearch(queryParams);
  };

  const handleSourceChange = (selectedOption) => {
    // selectedOption expected to contain { id, type }
    setFilters(prev => ({
      ...prev,
      source_id: selectedOption?.id || null,
      source_type: selectedOption?.type || ''
    }));
  };

  return (
    <div className="filter-bar">
      {/* Ref Code Input */}
      <input
        type="text"
        placeholder="Ref Code"
        value={filters.ref_code_start}
        onChange={(e) => setFilters({ ...filters, ref_code_start: e.target.value })}
      />

      {/* Status Dropdown */}
      <select 
        value={filters.workflow_state}
        onChange={(e) => setFilters({ ...filters, workflow_state: e.target.value })}
      >
        <option value="">All Statuses</option>
        <option value="Draft">Draft</option>
        <option value="Confirmed">Confirmed</option>
        <option value="Approved">Approved</option>
        <option value="Cancelled">Cancelled</option>
      </select>

      {/* Source Dropdown (Store/Warehouse) */}
      <select onChange={(e) => handleSourceChange(JSON.parse(e.target.value))}>
        <option value={JSON.stringify({ id: null, type: '' })}>Source</option>
        {/* Options populated from global store/warehouse list */}
      </select>

      {/* Entity Dropdown */}
      <select 
        value={filters.entity_id ?? ''}
        onChange={(e) => setFilters({ ...filters, entity_id: e.target.value === '' ? null : Number(e.target.value) })}
      >
        <option value="">All Entities</option>
        {/* Options populated from business entities list */}
      </select>

      {/* Date Range Pickers */}
      <input 
        type="date" 
        value={filters.created_at_gt}
        onChange={(e) => setFilters({ ...filters, created_at_gt: e.target.value })}
      />
      <input 
        type="date" 
        value={filters.created_at_lt}
        onChange={(e) => setFilters({ ...filters, created_at_lt: e.target.value })}
      />

      {/* Search Action */}
      <button onClick={handleSearch}>
        <IconSearch /> Search
      </button>
    </div>
  );
};