/**
 * Component: FranchiseCustomerDetailsCard
 * Description: Displays the read-only details for a franchise customer, 
 * organized into Customer Identity, Contact Person, and Salesperson sections.
 * Asset: assets/3a356b3b-608a-4710-810b-e98be0119660.svg
 */

import React from 'react';

export const FranchiseCustomerDetailsCard = ({ customerData }) => {
  // All fields are read-only as per requirements.
  // Data is expected to be mapped from the Customer entity.

  return (
    <div className="details-card-container">
      <header>
        <h3>Details</h3> <!-- Node: 4b5d8619-fd3f-4fec-a27d-f709285e5840 -->
      </header>

      <section className="customer-identity">
        <h4>Customer Identity</h4>
        <ReadOnlyField label="Customer Code" value={customerData.customer_code} />
        <ReadOnlyField label="Name" value={customerData.name} />
        <ReadOnlyField label="Area/Region" value={customerData.area_region} />
        <ReadOnlyField label="Address" value={customerData.address} />
        <ReadOnlyField label="KTP" value={customerData.ktp} />
        <ReadOnlyField label="Phone" value={customerData.phone} />
        <ReadOnlyField label="Email" value={customerData.email} />
        <ReadOnlyField label="Notes" value={customerData.notes} />
        <ReadOnlyField label="Detail Bank" value={customerData.detail_bank} />
      </section>

      <section className="contact-person">
        <h4>Contact Person</h4>
        <ReadOnlyField label="Full Name" value={customerData.contact_full_name} />
        <ReadOnlyField label="Email" value={customerData.contact_email} />
        <ReadOnlyField label="Phone" value={customerData.contact_phone} />
        <ReadOnlyField label="Address" value={customerData.contact_address} />
        <ReadOnlyField label="Country" value={customerData.contact_country} />
        <ReadOnlyField label="Region" value={customerData.contact_region} />
        <ReadOnlyField label="Position" value={customerData.contact_position} />
        <ReadOnlyField label="Department" value={customerData.contact_department} />
      </section>

      <section className="salesperson">
        <h4>Salesperson</h4>
        <!-- Salesperson is split into two fields as per requirement -->
        <ReadOnlyField label="Salesperson Name" value={customerData.salesperson_name} /> <!-- ORPHAN_FIELD: salesperson_name -->
        <ReadOnlyField label="Salesperson ID" value={customerData.salesperson_id} /> <!-- ORPHAN_FIELD: salesperson_id -->
      </section>
    </div>
  );
};

/**
 * Helper component for consistent read-only display
 */
const ReadOnlyField = ({ label, value }) => (
  <div className="field-group">
    <label>{label}</label>
    <div className="field-value">{value || '-'}</div>
  </div>
);

// Note: All fields are derived from the Customer entity schema.
// Validation: No input validation required as all fields are read-only.