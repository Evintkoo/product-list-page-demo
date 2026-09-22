FUNCTION findAll(orderBy, orderDirection):
    // Query the User entity directly
    // Fields: id, email, role, created_at, full_name
    RETURN DATABASE.query(
        SELECT id, email, role, created_at, full_name 
        FROM User 
        ORDER BY created_at DESC
    )