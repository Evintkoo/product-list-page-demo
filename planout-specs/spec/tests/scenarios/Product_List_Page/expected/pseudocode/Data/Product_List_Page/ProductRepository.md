/**
 * Node ID: 15e4d999-f283-4a89-b937-94ab69cf1927
 * Title: Data Mapping and Retrieval
 * 
 * Description:
 * This node handles the persistence layer mapping for the Product List Page.
 * It receives the request from the Logic swimlane (Mapping rules node) 
 * and ensures the database schema aligns with the UI requirements.
 */

// Interface definition for the Logic swimlane interaction
// The Logic layer expects a standardized JSON response mapped from the Product entity.

export interface ProductDTO {
  SKU: string;
  productName: string;
  brandName: string;
  productCode: string;
  tax: number;
  price: number;
}

/**
 * Implementation of the mapping rules defined in the Logic swimlane:
 * 1. SKU -> SKU
 * 2. productName -> Name
 * 3. brandName -> Brand
 * 4. productCode -> Product Code
 * 5. tax -> Tax
 * 6. price -> Price
 */

export const mapProductToDTO = (product: Product): ProductDTO => {
  return {
    SKU: product.SKU,
    productName: product.productName,
    brandName: product.brandName,
    productCode: product.productCode,
    tax: product.tax,
    price: product.price
  };
};

/**
 * Happy Path:
 * - Query the 'Product' table.
 * - Map each record using mapProductToDTO.
 * - Return the list of ProductDTO objects to the Logic layer.
 * 
 * Validation/Error States:
 * - If database connection fails, return an empty array and log the error.
 * - If a field is missing in the database, return null or default value for that specific field.
 * 
 * Empty State:
 * - If no products exist, return an empty array [].
 * 
 * Side Effects:
 * - None.
 */

// Notes covered:
// 1. SKU -> SKU
// 2. productName -> Name
// 3. brandName -> Brand
// 4. productCode -> Product Code
// 5. tax -> Tax
// 6. price -> Price