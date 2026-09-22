import { useState, useEffect } from 'react';
import { fetchStockHistories, fetchStores } from './api';

/**
 * Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg
 */
export const StockHistoryPage = ({ productId }) => {
  const [histories, setHistories] = useState([]);
  const [stores, setStores] = useState([]);
  
  // Filter State
  const [filters, setFilters] = useState({
    product_id: productId,
    store_id: '',
    type: '',
    from_date: '',
    to_date: '',
    created_by: ''
  });

  // Initial Load
  useEffect(() => {
    loadData();
    loadStores();
  }, [productId]);

  const loadData = async (params = { product_id: productId }) => {
    const data = await fetchStockHistories(params);
    setHistories(data);
  };

  const loadStores = async () => {
    const data = await fetchStores();
    setStores(data);
  };

  const handleSearch = () => {
    loadData(filters);
  };

  return (
    <div>
      <StockHistoryFilter 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={handleSearch} 
        stores={stores} 
      />
      <StockHistoryTable data={histories} />
    </div>
  );
};