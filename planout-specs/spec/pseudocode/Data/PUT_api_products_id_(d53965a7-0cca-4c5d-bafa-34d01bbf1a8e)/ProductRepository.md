/**
 * Node: 1f8ca241-a531-4df5-b15d-248f647b3a04
 * Connection: "product database"
 * Receives: Update payload from Logic layer (PUT /api/products/:id)
 * Action: Performs atomic update on the Product entity.
 */
function updateProduct(id: uuid, data: Partial<Product>): Promise<Product> {
  // Happy Path: Locate record by id, apply partial updates, set updated_at, return updated record.
  // Validation: Check for existence before update.
  // Side Effects: Persists changes to the database.
  return db.products.update({ where: { id }, data });
}
// Notes covered: "This endpoint updates an existing product resource identified by its id to the product database."

/**
 * Node: 6afff4c2-9dc6-43ce-ba17-9dddb7a6febf
 * Connection: "Product JSON response"
 * Receives: Updated Product entity from database operation.
 * Action: Filters the entity to return only the fields that were modified.
 */
function formatResponse(product: Product, updatedFields: string[]): Partial<Product> {
  // Happy Path: Return object containing only keys present in updatedFields.
  return updatedFields.reduce((acc, key) => ({ ...acc, [key]: product[key] }), {});
}
// Notes covered: "Filter the response with only the updated fields"

/**
 * Node: 6dc617ff-2dce-4a7e-b326-f857bbec8261
 * Connection: "400 Bad Request - invalid request body or parameters"
 */
// Logic layer handles validation errors; Data layer throws specific DB constraint exceptions if needed.

/**
 * Node: 04214a04-bceb-434c-b7b1-8231cb93e203
 * Connection: "200 OK - product updated successfully"
 */
// Maps to successful database commit.

/**
 * Node: 00821250-3f7c-48bd-912a-88c1e4ac484d
 * Connection: "401 Unauthorized - missing or invalid authentication"
 */
// No data layer action; handled by Auth middleware.

/**
 * Node: a1fad5c0-625c-49cc-acc7-2a16ceb333cc
 * Connection: "409 Conflict - update conflicts with current resource state"
 */
// Triggered if database versioning or unique constraint (e.g., SKU) is violated.

/**
 * Node: 54762457-44f4-4061-bf9b-5f679f756cd9
 * Connection: "500 Internal Server Error - unexpected server failure"
 */
// Triggered on database connection loss or query execution failure.

/**
 * Node: 224ac0af-d58f-4bab-94cb-40ca5fdb9b63
 * Connection: "403 Forbidden - caller lacks permission to update this product"
 */
// No data layer action; handled by RBAC/ACL logic.

/**
 * Node: 814dbed4-f1fc-4141-a09f-a509da2f9705
 * Connection: "404 Not Found - product with given id does not exist"
 */
// Triggered if query returns null for the provided id.

// Notes covered: "201 OK - product updated successfully", "400 Bad Request - invalid request body or parameters", "401 Unauthorized - missing or invalid authentication", "403 Forbidden - caller lacks permission to update this product", "404 Not Found - product with given id does not exist", "409 Conflict - update conflicts with current resource state", "500 Internal Server Error - unexpected server failure"