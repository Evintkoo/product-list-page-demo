/**
 * Component: CustomerDetailsCard
 * Description: Displays the core identity and profile information for a customer.
 * All fields are read-only as per the requirement.
 * 
 * Asset: assets/b6ff30b7-fc92-4e4a-8b15-422488b9dd87.svg
 */

import React from 'react';

interface CustomerDetailsProps {
  customerData: {
    name: string;
    phone: string;
    ktp: string;
    address: string;
    area_region: string; // ORPHAN_FIELD: area_region
    customer_code: string; // ORPHAN_FIELD: customer_code
    company: string;
    email: string;
    occupation: string;
    gender: string;
    birthdate: string;
    notes: string;
    salesperson: string; // ORPHAN_FIELD: salesperson
    created_at_store: string; // ORPHAN_FIELD: created_at_store
  };
}

export const CustomerDetailsCard: React.FC<CustomerDetailsProps> = ({ customerData }) => {
  return (
    <div className="details-card-container">
      <h3>Customer Details</h3>
      
      <div className="grid-layout">
        {/* Identity Section */}
        <ReadOnlyField label="Name" value={customerData.name} />
        <ReadOnlyField label="Customer Code" value={customerData.customer_code} />
        <ReadOnlyField label="KTP" value={customerData.ktp} />
        
        {/* Contact Section */}
        <ReadOnlyField label="Phone" value={customerData.phone} />
        <ReadOnlyField label="Email" value={customerData.email} />
        <ReadOnlyField label="Address" value={customerData.address} />
        <ReadOnlyField label="Area/Region" value={customerData.area_region} />
        
        {/* Professional/Personal Section */}
        <ReadOnlyField label="Company" value={customerData.company} />
        <ReadOnlyField label="Occupation" value={customerData.occupation} />
        <ReadOnlyField label="Gender" value={customerData.gender} />
        <ReadOnlyField label="Birthdate" value={customerData.birthdate} />
        
        {/* Metadata Section */}
        <ReadOnlyField label="Salesperson" value={customerData.salesperson} />
        <ReadOnlyField label="Created At Store" value={customerData.created_at_store} />
        <ReadOnlyField label="Notes" value={customerData.notes} />
      </div>
    </div>
  );
};

/**
 * Helper component for consistent read-only display
 */
const ReadOnlyField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="field-wrapper">
    <label className="field-label">{label}</label>
    <div className="field-value-display">
      {value || '-'}
    </div>
  </div>
);