-- Query for product audit trail
SELECT
  history_id, product_id, updated_at, updated_by,
  company_supply_price, wholesale_price, supply_price,
  retail_price, is_taxed, trade_in, warranty,
  is_active, is_tracked, is_bundle
FROM product_history
WHERE product_id = $1
ORDER BY updated_at DESC
LIMIT $2 OFFSET $3;