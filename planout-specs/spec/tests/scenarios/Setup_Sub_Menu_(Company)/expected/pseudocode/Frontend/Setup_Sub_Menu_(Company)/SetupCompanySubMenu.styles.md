/**
 * Styling rules for the accordion sub-menu
 */

.setup-sub-menu-accordion .active {
  font-weight: bold;
  color: var(--primary-color);
  border-left: 4px solid var(--primary-color);
  background-color: var(--hover-background);
}

.setup-sub-menu-accordion li {
  cursor: pointer;
  padding: 10px 15px;
  transition: background-color 0.2s ease;
}

.setup-sub-menu-accordion li:hover {
  background-color: var(--hover-background);
}