/**
 * Fetches active regencies filtered by province_id.
 * Results are sorted alphabetically by name.
 */
FUNCTION getActiveRegenciesByProvince(province_id: UUID):
    QUERY database:
        SELECT id, name
        FROM Regency
        WHERE province_id = :province_id
          AND is_active = TRUE
        ORDER BY name ASC

    RETURN result_set