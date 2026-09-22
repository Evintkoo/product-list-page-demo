/**
 * API Endpoints for Customer management
 */

// GET /api/customers/new?retail=1
FUNCTION getNewRetailCustomerDefaults():
    // Fetch metadata for dropdowns (e.g., country lists, address types)
    RETURN {
        "address_types": ["billing", "shipping", "home"],
        "defaults": { "type": "retail" }
    }
END FUNCTION

// POST /api/customers
FUNCTION handleCreateCustomer(requestBody: CustomerCreateRequest):
    TRY:
        // Validate requestBody structure
        IF NOT isValid(requestBody):
            RETURN 400, "Invalid request format"

        // Persist to database
        createdCustomer = createRetailCustomer(requestBody)

        // Return 201 Created with the new entity ID
        RETURN 201, { "id": createdCustomer.id, "status": "success" }
    CATCH error:
        RETURN 500, "Failed to create customer: " + error.message
END FUNCTION