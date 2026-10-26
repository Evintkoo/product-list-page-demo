/**
 * Node: Query Parameters Shape (b2b99aae-ccdb-4b7f-9f23-40a8281cd641)
 * Defines the expected structure for incoming API requests.
 * Receives: Raw request query string.
 * Hands to: Logic layer (GET /api/products).
 */

// The schema defines:
// - utf8: string
// - q: object containing search predicates (sku_cont, name_cont, product_code_cont, 
//      product_brand_id_eq, product_type_id_eq, tax_id_eq, product_tags_id_in, 
//      info_1_cont, info_2_cont, info_3_cont, s)
// - page_rows: integer
// Notes covered: 
// - utf8 string field
// - q object with specific filter predicates
// - product_tags_id_in as array of integers
// - s as string or array of strings
// - page_rows as integer