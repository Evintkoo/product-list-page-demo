/**
 * Service to handle business logic for customer retrieval.
 */
function findCustomerById(id) {
    // Fetch raw record from Customer entity
    const customer = db.Customer.findOne({ id: id });

    if (!customer) return null;

    // Determine customer type based on discriminator flags
    // Retail: all false, Wholesale: is_wholesale true, Franchise: is_franchise true
    // Note: is_consignment is also available in schema
    
    return {
        id: customer.id,
        is_wholesale: customer.is_wholesale,
        is_franchise: customer.is_franchise,
        is_consignment: customer.is_consignment,
        core_info: customer.core_info,
        customer_group: customer.customer_group,
        store_info: customer.store_info,
        addresses: customer.addresses,
        tax_info: customer.tax_info,
        sap_reporting: customer.sap_reporting,
        settings: customer.settings,
        audit_fields: customer.audit_fields
    };
}