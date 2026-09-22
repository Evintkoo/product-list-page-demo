/**
 * Component: SalesInvoiceDetail
 * Renders the detailed view of a Sales Invoice, including header, workflow actions,
 * and financial breakdown.
 */

// Asset: assets/14a9e4db-fcd7-43f5-8e7d-3b3ce7bad1a9.svg (Draft State)
// Asset: assets/93979c2f-1f55-45a6-a51c-e8895aedff94.svg (Approved State)
// Asset: assets/eeba80b8-adf4-4a30-8bd5-c2e013fdd2e9.svg (Sent State)

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from './api-client';

export const SalesInvoiceDetail = () => {
  const { record_id } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch invoice details on mount
  useEffect(() => {
    api.get(`/api/sales-invoices/${record_id}`)
      .then(response => {
        setInvoice(response.data);
        setLoading(false);
      });
  }, [record_id]);

  const handleWorkflowAction = async (action: string) => {
    const response = await api.patch(`/api/sales-invoices/${record_id}/workflow`, { action });
    setInvoice(response.data); // Refresh state with updated invoice data
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <HeaderSection invoice={invoice} onAction={handleWorkflowAction} />
      <SubMenu />
      <DetailsGrid invoice={invoice} />
      <InvoiceItemsTable invoiceId={invoice.id} />
      <FinancialSummary invoice={invoice} />
    </div>
  );
};