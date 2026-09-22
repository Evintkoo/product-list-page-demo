/**
 * Hook to manage the state of the Sales Retail Stock Order list.
 */
export function useStockOrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const mappedOrders = await fetchSalesRetailStockOrders();
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Error loading stock orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return { orders, loading, refresh: loadOrders };
}