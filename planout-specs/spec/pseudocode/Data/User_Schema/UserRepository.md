// Fetches a user by email for authentication purposes
// Returns the full user record including password_hash
function findUserByEmail(email: string): User | null {
  return db.query(
    "SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
    [email]
  );
}

// Fetches a paginated list of users based on filters
// Returns items and total_count for metadata
function listUsers(params: UserListQueryParams): { items: User[], total_count: number } {
  return db.query(`
    SELECT *, COUNT(*) OVER() AS total_count
    FROM users
    WHERE ($1::uuid IS NULL OR id = $1)
      AND ($2::text IS NULL OR name ILIKE '%' || $2 || '%')
      AND ($3::text IS NULL OR LOWER(email) = LOWER($3))
      AND ($4::text IS NULL OR role = $4)
      AND ($5::boolean IS NULL OR is_active = $5)
      AND ($6::uuid IS NULL OR id > $6)
    ORDER BY id ASC
    LIMIT $7
  `, [params.id, params.name, params.email, params.role, params.is_active, params.after_id, params.page_limit]);
}