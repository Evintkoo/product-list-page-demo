/**
 * Data access layer for SalesRetail entities.
 * Handles persistence logic for status transitions.
 */

FUNCTION findSalesById(id: uuid):
    RETURN SalesRetail.find(id)

FUNCTION updateSalesStatus(id: uuid, newStatus: string):
    // Validate that the status is one of the allowed enum values
    IF newStatus NOT IN ["Draft", "Complete", "Canceled"]:
        THROW InvalidArgumentException("Unsupported status value")

    // Attempt to locate the record
    record = findSalesById(id)
    
    IF record IS NULL:
        THROW NotFoundException("Sales retail record not found")

    // Perform the update
    record.status = newStatus
    record.updated_at = CURRENT_TIMESTAMP
    
    RETURN record.save()