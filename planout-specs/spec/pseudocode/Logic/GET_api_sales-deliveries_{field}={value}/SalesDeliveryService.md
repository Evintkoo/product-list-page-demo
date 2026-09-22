/**
 * Service to interact with the SalesDelivery data store.
 */
const SalesDeliveryService = {
    find: function(filters) {
        // Construct query based on provided filters
        // Maps directly to SalesDelivery entity fields
        return Database.SalesDelivery.findMany({
            where: filters
        });
    }
};