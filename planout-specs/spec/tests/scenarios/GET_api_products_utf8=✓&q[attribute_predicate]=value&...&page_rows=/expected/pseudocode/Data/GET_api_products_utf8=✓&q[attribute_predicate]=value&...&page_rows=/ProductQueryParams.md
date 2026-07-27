// This describes the incoming query-parameter contract that the Data layer expects
// from the Logic swimlane before it touches the database. It is not a persisted
// entity — it is the validated shape that drives the query below.
//
// ProductQueryParams
//   utf8: string (encoding marker, informational only, not used in filtering)
//   q:
//     sku_cont: string, optional               -> partial match on PRODUCT.sku
//     name_cont: string, optional               -> partial match on PRODUCT.name
//     product_code_cont: string, optional       -> partial match on PRODUCT.product_code
//     product_brand_id_eq: integer, optional    -> exact match on PRODUCT.product_brand_id
//     product_type_id_eq: integer, optional     -> exact match on PRODUCT.product_type_id
//     tax_id_eq: integer, optional               -> exact match on PRODUCT.tax_id
//     product_tags_id_in: array of integer, optional -> match via PRODUCT_TAG_ASSIGNMENT.product_tag_id
//     info_1_cont: string, optional              -> partial match on PRODUCT.info_1
//     info_2_cont: string, optional              -> partial match on PRODUCT.info_2
//     info_3_cont: string, optional              -> partial match on PRODUCT.info_3
//     s: string or array of strings, optional    -> sort spec, e.g. "name asc"
//   page_rows: integer, optional                 -> number of PRODUCT rows per page