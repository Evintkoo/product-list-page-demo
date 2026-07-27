// Asset: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.svg
// Structural reference: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.structure.txt
// This is the persistent header shown on every page of the ERP system.
// No DATA SCHEMAS or API PAYLOADS/CONTRACTS were supplied for this swimlane,
// so this component is purely client-side UI state — no network calls are made here.
// If a future canvas update adds a search endpoint or notification feed endpoint,
// wire the calls here using the exact method/path from API CONTRACTS at that time.

COMPONENT TopNav:

  // ---------- LOCAL UI STATE ----------
  STATE activeNavItem = null            // tracks which top navigation item is currently selected
  STATE isProductsMenuOpen = false      // controls visibility of the Products sub-menu panel
  STATE isProfileMenuOpen = false       // controls visibility of avatar/account dropdown
  STATE isNotificationOpen = false      // controls visibility of notification bell dropdown
  STATE searchInputValue = ""           // raw text as typed by user
  STATE debouncedSearchValue = ""       // value after debounce delay, used to trigger search action

  IMPORT custom hook useDebouncedValue (see useDebouncedValue.ts)

  // ============================================================
  // NODE: On Click Products  (id: 2a967d7b-505d-4b15-b8b5-22e741c9b53f)
  // ============================================================
  FUNCTION onProductsClick():
    // Toggle behavior: clicking again closes the menu
    SET isProductsMenuOpen = NOT isProductsMenuOpen
    // Close any other open dropdowns to avoid overlapping open panels
    SET isProfileMenuOpen = false
    SET isNotificationOpen = false

  // Render rule:
  // WHEN isProductsMenuOpen is true
  //   RENDER <ProductsMenu> anchored to the bottom of the "Products" nav item section
  // WHEN isProductsMenuOpen is false
  //   DO NOT render <ProductsMenu>

  // ============================================================
  // NODE: User profile menu toggle (id: f76e81e2-eba2-40a7-a60b-69f5bd39c949)
  // ============================================================
  FUNCTION onAvatarClick():
    SET isProfileMenuOpen = NOT isProfileMenuOpen
    // Close sibling dropdowns so only one menu is open at a time
    SET isProductsMenuOpen = false
    SET isNotificationOpen = false

  // Render rule:
  // WHEN isProfileMenuOpen is true
  //   RENDER dropdown with options: "Settings", "Sign Out"
  //   (no entity fields exist yet for a User Profile in DATA SCHEMAS,
  //    so avatar image/name display is left to be wired once schema is defined)
  //   <!-- ORPHAN_FIELD: user.avatarUrl -->
  //   <!-- ORPHAN_FIELD: user.displayName -->
  // WHEN isProfileMenuOpen is false
  //   DO NOT render dropdown

  // ============================================================
  // NODE: Notification icon click (id: 284409dd-2d44-47dd-805f-83b4c30f3560)
  // ============================================================
  FUNCTION onNotificationBellClick():
    SET isNotificationOpen = NOT isNotificationOpen
    SET isProductsMenuOpen = false
    SET isProfileMenuOpen = false

  // Render rule:
  // WHEN isNotificationOpen is true
  //   RENDER dropdown listing unread alerts
  //   (No Notification entity exists in DATA SCHEMAS and no endpoint exists in
  //    API CONTRACTS to fetch alerts — list rendering is a placeholder until
  //    that contract is defined)
  //   <!-- ORPHAN_FIELD: notification.message -->
  //   <!-- ORPHAN_FIELD: notification.isRead -->
  // WHEN isNotificationOpen is false
  //   DO NOT render dropdown

  // ============================================================
  // NODE: Search field input (id: 47da10b0-2e57-4115-b9b3-abc4a93313dd)
  // ============================================================
  FUNCTION onSearchInputChange(rawText):
    // VALIDATION — runs immediately on every keystroke, not on submit:
    //   1. Trim leading/trailing whitespace before storing raw value for display
    //   2. Reject (ignore) input if it exceeds 200 characters — do not update state further
    //      beyond the 200-character cap; visually truncate in the input box
    //   3. Allow empty string (clearing the field is valid and should clear results)
    IF LENGTH(rawText) > 200:
      rawText = TRUNCATE(rawText, 200)

    SET searchInputValue = rawText

    // Debounce: only after user pauses typing for the configured delay,
    // propagate the value into debouncedSearchValue
    CALL useDebouncedValue(searchInputValue, delay = 300ms) -> updates debouncedSearchValue

  // Effect: whenever debouncedSearchValue changes
  ON debouncedSearchValue CHANGE:
    trimmedValue = TRIM(debouncedSearchValue)
    IF trimmedValue is EMPTY:
      // Immediately clear any active search result state, no network call needed
      TRIGGER onSearchCleared()
    ELSE:
      // No search API endpoint is defined in API CONTRACTS/API PAYLOADS at this time.
      // Emit a local event/callback so a parent container or future hook can react.
      TRIGGER onSearchRequested(trimmedValue)
      // <!-- ORPHAN_FIELD: searchQuery (no matching request.body field in any endpoint) -->

  // ============================================================
  // NODE: Nav menu click (id: 5146ef6b-d131-4701-9771-c16cc0237aa7)
  // ============================================================
  FUNCTION onNavItemClick(navItemId, connectedSubMenu):
    // VALIDATION: navItemId must be one of the known top-level nav identifiers
    // rendered from the topnav asset structure; if navItemId is not recognized,
    // ignore the click and do not change activeNavItem (defensive check, executed immediately)
    IF navItemId NOT IN knownNavItemIds:
      RETURN

    SET activeNavItem = navItemId
    // Close all dropdown-style menus since navigation changes context
    SET isProductsMenuOpen = false
    SET isProfileMenuOpen = false
    SET isNotificationOpen = false

    // Navigate to the page section associated with this nav item
    NAVIGATE_TO(connectedSubMenu.route)

  // Render rule:
  // The nav item matching activeNavItem is styled as "active" (e.g. underline / highlighted state)
  // All other nav items render in default state

  // ---------- RENDER TREE (per topnav structural asset) ----------
  RENDER:
    <Header>
      <LogoArea />
      <NavItemsList>
        FOR EACH navItem IN topnavStructure.items:
          <NavItem
            label=navItem.label
            isActive = (activeNavItem == navItem.id)
            onClick = () => IF navItem.id == "products": onProductsClick()
                            ELSE: onNavItemClick(navItem.id, navItem.connectedSubMenu)
          />
        IF isProductsMenuOpen:
          <ProductsMenu anchorTo="products-nav-item-bottom" />
      </NavItemsList>

      <SearchInput
        value = searchInputValue
        onChange = (event) => onSearchInputChange(event.value)
        placeholder = "Search..."
        maxLength = 200
      />

      <NotificationBellIcon onClick = onNotificationBellClick />
      IF isNotificationOpen:
        <NotificationDropdown />

      <AvatarAccountMenu onClick = onAvatarClick />
      IF isProfileMenuOpen:
        <ProfileDropdown options=["Settings", "Sign Out"] />
    </Header>