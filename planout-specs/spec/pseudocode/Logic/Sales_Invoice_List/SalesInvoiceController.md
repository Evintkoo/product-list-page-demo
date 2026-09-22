/**
 * Orchestrates the logic for the Sales Invoice List view.
 */
class SalesInvoiceController {
    async handleLoad() {
        const initialQuery = { page: 1, page_size: 20 };
        const response = await fetchSalesInvoices(initialQuery);
        return mapToTableFormat(response);
    }

    async handleSearch(searchTerm: string) {
        const query = {
            search_term: searchTerm,
            page: 1, // Reset to first page on new search
            page_size: 20
        };
        const response = await fetchSalesInvoices(query);
        return mapToTableFormat(response);
    }
}