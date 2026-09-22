/**
 * Maps the raw API response to the internal domain model used by the UI components.
 */
FUNCTION mapStockOutgoingResponse(data: RawApiResponse) {
    RETURN {
        items: data.results.map(item => ({
            id: item.id,
            referenceNumber: item.reference_number,
            status: item.status,
            destination: item.destination_warehouse_name, // Resolved via join in backend
            createdAt: FORMAT_DATE(item.created_at),
            totalItems: item.total_items
        })),
        pagination: {
            totalCount: data.total_count,
            currentPage: data.current_page,
            totalPages: data.total_pages
        }
    };
}