/**
 * Orchestrates the data retrieval and handles business logic validation
 * before passing data to the controller.
 */
function fetchWarehouseList(queryParams) {
  // Validate query parameters
  validatePaginationParams(queryParams);

  try {
    return WarehouseRepository.getWarehouses(queryParams);
  } catch (error) {
    // Log error for internal monitoring
    Logger.error('Failed to retrieve warehouses', error);
    throw new DatabaseException('Internal Server Error');
  }
}

function validatePaginationParams(params) {
  if (params.page_limit > 300) {
    throw new ValidationError('page_limit cannot exceed 300');
  }
  // Additional type checks for integer fields (page, after_id)
}