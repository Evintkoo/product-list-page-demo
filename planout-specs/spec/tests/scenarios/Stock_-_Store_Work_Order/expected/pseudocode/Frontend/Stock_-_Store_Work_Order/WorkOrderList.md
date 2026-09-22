import React, { useState, useEffect } from 'react';
import { fetchStockOrders } from './api';

/**
 * Component: WorkOrderList
 * Asset: assets/3e8eda10-e8cb-4b78-9ad7-399163fe3ad3.svg
 * Displays a table of stock orders filtered by source_type='service_work_order'.
 */
export const WorkOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    ref_code: '',
    source_ref_code: '',
    created_at_from: '',
    created_at_to: '',
    store_id: '',
    warehouse_id: '',
    workflow_state: ''
  });

  const loadOrders = async (params = {}) => {
    // Default scope to service_work_order as per requirements
    const queryParams = { ...params, source_type: 'service_work_order' };
    const data = await fetchStockOrders(queryParams);
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSearch = () => {
    // Only send controls that have a value
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    loadOrders(activeFilters);
  };

  return (
    <div>
      <StockOrderSearchBar 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={handleSearch} 
      />
      <WorkOrderTable data={orders} />
    </div>
  );
};