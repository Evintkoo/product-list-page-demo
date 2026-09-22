/**
 * Fetches active districts filtered by regency_id.
 * 
 * Logic:
 * 1. Validate that regency_id is provided and is a valid UUID.
 * 2. Query the District table where:
 *    - regency_id matches the input parameter
 *    - is_active is true
 * 3. Sort the results by the 'name' field in ascending order.
 * 4. Project the results to return only { id, name }.
 */
function getActiveDistrictsByRegency(regency_id: string) {
    if (!isValidUuid(regency_id)) {
        throw new Error("INVALID_REGENCY_ID");
    }

    return db.District.findMany({
        where: {
            regency_id: regency_id,
            is_active: true
        },
        orderBy: {
            name: "asc"
        },
        select: {
            id: true,
            name: true
        }
    });
}