/**
 * Data access layer for Store metadata.
 */

function getAllStores() {
  // SELECT id, store_name FROM Store
  return database.table("Store").select("id", "store_name");
}