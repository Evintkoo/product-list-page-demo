/**
 * Data Access Layer for Store entities.
 * Handles the mapping between the database schema and the application response format.
 */

// Define the interface for the Store record as stored in the database
interface StoreRecord {
  store_id: string;
  store_name: string;
  store_code: string;
}

/**
 * Retrieves all stores from the Store table.
 * Maps the database columns to the standardized Store List Response format.
 */
async function getAllStores(): Promise<{ data: StoreRecord[] }> {
  // Execute query: SELECT store_id, store_name, store_code FROM Store;
  const records = await database.query("SELECT store_id, store_name, store_code FROM Store");
  
  return {
    data: records.map((row: StoreRecord) => ({
      store_id: row.store_id,
      store_name: row.store_name,
      store_code: row.store_code
    }))
  };
}