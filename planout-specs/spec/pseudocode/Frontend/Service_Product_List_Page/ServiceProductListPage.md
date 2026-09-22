import React, { useState, useEffect } from 'react';
import { fetchServiceProducts } from './api/serviceProductService';
import { MainMenu, SubMenu } from './components/Navigation';
import { ServiceProductTable } from './components/ServiceProductTable';
import { SearchFilter } from './components/SearchFilter';
import { Pagination } from './components/Pagination';

export const ServiceProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('active'); // 'active' | 'inactive'
  const [loading, setLoading] = useState(false);

  const loadData = async (searchQuery = '', statusFilter = 'active') => {
    setLoading(true);
    try {
      const data = await fetchServiceProducts({ search: searchQuery, status: statusFilter });
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch service products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(search, status);
  }, [search, status]);

  return (
    <div className="page-container">
      <MainMenu activeTab="Products" />
      <SubMenu activeTab="Product" />
      
      <h1>Service Products</h1>
      
      <div className="tabs">
        <button className={status === 'active' ? 'active' : ''} onClick={() => setStatus('active')}>Active</button>
        <button className={status === 'inactive' ? 'active' : ''} onClick={() => setStatus('inactive')}>Inactive</button>
      </div>

      <SearchFilter onSearch={(val) => setSearch(val)} />

      <button onClick={() => window.location.href = '/service-products/add'}>
        + New Service Product
      </button>

      <ServiceProductTable data={products} loading={loading} />
      
      <Pagination />
    </div>
  );
};