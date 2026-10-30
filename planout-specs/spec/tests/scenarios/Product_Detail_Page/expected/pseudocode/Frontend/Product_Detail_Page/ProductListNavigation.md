// Node ID: 64535e33-0917-4a0c-94bd-cf70a296e8cd
// Description: Navigation handler for returning to the Product List page.
// Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg

export const ProductListNavigation = () => {
  const handleNavigateBack = () => {
    // Triggered by "product list page" connection from "Back to Product List page"
    // Performs client-side routing to the product list view.
    window.history.pushState(null, '', '/products');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <button onClick={handleNavigateBack} aria-label="Return to product list">
      Back to Products
    </button>
  );
};

// Notes covered:
// - Navigation handler for returning to the Product List page.
// - Triggered by "product list page" connection from "Back to Product List page".
// - Performs client-side routing to the product list view.