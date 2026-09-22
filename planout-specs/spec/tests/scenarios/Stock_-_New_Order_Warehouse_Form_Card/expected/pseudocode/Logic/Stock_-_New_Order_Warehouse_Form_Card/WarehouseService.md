/**
 * Fetches active warehouses for the "From Warehouse" dropdown.
 */

function getActiveWarehouses() {
    return database.Warehouse.findMany({
        where: {
            is_active: true
        },
        select: ['id', 'name', 'location_code']
    });
}