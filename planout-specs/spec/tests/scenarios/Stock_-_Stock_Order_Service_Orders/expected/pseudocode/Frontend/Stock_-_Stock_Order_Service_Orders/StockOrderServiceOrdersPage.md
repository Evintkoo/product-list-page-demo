import { useState, useEffect } from 'react';
import { fetchStockOrders } from './api/stockOrderService';
import { StockOrderTable } from './components/StockOrderTable';
import { SearchToolbar } from './components/SearchToolbar';

/**
 * Main page component for Service Order Stock Orders.
 * Asset: assets/52168c01-1f45-451e-ad36-4e5bf1eb1e07.svg
 */
export const StockOrderServiceOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    source_type: 'service_order',
    ref_code: '',
    source_ref_code: '',
    created_at_from: '',
    created_at_to: '',
    store_id: '',
    warehouse_id: '',
    workflow_state: ''
  });

  // Initial load
  useEffect(() => {
    loadData(filters);
  }, []);

  const loadData = async (currentFilters) => {
    // API call: GET /api/stock-orders
    const response = await fetchStockOrders({
      ...currentFilters,
      limit: 20,
      offset: 0
    });
    setOrders(response.data);
  };

  return (
    <div>
      <MainMenu activeTab="Invetory" />
      <SubMenu activeTab="Store" />
      <StockOrdersHeader />
      
      <SearchToolbar 
        onSearch={(newFilters) => {
          setFilters(newFilters);
          loadData(newFilters);
        }} 
      />
      
      <StockOrderTable data={orders} />
    </div>
  );
};