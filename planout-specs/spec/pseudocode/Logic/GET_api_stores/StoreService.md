/**
 * Service layer for Store entity operations.
 */
FUNCTION getAllStores():
    // Query the Store entity for all records
    // Fields: id, name, location_code, is_active, created_at
    RETURN Database.query("SELECT id, name, location_code, is_active, created_at FROM Store")