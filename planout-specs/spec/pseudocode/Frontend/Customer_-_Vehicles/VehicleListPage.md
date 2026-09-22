import React, { useState, useEffect } from 'react';
import { fetchVehicles } from './api';

/**
 * Asset: assets/270a2ea3-5cde-4bf1-84f0-cff3e7b51894.svg
 */
export const VehicleListPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isActive, setIsActive] = useState(true);
  
  // Filter States
  const [customerFilter, setCustomerFilter] = useState('');
  const [hullNumberFilter, setHullNumberFilter] = useState('');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('All vehicle types');
  const [storeFilter, setStoreFilter] = useState('');
  const [registrationNoFilter, setRegistrationNoFilter] = useState('');
  const [vinFilter, setVinFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dateType, setDateType] = useState('Created Date'); // <!-- ORPHAN_FIELD: dateType -->

  const loadVehicles = async () => {
    const params = {
      is_active: isActive,
      // Additional filters would be passed here based on API requirements
    };
    const data = await fetchVehicles(params);
    setVehicles(data);
  };

  useEffect(() => {
    loadVehicles();
  }, [isActive]);

  return (
    <div>
      <MainMenu activeTab="Customers" />
      <SubMenu activeTab="Customers" />
      
      {/* Filters */}
      <div className="filters">
        <input placeholder="Search by customer" onChange={(e) => setCustomerFilter(e.target.value)} />
        <input placeholder="Search by hull number" onChange={(e) => setHullNumberFilter(e.target.value)} />
        <input placeholder="Search by registration number" onChange={(e) => setRegistrationNoFilter(e.target.value)} />
        <input placeholder="Search by VIN" onChange={(e) => setVinFilter(e.target.value)} />
        
        <select onChange={(e) => setVehicleTypeFilter(e.target.value)} value={vehicleTypeFilter}>
          <option>All vehicle types</option>
          <option>Car</option>
          <option>Heavy Equipment</option>
          <option>Motorcycle</option>
        </select>

        <select onChange={(e) => setStoreFilter(e.target.value)}><option>Select Store</option></select>
        
        <select onChange={(e) => setDateType(e.target.value)}>
          <option>Created Date</option>
          <option>Registration Date</option> <!-- ORPHAN_FIELD: Registration Date -->
        </select>
        
        <input type="date" onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" onChange={(e) => setToDate(e.target.value)} />
        
        <button onClick={loadVehicles}>Search</button>
        <button>Download</button>
      </div>

      {/* Status Toggle */}
      <div className="tabs">
        <button onClick={() => setIsActive(true)} className={isActive ? 'active' : ''}>Active</button>
        <button onClick={() => setIsActive(false)} className={!isActive ? 'active' : ''}>Inactive</button>
      </div>

      {/* Vehicle Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Registration No.</th>
            <th>Hull Number</th>
            <th>VIN</th>
            <th>FIN</th>
            <th>Vehicle Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Customer</th>
            <th>Service Contract</th>
            <th>Store</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} onClick={() => window.location.href = `/customers/${v.customer_id}`}>
              <td>{v.id}</td>
              <td>{v.registration_no}</td>
              <td>{v.hull_number}</td>
              <td>{v.vin}</td>
              <td>{v.fin}</td>
              <td>{v.vehicle_type}</td>
              <td>{v.make}</td>
              <td>{v.model}</td>
              <td>{v.year}</td>
              <td>{v.customer}</td>
              <td>{v.service_contract}</td>
              <td>{v.store_name}</td>
              <td>{v.created_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};