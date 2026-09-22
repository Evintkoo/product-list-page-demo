import { useState, useEffect } from 'react';
import { fetchProducts } from './api';

/**
 * Product List Page
 * Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg
 */
export const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('active'); // Default tab
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Initial load and status tab switching
  useEffect(() => {
    loadProducts();
  }, [status, page]);

  const loadProducts = async () => {
    const data = await fetchProducts({ status, search, page, limit: 20 });
    setProducts(data);
  };

  return (
    <div>
      <MainMenu activeTab="Products" />
      <SubMenu activeTab="Products" />
      
      <h1>Products</h1>
      
      {/* Status Tabs */}
      <div className="tabs">
        <button onClick={() => setStatus('active')}>Active</button>
        <button onClick={() => setStatus('inactive')}>Inactive</button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input type="text" placeholder="SKU" onChange={(e) => {/* handle SKU */}} /> <!-- ORPHAN_FIELD: sku -->
        <input type="text" placeholder="Name" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input type="text" placeholder="Product Code" onChange={(e) => {/* handle Product Code */}} /> <!-- ORPHAN_FIELD: productCode -->
        <select> <!-- ORPHAN_FIELD: brandName --> </select>
        <select> <!-- ORPHAN_FIELD: productType --> </select>
        <select> <!-- ORPHAN_FIELD: tax --> </select>
        <input type="text" placeholder="Category" /> <!-- ORPHAN_FIELD: category -->
        
        <button onClick={loadProducts}>Apply Search</button>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Brand</th> <!-- ORPHAN_FIELD: brandName -->
            <th>Product Code</th> <!-- ORPHAN_FIELD: productCode -->
            <th>Tax</th> <!-- ORPHAN_FIELD: tax -->
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td><a href={`/products/${product.id}`}>{product.name}</a></td>
              <td>{product.brandName}</td> <!-- ORPHAN_FIELD: brandName -->
              <td>{product.productCode}</td> <!-- ORPHAN_FIELD: productCode -->
              <td>{product.tax}</td> <!-- ORPHAN_FIELD: tax -->
              <td>{product.price}</td>
              <td>{product.stock_quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/products/add'}>Add Product</button>
    </div>
  );
};