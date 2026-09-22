/**
 * Service layer for Sales Quotation data access
 */
const SalesQuotationService = {
    fetchList: (filters, pagination) => {
        // Base query scoped to company
        let query = DB.sales_quotations.find({ company_id: filters.company_id });

        // Apply filters
        if (filters.document_number) {
            query = query.where("document_number").startsWith(filters.document_number.value);
        }
        if (filters.sales_order_id) {
            query = query.where("sales_order_id").equals(filters.sales_order_id);
        }
        if (filters.customer_name) {
            query = query.where("customer_name").contains(filters.customer_name.value);
        }
        if (filters.workflow_state) {
            query = query.where("workflow_state").equals(filters.workflow_state);
        }

        // Apply sorting (Hard-coded per requirements)
        query = query.orderBy("created_at", "DESC");

        // Apply pagination
        const totalCount = query.count();
        const data = query.limit(pagination.limit).offset(pagination.offset).execute();

        return {
            data: data,
            metadata: {
                total: totalCount,
                limit: pagination.limit,
                offset: pagination.offset
            }
        };
    }
};