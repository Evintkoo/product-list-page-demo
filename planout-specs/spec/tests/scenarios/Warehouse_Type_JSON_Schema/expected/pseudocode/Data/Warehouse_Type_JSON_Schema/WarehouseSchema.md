/**
 * Data Transfer Object definition for the Warehouse list response.
 * Ensures consistency between the database layer and the API response.
 */
interface WarehousesListResponse {
  records: number; // Total count
  pages: number;   // Total pages
  after_id?: number; // Cursor for next page
  warehouses: Array<{
    id: number;
    name: string;
    warehouse_code: string;
    updated_at: string;
    active: boolean;
  }>;
}