/**
 * Fetches a paginated list of Regencies/Municipalities based on optional filters.
 * 
 * @param {Object} params
 * @param {string} [params.name] - Partial match filter for Regency name
 * @param {string} [params.province_id] - Exact match filter for Province ID
 * @param {number} [params.limit=20] - Number of records to return
 * @param {number} [params.offset=0] - Number of records to skip
 * 
 * @returns {Promise<{data: Regency[], total: number}>}
 */
FUNCTION getRegencies(params):
    QUERY = SELECT 
        r.code, 
        r.name, 
        p.name AS province_name 
    FROM Regency r
    JOIN Province p ON r.province_id = p.id
    WHERE 1=1

    IF params.name IS NOT NULL:
        APPEND "AND r.name ILIKE %params.name%" TO QUERY

    IF params.province_id IS NOT NULL:
        APPEND "AND r.province_id = params.province_id" TO QUERY

    APPEND "ORDER BY r.name ASC" TO QUERY
    APPEND "LIMIT params.limit OFFSET params.offset" TO QUERY

    EXECUTE QUERY AND RETURN result_set