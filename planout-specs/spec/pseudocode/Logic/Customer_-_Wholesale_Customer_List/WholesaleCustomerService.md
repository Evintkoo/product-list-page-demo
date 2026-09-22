/**
 * Logic to retrieve and map wholesale customer data for the Lumi ERP Customer List.
 * Filters for customers belonging to the 'Wholesale' segment.
 */

function getWholesaleCustomerList() {
    // Fetch all customers from the database
    // <!-- MISSING_FIELD: CUSTOMER.customer_id -->
    // <!-- MISSING_FIELD: CUSTOMER.customer_group -->
    // <!-- MISSING_FIELD: CUSTOMER.customer_code -->
    // <!-- MISSING_FIELD: CUSTOMER.name -->
    // <!-- MISSING_FIELD: CUSTOMER.address -->
    // <!-- MISSING_FIELD: CUSTOMER.customer_region -->
    // <!-- MISSING_FIELD: CUSTOMER.phone -->
    // <!-- MISSING_FIELD: CUSTOMER.email -->
    // <!-- MISSING_FIELD: CUSTOMER.salesperson -->
    // <!-- MISSING_FIELD: CUSTOMER.is_active -->
    
    const rawCustomers = database.query("SELECT * FROM CUSTOMER WHERE customer_group = 'Wholesale'");

    // Map internal database entities to the API response structure
    return rawCustomers.map(customer => ({
        customer_id: customer.customer_id,
        customer_group: customer.customer_group,
        customer_code: customer.customer_code,
        name: customer.name,
        address: customer.address,
        customer_region: customer.customer_region,
        phone: customer.phone,
        email: customer.email,
        salesperson: customer.salesperson,
        is_active: customer.is_active
    }));
}