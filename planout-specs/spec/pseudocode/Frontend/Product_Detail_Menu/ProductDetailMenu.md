.product-detail-menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-detail-menu li {
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
}

.product-detail-menu li.active {
  border-bottom: 2px solid #007bff; /* Primary color */
  font-weight: bold;
  color: #007bff;
}

.product-detail-menu li:hover {
  background-color: #f8f9fa;
}