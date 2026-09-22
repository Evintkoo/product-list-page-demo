/**
 * Component: SupplierDetailsCard
 * Description: Displays read-only identity and contact information for a supplier.
 * Asset: assets/2984db7a-90dd-4a6d-8e51-dc0f267f6c7d.svg
 */

import React from 'react';
import { PersonIcon, HelpIcon } from './icons'; // Hypothetical icon library

export const SupplierDetailsCard = ({ supplierData }) => {
  // supplierData is expected to contain fields mapped from the Supplier entity
  // Fields: Name, Supplier Code, Contact Name, Email, Phone, Fax, Address, Tax No., Registration No.

  return (
    <div className="details-card-container">
      {/* Header Section */}
      <div className="card-header">
        <PersonIcon />
        <h2>Details</h2>
      </div>

      {/* Content Grid */}
      <div className="details-grid">
        {/* Identity Information */}
        <ReadOnlyField label="Name" value={supplierData.name} />
        <ReadOnlyField label="Supplier Code" value={supplierData.supplier_code} />
        <ReadOnlyField label="Contact Name" value={supplierData.contact_name} />

        {/* Contact Information */}
        <ReadOnlyField label="Email" value={supplierData.email} />
        <ReadOnlyField label="Phone" value={supplierData.phone} />
        <ReadOnlyField label="Fax" value={supplierData.fax} />
        <ReadOnlyField label="Address" value={supplierData.address} />

        {/* Tax & Registration */}
        <ReadOnlyField 
          label="Tax No." 
          value={supplierData.tax_no} 
          showHelp={true} 
        />
        <ReadOnlyField 
          label="Registration No." 
          value={supplierData.registration_no} 
          showHelp={true} 
        />
      </div>
    </div>
  );
};

/**
 * Helper Component for Read-Only Fields
 */
const ReadOnlyField = ({ label, value, showHelp = false }) => (
  <div className="field-wrapper">
    <label>{label}</label>
    <div className="field-content">
      <span>{value || '-'}</span>
      {showHelp && <HelpIcon aria-label="Help" />}
    </div>
  </div>
);

// ===== ORPHAN_FIELD LOG =====
// The following fields were referenced in the canvas but are not present in the provided DATA SCHEMAS:
// - name <!-- ORPHAN_FIELD: name -->
// - supplier_code <!-- ORPHAN_FIELD: supplier_code -->
// - contact_name <!-- ORPHAN_FIELD: contact_name -->
// - email <!-- ORPHAN_FIELD: email -->
// - phone <!-- ORPHAN_FIELD: phone -->
// - fax <!-- ORPHAN_FIELD: fax -->
// - address <!-- ORPHAN_FIELD: address -->
// - tax_no <!-- ORPHAN_FIELD: tax_no -->
// - registration_no <!-- ORPHAN_FIELD: registration_no -->