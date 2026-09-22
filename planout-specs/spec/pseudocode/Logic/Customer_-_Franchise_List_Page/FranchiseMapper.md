/**
 * Maps raw API response entities to the UI component structure.
 * Note: Fields like franchise_code, address, phone, customer_region, and email 
 * are assumed to be part of the extended Customer entity response.
 */
function mapCustomerToUI(data) {
    return {
        id: data.id,
        name: data.name,
        franchiseCode: data.franchise_code, <!-- MISSING_FIELD: Customer.franchise_code -->
        address: data.address, <!-- MISSING_FIELD: Customer.address -->
        phone: data.phone, <!-- MISSING_FIELD: Customer.phone -->
        status: data.status,
        region: data.customer_region, <!-- MISSING_FIELD: Customer.customer_region -->
        email: data.email <!-- MISSING_FIELD: Customer.email -->
    };
}