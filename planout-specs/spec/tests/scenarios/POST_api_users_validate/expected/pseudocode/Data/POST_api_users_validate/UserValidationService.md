import { userRepository } from './UserRepository';

/**
 * Service layer to handle business logic for user validation.
 */
class UserValidationService {
  /**
   * Validates user input against database constraints.
   * @param email - The email to validate.
   * @returns An object containing the validity status and any identified errors.
   */
  async validateUserAvailability(email?: string) {
    const errors = [];

    // 1. Basic format validation (if email is provided)
    if (!email || !this.isValidEmailFormat(email)) {
      errors.push({
        field: 'email',
        issue: 'Invalid email format'
      });
    } else {
      // 2. Database uniqueness check
      const exists = await userRepository.existsByEmail(email);
      if (exists) {
        errors.push({
          field: 'email',
          issue: 'A user with that email already exists'
        });
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const userValidationService = new UserValidationService();