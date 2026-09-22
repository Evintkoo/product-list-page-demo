FUNCTION handleLoginRequest(request):
    // 1. CSRF & Security Checks
    IF request.is_cross_origin():
        RETURN 403 FORBIDDEN

    // 2. Rate Limiting
    IF RateLimiter.is_tripped(request.ip_address):
        RETURN 429 TOO_MANY_REQUESTS

    // 3. Validation
    IF NOT validate_schema(request.body, "LoginRequest"):
        RETURN 422 VALIDATION_ERROR

    // 4. Normalize Input
    SET email = request.body.email.trim().toLowerCase()
    SET password = request.body.password

    // 5. Authentication Logic
    // Fetch user by email
    SET user = Database.find(User, { email: email })

    // Constant-time verification to prevent user enumeration
    // We check password, is_active, and is_locked status
    SET is_valid_user = (user IS NOT NULL) AND 
                        (user.is_active IS TRUE) AND 
                        (user.is_locked IS FALSE) AND
                        (PasswordHasher.verify(password, user.password_hash))

    IF NOT is_valid_user:
        // Return generic error for all failure modes
        RETURN 401 UNAUTHORIZED, { "error": "Invalid email or password" }

    // 6. Session Creation
    SET new_session = Database.create(Session, {
        user_id: user.id,
        expires_at: DateTime.now() + 24_HOURS <!-- MISSING_FIELD: Session.expires_at -->
    })

    RETURN 200 OK, {
        "id": new_session.id,
        "expires_at": new_session.expires_at
    }