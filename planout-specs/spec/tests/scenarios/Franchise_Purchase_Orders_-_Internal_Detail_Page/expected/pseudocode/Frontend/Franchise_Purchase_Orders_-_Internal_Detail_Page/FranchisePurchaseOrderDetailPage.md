/**
 * Component: FranchisePurchaseOrderDetailPage
 * Asset: assets/2e9803d9-06d6-402d-bea5-0a64f33be074.svg
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const FranchisePurchaseOrderDetailPage = () => {
  const { id } = useParams();
  const [fpoData, setFpoData] = useState(null);
  const [activeTab, setActiveTab] = useState('Details');

  useEffect(() => {
    // Fetching data on page load
    fetch(`/api/franchise-purchase-orders/${id}`)
      .then(res => res.json())
      .then(data => {
        // Validation: Ensure record is internal
        if (data.stock_order_type === 'franchise_internal') {
          setFpoData(data);
        }
      });
  }, [id]);

  if (!fpoData) return <div>Loading...</div>;

  return (
    <div className="fpo-detail-page">
      <MainMenuNavigation active="Inventory" />
      <InventorySubMenu activeTab="Store" />
      
      <WorkflowStatusBar workflow_state={fpoData.workflow_state} />
      
      <DetailCardComponent data={fpoData} />
      
      <Tabs active={activeTab} onChange={setActiveTab}>
        <Tab name="Details" />
        <Tab name="Invoice" />
        <Tab name="Returns" />
      </Tabs>

      {activeTab === 'Details' && (
        <InternalDetailTableComponent items={fpoData.items} />
      )}

      <div className="actions">
        <SecondaryButton onClick={() => navigate('/list')}>Franchise Purchase Order</SecondaryButton>
        <SecondaryButton onClick={handleExport}>Export</SecondaryButton>
        <PrimaryButton onClick={handleEdit}>Edit</PrimaryButton>
      </div>
    </div>
  );
};