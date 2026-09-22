/**
 * Maps raw database entities to the format expected by the API layer.
 * Ensures consistent data structure for the frontend consumption.
 */

FUNCTION mapVoucherToResponse(voucherRecord):
    RETURN {
        "id": voucherRecord.id,
        "productName": voucherRecord.name,
        "description": voucherRecord.description,
        "value": {
            "amount": voucherRecord.base_value,
            "currency": voucherRecord.currency
        },
        "status": voucherRecord.status,
        "isFlexible": voucherRecord.is_flexible
    };