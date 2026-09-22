/**
 * Custom hook to manage the active state and routing logic for the Inventory Sub Menu.
 */
export const useInventoryNavigation = () => {
  const [activeTab, setActiveTab] = useState('Stock Orders');

  const navigateTo = (path: string, label: string) => {
    // Logic to update active tab state immediately
    setActiveTab(label);
    
    // Perform navigation
    window.history.pushState({}, '', path);
    
    // Trigger custom event or state update for parent layout to render the correct page
    const event = new CustomEvent('inventory-nav-change', { detail: { path } });
    window.dispatchEvent(event);
  };

  return { activeTab, navigateTo };
};