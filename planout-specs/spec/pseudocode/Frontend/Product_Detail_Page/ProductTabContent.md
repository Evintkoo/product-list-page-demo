// Node ID: 25c76569-487e-4fdf-9105-e8a900535ee8
// Description: Dynamic content container for the selected product sub-menu tab.
// Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg

export const ProductTabContent = ({ activeTab }: { activeTab: string }) => {
  // Receives state from "Sub menu" (0f7694e2-5d18-4067-9ac7-7f6b3747ee5c)
  // Connection: "product tab"
  
  const renderContent = () => {
    switch (activeTab) {
      case 'return': return <ReturnComponent />; // Placeholder for Return node
      case 'warranty': return <WarrantyComponent />; // Placeholder for Warranty node
      default: return <div>Select a tab to view details</div>;
    }
  };

  return (
    <section className="product-tab-container">
      {renderContent()}
    </section>
  );
};

// Notes covered:
// - Dynamic content container for the selected product sub-menu tab.
// - Receives state from "Sub menu" via "product tab" connection.
// - Renders specific component based on activeTab state.
// - Default empty state: "Select a tab to view details".