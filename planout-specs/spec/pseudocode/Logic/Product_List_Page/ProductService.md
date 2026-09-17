/**
 * Fetches a paginated list of products from the database.
 * Supports optional filtering by search term and brand.
 */
function getProducts(page: integer, limit: integer, searchQuery: string, brandFilter: string) {
    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Query the Product entity
    // Apply filters if provided:
    // - productName or productCode matches searchQuery
    // - brandName matches brandFilter
    const products = database.Product.findMany({
        where: {
            OR: [
                { productName: { contains: searchQuery } },
                { productCode: { contains: searchQuery } }
            ],
            brandName: brandFilter
        },
        skip: offset,
        take: limit,
        orderBy: { created_at: 'desc' }
    });

    return products;
}