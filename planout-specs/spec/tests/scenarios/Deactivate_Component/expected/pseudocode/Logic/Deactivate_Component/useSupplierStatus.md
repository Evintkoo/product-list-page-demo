/**
 * Hook to handle the toggling of a supplier's active status.
 * Manages loading state to prevent duplicate submissions and 
 * interacts with the backend API.
 */
function useSupplierStatus() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  async function toggleSupplierStatus(supplier) {
    setIsProcessing(true);
    setError(null);

    try {
      // Calculate the new status (opposite of current)
      const newStatus = !supplier.is_active;

      const response = await fetch(`/api/suppliers/${supplier.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_active: newStatus
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update supplier status');
      }

      // On success: return true to signal the UI to close the modal
      return true;
    } catch (err) {
      setError(err.message);
      // On failure: return false to keep the modal open
      return false;
    } finally {
      setIsProcessing(false);
    }
  }

  return {
    toggleSupplierStatus,
    isProcessing,
    error
  };
}