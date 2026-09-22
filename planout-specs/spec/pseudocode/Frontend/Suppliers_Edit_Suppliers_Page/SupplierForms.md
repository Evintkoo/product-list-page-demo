// Contains sub-components for the cards defined in the canvas

export const SupplierDetailsCard = ({ data }) => {
  // Fields: name, supplier_code, contact_name, phone, mobile, fax, email, address, country, tax_no, registration_no
  return (
    <section>
      {/* Inputs bound to state matching API PAYLOADS names */}
    </section>
  );
};

export const CreditTermsCard = ({ data }) => {
  // Fields: credit_term_days, credit_limit
  return (
    <section>
      {/* Inputs bound to state matching API PAYLOADS names */}
    </section>
  );
};

export const PricesCard = ({ data }) => {
  // Field: pricelist_id
  return (
    <section>
      {/* Pricelist component preselected to data.pricelist_id */}
    </section>
  );
};

export const NotesTab = ({ data }) => {
  // Fields: notes, bank_details
  return (
    <section>
      {/* Editable text areas */}
    </section>
  );
};

export const SettingsCard = ({ data }) => {
  // Fields: is_active, is_internal, is_consignment, can_spo, tax_id, 
  // coa_id_ap_inventory_purchases, coa_id_ap_for_credit_note, 
  // coa_id_ap_for_credit_note_consignment, coa_id_supplier_down_payment, coa_id_deposit
  return (
    <section>
      {/* Checkboxes and Dropdowns for COA and Tax IDs */}
    </section>
  );
};