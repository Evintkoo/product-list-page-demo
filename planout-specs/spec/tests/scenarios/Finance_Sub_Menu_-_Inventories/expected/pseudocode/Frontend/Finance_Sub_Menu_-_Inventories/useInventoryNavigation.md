/**
 * Custom hook to manage the state of the Finance Inventories navigation.
 * Ensures consistency between the UI state and the application routing.
 */
import { useState } from 'react';

export const useInventoryNavigation = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const updateActiveTab = (tabId: string) => {
    // Validation: Ensure tabId is a valid navigation target
    const validTabs = ['sales-invoices', 'purchase-orders', 'stock-adjustments', 'inventory-valuation'];
    
    if (validTabs.includes(tabId)) {
      setActiveTab(tabId);
    } else {
      console.error(`Invalid navigation target: ${tabId}`);
    }
  };

  return {
    activeTab,
    updateActiveTab
  };
};