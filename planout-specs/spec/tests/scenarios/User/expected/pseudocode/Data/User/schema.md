-- Core User Management
CREATE TABLE "User" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" VARCHAR(320) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" VARCHAR(50) DEFAULT 'staff', -- ENUM: admin, manager, staff, HO Salesperson
    "is_active" BOOLEAN DEFAULT TRUE,
    "must_change_password" BOOLEAN DEFAULT FALSE,
    "failed_login_count" INTEGER DEFAULT 0,
    "locked_until" TIMESTAMPTZ,
    "last_login_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE UNIQUE INDEX users_email_lower_idx ON "User" (lower(email));

-- Session Management
CREATE TABLE "Session" (
    "id" VARCHAR(64) PRIMARY KEY, -- HMAC-SHA256(SESSION_SECRET, rawToken)
    "user_id" UUID NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "expires_at" TIMESTAMPTZ NOT NULL,
    "absolute_expires_at" TIMESTAMPTZ NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT now(),
    "last_used_at" TIMESTAMPTZ DEFAULT now(),
    "ip" VARCHAR(64),
    "user_agent" TEXT
);

CREATE INDEX sessions_user_id_idx ON "Session" (user_id);
CREATE INDEX sessions_expires_at_idx ON "Session" (expires_at);

-- Security & Audit
CREATE TABLE "AuditLog" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "actor_user_id" UUID REFERENCES "User"(id) ON DELETE SET NULL,
    "action" VARCHAR(64) NOT NULL,
    "target_user_id" UUID REFERENCES "User"(id) ON DELETE SET NULL,
    "detail" JSONB,
    "ip" VARCHAR(64),
    "created_at" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX audit_log_created_idx ON "AuditLog" (created_at);

CREATE TABLE "LoginAttempt" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" VARCHAR(320),
    "ip" VARCHAR(64),
    "success" BOOLEAN DEFAULT FALSE,
    "created_at" TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX login_attempts_ip_created_idx ON "LoginAttempt" (ip, created_at);
CREATE INDEX login_attempts_email_created_idx ON "LoginAttempt" (email, created_at);