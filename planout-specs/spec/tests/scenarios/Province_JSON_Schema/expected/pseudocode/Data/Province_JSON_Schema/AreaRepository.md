/**
 * Fetches a paginated list of provinces from the areas table.
 * 
 * @param nameFilter - Optional string to filter provinces by name (ILIKE).
 * @param limit - Number of records to return.
 * @param offset - Number of records to skip.
 * @returns An object containing the data array and pagination metadata.
 */
FUNCTION getProvinceList(nameFilter: string | NULL, limit: integer, offset: integer):
  
  // Execute query against the 'areas' table
  // Filter by area_type = 'province'
  // Apply optional name ILIKE filter
  // Sort by name ASC
  // Apply pagination (LIMIT/OFFSET)
  // Use window function COUNT(*) OVER() to retrieve total_count for pagination
  
  rows = DB.query(`
    SELECT 
      id, code, name, area_type, created_at, updated_at,
      COUNT(*) OVER() AS total_count
    FROM areas
    WHERE area_type = 'province'
      AND ($1::text IS NULL OR name ILIKE '%' || $1 || '%')
    ORDER BY name ASC
    LIMIT $2 OFFSET $3
  `, [nameFilter, limit, offset])

  // Map database rows to the AreaProvinceListResponse schema
  RETURN {
    data: rows.map(row => ({
      id: row.id,
      code: row.code,
      name: row.name
    })),
    pagination: {
      limit: limit,
      offset: offset,
      total: rows.length > 0 ? rows[0].total_count : 0
    }
  }

END FUNCTION