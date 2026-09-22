/**
 * Component: DataMappingCard
 * Description: Displays the Data Mapping section for the Customer Detail Page.
 * Includes a read-only display for the assigned Salesperson.
 * Asset: assets/69be8928-762b-41e8-b82b-4b00876c8e5d.svg
 */

import React from 'react';
import { useCustomerData } from './hooks/useCustomerData';

export const DataMappingCard = ({ customerId }) => {
  // Fetching customer data based on the provided customerId
  // Note: Data schemas are currently empty, so we reference expected fields
  const { data, isLoading, error } = useCustomerData(customerId);

  if (isLoading) return <div>Loading Data Mapping...</div>;
  if (error) return <div>Error loading data mapping information.</div>;

  return (
    <section className="data-mapping-container">
      <header className="data-mapping-header">
        <DataIcon /> {/* Visual indicator for Data Mapping */}
        <h2>Data Mapping</h2>
      </header>

      <div className="data-mapping-content">
        {/* 
           Salesperson field:
           - Displayed as a read-only label/value pair.
           - Field name: salesperson <!-- ORPHAN_FIELD: salesperson -->
        */}
        <div className="field-group">
          <label>Salesperson</label>
          <span className="read-only-value">
            {data?.salesperson || 'Unassigned'}
          </span>
        </div>
      </div>
    </section>
  );
};