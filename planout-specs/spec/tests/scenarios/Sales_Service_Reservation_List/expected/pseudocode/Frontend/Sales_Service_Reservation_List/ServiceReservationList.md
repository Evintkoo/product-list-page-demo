/**
 * Component: ServiceReservationList
 * Description: Displays a list of service reservations with filtering capabilities.
 * Asset: assets/c7911a6a-5664-492b-a786-b3d7a16ec4a2.svg
 */

import React, { useState, useEffect } from 'react';
import { useServiceReservations } from './hooks/useServiceReservations';

export const ServiceReservationList = () => {
  // State for filters
  const [filters, setFilters] = useState({
    documentNumber: '',
    createdDate: '',
    fromDate: '',
    toDate: '',
    store: '',
    registrationType: '',
    registrationValue: '',
    brand: '',
    model: '',
    customer: '',
    phone: '',
    status: ''
  });

  const { reservations, loading, fetchReservations } = useServiceReservations();

  const handleSearch = () => {
    fetchReservations(filters);
  };

  return (
    <div className="service-reservation-container">
      {/* Navigation */}
      <MainMenu activeTab="sales" />
      <SalesMenu activeTab="service" />

      {/* Header Actions */}
      <button onClick={() => navigateTo('/new-service-reservation')}>
        New Service Reservation
      </button>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input placeholder="Document Number" onChange={(e) => setFilters({...filters, documentNumber: e.target.value})} />
        <select onChange={(e) => setFilters({...filters, createdDate: e.target.value})}>...</select>
        <input type="date" onChange={(e) => setFilters({...filters, fromDate: e.target.value})} />
        <input type="date" onChange={(e) => setFilters({...filters, toDate: e.target.value})} />
        <select onChange={(e) => setFilters({...filters, store: e.target.value})}>...</select>
        <select onChange={(e) => setFilters({...filters, registrationType: e.target.value})}>...</select>
        <input placeholder="Registration Value" onChange={(e) => setFilters({...filters, registrationValue: e.target.value})} />
        <select onChange={(e) => setFilters({...filters, brand: e.target.value})}>...</select>
        <select onChange={(e) => setFilters({...filters, model: e.target.value})}>...</select>
        <input placeholder="Customer" onChange={(e) => setFilters({...filters, customer: e.target.value})} />
        <input placeholder="Phone" onChange={(e) => setFilters({...filters, phone: e.target.value})} />
        <select onChange={(e) => setFilters({...filters, status: e.target.value})}>...</select>
        
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>Document Number</th>
            <th>Customer</th>
            <th>Vehicle No</th>
            <th>Brand/Model</th>
            <th>Store</th>
            <th>Created Date</th>
            <th>Confirmed Date</th>
            <th>Plan Service Date</th>
            <th>Plan Service Time</th>
            <th>Status</th>
            <th>Order#</th>
            <th>Work Order#</th>
            <th>Invoice#</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((row) => (
            <tr key={row.id}>
              <td><a href={`/reservation/${row.documentNumber}`}>{row.documentNumber}</a></td>
              <td>{row.customerName}</td>
              <td><a href={`/vehicle/${row.vehicleRegistrationNumber}`}>{row.vehicleRegistrationNumber}</a></td>
              <td>{row.brand} / {row.model}</td>
              <td>{row.storeName}</td>
              <td>{row.createdDate}</td>
              <td>{row.confirmedDate}</td>
              <td>{row.planServiceDate}</td>
              <td>{row.planServiceTime}</td>
              <td><span className={`badge-${row.status}`}>{row.status}</span></td>
              <td>{row.salesOrderNumber}</td>
              <td>{row.workOrderNumber}</td>
              <td>{row.invoiceNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};