/**
 * Unit: 403 JSON Schema Response (id: 862840f1-19b2-4a89-8aa5-4aeab7599c1f)
 * Description: Defines the structure for forbidden access errors.
 * Note: This node acts as a schema definition for error responses.
 * Notes covered: None (Schema definition node).
 */
export const ForbiddenResponseSchema = {
  type: "object",
  properties: {
    error: { type: "string" },
    code: { type: "string", enum: ["FEATURE_NOT_ENABLED"] }
  }
};

/**
 * Unit: Product Settings JSON schema (id: 734be73f-89fb-4ed6-aa2d-3fb732653d62)
 * Description: Defines the data structure for product settings.
 * Inputs: Receives request from Logic swimlane (GET /api/products/:id/settings).
 * Outputs: Returns ProductSettings entity data to Logic swimlane.
 * 
 * Happy Path: Query ProductSettings table where product_id matches the requested :id.
 * Validation/Error: If no record exists, return default values (all booleans false) or throw 404.
 * Side Effects: None.
 * 
 * Notes covered:
 * - Schema defines 9 required boolean fields: require_serial, enable_serial_2, require_batch, is_consignment, consignment_consignor, multi_prices, is_internal, is_open_price, tax_applicable.
 */
export async function getProductSettings(productId: string): Promise<ProductSettings> {
  // Implementation: Fetch from database
  const settings = await db.productSettings.findUnique({
    where: { product_id: productId }
  });

  if (!settings) {
    // Return default state if settings record not yet initialized
    return {
      require_serial: false,
      enable_serial_2: false,
      require_batch: false,
      is_consignment: false,
      consignment_consignor: false,
      multi_prices: false,
      is_internal: false,
      is_open_price: false,
      tax_applicable: false
    };
  }

  return settings;
}