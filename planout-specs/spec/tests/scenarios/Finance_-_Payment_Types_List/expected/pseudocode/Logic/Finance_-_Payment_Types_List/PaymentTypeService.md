/**
 * Fetches payment types based on filter criteria and pagination.
 * @param {Object} filters - The filter object containing search criteria.
 * @param {number} page - Current page number.
 * @param {number} pageSize - Number of items per page.
 */
function getPaymentTypes(filters = {}, page = 1, pageSize = 20) {
    const queryParams = {
        name: filters.name || null,
        type: filters.type || null,
        enable_refund: filters.enable_refund ?? null,
        skip_invoice_receivables: filters.skip_invoice_receivables ?? null,
        is_active: filters.is_active ?? true,
        page: page,
        page_size: pageSize
    };

    return fetch("/api/payment-types", {
        method: "GET",
        params: queryParams
    }).then(response => response.json());
}