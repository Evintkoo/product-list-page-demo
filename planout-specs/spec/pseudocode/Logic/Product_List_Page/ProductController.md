/**
 * Handles UI events for the Product List Page
 */
class ProductController {
    
    // Triggered on initial page load
    async onPageLoad() {
        return await getProducts({ status: 'active', page: 1, limit: 20 });
    }

    // Triggered by clicking Active/Inactive tabs
    async onStatusTabChange(status: string) {
        return await getProducts({ status: status, page: 1, limit: 20 });
    }

    // Triggered by clicking the Apply Search button
    async onApplySearch(searchTerm: string) {
        return await getProducts({ search: searchTerm, page: 1, limit: 20 });
    }
}