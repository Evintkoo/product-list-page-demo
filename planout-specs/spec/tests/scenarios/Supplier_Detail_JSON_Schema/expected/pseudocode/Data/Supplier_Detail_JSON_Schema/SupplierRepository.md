/**
 * Retrieves a single supplier record by ID, joined with metadata tables
 * to provide display names for foreign keys.
 */
function getSupplierDetail(supplier_id: UUID, company_id: UUID) {
  return db.query(`
    SELECT
      s.*,
      cu.name AS created_by,
      uu.name AS updated_by,
      pl.name AS pricelist_name,
      tx.name AS tax_name,
      c1.name AS coa_ap_inventory_purchases_name,
      c2.name AS coa_ap_for_credit_note_name,
      c3.name AS coa_ap_for_credit_note_consignment_name,
      c4.name AS coa_supplier_down_payment_name,
      c5.name AS coa_deposit_name
    FROM supplier s
    LEFT JOIN "user" cu           ON cu.id = s.creator_id
    LEFT JOIN "user" uu           ON uu.id = s.updater_id
    LEFT JOIN pricelist pl        ON pl.pricelist_id = s.pricelist_id
    LEFT JOIN tax tx              ON tx.tax_id = s.tax_id
    LEFT JOIN chart_of_account c1 ON c1.coa_id = s.coa_id_ap_inventory_purchases
    LEFT JOIN chart_of_account c2 ON c2.coa_id = s.coa_id_ap_for_credit_note
    LEFT JOIN chart_of_account c3 ON c3.coa_id = s.coa_id_ap_for_credit_note_consignment
    LEFT JOIN chart_of_account c4 ON c4.coa_id = s.coa_id_supplier_down_payment
    LEFT JOIN chart_of_account c5 ON c5.coa_id = s.coa_id_deposit
    WHERE s.supplier_id = :supplier_id
      AND s.company_id = :company_id
    LIMIT 1
  `, { supplier_id, company_id });
}