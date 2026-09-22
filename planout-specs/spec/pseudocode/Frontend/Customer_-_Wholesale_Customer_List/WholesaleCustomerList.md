import React, { useState, useEffect } from 'react';
import { fetchWholesaleCustomers } from './api';

/**
 * Asset: assets/b70ea631-13eb-4f8f-939e-9bfbaa65f9b5.svg
 * Wholesale Customer List Component
 */
export const WholesaleCustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  // Initial Page Load
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async (appliedFilters = {}) => {
    // API call: GET /customers/wholesale
    // Note: type=wholesale is handled by the endpoint path
    const response = await fetchWholesaleCustomers({ 
      ...appliedFilters, 
      page: currentPage 
    });
    setCustomers(response.data);
  };

  const handleSearch = () => {
    loadData(filters);
  };

  return (
    <div className="wholesale-customer-list">
      {/* Filter Bar */}
      <div className="filter-bar">
        <input placeholder="Group" onChange={(e) => setFilters({...filters, customer_group_id: e.target.value})} /> <!-- ORPHAN_FIELD: customer_group_id -->
        <input placeholder="Code" onChange={(e) => setFilters({...filters, customer_code: e.target.value})} /> <!-- ORPHAN_FIELD: customer_code -->
        <input placeholder="Tax Number" onChange={(e) => setFilters({...filters, tax_no: e.target.value})} /> <!-- ORPHAN_FIELD: tax_no -->
        <input placeholder="Name" onChange={(e) => setFilters({...filters, name: e.target.value})} />
        <input placeholder="Phone" onChange={(e) => setFilters({...filters, phone: e.target.value})} />
        <input placeholder="Birthdate" onChange={(e) => setFilters({...filters, birthdate: e.target.value})} /> <!-- ORPHAN_FIELD: birthdate -->
        <input placeholder="Salesperson" onChange={(e) => setFilters({...filters, salesperson_id: e.target.value})} /> <!-- ORPHAN_FIELD: salesperson_id -->
        <select onChange={(e) => setFilters({...filters, is_active: e.target.value})}>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
        </select>
        <button onClick={() => openAddressFilterPopup()}>Address Filter</button>
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Customer Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Group</th>
            <th>Code</th>
            <th>Name</th>
            <th>Address</th>
            <th>Area/Region</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Salesperson</th>
            <th>Deactivate Customer</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.customer_id} onClick={() => navigateToDetail(c.customer_id)}>
              <td>{c.customer_id}</td>
              <td>{c.customer_group}</td>
              <td>{c.customer_code}</td>
              <td>{c.name}</td>
              <td>{c.address}</td>
              <td>{c.customer_region}</td>
              <td>{c.phone}</td>
              <td>{c.email}</td>
              <td>{c.salesperson}</td>
              <td>
                <button onClick={(e) => { e.stopPropagation(); openDeactivateModal(c.customer_id); }}>
                  {c.is_active ? 'Deactivate' : 'Inactive'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        {/* Implementation of page controls */}
      </div>
    </div>
  );
};