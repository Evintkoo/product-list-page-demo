/**
 * Component: SupplierNotesCard
 * Description: Displays the supplier's bank details and free-text notes.
 * Asset: assets/c9f74ce5-6c21-4b59-b0a6-17476510d5c9.svg
 */

import React from 'react';
import { useSupplierData } from './hooks/useSupplierData';

export const SupplierNotesCard = ({ supplierId }) => {
  // Fetching data using the supplierId context
  const { data, isLoading, error } = useSupplierData(supplierId);

  if (isLoading) return <div className="skeleton-loader">Loading...</div>;
  if (error) return <div className="error-state">Failed to load supplier notes.</div>;

  return (
    <section className="notes-card-container">
      {/* Header Section */}
      <header className="card-header">
        <DocumentIcon /> {/* Icon as per design */}
        <h2>Note</h2>
      </header>

      {/* Content Section */}
      <div className="card-content">
        <div className="field-group">
          <label>Bank Details</label>
          {/* 
            DATA SCHEMA: Bank Details is read-only.
            ORPHAN_FIELD: bank_details 
          */}
          <p className="read-only-text">{data.bank_details}</p>
        </div>

        <div className="field-group">
          <label>Notes</label>
          {/* 
            DATA SCHEMA: Notes is read-only.
            ORPHAN_FIELD: supplier_notes 
          */}
          <p className="read-only-text">{data.supplier_notes}</p>
        </div>
      </div>
    </section>
  );
};