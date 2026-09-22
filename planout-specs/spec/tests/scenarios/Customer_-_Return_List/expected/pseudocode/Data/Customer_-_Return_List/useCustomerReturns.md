/**
 * Hook to manage the state of the Return tab on the Customer Detail page.
 */
function useCustomerReturns(customerId: string) {
  const [returns, setReturns] = useState<CustomerReturn[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadReturns = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCustomerReturns(customerId);
      setReturns(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { returns, loading, error, loadReturns };
}