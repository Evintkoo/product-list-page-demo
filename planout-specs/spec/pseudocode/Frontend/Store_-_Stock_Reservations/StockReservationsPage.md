/**
 * Component: Store Stock Reservations
 * Asset: assets/b98ee6dd-ccd7-4dd5-b647-07141eb46900.svg
 */

import React, { useState, useEffect } from 'react';
import { fetchAuthMe, fetchStores, fetchStockReservations } from './api';

export const StockReservationsPage = () => {
  // State for filters
  const [filters, setFilters] = useState({
    from_date: '',
    to_date: '',
    product_sku: '',
    product_name: '',
    store_id: ''
  });

  const [stores, setStores] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Initialization
  useEffect(() => {
    const init = async () => {
      // 1. Auth Check
      try {
        await fetchAuthMe();
      } catch (e) {
        window.location.href = '/login';
        return;
      }

      // 2. Load Store options for dropdown
      const storeData = await fetchStores();
      setStores(storeData);

      // 3. Initial fetch with empty filters
      handleSearch();
    };
    init();
  }, []);

  const handleSearch = async () => {
    const data = await fetchStockReservations(filters);
    setReservations(data);
  };

  return (
    <div>
      <MainMenu active="Inventory" />
      <SubMenu active="Store" />

      {/* Filter Bar */}
      <section>
        <input 
          type="date" 
          value={filters.from_date} 
          onChange={(e) => setFilters({...filters, from_date: e.target.value})} 
        />
        <input 
          type="date" 
          value={filters.to_date} 
          onChange={(e) => setFilters({...filters, to_date: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Product SKU"
          value={filters.product_sku} 
          onChange={(e) => setFilters({...filters, product_sku: e.target.value})} 
        />
        <input 
          type="text" 
          placeholder="Product Name"
          value={filters.product_name} 
          onChange={(e) => setFilters({...filters, product_name: e.target.value})} 
        />
        <select 
          value={filters.store_id} 
          onChange={(e) => setFilters({...filters, store_id: e.target.value})}
          required
        >
          <option value="">Select Store</option>
          {stores.map(s => <option key={s.id} value={s.id}>{s.store_name}</option>)}
        </select>
        
        <button onClick={handleSearch}>Search</button>
      </section>

      {/* Reservation Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Reserve Date</th>
            <th>Refcode</th>
            <th>Product SKU</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Store</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.reserve_date}</td>
              <td><a href={`/work-orders/${row.refcode}`}>{row.refcode}</a></td>
              <td><a href={`/products/${row.product_sku}`}>{row.product_sku}</a></td>
              <td>{row.product_name}</td>
              <td>{row.quantity}</td>
              <td>{row.store_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};