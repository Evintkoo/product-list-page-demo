import React, { useState, useEffect } from 'react';
import { fetchCustomers } from './api'; // Assuming standard API client wrapper

/**
 * Retail Customer List Page
 * Asset: assets/42149e74-e69e-4c2d-8c56-5f98b1411b74.svg
 */
export const RetailCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({
    customer_group: '',
    store_id: '', // ORPHAN_FIELD: store_id
    is_active: '',
    customer_code: '',
    tax_no: '', // ORPHAN_FIELD: tax_no
    name: '',
    phone: '',
    birthdate: '',
    address: ''
  });

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (params = {}) => {
    // Default type=retail as per requirements
    const queryParams = { type: 'retail', ...params };
    const data = await fetchCustomers(queryParams);
    setCustomers(data);
  };

  const handleApplySearch = () => {
    // Only include filters with values
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '')
    );
    loadData(activeFilters);
  };

  return (
    <div>
      <MainMenu activeTab="Customers" />
      <SubMenu activeTab="Customers" />
      
      {/* Navigation Tabs */}
      <div className="tabs">
        <button onClick={() => {}}>Retail Customers</button>
        <button onClick={() => navigate('/wholesale-customers')}>Wholesale Customers</button>
        <button onClick={() => navigate('/franchisee')}>Franchisee</button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input placeholder="Group" onChange={(e) => setFilters({...filters, customer_group: e.target.value})} />
        <input placeholder="Store" onChange={(e) => setFilters({...filters, store_id: e.target.value})} />
        <select onChange={(e) => setFilters({...filters, is_active: e.target.value})}>
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <input placeholder="Code" onChange={(e) => setFilters({...filters, customer_code: e.target.value})} />
        <input placeholder="Tax Number" onChange={(e) => setFilters({...filters, tax_no: e.target.value})} />
        <input placeholder="Name" onChange={(e) => setFilters({...filters, name: e.target.value})} />
        <input placeholder="Phone" onChange={(e) => setFilters({...filters, phone: e.target.value})} />
        <input type="date" onChange={(e) => setFilters({...filters, birthdate: e.target.value})} />
        <input placeholder="Address" onChange={(e) => setFilters({...filters, address: e.target.value})} />
        
        <button onClick={handleApplySearch}>Apply Search</button>
      </div>

      <button onClick={() => navigate('/customers/new')}>Add New Retail Customer</button>

      {/* Customer Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th onClick={() => sort('customer_group')}>Group</th>
            <th onClick={() => sort('customer_code')}>Code</th>
            <th onClick={() => sort('name')}>Name</th>
            <th>Address</th>
            <th>Area/Region</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Birthdate</th>
            <th>Store</th>
            <th>Customer Status Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} onClick={() => navigate(`/customers/${c.id}`)}>
              <td>{c.id}</td>
              <td>{c.customer_group}</td>
              <td>{c.customer_code}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.customer_region}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.birthdate}</td>
              <td>{c.store_name}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); openDeactivateModal(c.id); }}>
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};