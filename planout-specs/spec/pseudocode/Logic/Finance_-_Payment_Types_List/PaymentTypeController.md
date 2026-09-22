/**
 * Handles the transformation of raw API data into the UI-ready format
 * defined by the JSON Field Mapping Rules.
 */
function mapPaymentTypeResponse(data) {
    return {
        items: data.items.map((item, index) => ({
            rowNumber: (data.pagination.page - 1) * data.pagination.page_size + index + 1,
            id: item.id,
            name: item.name,
            payment_type: item.type,
            bank_card_provider: item.card_provider,
            payment_service_provider: item.payment_provider,
            provider_fee_rate: item.provider_fee_rate,
            enable_refund: item.enable_refund,
            skip_invoice_receivables: item.skip_invoice_receivables
        })),
        pagination: {
            currentPage: data.pagination.page,
            rowsPerPage: data.pagination.page_size,
            totalPages: data.pagination.total_pages,
            totalItems: data.pagination.total_items
        }
    };
}