/**
 * Logic for managing the product table state, filtering, and data fetching.
 */
export const useProductTable = (customer_id: string) => {
  const [products, setProducts] = useState([]);

  // Fetching logic triggered by SearchFilterBar
  const fetchProducts = async (filters) => {
    // API call to retrieve products for the specific customer
    // GET /customers/:customer_id/products
    const data = await api.get(`/customers/${customer_id}/products`, { params: filters });
    setProducts(data);
  };

  return { products, fetchProducts };
};