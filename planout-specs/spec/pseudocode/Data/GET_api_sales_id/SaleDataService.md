/**
 * Orchestrates data retrieval and error handling for the Sales API.
 */

FUNCTION getSaleDetail(saleId: uuid):
    TRY:
        SET saleData = CALL SaleRepository.findSaleById(saleId)

        IF saleData IS NULL:
            THROW "NOT_FOUND_ERROR"

        RETURN saleData

    CATCH database_error:
        // Log the error for internal monitoring
        LOG "Database failure while fetching sale: " + saleId
        THROW "INTERNAL_SERVER_ERROR"