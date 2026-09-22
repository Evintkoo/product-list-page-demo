import React, { useState } from 'react';
import { Card, InputNumber, Select, Checkbox, Tooltip } from 'lumi-ui-library'; // Hypothetical UI library

/**
 * Component: WholesaleSettingsCard
 * Renders the settings configuration block for the Add Wholesale Customer page.
 * Asset: assets/9a9e369f-72c7-4af9-b7e4-663a23ed080f.svg
 */
export const WholesaleSettingsCard = () => {
  // State initialization based on defaults
  const [formData, setFormData] = useState({
    credit_term_days: 0,
    credit_limit: 0,
    overdue_limit_days: 0,
    currency: 'IDR',
    pricelist: 'wholesale_default',
    sales_tax: 'product_tax_default',
    ar_invoice_account: 'default_ar',
    credit_note_account: 'default_credit_note',
    down_payment_account: 'default_down_payment',
    deposit_account: 'default_deposit',
    is_card_qris_provider: false,
    is_insurance_provider: false,
    tax_on_sales_invoice_print: true,
  });

  // Validation logic: Ensure numeric fields are non-negative
  const handleNumericChange = (field: string, value: number | null) => {
    const val = value ?? 0;
    setFormData(prev => ({ ...prev, [field]: Math.max(0, val) }));
  };

  return (
    <div className="settings-card-container">
      <h3>SETTINGS</h3>
      
      {/* Credit Term (Days) */}
      <div className="form-group">
        <label>Credit Term (Days) <Tooltip text="Number of days allowed for payment" /></label>
        <InputNumber 
          value={formData.credit_term_days} 
          onChange={(v) => handleNumericChange('credit_term_days', v)} 
        />
      </div>

      {/* Credit Limit */}
      <div className="form-group">
        <label>Credit Limit</label>
        <InputNumber 
          value={formData.credit_limit} 
          onChange={(v) => handleNumericChange('credit_limit', v)} 
        />
      </div>

      {/* Overdue Limit (Days) */}
      <div className="form-group">
        <label>Overdue Limit (Days) <Tooltip text="Grace period for overdue payments" /></label>
        <InputNumber 
          value={formData.overdue_limit_days} 
          onChange={(v) => handleNumericChange('overdue_limit_days', v)} 
        />
      </div>

      {/* Currency */}
      <div className="form-group">
        <label>Currency</label>
        <Select 
          value={formData.currency}
          options={[{ label: 'Indonesian Rupiah', value: 'IDR' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, currency: v }))}
        />
      </div>

      {/* Pricelist */}
      <div className="form-group">
        <label>Pricelist</label>
        <Select 
          value={formData.pricelist}
          options={[{ label: 'Use Wholesale Price', value: 'wholesale_default' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, pricelist: v }))}
        />
      </div>

      {/* Sales Tax */}
      <div className="form-group">
        <label>Sales Tax</label>
        <Select 
          value={formData.sales_tax}
          options={[{ label: 'Use Product Tax Rate', value: 'product_tax_default' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, sales_tax: v }))}
        />
      </div>

      {/* Accounting Accounts */}
      <div className="form-group">
        <label>Ar Invoice Account</label>
        <Select 
          value={formData.ar_invoice_account}
          options={[{ label: 'Use Default AR Invoice Account', value: 'default_ar' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, ar_invoice_account: v }))}
        />
      </div>

      <div className="form-group">
        <label>Credit Note Account</label>
        <Select 
          value={formData.credit_note_account}
          options={[{ label: 'Use Default AR Credit Note Account', value: 'default_credit_note' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, credit_note_account: v }))}
        />
      </div>

      <div className="form-group">
        <label>Customer Down Payment Account</label>
        <Select 
          value={formData.down_payment_account}
          options={[{ label: 'Use Default Customer Down Payment Account', value: 'default_down_payment' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, down_payment_account: v }))}
        />
      </div>

      <div className="form-group">
        <label>Deposit Account</label>
        <Select 
          value={formData.deposit_account}
          options={[{ label: 'Use Default Deposit Account', value: 'default_deposit' }]}
          onChange={(v) => setFormData(prev => ({ ...prev, deposit_account: v }))}
        />
      </div>

      {/* Toggles */}
      <Checkbox 
        label="Is As Card/Qris Provider?" 
        checked={formData.is_card_qris_provider}
        onChange={(v) => setFormData(prev => ({ ...prev, is_card_qris_provider: v }))}
      />

      <Checkbox 
        label="Is As Insurance Provider" 
        checked={formData.is_insurance_provider}
        onChange={(v) => setFormData(prev => ({ ...prev, is_insurance_provider: v }))}
      />

      <Checkbox 
        label="Tax On Sales Invoice Print" 
        checked={formData.tax_on_sales_invoice_print}
        onChange={(v) => setFormData(prev => ({ ...prev, tax_on_sales_invoice_print: v }))}
      />
    </div>
  );
};