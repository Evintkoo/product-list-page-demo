import React from 'react';

/**
 * Product Sub Menu Shared Component
 * Sticky positioning ensures it stays below the Main menu Header
 */
export const ProductSubMenu = () => {
  return (
    <div className="product-sub-menu-container" style={{ position: 'sticky', top: 'var(--main-header-height)' }}>
      <ul className="sub-menu-list">
        <li onClick={() => navigateTo('StandardVoucherList')}>Standard</li>
        <li onClick={() => navigateTo('BatchVoucherList')}>Batch</li>
        <li onClick={() => navigateTo('FlexibleVouchersPage')}>Flexible</li>
      </ul>
    </div>
  );
};

// Helper function for navigation
const navigateTo = (pageId: string) => {
  // Implementation for routing to specific page
  console.log(`Navigating to: ${pageId}`);
};

// ORPHAN_FIELD: StandardVoucherList
// ORPHAN_FIELD: BatchVoucherList
// ORPHAN_FIELD: FlexibleVouchersPage
// ORPHAN_FIELD: main-header-height