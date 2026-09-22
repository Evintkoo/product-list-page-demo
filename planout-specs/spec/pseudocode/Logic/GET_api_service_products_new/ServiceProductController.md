/**
 * Controller to handle the initialization of the Service Product creation form.
 * Fetches default values and master data lists required for dropdowns and multi-selects.
 */
function getNewServiceProductForm() {
    // 1. Fetch master data for dropdowns and selections
    const serviceProductTypes = ServiceProductType.findAll();
    const serviceProductTags = ServiceProductTag.findAll();
    const taxes = Tax.findAll();
    const coas = Coa.findAll();
    const taxProductCodes = TaxProductCode.findAll();
    const taxUnitOfMeasures = TaxUnitOfMeasure.findAll();

    // 2. Determine default COA (Chart of Accounts) for tax fields
    const defaultCoa = Coa.find({ is_default: true });

    // 3. Construct the response object
    return {
        defaults: {
            active: true,
            open_price: false,
            estimated_time: null, <!-- MISSING_FIELD: ServiceProduct.estimated_time -->
            open_estimated_time: false, <!-- MISSING_FIELD: ServiceProduct.open_estimated_time -->
            price: 0, <!-- MISSING_FIELD: ServiceProduct.price -->
            including_tax: false, <!-- MISSING_FIELD: ServiceProduct.including_tax -->
            default_coa: defaultCoa
        },
        options: {
            types: serviceProductTypes,
            tags: serviceProductTags,
            taxes: taxes,
            coas: coas,
            tax_product_codes: taxProductCodes,
            tax_unit_of_measures: taxUnitOfMeasures
        }
    };
}