/**
 * Data Transfer Object definition for the Regency List API response.
 * Maps the database result set to the required JSON structure.
 */
interface AreaRegencyListResponse {
  data: Array<{
    id: string | number;
    code: string;
    name: string;
    province_id: string | number | null;
    province_name: string | null;
  }>;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}