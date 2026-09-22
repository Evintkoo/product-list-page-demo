/**
 * Hook to handle the deactivation logic for a specific customer.
 * Manages the loading state to prevent duplicate submissions and 
 * orchestrates the API call.
 */
export const useDeactivateCustomer = (customerId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deactivateCustomer = async (onSuccess: () => void) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/customers/${customerId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_active: false // Mapping to Customer.is_active
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to deactivate customer');
      }

      // On success: trigger UI updates (close modal, refresh list)
      onSuccess();
    } catch (err) {
      // On failure: keep modal open and capture error for display
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    deactivateCustomer,
    isSubmitting,
    error
  };
};