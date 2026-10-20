// Component: MainHeader
// Asset: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.svg

State:
  - isProductsMenuOpen: boolean (default: false)
  - isProfileMenuOpen: boolean (default: false)
  - isNotificationMenuOpen: boolean (default: false)
  - activeTab: string (default: 'dashboard')
  - searchQuery: string (default: '')

Render:
  <nav id="topnav">
    // Search Input
    <input 
      type="text" 
      placeholder="Search..."
      onChange={(e) => handleSearchInput(e.target.value)} 
    />
    <!-- ORPHAN_FIELD: search_query -->

    // Navigation Items
    <button onClick={() => handleNavClick('dashboard')}>Dashboard</button>
    <button onClick={() => handleNavClick('products')}>Products</button>
    <button onClick={() => handleNavClick('sales')}>Sales</button>

    // Notification Bell
    <button onClick={() => toggleNotificationMenu()}>
      <Icon name="bell" />
    </button>

    // User Avatar
    <button onClick={() => toggleProfileMenu()}>
      <Avatar />
    </button>
  </nav>

  // Conditional Menus
  {isProductsMenuOpen && <ProductsMenu />}
  {isNotificationMenuOpen && <NotificationDropdown />}
  {isProfileMenuOpen && <ProfileDropdown />}