/**
 * Fetches a paginated list of Franchise Purchase Orders based on applied filters and sorting.
 * 
 * @param params - Object containing filters (status, date ranges, store/supplier IDs), 
 *                 pagination (page, limit), and sorting (field, direction).
 * @returns A promise resolving to the API response containing the data array and metadata.
 */
function fetchFranchisePurchaseOrders(params) {
    const query = buildQueryString({
        filters: params.filters,
        pagination: params.pagination,
        sorting: params.sorting
    });

    return apiClient.get(`/api/franchise-purchase-orders?${query}`);
}