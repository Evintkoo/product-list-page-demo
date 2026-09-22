/**
 * Sales Deliveries List Page
 * Asset: assets/cdb8a1eb-8fd5-4c9f-8960-b64064e5e40e.svg
 */

import React, { useState, useEffect } from 'react';
import { fetchSalesDeliveries, fetchWarehouses } from './api';

export const SalesDeliveriesPage = () => {
  // Filter State
  const [filters, setFilters] = useState({
    sales_delivery: '',
    reference_no: '',
    sales_order: '',
    sales_invoice: '',
    customer: '',
    warehouse: '',
    from_date: '',
    to_date: '',
    status: ''
  });

  const [deliveries, setDeliveries] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [pagination, setPagination] = useState({ page: 1 });
  const [sortBy, setSortBy] = useState('');

  // Initial Data Load
  useEffect(() => {
    loadDeliveries();
    loadWarehouseOptions();
  }, []);

  const loadDeliveries = async (params = {}) => {
    const response = await fetchSalesDeliveries({ ...filters, ...params });
    setDeliveries(response.data);
  };

  const loadWarehouseOptions = async () => {
    const response = await fetchWarehouses();
    setWarehouses(response.data); // Used for Warehouse dropdown
  };

  const handleSearch = () => {
    loadDeliveries({ page: 1 });
  };

  return (
    <div>
      <MainMenu activeTab="sales" />
      <SalesSubMenu activeSection="company" />

      {/* Filter Section */}
      <section>
        <input placeholder="Sales Delivery" onChange={(e) => setFilters({...filters, sales_delivery: e.target.value})} />
        <input placeholder="Reference No." onChange={(e) => setFilters({...filters, reference_no: e.target.value})} />
        <input placeholder="Sales Order" onChange={(e) => setFilters({...filters, sales_order: e.target.value})} />
        <input placeholder="Sales Invoice" onChange={(e) => setFilters({...filters, sales_invoice: e.target.value})} />
        <input placeholder="Customer" onChange={(e) => setFilters({...filters, customer: e.target.value})} />
        
        <select onChange={(e) => setFilters({...filters, warehouse: e.target.value})}>
          <option value="">Select Warehouse</option>
          {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
        </select>

        <input type="date" onChange={(e) => setFilters({...filters, from_date: e.target.value})} />
        <input type="date" onChange={(e) => setFilters({...filters, to_date: e.target.value})} />
        
        <select onChange={(e) => setFilters({...filters, status: e.target.value})}>
          <option value="">Select Status</option>
          {/* Status options */}
        </select>

        <button onClick={handleSearch}>Search</button>
      </section>

      {/* Deliveries Table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortBy('delivery_number')}>Sales Delivery</th>
            <th onClick={() => setSortBy('reference_number')}>Reference Number</th>
            <th onClick={() => setSortBy('delivery_datetime')}>Date</th>
            <th onClick={() => setSortBy('sales_order_id')}>Sales Order</th>
            <th onClick={() => setSortBy('sales_invoice_id')}>Sales Invoice</th>
            <th onClick={() => setSortBy('customer_id')}>To Customer</th>
            <th onClick={() => setSortBy('warehouse_id')}>Warehouse</th>
            <th onClick={() => setSortBy('workflow_state')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id} onClick={() => navigateToDetails(delivery.id)}>
              <td>{delivery.delivery_number}</td>
              <td>{delivery.reference_number}</td>
              <td>{delivery.delivery_datetime}</td>
              <td>{delivery.sales_order_id}</td>
              <td>{delivery.sales_invoice_id}</td>
              <td>{delivery.customer_id}</td>
              <td>{delivery.warehouse_id}</td>
              <td>{delivery.workflow_state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};