/**
 * Fetches the bootstrap data required to render the New Wholesale Customer form.
 * Aggregates default values and master data for dropdowns.
 */
function getNewWholesaleCustomerBootstrap() {
    // 1. Define default values based on Customer entity schema
    const defaults = {
        type: "wholesale",
        is_active: true,
        currency: "IDR",
        pricelist_id: null,
        sales_tax: null,
        credit_term: 0,
        credit_limit: 0,
        overdue_limit: 0,
        tax_on_sales_invoice_print: true
    };

    // 2. Fetch master data for dropdowns
    const options = {
        customer_groups: DB.CustomerGroup.findAll({ select: ["id", "name"] }),
        currencies: DB.Currency.findAll({ select: ["code", "name"] }),
        pricelists: DB.Pricelist.findAll({ select: ["id", "name"] }),
        sales_taxes: DB.SalesTax.findAll({ select: ["id", "name", "rate"] }),
        accounts: DB.Account.findAll({ select: ["id", "code", "name"] }),
        salespersons: DB.User.findAll({ select: ["id", "name"] }),
        countries: ["Indonesia", "Singapore", "Malaysia"] // Static list or from Country master
    };

    return {
        customer_wholesale: defaults,
        options: options
    };
}