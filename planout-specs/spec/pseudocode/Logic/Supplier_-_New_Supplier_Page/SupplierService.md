/**
 * Handles the transformation and submission of the New Supplier form data.
 * Maps UI-specific field names to the API contract requirements.
 */
async function createSupplier(formData) {
  const payload = {
    name: formData.name,
    supplierCode: formData.supplierCode,
    contactPersonName: formData.contactName,
    phoneNumber: formData.phone,
    faxNumber: formData.fax,
    mobileNumber: formData.mobile,
    emailAddress: formData.email,
    address: formData.address,
    countryCode: formData.country,
    taxIdNumber: formData.taxNo,
    registrationNumber: formData.registrationNo,
    creditTermDays: formData.creditTermDays,
    creditLimitAmount: formData.creditLimit,
    pricelistId: formData.pricelist,
    internalNotes: formData.notes,
    active: formData.isActive,
    internal: formData.isInternalSupplier,
    allowStorePurchaseOrder: formData.allowStorePO,
    salesTaxRuleId: formData.salesTax,
    apInvoiceAccountId: formData.apInvoiceAccount,
    apCreditNoteNonConsignmentAccountId: formData.apCreditNoteAccount,
    supplierDownPaymentAccountId: formData.downPaymentAccount,
    supplierDepositAccountId: formData.depositAccount
  };

  const response = await fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error('Failed to create supplier');
  }

  return await response.json();
}