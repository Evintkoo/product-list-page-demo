/**
 * Search Product Input
 * Triggers GET /products with search query.
 */
const ProductSearchInput = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (query.length >= 3) {
      // API Call: GET /products
      // Payload: { search: query }
      fetchProducts(query).then(data => setOptions(data));
    }
  }, [query]);

  const onSelectProduct = (product) => {
    // Maps product.id to product_id
    // Maps product.current_stock to store_qty
    onSelect({ 
      product_id: product.id, 
      store_qty: product.current_stock 
    });
  };
};