/**
 * Page: Customer - Customer Vehicle
 * Displays a list of vehicles associated with a specific customer.
 * Asset: assets/eb203d0e-e6c0-4ebf-8beb-be16d3253025.svg
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from './api'; // Hypothetical API client

export const CustomerVehiclesPage = () => {
  const { customer_id } = useParams<{ customer_id: string }>();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState<string>('');
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch customer details for the banner
        const customerResponse = await apiClient.get(`/customers/${customer_id}`);
        setCustomerName(customerResponse.data.name); // <!-- ORPHAN_FIELD: name -->

        // Fetch vehicle list
        const vehicleResponse = await apiClient.get(`/customers/${customer_id}/vehicles`);
        setVehicles(vehicleResponse.data);
      } catch (error) {
        console.error("Failed to load customer vehicle data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customer_id]);

  return (
    <div className="customer-vehicles-container">
      {/* Banner Section */}
      <header className="customer-banner">
        <h1>{customerName}</h1>
      </header>

      {/* Action Section */}
      <button onClick={() => navigate(`/customers/${customer_id}/vehicles/add`)}>
        New Vehicle
      </button>

      {/* Vehicle Table */}
      <table>
        <thead>
          <tr>
            <th>Vehicle No</th>
            <th>Vehicle Type</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Engine Power</th>
            <th>Engine Brand</th>
            <th>Engine Model</th>
            <th>Engine Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.vehicle_id}>
              <td>
                <a href={`/vehicles/${vehicle.vehicle_id}`} target="_blank" rel="noopener noreferrer">
                  {vehicle.registration_no}
                </a>
              </td>
              <td>{vehicle.vehicle_type}</td>
              <td>{vehicle.make}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.year}</td>
              <td>{vehicle.engine_power}</td>
              <td>{vehicle.engine_brand}</td>
              <td>{vehicle.engine_model}</td>
              <td>{vehicle.engine_year}</td>
              <td>
                <button onClick={() => navigate(`/vehicles/${vehicle.vehicle_id}/edit`)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ===== LOGIC NOTES =====
// 1. The "Category" column mentioned in the canvas (node 538d51fd) 
//    is an <!-- ORPHAN_FIELD: category --> as it is not present in the 
//    GET /customers/{customer_id}/vehicles response schema.
// 2. Navigation paths for "Add" and "Edit" are derived from the 
//    functional requirements of the buttons.
// 3. The "Customer Name" is sourced from the GET /customers/:id endpoint 
//    as per the node description.