/**
 * API Endpoint: GET /api/customers/:id
 * Orchestrates the retrieval of customer data for the detail page.
 */
ENDPOINT GET /api/customers/:id:
    TRY:
        customer = CALL CustomerRepository.getCustomerById(params.id)
        
        // Construct the response object mapping internal schema to UI requirements
        RETURN {
            "id": customer.id,
            "identity": {
                "name": customer.name,
                "email": customer.email,
                "phone": customer.phone
            },
            "salesperson": {
                "id": customer.salesperson_id
            },
            "group": customer.customer_group,
            "tax": {
                "tax_id": customer.tax_id,
                "vat_number": customer.vat_number
            },
            "settings": {
                "account_status": customer.account_status,
                "credit_terms": customer.credit_terms
            },
            "pricing": {
                "pricelist_id": customer.pricelist_id
            },
            "audit": {
                "created_at": customer.created_at,
                "updated_at": customer.updated_at,
                "created_by": customer.created_by,
                "updated_by": customer.updated_by,
                "source": customer.source
            }
        }
    CATCH Error:
        IF Error.code == 404:
            RETURN 404, "Customer not found"
        ELSE:
            RETURN 500, "Internal server error"