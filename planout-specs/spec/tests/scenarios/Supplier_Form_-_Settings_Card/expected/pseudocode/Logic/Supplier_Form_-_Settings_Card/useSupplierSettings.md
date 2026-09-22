/**
 * Hook to manage the state and data fetching for the Supplier Settings Card.
 * Fetches the list of available accounts for the four dropdown fields.
 */
function useSupplierSettings() {
  // State for the list of accounts available for selection
  const [accountOptions, setAccountOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch accounts from the API
  // Maps to GET /accounts
  async function fetchAccounts() {
    setIsLoading(true);
    try {
      const response = await api.get("/accounts");
      // Transform response to display format: "account_code - account_name"
      // while keeping account_id as the value
      const formattedOptions = response.data.map((account) => ({
        label: `${account.account_code} - ${account.account_name}`,
        value: account.account_id
      }));
      setAccountOptions(formattedOptions);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accountOptions, isLoading };
}