import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCustomerDetail } from './api/customerService';

/**
 * Franchisee Customer Detail Page
 * Asset: assets/3fa3d991-675b-4f4c-98fd-c59520e42a70.svg
 */
export const FranchiseeCustomerDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCustomerDetail(id)
        .then(data => setCustomer(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="page-container">
      <HeaderNavigationBar />
      <SubMenu />
      
      <div className="page-header">
        <button onClick={() => navigate('/customers')}>Customer</button>
        <h1>{customer.name}</h1>
        <button className="btn-edit">Edit</button>
      </div>

      <CustomerTab />

      <div className="grid-layout">
        <DetailsCard data={customer} />
        <GroupCard data={customer} />
        <TaxInformationCard data={customer} />
        <SettingsCard data={customer} />
        <PricesCard data={customer} />
        <DataMappingCard data={customer} />
        <ChangesCard data={customer} />
      </div>
    </div>
  );
};