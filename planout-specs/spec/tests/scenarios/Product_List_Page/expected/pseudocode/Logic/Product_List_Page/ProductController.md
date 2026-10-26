// Node: 393c2d63-6276-4487-ae98-578b69f7855c
// Title: GET /products
// Description: Fetch paginated and filtered product list.

FUNCTION getProducts(request):
  // Input from Frontend (Page Load): Receives query parameters for pagination (page, limit) and search (search).
  
  // Happy Path:
  SET query = SELECT id, SKU, productName, brandName, productCode, tax, price 
              FROM Product 
              WHERE productName LIKE %search% OR SKU LIKE %search%
              LIMIT request.limit OFFSET (request.page - 1) * request.limit;
  
  RETURN 200 OK with JSON body containing the list of products.

  // Validation/Error States:
  IF request.page < 1 OR request.limit < 1:
    RETURN 400 Bad Request with error "Invalid pagination parameters".
  
  // Empty State:
  IF query returns no results:
    RETURN 200 OK with empty array [].

  // Side Effects: None.

// Notes covered: 
// 1. Fetch product list from Product entity.
// 2. Apply pagination via page and limit parameters.
// 3. Apply search filtering on productName and SKU.
// 4. Return mapped JSON response.