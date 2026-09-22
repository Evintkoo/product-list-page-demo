/**
 * Logic for handling form state and immediate validation
 */
export const useServiceProductForm = (initialData) => {
  // Validation rules:
  // 1. SKU must be unique (checked via API 422 response)
  // 2. Price must be a positive decimal
  // 3. Name is required
  
  const validate = (field, value) => {
    if (field === 'price' && value < 0) return "Price cannot be negative";
    if (field === 'name' && !value) return "Name is required";
    return null;
  };

  // ... state management logic
};