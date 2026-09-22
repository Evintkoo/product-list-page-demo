/**
 * Fetches a paginated list of villages based on optional filters.
 * Joins District, Regency, and Province to provide full location hierarchy.
 */
FUNCTION getVillages(filters: {
  name?: string,
  province_id?: uuid,
  regency_municipality_id?: uuid,
  district_id?: uuid,
  limit: integer,
  offset: integer
}):
  QUERY = SELECT 
    v.code, 
    v.name, 
    d.name AS district_name, 
    r.name AS regency_municipality_name, 
    p.name AS province_name
  FROM Village v
  JOIN District d ON v.district_id = d.id
  JOIN Regency r ON d.regency_id = r.id
  JOIN Province p ON r.province_id = p.id
  WHERE 1=1
    IF filters.name:
      AND v.name ILIKE %filters.name%
    IF filters.district_id:
      AND v.district_id = filters.district_id
    IF filters.regency_municipality_id:
      AND r.id = filters.regency_municipality_id
    IF filters.province_id:
      AND p.id = filters.province_id
  ORDER BY v.name ASC
  LIMIT filters.limit
  OFFSET filters.offset

  RETURN EXECUTE(QUERY)