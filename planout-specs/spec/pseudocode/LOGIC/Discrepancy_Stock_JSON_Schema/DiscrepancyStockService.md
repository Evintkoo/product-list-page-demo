/**
 * Logic for handling Discrepancy Stock operations.
 * All operations are scoped to the authenticated company_id.
 */

async function listDiscrepancyStocks(companyId, filters, pagination) {
  // Executes Discrepancy Stock List Query
  // Maps filters (date range, SKU, name, ref_code, entity_id, status) to SQL parameters
  // Returns paginated list of items with total_count
}

async function getDiscrepancyStockDetail(companyId, discrepancyStockId) {
  // 1. Fetch header using Discrepancy Stock Detail Query
  // 2. Fetch items using Discrepancy Stock Detail Items Query
  // 3. Combine into DiscrepancyStockDetailResponse
}

async function createDiscrepancyStock(companyId, userId, payload) {
  // Transactional block:
  // 1. Call Discrepancy Stock Ref Code Query (FOR UPDATE on store)
  // 2. Format ref_code as "DISC/{store_code}/{next_sequence}"
  // 3. Execute Discrepancy Stock Create Statements:
  //    - Insert header (company_id, entity_id, ref_code, reference, creator_id, updater_id)
  //    - Insert items (using UNNEST for bulk insert of product_id, quantity, notes)
  // 4. Return full detail object using the new discrepancy_stock_id
}

async function getEntityOptions(companyId) {
  // Returns list of active stores for the company
}

async function getProductLookup(query) {
  // Returns paginated list of products matching SKU/Name
}