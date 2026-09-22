/**
 * Fetches a paginated list of villages with their hierarchical parent data.
 * Maps the flat SQL join result to the AreaVillageListResponse structure.
 */
async function getVillageList(filters: {
  name?: string;
  province_id?: string;
  regency_municipality_id?: string;
  district_id?: string;
  limit: number;
  offset: number;
}) {
  const query = `
    SELECT
      village.id,
      village.code,
      village.name,
      village.area_type,
      district.id AS district_id,
      district.name AS district_name,
      regency.id AS regency_municipality_id,
      regency.name AS regency_municipality_name,
      province.id AS province_id,
      province.name AS province_name,
      village.created_at,
      village.updated_at,
      COUNT(*) OVER() AS total_count
    FROM areas village
    LEFT JOIN areas district ON district.id = village.parent_id AND district.area_type = 'district'
    LEFT JOIN areas regency ON regency.id = district.parent_id AND regency.area_type IN ('regency', 'municipality')
    LEFT JOIN areas province ON province.id = regency.parent_id AND province.area_type = 'province'
    WHERE village.area_type = 'village'
      AND ($1::text IS NULL OR village.name ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR province.id::text = $2)
      AND ($3::text IS NULL OR regency.id::text = $3)
      AND ($4::text IS NULL OR district.id::text = $4)
    ORDER BY village.name ASC
    LIMIT $5 OFFSET $6;
  `;

  const result = await db.execute(query, [
    filters.name,
    filters.province_id,
    filters.regency_municipality_id,
    filters.district_id,
    filters.limit,
    filters.offset
  ]);

  return {
    data: result.rows.map(row => ({
      id: row.id,
      code: row.code,
      name: row.name,
      district_id: row.district_id,
      district_name: row.district_name,
      regency_municipality_id: row.regency_municipality_id,
      regency_municipality_name: row.regency_municipality_name,
      province_id: row.province_id,
      province_name: row.province_name
    })),
    pagination: {
      limit: filters.limit,
      offset: filters.offset,
      total: result.rows[0]?.total_count || 0
    }
  };
}