/**
 * Component: TopNav
 * Description: Main header for the ERP system containing navigation, search, notifications, and profile management.
 * Asset: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.svg
 */

// Node: On Click Products (2a967d7b-505d-4b15-b8b5-22e741c9b53f)
// Description: When a user clicks Products item, show the Products Menu at the bottom of this section.
// Happy Path: On click, set local state `isProductsMenuOpen` to true.
// Validation: None.
// Empty State: N/A.
// Side Effects: Triggers transition to Products Menu (f78d8039-721b-407f-b73a-42bd7ad21c3c).
// Notes covered: 1. When a user clicks Products item, show the Products Menu at the bottom of this section.

// Node: Products Menu (f78d8039-721b-407f-b73a-42bd7ad21c3c)
// Description: Sub-menu container for product-related navigation.
// Happy Path: Render menu items when `isProductsMenuOpen` is true.
// Validation: None.
// Empty State: Hidden when `isProductsMenuOpen` is false.
// Side Effects: None.
// Notes covered: None (Container node).

// Node: User profile menu toggle (f76e81e2-eba2-40a7-a60b-69f5bd39c949)
// Description: User clicks the avatar and account menu to reveal profile options like settings and sign out, toggling a local dropdown state.
// Happy Path: On click, toggle `isProfileMenuOpen` boolean state.
// Validation: None.
// Empty State: Dropdown hidden by default.
// Side Effects: Closes other open dropdowns (e.g., notifications) if open.
// Notes covered: 1. User clicks the avatar and account menu to reveal profile options like settings and sign out, toggling a local dropdown state.

// Node: Notification icon click (284409dd-2d44-47dd-805f-83b4c30f3560)
// Description: User clicks the notification bell icon to open a dropdown showing unread alerts, toggling a local open/closed state.
// Happy Path: On click, toggle `isNotificationMenuOpen` boolean state.
// Validation: None.
// Empty State: Dropdown hidden by default.
// Side Effects: Closes other open dropdowns (e.g., profile menu) if open.
// Notes covered: 1. User clicks the notification bell icon to open a dropdown showing unread alerts, toggling a local open/closed state.

// Node: Search field input (47da10b0-2e57-4115-b9b3-abc4a93313dd)
// Description: User types into the search input field in the top bar; input is debounced client-side before triggering a search.
// Happy Path: Capture input in `searchQuery` state. Apply 300ms debounce before executing search logic.
// Validation: Minimum 3 characters required to trigger search.
// Empty State: Show "No results found" if search returns empty.
// Side Effects: Updates search results list in UI.
// Notes covered: 1. User types into the search input field in the top bar. 2. Input is debounced client-side before triggering a search.

// Node: Nav menu click (5146ef6b-d131-4701-9771-c16cc0237aa7)
// Description: User clicks a top navigation item to navigate to the corresponding page section according to the connected Sub Menu. This action is also updating the active tab state.
// Happy Path: Update `activeTab` state to the clicked item ID and trigger router navigation.
// Validation: Ensure target route exists.
// Empty State: N/A.
// Side Effects: Updates visual styling of the active tab.
// Notes covered: 1. User clicks a top navigation item to navigate to the corresponding page section according to the connected Sub Menu. 2. This action is also updating the active tab state.

// Node: On Click to Sales Page (3849972f-e64b-4540-bc07-df0acc0e088e)
// Description: When the user clicks this button it will redirect to sales list page.
// Happy Path: Trigger `router.push('/sales')`.
// Validation: None.
// Empty State: N/A.
// Side Effects: Redirects user to the sales list page.
// Notes covered: 1. When the user clicks this button it will redirect to sales list page.