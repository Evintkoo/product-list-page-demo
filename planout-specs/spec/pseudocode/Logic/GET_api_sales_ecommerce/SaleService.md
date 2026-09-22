/**
 * Service layer for Sale entity operations.
 */
const SaleService = {
    listEcommerceSales: (filters) => {
        // Enforce scope: source must be 'ecommerce'
        const query = {
            source: "ecommerce",
            customer_id: filters.customer_id,
            status: filters.status
        };

        // Fetch from database
        return Database.Sale.findMany({
            where: query,
            limit: filters.limit,
            offset: filters.offset,
            orderBy: { created_at: "DESC" }
        });
    }
};