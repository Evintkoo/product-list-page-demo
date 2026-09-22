/**
 * Handles GET /api/customers/new?retail=1
 * Fetches default values and dropdown options for the Retail Customer form.
 */
function getRetailCustomerForm(request) {
    // 1. Authentication Check
    if (!request.user) {
        return { status: 401, message: "Unauthorized" };
    }

    try {
        // 2. Fetch Options from Database
        // All queries scoped to the current user's company context
        const stores = Store.findAll();
        const salespersons = User.findAll({ where: { role: 'salesperson' } });
        const occupations = Occupation.findAll();
        const wholesaleCustomers = WholesaleCustomer.findAll();
        const customerGroups = CustomerGroup.findAll();
        
        // Fetch taxes, ordering by 'is_always_use' to ensure the default is first
        const serviceTaxes = Tax.findAll({ orderBy: { is_always_use: 'DESC' } });

        // 3. Determine Defaults
        const defaultStoreId = request.user.store_id;
        const defaultTax = serviceTaxes.find(t => t.is_always_use === true);

        // 4. Construct Response
        const response = {
            customer: {
                type: "retail",
                is_active: true,
                store_id: defaultStoreId,
                tax_id: defaultTax ? defaultTax.id : null
            },
            options: {
                stores: stores.map(s => ({ id: s.id, name: s.name })),
                salespersons: salespersons.map(u => ({ id: u.id, name: u.name })),
                occupations: occupations.map(o => ({ id: o.id, name: o.name })),
                wholesale_customers: wholesaleCustomers.map(w => ({ id: w.id, name: w.name })),
                customer_groups: customerGroups.map(g => ({ id: g.id, name: g.name })),
                service_taxes: serviceTaxes.map(t => ({ id: t.id, name: t.name }))
            }
        };

        return { status: 200, body: response };

    } catch (error) {
        // 5. Error Handling
        return { status: 500, message: "Internal Server Error" };
    }
}