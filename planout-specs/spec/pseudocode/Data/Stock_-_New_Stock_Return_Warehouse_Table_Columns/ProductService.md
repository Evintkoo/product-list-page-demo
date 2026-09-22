// API logic to support the Search Product Input requirement.

FUNCTION getProducts(query: string):
  // Validates query length >= 3 characters
  IF length(query) < 3:
    RETURN []
  
  // API Call: GET /api/products?search={query}
  // Returns list of Product objects containing id, name, sku, code, and current_stock
  RETURN API.GET("/products", { params: { search: query } })