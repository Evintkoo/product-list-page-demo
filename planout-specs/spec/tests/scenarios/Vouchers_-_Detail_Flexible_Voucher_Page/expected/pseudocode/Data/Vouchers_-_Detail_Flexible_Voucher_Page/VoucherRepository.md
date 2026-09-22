/**
 * Data access layer for retrieving flexible voucher details.
 * This service interacts directly with the database to fetch product information.
 */

FUNCTION getVoucherById(voucherId: uuid):
    // Query the Voucher table for a record matching the provided ID
    // Ensure the product is flagged as 'flexible' to maintain business scope
    SET voucherRecord = SELECT * FROM Voucher 
                        WHERE id = voucherId 
                        AND is_flexible = TRUE;

    IF voucherRecord IS NULL:
        THROW Error("Flexible voucher not found or invalid product type");

    RETURN voucherRecord;