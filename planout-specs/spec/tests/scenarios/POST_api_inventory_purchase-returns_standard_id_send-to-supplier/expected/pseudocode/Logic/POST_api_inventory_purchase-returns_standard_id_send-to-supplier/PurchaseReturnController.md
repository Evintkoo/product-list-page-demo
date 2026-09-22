/**
 * Handles the transition of a Purchase Return Standard record to "Sent to Supplier"
 */
function handleSendToSupplier(request, response) {
    const { id } = request.params;
    const { company_id, user_id } = request.auth;

    // 1. Fetch the record within the authenticated company scope
    const record = Database.PurchaseReturnStandard.findOne({
        id: id,
        company_id: company_id
    });

    if (!record) {
        return response.status(404).json({ error: "Purchase Return Standard not found" });
    }

    // 2. Validate workflow state
    if (record.workflow_state !== "Draft") {
        return response.status(409).json({ 
            error: "Purchase Return Standard must be in Draft state to be sent to supplier" 
        });
    }

    // 3. Execute state transition
    const updatedRecord = Database.PurchaseReturnStandard.update(
        { id: id },
        {
            workflow_state: "Sent to Supplier",
            sent_at: CurrentDateTime(),
            updated_at: CurrentDateTime(),
            updated_by: user_id
        }
    );

    // 4. Return success response
    return response.status(200).json(updatedRecord);
}