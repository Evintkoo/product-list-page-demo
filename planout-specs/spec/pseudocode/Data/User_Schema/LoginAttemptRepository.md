// Records login attempts for throttling and lockout logic
function recordLoginAttempt(attempt: LoginAttempt): void {
  db.execute(`
    INSERT INTO login_attempts (id, email, ip, success, created_at)
    VALUES ($1, $2, $3, $4, $5)
  `, [attempt.id, attempt.email, attempt.ip, attempt.success, attempt.created_at]);
}