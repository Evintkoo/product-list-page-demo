/**
 * Fetches a paginated list of regencies from the areas table.
 * Joins with the same table to resolve parent province names.
 */
function getRegencyList(filter: { name?: string, provinceId?: string }, pagination: { limit: number, offset: number }) {
  const query = `
    SELECT
      regency.id,
      regency.code,
      regency.name,
      regency.area_type,
      province.id AS province_id,
      province.name AS province_name,
      regency.created_at,
      regency.updated_at,
      COUNT(*) OVER() AS total_count
    FROM areas regency
    LEFT JOIN areas province
      ON province.id = regency.parent_id
      AND province.area_type = 'province'
    WHERE regency.area_type = 'regency'
      AND ($1::text IS NULL OR regency.name ILIKE '%' || $1 || '%')
      AND ($2::text IS NULL OR province.id::text = $2)
    ORDER BY regency.name ASC
    LIMIT $3 OFFSET $4;
  `;

  return db.execute(query, [
    filter.name,
    filter.provinceId,
    pagination.limit,
    pagination.offset
  ]);
}