/**
 * Handles the submission logic for the Franchise Purchase Order.
 * Maps the form state to the FranchisePurchaseOrder entity structure.
 */
function usePurchaseOrderSubmission() {
  const submitOrder = async (formData: {
    from_warehouse_id: string;
    to_store_id: string;
    from_supplier_id?: string;
    ref_code: string;
    due_at: string;
    notes?: string;
  }) => {
    // Payload construction based on the FranchisePurchaseOrder schema
    const payload = {
      from_warehouse_id: formData.from_warehouse_id,
      to_store_id: formData.to_store_id,
      from_supplier_id: formData.from_supplier_id || null,
      ref_code: formData.ref_code,
      due_at: formData.due_at,
      notes: formData.notes || null
    };

    return await api.post('/franchise-purchase-orders', payload);
  };

  return { submitOrder };
}