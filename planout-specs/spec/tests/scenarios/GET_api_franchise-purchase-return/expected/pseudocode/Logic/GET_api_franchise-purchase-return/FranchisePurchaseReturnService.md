/**
 * Service layer to interact with the database for FranchisePurchaseReturn entities.
 */
const FranchisePurchaseReturnService = {
    findReturns: function(filters) {
        let query = DB.table("FranchisePurchaseReturn").where("franchise_id", filters.franchise_id);

        // Apply date range filters if provided
        if (filters.startDate) {
            query = query.where("return_date", ">=", filters.startDate);
        }
        if (filters.endDate) {
            query = query.where("return_date", "<=", filters.endDate);
        }

        // Apply pagination
        const offset = (filters.page - 1) * filters.limit;
        return query
            .limit(filters.limit)
            .offset(offset)
            .orderBy("created_at", "DESC")
            .execute();
    }
};