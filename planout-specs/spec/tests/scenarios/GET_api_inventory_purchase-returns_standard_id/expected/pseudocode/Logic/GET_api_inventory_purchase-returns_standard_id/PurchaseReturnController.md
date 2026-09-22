/**
 * Controller to handle retrieval of Purchase Return Standard details.
 */
function getPurchaseReturnStandardDetails(request, response) {
    const { id } = request.params;
    const { company_id } = request.user; // Derived from authenticated session

    // 1. Fetch the primary Purchase Return record
    const purchaseReturn = database.PurchaseReturnStandard.findOne({
        where: {
            id: id,
            company_id: company_id
        }
    });

    // 2. Handle 404 if record not found within company scope
    if (!purchaseReturn) {
        return response.status(404).json({ error: "Purchase Return Standard not found." });
    }

    // 3. Fetch associated items
    const items = database.PurchaseReturnItem.findAll({
        where: {
            purchase_return_id: purchaseReturn.id
        }
    });

    // 4. Construct the response object
    // Note: Additional fields like supplier/warehouse names or journal references 
    // would be joined or fetched via service layer here.
    const responseData = {
        ...purchaseReturn,
        items: items,
        // <!-- MISSING_FIELD: PurchaseReturnStandard.amount_summary -->
        // <!-- MISSING_FIELD: PurchaseReturnStandard.payment_summary -->
        // <!-- MISSING_FIELD: PurchaseReturnStandard.journal_references -->
        // <!-- MISSING_FIELD: PurchaseReturnStandard.available_actions -->
    };

    return response.status(200).json(responseData);
}