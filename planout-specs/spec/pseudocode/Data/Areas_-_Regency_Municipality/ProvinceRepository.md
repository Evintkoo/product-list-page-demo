/**
 * Fetches all provinces for the filter dropdown.
 */
FUNCTION getProvinces():
    RETURN SELECT id, name FROM Province ORDER BY name ASC