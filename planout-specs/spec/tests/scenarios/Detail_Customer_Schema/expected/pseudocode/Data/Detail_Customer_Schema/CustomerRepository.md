/**
 * Fetches a Retail Customer by ID.
 * Filters by is_wholesale=false, is_franchise=false, is_consignment=false.
 */
async function getRetailCustomer(customer_id: string) {
  return db.query(`
    SELECT c.*, cg.name AS customer_group, s.store_name, o.name AS occupation, cw.name AS customer_wholesale_name,
    (SELECT jsonb_agg(...) FROM customer_address ca WHERE ca.customer_id = c.customer_id) AS addresses
    FROM customer c
    LEFT JOIN customer_group cg ON cg.customer_group_id = c.customer_group_id
    LEFT JOIN store s ON s.store_id = c.store_id
    LEFT JOIN occupation o ON o.occupation_id = c.occupation_id
    LEFT JOIN customer cw ON cw.customer_id = c.customer_wholesale_id
    WHERE c.customer_id = $1 AND c.is_wholesale = FALSE AND c.is_franchise = FALSE AND c.is_consignment = FALSE
    LIMIT 1
  `, [customer_id]);
}

/**
 * Fetches a Wholesale Customer by ID.
 * Filters by is_wholesale=true, is_franchise=false, is_consignment=false.
 */
async function getWholesaleCustomer(customer_id: string) {
  return db.query(`
    SELECT c.*, cg.name AS customer_group, s.store_name, o.name AS occupation,
    (SELECT jsonb_agg(...) FROM customer_address ca WHERE ca.customer_id = c.customer_id) AS addresses
    FROM customer c
    LEFT JOIN customer_group cg ON cg.customer_group_id = c.customer_group_id
    LEFT JOIN store s ON s.store_id = c.store_id
    LEFT JOIN occupation o ON o.occupation_id = c.occupation_id
    WHERE c.customer_id = $1 AND c.is_wholesale = TRUE AND c.is_franchise = FALSE AND c.is_consignment = FALSE
    LIMIT 1
  `, [customer_id]);
}

/**
 * Fetches a Franchise Customer by ID.
 * Filters by is_franchise=true.
 */
async function getFranchiseCustomer(customer_id: string) {
  return db.query(`
    SELECT c.*, cg.name AS customer_group, s.store_name, 
           u_sales.name AS salesperson_name, u_creator.name AS created_by, u_updater.name AS updated_by,
           (SELECT jsonb_agg(...) FROM customer_address ca WHERE ca.customer_id = c.customer_id) AS addresses
    FROM customer c
    LEFT JOIN customer_group cg ON cg.customer_group_id = c.customer_group_id
    LEFT JOIN store s ON s.store_id = c.store_id
    LEFT JOIN "user" u_sales ON u_sales.user_id = c.salesperson_id
    LEFT JOIN "user" u_creator ON u_creator.user_id = c.creator_id
    LEFT JOIN "user" u_updater ON u_updater.user_id = c.updater_id
    WHERE c.customer_id = $1 AND c.is_franchise = TRUE
    LIMIT 1
  `, [customer_id]);
}