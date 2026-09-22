/**
 * Service layer to handle data access logic for Sales.
 */
const SalesService = {
    findSales: ({ company_id, store_id, limit, offset, filters }) => {
        // Base Query Construction
        // Fixed scope: source = 'POS' and workflow_state != 'voided'
        let query = db.Sale.where({
            company_id: company_id,
            store_id: store_id,
            source: 'POS'
        }).whereNot({
            workflow_state: 'voided'
        });

        // Apply dynamic filters
        if (filters.salesperson_id) {
            query = query.where({ salesperson_id: filters.salesperson_id });
        }
        
        if (filters.created_at_from) {
            query = query.where('created_at', '>=', filters.created_at_from);
        }
        
        if (filters.created_at_to) {
            query = query.where('created_at', '<=', filters.created_at_to);
        }

        // Apply pagination and sorting
        return query
            .orderBy('created_at', 'desc')
            .limit(limit)
            .offset(offset)
            .fetchAll();
    }
};