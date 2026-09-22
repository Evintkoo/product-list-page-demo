/**
 * Orchestrates the data retrieval for the Payment Type API.
 * Ensures the company context is injected from the authenticated user session.
 */
FUNCTION listPaymentTypes(userSession, queryParams):
    // Validate query parameters
    IF queryParams.limit < 0 OR queryParams.offset < 0:
        THROW InvalidArgumentError("Pagination parameters must be non-negative")

    // Extract company context from session
    companyId = userSession.company_id

    // Map query params to filter object
    filters = {
        is_active: queryParams.is_active,
        kind: queryParams.kind
    }
    
    pagination = {
        limit: queryParams.limit OR 50,
        offset: queryParams.offset OR 0
    }

    RETURN PaymentTypeRepository.getPaymentTypes(companyId, filters, pagination)