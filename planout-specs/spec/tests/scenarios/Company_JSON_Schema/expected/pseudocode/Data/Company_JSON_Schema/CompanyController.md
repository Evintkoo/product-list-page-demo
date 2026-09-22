/**
 * POST /api/companies
 * Validates payload against CompanyPostPayload schema and persists to Company table.
 */
function createCompany(payload: CompanyPostPayload) {
  // 1. Validate payload
  // 2. Insert into company table
  // 3. Return created record
}

/**
 * PUT /api/companies/:id
 * Validates payload against CompanyPutPayload schema and updates existing record.
 */
function updateCompany(id: string, payload: CompanyPutPayload) {
  // 1. Validate payload
  // 2. Update company table where id = :id
  // 3. Return updated record
}