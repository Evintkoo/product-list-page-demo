/**
 * Maps the API response entity to the internal form state structure.
 * Used by the Edit page to pre-fill all cards.
 */
function mapSupplierToForm(supplier: Supplier) {
  return {
    details: {
      name: supplier.name,
      supplier_code: supplier.supplier_code,
      contact_name: supplier.contact_name,
      phone: supplier.phone,
      mobile: supplier.mobile,
      fax: supplier.fax,
      email: supplier.email,
      address: supplier.address,
      country: supplier.country,
      tax_no: supplier.tax_no,
      registration_no: supplier.registration_no
    },
    creditTerms: {
      credit_term_days: supplier.credit_term_days,
      credit_limit: supplier.credit_limit
    },
    prices: {
      pricelist_id: supplier.pricelist_id
    },
    notes: {
      bank_details: supplier.bank_details,
      notes: supplier.notes
    },
    settings: {
      is_active: supplier.is_active,
      is_internal: supplier.is_internal,
      is_consignment: supplier.is_consignment,
      can_spo: supplier.can_spo,
      tax_id: supplier.tax_id,
      coa_id_ap_inventory_purchases: supplier.coa_id_ap_inventory_purchases,
      coa_id_ap_for_credit_note: supplier.coa_id_ap_for_credit_note,
      coa_id_ap_for_credit_note_consignment: supplier.coa_id_ap_for_credit_note_consignment,
      coa_id_supplier_down_payment: supplier.coa_id_supplier_down_payment,
      coa_id_deposit: supplier.coa_id_deposit
    }
  };
}