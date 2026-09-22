/**
 * Component: SupplierSubMenu
 * Description: Renders the sub-navigation items for the Supplier module.
 */

export const SupplierSubMenu = () => {
  // The sub-menu items are rendered based on the active Supplier context.
  // ORPHAN_FIELD: sub_menu_items
  
  return (
    <ul className="sub-menu-list">
      {/* 
        List items here represent specific sub-pages (e.g., Supplier List, 
        Add Supplier, etc.) 
      */}
      <li className="sub-menu-item">Supplier List</li>
      <li className="sub-menu-item">Create Supplier</li>
    </ul>
  );
};