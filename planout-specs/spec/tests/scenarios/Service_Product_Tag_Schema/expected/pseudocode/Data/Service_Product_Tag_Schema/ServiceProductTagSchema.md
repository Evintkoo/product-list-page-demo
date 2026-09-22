/**
 * Defines the shape of the Service Product Tag mapping object.
 * Used for API request validation and frontend state management.
 */
export interface ServiceProductTag {
  service_product_tag_id: number;
  service_product_id: number;
  name: string;
  description?: string;
  active: boolean;
}

/**
 * Validation logic for the Service Product Tag object.
 * Ensures required fields are present and types are correct.
 */
export const validateServiceProductTag = (data: any): boolean => {
  const requiredFields = ["service_product_tag_id", "service_product_id", "name"];
  
  // Check for presence of required fields
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null) {
      return false;
    }
  }

  // Validate types
  if (typeof data.service_product_tag_id !== 'number') return false;
  if (typeof data.service_product_id !== 'number') return false;
  if (typeof data.name !== 'string') return false;
  if (data.description !== undefined && typeof data.description !== 'string') return false;
  if (data.active !== undefined && typeof data.active !== 'boolean') return false;

  return true;
};