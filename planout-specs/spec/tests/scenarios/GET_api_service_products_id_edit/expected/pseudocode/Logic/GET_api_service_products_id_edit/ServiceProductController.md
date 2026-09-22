/**
 * Controller to handle the retrieval of a Service Product for the edit form.
 */
function getServiceProductEditForm(request) {
    const { id } = request.params;

    // 1. Fetch the specific Service Product record
    const serviceProduct = Database.ServiceProduct.findById(id);
    
    if (!serviceProduct) {
        return Response.notFound({ error: "Service product not found" });
    }

    // 2. Fetch all necessary lookup data for dropdowns
    // Note: Finance-related entities (taxes, accounts) are fetched via external service calls
    const data = {
        service_product: serviceProduct,
        types: Database.ServiceProductType.findAll(),
        tags: Database.ServiceProductTag.findAll(),
        tax_product_codes: Database.TaxProductCode.findAll(),
        tax_unit_of_measures: Database.TaxUnitOfMeasure.findAll(),
        taxes: FinanceService.getAvailableTaxes(), <!-- MISSING_FIELD: Finance.Tax -->
        accounts: FinanceService.getAvailableAccounts() <!-- MISSING_FIELD: Finance.Account -->
    };

    // 3. Return the combined payload for the form
    return Response.ok(data);
}