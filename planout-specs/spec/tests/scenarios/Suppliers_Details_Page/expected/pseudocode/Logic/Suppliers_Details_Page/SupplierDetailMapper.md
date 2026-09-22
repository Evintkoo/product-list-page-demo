/**
 * Maps the Supplier entity fields to the UI sections.
 */
export const mapSupplierToUI = (supplier: Supplier) => {
  return {
    header: {
      title: supplier.name
    },
    detailsSection: {
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address
    },
    creditTermsSection: {
      credit_limit: supplier.credit_limit,
      payment_terms: supplier.payment_terms
    },
    changesSection: {
      created_at: supplier.created_at,
      updated_at: supplier.updated_at,
      created_by_name: supplier.created_by_name,
      updated_by_name: supplier.updated_by_name
    },
    noteSection: {
      bank_account_number: supplier.bank_account_number,
      notes: supplier.notes
    },
    settingsSection: {
      is_active: supplier.is_active,
      is_internal: supplier.is_internal,
      allow_store_po: supplier.allow_store_po,
      sales_tax_name: supplier.sales_tax_name
    },
    pricesSection: {
      pricelist_name: supplier.pricelist_name
    }
  };
};