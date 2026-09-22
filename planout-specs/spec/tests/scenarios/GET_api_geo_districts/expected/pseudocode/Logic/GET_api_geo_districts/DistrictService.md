/**
 * Logic layer for District data access.
 */
function getActiveDistrictsByRegency(regencyId) {
    // Query the District entity
    // Filter by regency_id and is_active = true
    // Sort by name ascending
    return Database.query("District")
        .where("regency_id", "=", regencyId)
        .where("is_active", "=", true)
        .orderBy("name", "ASC")
        .execute();
}