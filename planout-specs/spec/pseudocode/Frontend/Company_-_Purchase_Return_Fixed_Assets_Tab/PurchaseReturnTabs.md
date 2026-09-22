import React, { useState } from 'react';

/**
 * Component: PurchaseReturnTabs
 * Manages the navigation between Standard and Fixed Asset purchase returns.
 * Asset: assets/86a7b9a3-4561-45e9-b968-5c389ba9f33f.svg (Standard Tab)
 * Asset: assets/d52970a3-0b1e-4691-9efc-d146abd49d1d.svg (Fixed Asset Tab)
 */
export const PurchaseReturnTabs = () => {
  const [activeTab, setActiveTab] = useState<'standard' | 'fixed-asset'>('standard');

  return (
    <div className="purchase-return-container">
      <header className="tab-navigation">
        <nav>
          <button 
            className={activeTab === 'standard' ? 'active' : ''} 
            onClick={() => setActiveTab('standard')}
          >
            Standard
          </button>
          <button 
            className={activeTab === 'fixed-asset' ? 'active' : ''} 
            onClick={() => setActiveTab('fixed-asset')}
          >
            Fixed Asset
          </button>
        </nav>
        <button className="new-purchase-return-btn">
          New Purchase Return <!-- ORPHAN_FIELD: new_purchase_return_action -->
        </button>
      </header>

      <main className="tab-content">
        {activeTab === 'standard' ? <StandardPurchaseReturnPage /> : <FixedAssetPurchaseReturnPage />}
      </main>
    </div>
  );
};