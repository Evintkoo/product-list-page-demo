/**
 * Service layer to abstract data access for Stock Opname
 */
const StockOpnameService = {
    /**
     * Fetches paginated or filtered stock takes
     * @param query - The search string from the UI
     */
    async fetchStockTakes(query: string) {
        try {
            const response = await apiClient.get('/api/stock-opname', {
                params: { query }
            });
            return response.data;
        } catch (error) {
            throw new Error("Failed to retrieve Stock Opname list: " + error.message);
        }
    }
};