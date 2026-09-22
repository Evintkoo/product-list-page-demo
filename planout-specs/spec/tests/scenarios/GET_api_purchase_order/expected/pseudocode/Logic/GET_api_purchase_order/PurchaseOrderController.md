/**
 * Controller to handle retrieval of purchase orders for a company.
 */
FUNCTION GET_PurchaseOrders(request):
    // 1. Authentication & Authorization
    IF NOT request.isAuthenticated():
        RETURN 401 Unauthorized

    // Extract company_id from the authenticated user's session/context
    // <!-- MISSING_FIELD: User.company_id -->
    SET userCompanyId = request.user.company_id 

    // 2. Data Retrieval
    // Fetch all PurchaseOrder records associated with the company
    SET orders = Database.PurchaseOrder.findMany(
        WHERE company_id = userCompanyId
    )

    // 3. Response
    RETURN 200 OK, orders