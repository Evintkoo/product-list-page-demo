/**
 * Logic to fetch and format Customer Address details for the UI.
 */

async function getCustomerAddressDetail(customerId: UUID) {
    // 1. Fetch Customer basic info
    const customer = await fetch("GET /customers/:id", { params: { id: customerId } });
    
    // 2. Fetch associated addresses
    const addresses = await fetch("GET /customer_addresses/:customer_id", { params: { customer_id: customerId } });

    // 3. Transform and map data for the UI components
    return addresses.map(addr => {
        return {
            address: formatFullAddress(addr),
            address_type: addr.address_type,
            phone_1: addr.phone_1,
            phone_2: addr.phone_2,
            fax: addr.fax,
            is_main_address: addr.is_main_address,
            is_shipping_address: addr.is_shipping_address,
            latitude: addr.latitude,
            longitude: addr.longitude,
            created_at: addr.created_at,
            updated_at: addr.updated_at
        };
    });
}

/**
 * Helper to concatenate address components into a single display string
 */
function formatFullAddress(addr: CustomerAddress): string {
    const components = [
        addr.address,
        addr.village,
        addr.district,
        addr.regency_municipality,
        addr.province,
        addr.country,
        addr.postal_code
    ].filter(Boolean); // Remove null/undefined values

    return components.join(", ");
}