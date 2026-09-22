/**
 * Data Schema Mapping
 * Fields must match DATA SCHEMAS authoritative definitions
 */
export interface District {
  code: string;
  name: string;
  regency_name: string;
  province_name: string;
  id: string; // ORPHAN_FIELD: id
}

// Validation Rules:
// 1. Search triggers immediately on button click.
// 2. Pagination triggers immediate fetch of new page data.
// 3. Navigation tabs perform hard redirect to respective area pages.
// 4. District Code is strictly read-only.