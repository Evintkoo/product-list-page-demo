import React from 'react';
import { Card, Icon, Tooltip, Typography } from '@lumi/ui-components'; // Hypothetical UI library

/**
 * SupplierSettingsCard
 * Displays read-only accounting settings and status flags for a supplier.
 * Asset: assets/c770046a-78c1-42d7-9159-ccde9a4a5110.svg
 */
export const SupplierSettingsCard = ({ supplierData }) => {
  
  // Helper to render boolean status fields with icons
  const renderStatusField = (label, value, helpText) => (
    <div className="settings-row">
      <div className="label-group">
        <Typography>{label}</Typography>
        <Tooltip content={helpText}>
          <Icon name="help-circle" />
        </Tooltip>
      </div>
      <div className="value-group">
        {value ? (
          <Icon name="check-circle" color="green" />
        ) : (
          <Icon name="x-circle" color="red" />
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <div className="card-header">
        <Icon name="gear" />
        <Typography variant="h6">Settings</Typography>
      </div>

      <div className="card-content">
        {/* Status Flags */}
        {renderStatusField("Active?", supplierData.active, "Indicates if the supplier is currently active.")}
        {renderStatusField("Allow Store Purchase Order", supplierData.allow_store_po, "Indicates if store purchase orders are permitted.")}
        {renderStatusField("Internal Supplier?", supplierData.is_internal, "Indicates if this is an internal supplier entity.")}

        {/* Accounting Settings (Read-only) */}
        <div className="settings-row">
          <Typography>Sales Tax</Typography>
          <Typography>{supplierData.sales_tax}</Typography>
        </div>
        
        <div className="settings-row">
          <Typography>Supplier Deposit Account</Typography>
          <Typography>{supplierData.deposit_account}</Typography>
        </div>

        <div className="settings-row">
          <Typography>Supplier Down Payment Account</Typography>
          <Typography>{supplierData.down_payment_account}</Typography>
        </div>

        <div className="settings-row">
          <Typography>AP CN Non Consignment Account</Typography>
          <Typography>{supplierData.ap_cn_non_consignment_account}</Typography>
        </div>

        <div className="settings-row">
          <Typography>AP Invoice Account</Typography>
          <Typography>{supplierData.ap_invoice_account}</Typography>
        </div>
      </div>
    </Card>
  );
};

// Note: All fields above are derived from the provided node descriptions.
// Since no API PAYLOADS or DATA SCHEMAS were provided in the context, 
// the following fields are treated as ORPHAN_FIELDs:
// ORPHAN_FIELD: active
// ORPHAN_FIELD: allow_store_po
// ORPHAN_FIELD: is_internal
// ORPHAN_FIELD: sales_tax
// ORPHAN_FIELD: deposit_account
// ORPHAN_FIELD: down_payment_account
// ORPHAN_FIELD: ap_cn_non_consignment_account
// ORPHAN_FIELD: ap_invoice_account