/**
 * Handles incoming requests for Supplier operations.
 * All queries are scoped to the authenticated user's company_id.
 */

async function getSupplierList(req, res) {
  const { is_internal, supplier_code, name, contact_name, phone, is_active, limit, offset } = req.query;
  const company_id = req.user.company_id;

  const results = await db.query(
    `SELECT s.supplier_id, s.supplier_code, s.name, s.contact_name, s.phone, 
            s.address, s.country, s.tax_no, s.can_spo, s.is_active, s.is_internal,
            COUNT(*) OVER() AS total_count
     FROM supplier s
     WHERE s.company_id = $1
       AND ($2::boolean IS NULL OR s.is_internal = $2)
       AND ($3::text IS NULL OR s.supplier_code ILIKE '%' || $3 || '%')
       AND ($4::text IS NULL OR s.name ILIKE '%' || $4 || '%')
       AND ($5::text IS NULL OR s.contact_name ILIKE '%' || $5 || '%')
       AND ($6::text IS NULL OR s.phone ILIKE '%' || $6 || '%')
       AND ($7::boolean IS NULL OR s.is_active = $7)
     ORDER BY s.name ASC, s.supplier_id ASC
     LIMIT $8 OFFSET $9`,
    [company_id, is_internal, supplier_code, name, contact_name, phone, is_active, limit || 20, offset || 0]
  );

  const total = results.rows.length > 0 ? parseInt(results.rows[0].total_count) : 0;
  
  res.status(200).json({
    data: results.rows,
    pagination: { limit: limit || 20, offset: offset || 0, total }
  });
}

async function getSupplierDetail(req, res) {
  const { supplier_id } = req.params;
  const company_id = req.user.company_id;

  const result = await db.query(
    `SELECT * FROM supplier WHERE supplier_id = $1 AND company_id = $2 LIMIT 1`,
    [supplier_id, company_id]
  );

  if (result.rows.length === 0) return res.status(404).send("Supplier not found");
  res.status(200).json(result.rows[0]);
}

async function updateSupplierStatus(req, res) {
  const { supplier_id } = req.params;
  const { is_active } = req.body;
  const updater_id = req.user.user_id;
  const company_id = req.user.company_id;

  const result = await db.query(
    `UPDATE supplier 
     SET is_active = $2, updater_id = $3, updated_at = NOW() 
     WHERE supplier_id = $1 AND company_id = $4 
     RETURNING supplier_id, is_active, updated_at`,
    [supplier_id, is_active, updater_id, company_id]
  );

  if (result.rows.length === 0) return res.status(404).send("Supplier not found");
  res.status(200).json(result.rows[0]);
}

async function getSupplierNames(req, res) {
  const company_id = req.user.company_id;
  const results = await db.query(
    `SELECT name FROM supplier WHERE company_id = $1 AND is_active = true ORDER BY name ASC`,
    [company_id]
  );
  res.status(200).json(results.rows);
}