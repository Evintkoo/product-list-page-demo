-- Query to retrieve the list of returns for a specific retail customer
-- Validates that the customer is not wholesale, franchise, or consignment
SELECT
  r.return_id,
  r.document_number,
  r.created_at,
  r.status,
  r.amount,
  r.store_id,
  s.store_name,
  r.creator_id AS created_by_user_id,
  u.name AS created_by
FROM return r
INNER JOIN customer c ON c.customer_id = r.customer_id
LEFT JOIN store s ON s.store_id = r.store_id
LEFT JOIN users u ON u.id = r.creator_id
WHERE r.customer_id = :customer_id
  AND c.is_wholesale = FALSE
  AND c.is_franchise = FALSE
  AND c.is_consignment = FALSE
ORDER BY r.created_at DESC;

-- Query to retrieve the full detail of a specific return
-- Includes nested JSON array of return items joined with product details
SELECT
  r.return_id,
  r.document_number,
  r.customer_id,
  r.vehicle_id,
  v.registration_no AS vehicle_registration_no,
  r.sale_id,
  r.store_id,
  s.store_name,
  r.return_date,
  r.status,
  r.reason,
  r.amount,
  r.creator_id,
  creator.name AS created_by,
  r.updater_id,
  updater.name AS updated_by,
  r.created_at,
  r.updated_at,
  COALESCE(
    (
      SELECT jsonb_agg(
        jsonb_build_object(
          'return_item_id', ri.return_item_id,
          'sale_item_id', ri.sale_item_id,
          'product_id', ri.product_id,
          'sku', p.sku,
          'product_name', p.product_name,
          'quantity', ri.quantity,
          'unit_price', ri.unit_price,
          'tax_amount', ri.tax_amount,
          'amount', ri.amount,
          'reason', ri.reason
        )
        ORDER BY ri.created_at ASC
      )
      FROM return_item ri
      LEFT JOIN product p ON p.product_id = ri.product_id
      WHERE ri.return_id = r.return_id
    ),
    '[]'::jsonb
  ) AS items
FROM return r
INNER JOIN customer c ON c.customer_id = r.customer_id
LEFT JOIN vehicle v ON v.vehicle_id = r.vehicle_id
LEFT JOIN store s ON s.store_id = r.store_id
LEFT JOIN users creator ON creator.id = r.creator_id
LEFT JOIN users updater ON updater.id = r.updater_id
WHERE r.return_id = :return_id
  AND r.customer_id = :customer_id
  AND c.is_wholesale = FALSE
  AND c.is_franchise = FALSE
  AND c.is_consignment = FALSE
LIMIT 1;