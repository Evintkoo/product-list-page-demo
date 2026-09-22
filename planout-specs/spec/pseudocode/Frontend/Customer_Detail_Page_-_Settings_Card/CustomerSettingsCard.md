/**
 * Component: CustomerSettingsCard
 * Description: Displays read-only configuration settings for a customer.
 * Asset: assets/8334fee2-2152-4d1f-b2e3-23b24436f942.svg
 */

import React from 'react';

// Note: Data schemas are currently empty. 
// Fields below are derived from the node descriptions.
interface CustomerSettingsProps {
  customerData: {
    is_wholesale_customer: boolean; // ORPHAN_FIELD: is_wholesale_customer
    is_franchise_owner: boolean;    // ORPHAN_FIELD: is_franchise_owner
    service_tax_status: string;     // ORPHAN_FIELD: service_tax_status
  };
}

export const CustomerSettingsCard: React.FC<CustomerSettingsProps> = ({ customerData }) => {
  
  // Helper to format boolean to "Yes" or "No" as per requirements
  const formatBoolean = (value: boolean) => (value ? "Yes" : "No");

  return (
    <div className="settings-card-container">
      <h3>Customer Settings</h3>
      
      <div className="settings-field">
        <label>Wholesale Customer?</label>
        <input 
          type="text" 
          readOnly 
          value={formatBoolean(customerData.is_wholesale_customer)} 
        />
      </div>

      <div className="settings-field">
        <label>Franchise Store Owner?</label>
        <input 
          type="text" 
          readOnly 
          value={formatBoolean(customerData.is_franchise_owner)} 
        />
      </div>

      <div className="settings-field">
        <label>Service Tax</label>
        <input 
          type="text" 
          readOnly 
          value={customerData.service_tax_status} 
        />
      </div>
    </div>
  );
};