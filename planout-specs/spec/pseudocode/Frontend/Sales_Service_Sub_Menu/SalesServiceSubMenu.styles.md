/**
 * Styling for the Sales Service Sub Menu component.
 * Ensures the menu is positioned correctly within the ERP header context.
 */

.sales-service-submenu-container {
  display: flex;
  flex-direction: column;
  background-color: var(--erp-header-bg);
  padding: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.submenu-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submenu-item:hover {
  background-color: var(--erp-hover-bg);
}