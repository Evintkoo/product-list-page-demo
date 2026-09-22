/**
 * Styling constraints for the Sales Store Sub Menu
 * Ensures the component aligns with the ERP header design system.
 */

.sales-store-sub-menu {
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: var(--erp-header-bg);
  border-radius: 4px;
}

.sales-store-sub-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sales-store-sub-menu button {
  width: 100%;
  text-align: left;
  padding: 10px 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--erp-text-primary);
  font-size: 14px;
}

.sales-store-sub-menu button:hover {
  background-color: var(--erp-hover-bg);
}