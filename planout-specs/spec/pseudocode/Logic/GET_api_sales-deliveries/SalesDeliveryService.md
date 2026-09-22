/**
 * Service layer to interact with the SalesDelivery data schema.
 */
const SalesDeliveryService = {
    findAll: (filters) => {
        const query = {};
        
        // Apply filter if order_id is provided
        if (filters.order_id) {
            query.order_id = filters.order_id;
        }

        // Query the SalesDelivery entity
        // Fields: id, order_id, delivery_date, status, tracking_number, created_at
        return Database.SalesDelivery.findMany(query);
    }
};