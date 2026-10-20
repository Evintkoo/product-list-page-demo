.products-sub-menu-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.menu-header {
  cursor: pointer;
  font-weight: bold;
  padding: 10px;
}

.sub-menu-list {
  list-style: none;
  padding-left: 20px;
}

.sub-menu-list li {
  cursor: pointer;
  padding: 8px;
}

.sub-menu-list li.active {
  background-color: #e0e0e0;
  font-weight: bold;
  border-left: 4px solid #007bff;
}