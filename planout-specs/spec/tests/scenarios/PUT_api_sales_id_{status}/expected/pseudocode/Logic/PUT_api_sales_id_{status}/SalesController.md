FUNCTION handleUpdateSalesStatus(request, response):
    // Extract parameters from the URL path
    SET salesId = request.params.id
    SET newStatus = request.params.status

    // Validate status input
    IF newStatus NOT IN ["Draft", "Complete", "Canceled"]:
        RETURN response.status(400).json({ error: "Invalid status value provided" })

    TRY:
        // Check if the record exists
        SET existingRecord = DATABASE.SalesRetail.find(id = salesId)
        
        IF existingRecord IS NULL:
            RETURN response.status(404).json({ error: "Sales retail record not found" })

        // Perform the update
        SET updatedRecord = DATABASE.SalesRetail.update(
            id = salesId,
            fields = {
                status: newStatus,
                updated_at: CURRENT_TIMESTAMP
            }
        )

        // Return success response
        RETURN response.status(201).json(updatedRecord)

    CATCH error:
        // Log the error internally
        LOG_ERROR("Failed to update SalesRetail status: " + error.message)
        
        // Return generic server error
        RETURN response.status(500).json({ error: "An unexpected server error occurred" })