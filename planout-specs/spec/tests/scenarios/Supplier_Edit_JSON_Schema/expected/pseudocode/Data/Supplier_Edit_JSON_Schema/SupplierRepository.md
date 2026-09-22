/**
 * Updates an existing supplier record in the database.
 * 
 * @param supplierId - The UUID of the supplier to update.
 * @param companyId - The UUID of the company (from session).
 * @param updaterId - The UUID of the user performing the update.
 * @param data - The validated payload from SupplierUpdateRequest.
 * @returns The updated supplier record.
 */
function updateSupplier(supplierId, companyId, updaterId, data) {
  return db.query(`
    UPDATE supplier
    SET
      supplier_code = :supplier_code,
      name = :name,
      contact_name = :contact_name,
      phone = :phone,
      mobile = :mobile,
      fax = :fax,
      email = :email,
      address = :address,
      country = :country,
      tax_no = :tax_no,
      registration_no = :registration_no,
      tax_id = :tax_id,
      pricelist_id = :pricelist_id,
      credit_term_days = :credit_term_days,
      credit_limit = :credit_limit,
      bank_details = :bank_details,
      notes = :notes,
      is_active = :is_active,
      is_internal = :is_internal,
      is_consignment = :is_consignment,
      can_spo = :can_spo,
      coa_id_ap_inventory_purchases = :coa_id_ap_inventory_purchases,
      coa_id_ap_for_credit_note = :coa_id_ap_for_credit_note,
      coa_id_ap_for_credit_note_consignment = :coa_id_ap_for_credit_note_consignment,
      coa_id_supplier_down_payment = :coa_id_supplier_down_payment,
      coa_id_deposit = :coa_id_deposit,
      updater_id = :updater_id
    WHERE supplier_id = :supplier_id AND company_id = :company_id
    RETURNING *
  `, {
    supplier_id: supplierId,
    company_id: companyId,
    updater_id: updaterId,
    ...data
  });
}