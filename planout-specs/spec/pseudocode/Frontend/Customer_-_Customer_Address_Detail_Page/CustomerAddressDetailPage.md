/**
 * Customer Address Detail Page
 * Asset: assets/5db15473-cf92-4e52-b47d-42d9c1909d39.svg
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CustomerAddressDetailPage = () => {
  const { id: customerId } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Fetch Customer Detail
    fetch('/customers/' + customerId)
      .then(res => res.json())
      .then(data => setCustomer(data));

    // Fetch Customer Addresses
    fetch('/customer_addresses/' + customerId)
      .then(res => res.json())
      .then(data => setAddresses(data));
  }, [customerId]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <MainMenu activeTab="Customers" />
      
      <header>
        <h1>{customer.name}</h1>
      </header>

      <CustomerDetailMenu 
        customerType={customer.customer_type} 
      />

      <section>
        {addresses.map((addr) => (
          <AddressCard key={addr.id} addressData={addr} />
        ))}
      </section>
    </div>
  );
};