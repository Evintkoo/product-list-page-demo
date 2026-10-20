export const validateMinMax = (min, max) => {
  // Validation logic: Min Qty must be less than or equal to Max Qty
  // Triggered immediately on input change
  if (Number(min) > Number(max)) {
    return "Min Qty cannot exceed Max Qty";
  }
  return null;
};