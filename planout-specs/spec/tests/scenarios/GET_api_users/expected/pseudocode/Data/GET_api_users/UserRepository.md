/**
 * Fetches a paginated list of users from the database.
 * The requirement specifies "newest first", so we sort by created_at descending.
 */
FUNCTION fetchUsers(limit: integer, offset: integer):
    RETURN Database.query(
        "SELECT id, email, full_name, role, created_at 
         FROM User 
         ORDER BY created_at DESC 
         LIMIT :limit OFFSET :offset",
        { limit, offset }
    )

/**
 * Validates if the requesting user has the 'admin' role.
 */
FUNCTION isUserAdmin(userId: uuid):
    user = Database.query("SELECT role FROM User WHERE id = :userId", { userId })
    RETURN user.role == 'ADMIN'