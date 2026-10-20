/**
 * Component: ProductSubMenu
 * Description: Accordion sub-menu for Products navigation.
 */

export const ProductSubMenu = () => {
  return (
    <ul className="sub-menu-list">
      {/* 
         Navigation items within the sub-menu.
         ORPHAN_FIELD: sub_menu_link_path 
         ORPHAN_FIELD: sub_menu_link_label 
      */}
      <li className="sub-menu-item">Inventory</li>
      <li className="sub-menu-item">Categories</li>
      <li className="sub-menu-item">Pricing</li>
    </ul>
  );
};