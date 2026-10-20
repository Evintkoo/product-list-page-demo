/**
 * Helper to handle routing logic
 */
const navigateToPage = (itemName: string) => {
  // Logic to update the browser history or application state
  // to show the corresponding default page for the selected item.
  console.log(`Navigating to: ${itemName}`);
};

/**
 * Helper for Chevron Icon state
 */
const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span className={`chevron ${isOpen ? 'rotate-down' : 'rotate-right'}`}>
    {/* SVG Path reference from assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg */}
  </span>
);