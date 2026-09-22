import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRetailCustomer } from './api'; // Assuming API client setup

/**
 * Asset: assets/1e399147-0677-4452-a19c-fc0e55cadda0.svg
 * Node: 1e399147-0677-4452-a19c-fc0e55cadda0 (Retail Customer Detail Page)
 */
export const RetailCustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        // API Call: GET /api/customers/:id
        const response = await fetch(`/api/customers/${id}`);
        if (response.status === 404) throw new Error('Customer not found');
        if (!response.ok) throw new Error('Failed to fetch customer');
        
        const data = await response.json();
        setCustomer(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return null;

  return (
    <div className="retail-customer-detail-page">
      <HeaderNavigationBar />
      <SubMenu />
      
      <button onClick={() => navigate('/customers')}>Customers</button>
      <button onClick={() => navigate(`/customers/${id}/edit`)}>Edit</button>

      <CustomerDetailsCard data={customer} />
      <GroupCard data={customer.customer_group} />
      <TaxInformationCard data={customer} />
      <SAPReportingCard data={customer} />
      <SettingsCard data={customer} />
      <AddressesCard data={customer.addresses} />
      <ChangesCard data={customer} />
    </div>
  );
};