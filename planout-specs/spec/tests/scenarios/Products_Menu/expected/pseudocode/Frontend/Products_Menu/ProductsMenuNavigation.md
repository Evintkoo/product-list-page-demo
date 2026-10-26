/**
 * Node: Products Menu Navigation (1dbf8a1d-40b7-4297-bd0f-cdb4fc835723)
 * Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
 * Description: Navigation list for Product Menu. User clicks a navigation item to show the corresponding default page and updating the active item state.
 * If the navigation item has a reference to a sub menu, show a chevron beside the item text and add toggle capability for the referred sub menu as an accordion.
 * Set "Products" item as a default active state and since it has a sub menu, show the default page of it's Sub Menu component.
 */
component ProductsMenuNavigation {
  state activeItem: string = "Products";
  state openSubMenus: Record<string, boolean> = { "Products": true };

  // ORPHAN_FIELD: navigationItems (List of objects containing label, hasSubMenu, defaultPage)
  // ORPHAN_FIELD: activePage (The currently rendered view)

  function handleItemClick(item) {
    activeItem = item.label;
    activePage = item.defaultPage;
    
    if (item.hasSubMenu) {
      openSubMenus[item.label] = !openSubMenus[item.label];
    }
  }

  render {
    <ul>
      {navigationItems.map(item => (
        <li 
          className={activeItem === item.label ? 'active' : ''}
          onClick={() => handleItemClick(item)}
        >
          {item.label}
          {item.hasSubMenu && (
            <span className="chevron">{openSubMenus[item.label] ? '▼' : '▶'}</span>
          )}
          
          {item.hasSubMenu && openSubMenus[item.label] && (
            <ProductSubMenu />
          )}
        </li>
      ))}
    </ul>
  }
}

// Notes covered:
// - Navigation list for Product Menu.
// - User clicks a navigation item to show the corresponding default page and updating the active item state.
// - If the navigation item has a reference to a sub menu, show a chevron beside the item text.
// - Add toggle capability for the referred sub menu as an accordion.
// - Set "Products" item as a default active state.
// - Since it has a sub menu, show the default page of it's Sub Menu component.