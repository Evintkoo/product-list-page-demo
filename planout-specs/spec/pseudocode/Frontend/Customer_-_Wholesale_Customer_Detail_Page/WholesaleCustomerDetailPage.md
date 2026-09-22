/**
 * Component: WholesaleCustomerDetailPage
 * Asset: assets/7627d359-2cf1-48e6-831b-66fbee8415df.svg
 * 
 * This page displays the full details of a wholesale customer.
 * It fetches data on mount and renders multiple read-only cards.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './api'; // Assuming standard API client

export const WholesaleCustomerDetailPage = () => {
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
        const response = await api.get(`/api/customers/${id}`);
        setCustomer(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Customer not found.');
        } else {
          setError('Failed to load customer details.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCustomer();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!customer) return null;

  return (
    <div className="wholesale-customer-detail-page">
      <HeaderNavigationBar activeTab="Customers" />
      <SubMenu activeTab="Customers" />
      
      <button onClick={() => navigate('/customers')}>Customers</button>
      <h1>{customer.name}</h1>
      <button onClick={() => navigate(`/customers/${id}/edit`)}>Edit</button>

      <DetailsCard data={customer} />
      <ChangesCard data={customer} />
      <TaxInformationCard data={customer} />
      <SettingsCard data={customer} />
      <DataMappingCard data={customer} />
      <GroupCard data={customer} />
      <PricesCard data={customer} />
    </div>
  );
};