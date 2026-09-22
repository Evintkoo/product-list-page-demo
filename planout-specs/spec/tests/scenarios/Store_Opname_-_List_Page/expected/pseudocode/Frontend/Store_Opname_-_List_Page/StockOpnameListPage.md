import React, { useState, useEffect, useCallback } from 'react';
import { fetchStockOpnames } from './api/stockOpnameService';

/**
 * Asset: assets/a3ea4bf5-2ba8-43df-83f6-54d239ddfa6f.svg
 */
export const StockOpnameListPage = () => {
  // Filter State
  const [filters, setFilters] = useState({
    ref_code: '',
    from_date: '',
    to_date: '',
    store_id: '',
    status: '',
    page: 1,
    per_page: 10
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Data
  const loadData = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await fetchStockOpnames(params);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch stock opnames", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    loadData(filters);
  }, [loadData]);

  const handleSearch = () => {
    loadData({ ...filters, page: 1 });
  };

  return (
    <div>
      <MainMenu active="Inventory" />
      <SubMenu active="Store" />
      
      <FilterSection 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={handleSearch} 
      />

      <NewStockOpnameButton onClick={() => navigate('/stock_takes/new')} />

      <StockOpnameTable 
        data={data} 
        onSort={(column) => {/* Logic for Asc/Desc toggle */}} 
      />

      <Pagination 
        currentPage={filters.page} 
        onPageChange={(page) => setFilters(prev => ({ ...prev, page }))} 
      />
    </div>
  );
};