/**
 * Component: AddressesCard
 * Displays a list of customer addresses in a table format with indicators for 
 * address types and primary/shipping status.
 * Asset: assets/0e2dffe8-5303-4b48-9595-2a8357d5cbd5.svg
 */

import React, { useState } from 'react';
import { useAddressData } from './hooks/useAddressData';
import { NewAddressModal } from './NewAddressModal';

export const AddressesCard = () => {
  const { addresses, isLoading } = useAddressData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="card">
      <div className="card-header">
        <LocationIcon />
        <h2>ADDRESSES</h2>
      </div>

      <table className="address-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Address Type</th>
            <th>Phone 1</th>
            <th>Phone 2</th>
            <th>Fax</th>
            <th>Main Address</th>
            <th>Shipping Address</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((addr, index) => (
            <tr key={addr.id}>
              <td>{index + 1}</td>
              <td>{addr.address_type}</td> <!-- ORPHAN_FIELD: address_type -->
              <td>{addr.phone_1}</td>      <!-- ORPHAN_FIELD: phone_1 -->
              <td>{addr.phone_2}</td>      <!-- ORPHAN_FIELD: phone_2 -->
              <td>{addr.fax}</td>          <!-- ORPHAN_FIELD: fax -->
              <td>{addr.is_main ? 'Yes' : 'No'}</td> <!-- ORPHAN_FIELD: is_main -->
              <td>{addr.is_shipping ? 'Yes' : 'No'}</td> <!-- ORPHAN_FIELD: is_shipping -->
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => setIsModalOpen(true)}>
        Add Address
      </button>

      {isModalOpen && (
        <NewAddressModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};