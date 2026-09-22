/**
 * Service layer to interact with the database for Stock Opname operations.
 */

const StockOpnameService = {
    create: async (data) => {
        // Perform database insertion for the new Stock Opname session
        // This establishes the context for the subsequent stock counting process
        const newOpname = await db.STOCK_OPNAME.insert({
            store_id: data.store_id,
            product_type_id: data.product_type_id,
            product_brand_id: data.product_brand_id,
            status: 'DRAFT' <!-- MISSING_FIELD: STOCK_OPNAME.status -->
        });

        return newOpname;
    }
};