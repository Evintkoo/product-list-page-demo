// Records security-relevant events
function logAuditEvent(event: AuditLog): void {
  db.execute(`
    INSERT INTO audit_log (id, actor_user_id, action, target_user_id, detail, ip, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `, [event.id, event.actor_user_id, event.action, event.target_user_id, event.detail, event.ip, event.created_at]);
}