/**
 * Styling for the Sales Company Sub Menu
 * Ensures clear interaction states for the navigation items.
 */

.sales-company-sub-menu ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sales-company-sub-menu li {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sales-company-sub-menu li:hover {
  background-color: #f0f2f5;
}

.sales-company-sub-menu li:focus {
  outline: 2px solid #1890ff;
}