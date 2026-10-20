import React, { useState, useEffect } from 'react';
import { fetchProducts } from './api'; // Derived from GET /products

/**
 * Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg
 */
export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    brandName: '',
    page: 1,
    limit: 20
  });

  // Initial load
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts(filters);
    setProducts(data);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <SubMenu activeTab="Products" />
      
      {/* Filter Bar */}
      <div className="filter-bar">
        <input 
          placeholder="Search" 
          onChange={(e) => handleFilterChange('search', e.target.value)} 
        />
        <select onChange={(e) => handleFilterChange('brandName', e.target.value)}>
          {/* Options populated from brand list */}
        </select>
        
        {/* ORPHAN_FIELD: productType */}
        {/* ORPHAN_FIELD: tags */}
        {/* ORPHAN_FIELD: itemCategory */}
        
        <button onClick={loadProducts}>Apply Search</button>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>productName</th>
            <th>brandName</th>
            <th>productCode</th>
            <th>tax</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td><a href={`/products/${product.id}`}>{product.productName}</a></td>
              <td>{product.brandName}</td>
              <td>{product.productCode}</td>
              <td>{product.tax}</td>
              <td>{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button onClick={() => navigate('/products/add')}>Add Product</button>
    </div>
  );
};