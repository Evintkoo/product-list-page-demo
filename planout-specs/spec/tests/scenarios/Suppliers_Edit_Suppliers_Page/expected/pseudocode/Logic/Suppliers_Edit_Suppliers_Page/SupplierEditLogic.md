/**
 * Logic for loading and updating supplier records.
 */

export const useSupplierEdit = (supplierId: string) => {
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await api.get(`/api/supplier/${supplierId}`);
        setSupplier(response.data);
      } catch (err: any) {
        if (err.status === 401) redirect('/login');
        if (err.status === 404) setError('Supplier not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSupplier();
  }, [supplierId]);

  // Handle form submission
  const saveSupplier = async (formData: Partial<Supplier>) => {
    try {
      const response = await api.patch(`/api/supplier/${supplierId}`, formData);
      setSupplier(response.data);
      showSuccessNotification('Supplier updated successfully');
    } catch (err: any) {
      handleValidationErrors(err);
      throw err; // Re-throw to keep button disabled state logic in UI
    }
  };

  return { supplier, isLoading, error, saveSupplier };
};