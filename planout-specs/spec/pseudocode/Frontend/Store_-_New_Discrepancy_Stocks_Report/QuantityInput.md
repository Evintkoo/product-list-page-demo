// Validation: Must be non-negative numerical value
const validateQuantity = (value: number) => {
  if (value <= 0) return "Quantity must be greater than zero";
  return null;
};