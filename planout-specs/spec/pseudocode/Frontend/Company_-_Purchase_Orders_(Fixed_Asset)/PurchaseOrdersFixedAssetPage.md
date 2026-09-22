/**
 * Asset: assets/cfc6c302-2068-4d53-8a97-d8024d8fe54e.svg
 * Page: Purchase Orders Fixed Asset List Page
 */

import React, { useState, useEffect } from 'react';
import { fetchPurchaseOrders } from './api/purchaseOrders';

const PurchaseOrdersFixedAssetPage = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '', // ORPHAN_FIELD: searchQuery
    statusFilter: '', // ORPHAN_FIELD: statusFilter
    dateRange: null   // ORPHAN_FIELD: dateRange
  });

  // Load data on mount with is_fixed_asset = true
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (filterParams = {}) => {
    // API Contract: GET /purchase-orders
    // Payload: { is_fixed_asset: true }
    const response = await fetchPurchaseOrders({ 
      is_fixed_asset: true,
      ...filterParams 
    });
    setOrders(response.data);
  };

  const handleSearch = () => {
    loadData(filters);
  };

  return (
    <Layout>
      <MainMenu activeTab="Inventory" />
      <SubMenu activeTab="Company" />
      
      <TabComponent activeTab="Fixed Asset" />

      <ToolbarComponent 
        onSearch={handleSearch}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      <PurchaseOrdersTable data={orders} />

      <Pagination 
        rowsPerPage={20} 
        onPageChange={(page) => loadData({ page })} 
      />

      <NewPurchaseOrderButton 
        onClick={() => navigate('/new-fixed-purchase-order')} 
      />
    </Layout>
  );
};