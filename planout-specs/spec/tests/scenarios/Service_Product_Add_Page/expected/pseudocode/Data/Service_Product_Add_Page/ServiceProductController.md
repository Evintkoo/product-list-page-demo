/**
 * API Endpoint: POST /api/service_products/
 * Receives the Service Product Create Request and returns the Service Product Detail.
 */
function handleCreateServiceProductRequest(req: Request): Response {
  try {
    const product = createServiceProduct(req.body);
    
    return {
      status: 201,
      body: product // Returns the full ServiceProduct entity (Service Product Detail Schema)
    };
  } catch (error) {
    return {
      status: 400,
      body: { error: "Failed to create service product" }
    };
  }
}