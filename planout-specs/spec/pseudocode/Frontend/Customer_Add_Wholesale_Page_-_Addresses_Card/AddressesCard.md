/**
 * Component: AddressesCard
 * Description: Displays the list of wholesale customer addresses and provides 
 * an interface to add new ones via a modal.
 * Asset: assets/3f116838-783a-4c24-99bc-081e6f518010.svg
 */

import React, { useState } from 'react';
import { AddressModal } from './AddressModal';

export const AddressesCard = () => {
  const [addresses, setAddresses] = useState([]); // Local state for the table rows
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="addresses-card-container">
      <div className="header">
        <GPSIcon /> 
        <h2>ADDRESSES</h2>
      </div>

      <table className="addresses-table">
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
          {addresses.length === 0 ? (
            <tr>
              <td colSpan={7}>No addresses added yet.</td>
            </tr>
          ) : (
            addresses.map((addr, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{addr.address_type}</td> <!-- ORPHAN_FIELD: address_type -->
                <td>{addr.phone_1}</td>     <!-- ORPHAN_FIELD: phone_1 -->
                <td>{addr.phone_2}</td>     <!-- ORPHAN_FIELD: phone_2 -->
                <td>{addr.fax}</td>         <!-- ORPHAN_FIELD: fax -->
                <td>{addr.is_main ? 'Yes' : 'No'}</td> <!-- ORPHAN_FIELD: is_main -->
                <td>{addr.is_shipping ? 'Yes' : 'No'}</td> <!-- ORPHAN_FIELD: is_shipping -->
              </tr>
            ))
          )}
        </tbody>
      </table>

      <button 
        className="add-address-btn" 
        onClick={() => setIsModalOpen(true)}
      >
        Add Address
      </button>

      {isModalOpen && (
        <AddressModal 
          onClose={() => setIsModalOpen(false)} 
          onSave={(newAddress) => {
            setAddresses([...addresses, newAddress]);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};