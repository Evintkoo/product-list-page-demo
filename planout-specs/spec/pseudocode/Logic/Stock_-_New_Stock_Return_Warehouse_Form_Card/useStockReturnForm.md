/**
 * Logic hook to manage the state and submission of the New Stock Return Warehouse Form.
 */
export const useStockReturnForm = () => {
  // State management for form fields
  const [formData, setFormData] = useState({
    from_store_id: null,
    to_warehouse_id: null,
    to_internal_supplier_id: null,
    ref_code: "",
    notes: ""
  });

  /**
   * Handles the submission of the stock return.
   * Validates that either a warehouse or an internal supplier is selected.
   */
  const submitStockReturn = async () => {
    // Validation: Ensure required fields are present
    if (!formData.from_store_id || !formData.ref_code) {
      throw new Error("Missing required fields: Store and Reference Code are mandatory.");
    }

    if (!formData.to_warehouse_id && !formData.to_internal_supplier_id) {
      throw new Error("Destination required: Please select either a Warehouse or an Internal Supplier.");
    }

    // Prepare payload for POST /stock-returns
    const payload = {
      from_store_id: formData.from_store_id,
      to_warehouse_id: formData.to_warehouse_id,
      to_internal_supplier_id: formData.to_internal_supplier_id,
      ref_code: formData.ref_code,
      notes: formData.notes
    };

    // Execute API call
    const response = await fetch("/stock-returns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to create stock return.");
    }

    return await response.json();
  };

  return {
    formData,
    setFormData,
    submitStockReturn
  };
};