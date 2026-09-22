/**
 * Maps the raw Supplier entity from the API response to the specific 
 * UI sections required by the Supplier Details Page.
 */
FUNCTION mapSupplierToView(supplierData: Supplier):
    RETURN {
        header: {
            supplierName: supplierData.name
        },
        detailsSection: {
            identity: { name: supplierData.name },
            contact: { email: supplierData.email, phone: supplierData.phone, address: supplierData.address }
        },
        creditTermsSection: {
            creditLimit: supplierData.credit_limit,
            paymentTerms: supplierData.payment_terms
        },
        changesSection: {
            createdAt: supplierData.created_at,
            updatedAt: supplierData.updated_at,
            createdBy: supplierData.created_by_name,
            updatedBy: supplierData.updated_by_name
        },
        noteSection: {
            bankDetails: supplierData.bank_account_number,
            notes: supplierData.notes
        },
        settingsSection: {
            isActive: supplierData.is_active,
            isInternal: supplierData.is_internal,
            allowStorePurchaseOrder: supplierData.allow_store_po,
            salesTaxName: supplierData.sales_tax_name
        },
        pricesSection: {
            pricelistName: supplierData.pricelist_name
        }
    }