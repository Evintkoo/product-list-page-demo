/**
 * Fetches the flexible voucher details by ID.
 * Maps the backend response to the UI fields as per the mapping rules.
 */
function getVoucherDetails(id: UUID) {
    const response = API.get(`/voucher_flexibles/${id}`);
    
    if (response.status === 200) {
        return mapResponseToFields(response.data);
    } else {
        throw new Error("Failed to fetch voucher details");
    }
}

function mapResponseToFields(data) {
    return {
        name: data.name,
        description: data.description,
        status: data.status,
        baseValue: data.base_value,
        currency: data.currency,
        createdAt: data.created_at,
        // Fields below are required by the UI but missing from the provided DATA SCHEMA
        sku: data.sku, <!-- MISSING_FIELD: Voucher.sku -->
        price: data.price, <!-- MISSING_FIELD: Voucher.price -->
        expireInMonths: data.expireInMonths, <!-- MISSING_FIELD: Voucher.expireInMonths -->
        expireInDays: data.expireInDays, <!-- MISSING_FIELD: Voucher.expireInDays -->
        sellLocation: data.sellLocation, <!-- MISSING_FIELD: Voucher.sellLocation -->
        receiveLocation: data.receiveLocation, <!-- MISSING_FIELD: Voucher.receiveLocation -->
        validFrom: data.validFrom, <!-- MISSING_FIELD: Voucher.validFrom -->
        validUntil: data.validUntil, <!-- MISSING_FIELD: Voucher.validUntil -->
        externalPublisher: data.externalPublisher, <!-- MISSING_FIELD: Voucher.externalPublisher -->
        openPrice: data.openPrice, <!-- MISSING_FIELD: Voucher.openPrice -->
        validForMember: data.validForMember, <!-- MISSING_FIELD: Voucher.validForMember -->
        updatedAt: data.updatedAt, <!-- MISSING_FIELD: Voucher.updatedAt -->
        creatorId: data.creatorId, <!-- MISSING_FIELD: Voucher.creatorId -->
        updaterId: data.updaterId <!-- MISSING_FIELD: Voucher.updaterId -->
    };
}