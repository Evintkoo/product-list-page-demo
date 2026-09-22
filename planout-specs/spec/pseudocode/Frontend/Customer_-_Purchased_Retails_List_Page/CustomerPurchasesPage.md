import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainMenu } from './components/MainMenu';
import { CustomersMenu } from './components/CustomersMenu';
import { CustomerDetailTabs } from './components/CustomerDetailTabs';
import { RetailPurchasingTable } from './components/RetailPurchasingTable';
import { api } from './services/api';

/**
 * CustomerPurchasesPage
 * Displays the list of purchases for a specific customer.
 * Asset: assets/3fa06cf4-09f3-4bb0-a4c3-2adf12285874.svg
 */
export const CustomerPurchasesPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 1. Auth Check
        const authResponse = await api.get('/auth/me');
        if (authResponse.status === 401) {
          navigate('/login');
          return;
        }

        // 2. Fetch Sales Data
        // Mapping :id from URL parameter to the API request
        const salesResponse = await api.get(`/customer/${id}/sales`);
        
        if (salesResponse.status === 200) {
          setPurchases(salesResponse.body);
        }
      } catch (error) {
        console.error("Failed to load customer purchase data", error);
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [id, navigate]);

  return (
    <div className="layout">
      <MainMenu active="Customers" />
      <CustomersMenu active="Customers" />
      
      <main>
        <h1>Customer Purchases</h1> <!-- ORPHAN_FIELD: page_title -->
        
        <CustomerDetailTabs activeTab="Purchase" customerId={id} />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <RetailPurchasingTable 
            data={purchases.map(item => ({
              documentNumber: item.customer_purchase_document_id,
              status: item.customer_purchase_status,
              amount: item.customer_purchase_amount,
              store: item.store_id,
              createdBy: item.customer_id
            }))} 
          />
        )}
      </main>
    </div>
  );
};