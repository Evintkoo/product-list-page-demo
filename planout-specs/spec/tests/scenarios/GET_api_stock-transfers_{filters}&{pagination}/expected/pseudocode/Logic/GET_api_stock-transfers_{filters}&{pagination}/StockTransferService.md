/**
 * Logic layer for StockTransfer data access
 */
const StockTransferService = {
    findMany: (filters, pagination) => {
        // Build query base
        let query = DB.table('StockTransfer').where('company_id', filters.company_id);

        // Apply dynamic filters
        if (filters.source_warehouse_id) query = query.where('source_warehouse_id', filters.source_warehouse_id);
        if (filters.destination_warehouse_id) query = query.where('destination_warehouse_id', filters.destination_warehouse_id);
        if (filters.status) query = query.where('status', filters.status);

        // Get total count for pagination
        const totalCount = query.count();

        // Apply sorting and pagination
        const rows = query
            .orderBy('created_at', 'DESC')
            .limit(pagination.limit)
            .offset(pagination.offset)
            .select('id', 'company_id', 'source_warehouse_id', 'destination_warehouse_id', 'status', 'created_at');

        return { rows, totalCount };
    }
};