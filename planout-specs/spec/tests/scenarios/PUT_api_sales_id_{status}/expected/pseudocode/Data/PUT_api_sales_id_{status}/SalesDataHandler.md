/**
 * Orchestrates data operations for the PUT /api/sales/:id/:status endpoint.
 */

FUNCTION handleStatusUpdate(id: uuid, status: string):
    TRY:
        updatedRecord = updateSalesStatus(id, status)
        RETURN {
            code: 201,
            data: updatedRecord
        }
    CATCH InvalidArgumentException:
        RETURN { code: 400, message: "Invalid request payload or status" }
    CATCH NotFoundException:
        RETURN { code: 404, message: "Sales record does not exist" }
    CATCH Exception:
        RETURN { code: 500, message: "Unexpected server error" }