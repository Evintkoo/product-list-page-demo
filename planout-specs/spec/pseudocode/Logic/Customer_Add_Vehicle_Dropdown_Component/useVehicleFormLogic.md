/**
 * Logic for the Customer Add Vehicle Dropdown Component.
 * Handles the state and validation for heavy equipment tracking fields.
 */

export const useVehicleFormLogic = () => {
  // State initialization for the Hour Meter field
  // The hour_meter tracks the usage of heavy equipment.
  const [hourMeter, setHourMeter] = useState<number>(0);

  /**
   * Validates the hour meter input.
   * Requirements:
   * 1. Must be >= 0.
   * 2. Must support up to two decimal places.
   * 3. Required field.
   */
  const validateHourMeter = (value: number): { isValid: boolean; error?: string } => {
    if (value === null || value === undefined || value < 0) {
      return { isValid: false, error: "Hour meter must be a positive number." };
    }

    // Check for decimal precision (max 2 places)
    const decimalCount = (value.toString().split('.')[1] || []).length;
    if (decimalCount > 2) {
      return { isValid: false, error: "Hour meter cannot exceed two decimal places." };
    }

    return { isValid: true };
  };

  const handleHourMeterChange = (newValue: number) => {
    const validation = validateHourMeter(newValue);
    
    if (validation.isValid) {
      setHourMeter(newValue);
      // Logic to sync with parent form state or API payload
      // <!-- MISSING_FIELD: Vehicle.hour_meter -->
    } else {
      console.error(validation.error);
    }
  };

  return {
    hourMeter,
    handleHourMeterChange
  };
};