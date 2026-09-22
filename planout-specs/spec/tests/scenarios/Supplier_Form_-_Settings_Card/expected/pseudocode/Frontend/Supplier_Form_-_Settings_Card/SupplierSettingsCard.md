/**
 * Component: SupplierSettingsCard
 * Description: Settings configuration section for Supplier Form.
 * Asset: assets/5e0ea595-b1d4-4275-ba42-7df8e472c6e3.svg
 */

import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form'; // Assuming standard form context usage

export const SupplierSettingsCard = () => {
  const { register, setValue, watch } = useFormContext();
  const [accounts, setAccounts] = useState([]);

  // Fetch Chart of Accounts for dropdowns
  useEffect(() => {
    fetch('/accounts')
      .then((res) => res.json())
      .then((data) => setAccounts(data));
  }, []);

  return (
    <div className="settings-card">
      <div className="settings-header">
        <h3>SETTINGS</h3>
        <span className="settings-gear-icon" />
      </div>

      {/* Boolean Toggles */}
      <div className="form-group">
        <label>Active? <span className="help-icon" /></label>
        <input type="checkbox" {...register("is_active")} /> <!-- ORPHAN_FIELD: is_active -->
      </div>

      <div className="form-group">
        <label>Internal Supplier? <span className="help-icon" /></label>
        <input type="checkbox" {...register("is_internal")} /> <!-- ORPHAN_FIELD: is_internal -->
      </div>

      <div className="form-group">
        <label>Allow Store Purchase Order? <span className="help-icon" /></label>
        <input type="checkbox" {...register("allow_store_po")} /> <!-- ORPHAN_FIELD: allow_store_po -->
      </div>

      {/* Account Dropdowns */}
      <AccountDropdown 
        label="AP Invoice Account" 
        name="coa_id_ap_inventory_purchases" 
        options={accounts} 
      />
      <AccountDropdown 
        label="AP Credit Note Non Consignment Account" 
        name="coa_id_ap_for_credit_note" 
        options={accounts} 
      />
      <AccountDropdown 
        label="Supplier Down Payment Account" 
        name="coa_id_supplier_down_payment" 
        options={accounts} 
      />
      <AccountDropdown 
        label="Supplier Deposit Account" 
        name="coa_id_deposit" 
        options={accounts} 
      />

      {/* Sales Tax Dropdown */}
      <div className="form-group">
        <label>Sales Tax</label>
        <select {...register("sales_tax_id", { required: true })}> <!-- ORPHAN_FIELD: sales_tax_id -->
          <option value="default">Use Product Tax Rate</option>
          {/* Additional tax options would be mapped here */}
        </select>
      </div>
    </div>
  );
};

const AccountDropdown = ({ label, name, options }) => {
  const { register } = useFormContext();
  
  return (
    <div className="form-group">
      <label>{label}</label>
      <select {...register(name)}>
        <option value="">Select an account...</option>
        {options.map((acc) => (
          <option key={acc.account_id} value={acc.account_id}>
            {acc.account_code} - {acc.account_name}
          </option>
        ))}
      </select>
    </div>
  );
};