import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MainMenu } from './components/MainMenu';
import { SubMenu } from './components/SubMenu';
import { api } from './api/client';

/**
 * Page: Add Sales Invoice
 * Asset: assets/0cd5957a-9d16-4de2-b461-8d9392295b83.svg
 */
export const NewSalesInvoicePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const salesOrderId = searchParams.get('sales_order_id');

  // Form State
  const [formData, setFormData] = useState({
    sales_order_ref_code: '', // ORPHAN_FIELD: sales_order_ref_code
    customer_name: '',        // ORPHAN_FIELD: customer_name
  });

  useEffect(() => {
    // 1. Auth Check
    api.get('/auth/me')
      .catch(() => navigate('/login'));

    // 2. Fetch Delivery Details for pre-fill
    if (salesOrderId) {
      api.get(`/sales-deliveries/${salesOrderId}`)
        .then((response) => {
          const { sales_order_ref_code, customer_name } = response.data;
          setFormData({
            sales_order_ref_code,
            customer_name
          });
        });
    }
  }, [salesOrderId, navigate]);

  return (
    <div className="page-container">
      <MainMenu activeTab="Finance" />
      <SubMenu activeTab="Invoices" />

      <form>
        {/* 
           Note: Fields are pre-filled from GET /sales-deliveries/:id response.
           Validation: Fields are read-only or disabled as they are derived 
           from the selected Sales Delivery context.
        */}
        <label>Sales Order</label>
        <input 
          type="text" 
          value={formData.sales_order_ref_code} 
          disabled 
        />

        <label>For Customer</label>
        <input 
          type="text" 
          value={formData.customer_name} 
          disabled 
        />
        
        {/* Additional invoice fields would be rendered here */}
      </form>
    </div>
  );
};