/**
 * Data access layer for User entity operations.
 */
class UserRepository {
  /**
   * Checks if a user exists in the database by email.
   * @param email - The email address to check (normalized to lowercase).
   * @returns boolean - True if a record exists, false otherwise.
   */
  async existsByEmail(email: string): Promise<boolean> {
    const normalizedEmail = email.trim().toLowerCase();
    
    const userCount = await db.User.count({
      where: {
        email: normalizedEmail
      }
    });

    return userCount > 0;
  }
}

export const userRepository = new UserRepository();