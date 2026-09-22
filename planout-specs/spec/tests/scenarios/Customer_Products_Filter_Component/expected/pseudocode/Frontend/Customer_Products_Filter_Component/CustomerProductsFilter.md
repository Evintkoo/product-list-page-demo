/**
 * Component: CustomerProductsFilter
 * Description: A filter bar for the Customer Products table allowing users to refine 
 * results by Membership, Vehicle, and Source before triggering a data reload.
 * Asset: assets/2aa5490c-f110-4405-a417-f46a7d9ef502.svg
 */

import React, { useState } from 'react';

export const CustomerProductsFilter = ({ onFilterChange }) => {
  // State management for filter values
  // Note: Fields are treated as orphans as no specific API PAYLOADS were provided for the filter request body.
  const [membership, setMembership] = useState(''); // ORPHAN_FIELD: membership
  const [vehicle, setVehicle] = useState('');       // ORPHAN_FIELD: vehicle
  const [source, setSource] = useState('');         // ORPHAN_FIELD: source

  /**
   * Validation Logic:
   * Filters are optional, but if a value is selected, it must be a valid string.
   * The Search button remains enabled regardless of selection state.
   */

  const handleSearch = () => {
    // Triggers the reload of the product table with current filter state
    onFilterChange({
      membership,
      vehicle,
      source
    });
  };

  return (
    <div className="filter-container">
      {/* Membership Filter Dropdown */}
      <select 
        aria-label="Membership Filter"
        value={membership}
        onChange={(e) => setMembership(e.target.value)}
      >
        <option value="">Select Membership Tier</option>
        {/* Options populated via data fetch */}
      </select>

      {/* Vehicle Filter Dropdown */}
      <select 
        aria-label="Vehicle Filter"
        value={vehicle}
        onChange={(e) => setVehicle(e.target.value)}
      >
        <option value="">Select Vehicle</option>
        {/* Options populated via data fetch */}
      </select>

      {/* Source Filter Dropdown */}
      <select 
        aria-label="Source Filter"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      >
        <option value="">Select Source</option>
        {/* Options populated via data fetch */}
      </select>

      {/* Search Button */}
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};