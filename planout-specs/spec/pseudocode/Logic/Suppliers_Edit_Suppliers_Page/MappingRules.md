/**
 * Maps API response to UI form state.
 */
export const mapSupplierToForm = (data: Supplier) => {
  return {
    name: data.name,
    supplier_code: data.supplier_code,
    contact_name: data.contact_name,
    phone: data.phone,
    mobile: data.mobile,
    fax: data.fax,
    email: data.email,
    address: data.address,
    country: data.country,
    tax_no: data.tax_no,
    registration_no: data.registration_no,
    credit_term_days: data.credit_term_days,
    credit_limit: data.credit_limit,
    pricelist_id: data.pricelist_id,
    bank_details: data.bank_details,
    notes: data.notes,
    is_active: data.is_active,
    is_internal: data.is_internal,
    is_consignment: data.is_consignment,
    can_spo: data.can_spo,
    tax_id: data.tax_id,
    coa_id_ap_inventory_purchases: data.coa_id_ap_inventory_purchases,
    coa_id_ap_for_credit_note: data.coa_id_ap_for_credit_note,
    coa_id_ap_for_credit_note_consignment: data.coa_id_ap_for_credit_note_consignment,
    coa_id_supplier_down_payment: data.coa_id_supplier_down_payment,
    coa_id_deposit: data.coa_id_deposit
  };
};