/**
 * Handles initial page load authentication check
 */
FUNCTION handlePageLoad():
    CALL GET /api/auth/me
    IF response is 200:
        REDIRECT to "/product-list"
    ELSE:
        STAY on Login Page

/**
 * Validates if the email exists in the system
 */
FUNCTION validateEmail(email):
    IF email is empty OR email format is invalid:
        RETURN error "Invalid email format"
    
    CALL POST /api/users/validate WITH { email }
    RETURN response.exists

/**
 * Handles user login attempt
 */
FUNCTION handleLogin(email, password):
    // 1. Client-side validation
    IF email is empty OR password is empty:
        RETURN error "Email and password are required"
    
    // 2. Authenticate
    CALL POST /api/auth/login WITH { email, password }
    
    IF response is 200:
        STORE response.token in secure storage
        REDIRECT to "/product-list"
    ELSE:
        RETURN error "Invalid credentials"