/**
 * Logic hook to handle the initialization and data fetching for the 
 * Customer Purchased Retails List Page.
 */
export const useCustomerPurchases = (customerId: string) => {
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 1. Verify authentication state
        const authResponse = await fetch("/auth/me");
        if (!authResponse.ok) {
          navigate("/login");
          return;
        }

        // 2. Fetch customer sales data
        const salesResponse = await fetch(`/customer/${customerId}/sales`);
        if (salesResponse.ok) {
          const data = await salesResponse.json();
          
          // 3. Map data for the Table Component UI
          const mappedData = data.map((item) => ({
            documentNumber: item.customer_purchase_document_id,
            status: item.customer_purchase_status,
            amount: item.customer_purchase_amount,
            store: item.store_id,
            createdBy: item.customer_id
          }));
          
          setPurchases(mappedData);
        }
      } catch (error) {
        console.error("Failed to load customer purchase data", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [customerId]);

  return { purchases, isLoading };
};