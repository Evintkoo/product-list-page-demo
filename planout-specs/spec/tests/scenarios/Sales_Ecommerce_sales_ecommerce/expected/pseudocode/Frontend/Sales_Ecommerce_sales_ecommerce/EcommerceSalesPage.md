import React, { useEffect, useState } from 'react';
import { fetchSales, fetchStores, fetchUsers, checkAuth } from './api';

/**
 * Asset: assets/07fe4e6e-e4e7-46f7-8a0d-45399fc5d29c.svg
 */
export const EcommerceSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    q: { store_id_eq: '', ref_code_start: '', ecommerce_ref_code_cont: '', customer_name_cont: '', vehicle_registration_start: '' },
    status: '',
    delivery: '',
    date_option: 'created_at',
    from_date: '',
    to_date: ''
  });

  useEffect(() => {
    const init = async () => {
      const auth = await checkAuth();
      if (!auth) window.location.href = '/login';
      
      const [salesData, storesData, usersData] = await Promise.all([
        fetchSales({ limit: 20, offset: 0 }),
        fetchStores(),
        fetchUsers()
      ]);
      setSales(salesData);
      setStores(storesData);
    };
    init();
  }, []);

  const handleSearch = async () => {
    const results = await fetchSales({ ...filters, limit: 20, offset: 0 });
    setSales(results);
  };

  return (
    <div>
      <FilterBar filters={filters} setFilters={setFilters} onSearch={handleSearch} stores={stores} />
      <SalesTable data={sales} />
    </div>
  );
};