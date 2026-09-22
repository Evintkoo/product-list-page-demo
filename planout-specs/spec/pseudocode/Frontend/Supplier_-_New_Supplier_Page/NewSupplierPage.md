import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postSupplier } from './api/supplierService';

/**
 * Asset: assets/f06cfd04-d58e-4258-be67-4e3138d0fb25.svg
 * Page to create a new supplier in the Lumi ERP system.
 */
export const NewSupplierPage = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    // Mapping form fields to API payload structure
    const payload = {
      name: data.name,
      supplierCode: data.supplierCode,
      contactPersonName: data.contactName,
      phoneNumber: data.phone,
      faxNumber: data.fax,
      mobileNumber: data.mobile,
      emailAddress: data.email,
      address: data.address,
      countryCode: data.country,
      taxIdNumber: data.taxNo,
      registrationNumber: data.registrationNo,
      creditTermDays: parseInt(data.creditTermDays, 10),
      creditLimitAmount: parseFloat(data.creditLimit),
      pricelistId: data.pricelist,
      internalNotes: data.notes,
      active: data.isActive,
      internal: data.isInternalSupplier,
      allowStorePurchaseOrder: data.allowStorePO,
      salesTaxRuleId: data.salesTax,
      apInvoiceAccountId: data.apInvoiceAccount,
      apCreditNoteNonConsignmentAccountId: data.apCreditNoteAccount,
      supplierDownPaymentAccountId: data.downPaymentAccount,
      supplierDepositAccountId: data.depositAccount
    };

    await postSupplier(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Required Fields with immediate validation */}
      <input {...register("name", { required: true })} placeholder="Supplier Name *" />
      {errors.name && <span>Name is required</span>}

      <input {...register("contactName", { required: true })} placeholder="Contact Person *" />
      <input {...register("phone", { required: true })} placeholder="Phone Number *" />
      <input {...register("address", { required: true })} placeholder="Address *" />
      
      <select {...register("country", { required: true })}>
        <option value="ID">Indonesia</option>
        {/* Other options */}
      </select>

      <input type="number" {...register("creditTermDays", { required: true })} placeholder="Credit Term (Days) *" />
      
      <select {...register("salesTax", { required: true })}>
        {/* Options for Sales Tax Rules */}
      </select>

      {/* Optional Fields */}
      <input {...register("supplierCode")} placeholder="Supplier Code" />
      <input {...register("taxNo")} placeholder="Tax ID" />
      <input {...register("registrationNo")} placeholder="Registration No" />
      <input {...register("fax")} placeholder="Fax" />
      <input {...register("mobile")} placeholder="Mobile" />
      <input {...register("email")} placeholder="Email" />
      <input type="number" {...register("creditLimit")} placeholder="Credit Limit" />
      <select {...register("pricelist")}>{/* Options */}</select>
      <textarea {...register("notes")} placeholder="Internal Notes" />
      
      <input type="checkbox" {...register("isActive")} /> Active
      <input type="checkbox" {...register("isInternalSupplier")} /> Internal Supplier
      <input type="checkbox" {...register("allowStorePO")} /> Allow Store PO

      {/* Account Selects */}
      <select {...register("apInvoiceAccount")}>{/* Options */}</select>
      <select {...register("apCreditNoteAccount")}>{/* Options */}</select>
      <select {...register("downPaymentAccount")}>{/* Options */}</select>
      <select {...register("depositAccount")}>{/* Options */}</select>

      <button type="button" onClick={() => window.history.back()}>Cancel</button>
      <button type="submit" disabled={!isValid}>Save</button>
    </form>
  );
};