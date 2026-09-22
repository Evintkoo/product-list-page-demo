/**
 * Fetches a user record by their unique identifier.
 * Used by the Auth service to retrieve the current session user.
 */
FUNCTION findUserById(userId: UUID):
    RETURN database.query(
        "SELECT id, email, full_name, must_change_password, is_active FROM User WHERE id = :userId",
        { userId }
    )

/**
 * Maps the internal User entity to the PublicUser schema.
 * Ensures sensitive fields like password_hash are never exposed.
 */
FUNCTION mapToPublicUser(userRecord):
    RETURN {
        "id": userRecord.id,
        "email": userRecord.email,
        "fullName": userRecord.full_name,
        "mustChangePassword": userRecord.must_change_password,
        "isActive": userRecord.is_active
    }