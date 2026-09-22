/**
 * Hook: useBarcodeValidation
 * Purpose: Immediate validation for barcode input fields.
 */

export const useBarcodeValidation = (value: string) => {
  // Validation Rules:
  // 1. Barcode must not be empty.
  // 2. Barcode must be alphanumeric.
  // 3. Barcode length must be between 8 and 20 characters.
  
  const isValid = value.length >= 8 && value.length <= 20 && /^[a-zA-Z0-9]+$/.test(value);
  
  return {
    isValid,
    errorMessage: !isValid ? "Barcode must be 8-20 alphanumeric characters" : null
  };
};