import React, { useState, useEffect } from 'react';
import { fetchSupplierProducts } from './api'; // Derived from GET /suppliers/{supplier_id}/products

/**
 * Asset: assets/7ba838f5-d6eb-4c73-bfac-ce704c3c0911.svg
 * Supplier Product List Page
 */
export const SupplierProductList = ({ supplierId }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    sku: '',
    name: '',
    discount: '' // ORPHAN_FIELD: discount
  });

  // Initial load
  useEffect(() => {
    loadProducts();
  }, [supplierId]);

  const loadProducts = async () => {
    const data = await fetchSupplierProducts(supplierId);
    setProducts(data);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <MainMenu active="Suppliers" />
      <SubMenu active="Suppliers" />
      
      <SupplierHeader supplierId={supplierId} />

      {/* Filter Toolbar */}
      <div className="filter-toolbar">
        <input name="sku" placeholder="Product SKU" onChange={handleFilterChange} />
        <input name="name" placeholder="Product Name" onChange={handleFilterChange} />
        <input name="discount" placeholder="Supplier Discount" onChange={handleFilterChange} />
        <button onClick={loadProducts}>Search</button>
      </div>

      {/* Product Table */}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Product</th>
            <th>SKU</th>
            <th>Supplier's Discount</th>
            <th>Track Inventory</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>
                <a href={`/products/${product.id}`}>{product.name}</a>
              </td>
              <td>
                <a href={`/products/${product.id}`}>{product.sku}</a>
              </td>
              <td>{/* Mapping Rule: discount percentage */}</td>
              <td>
                {/* Mapping Rule: boolean rendered as check or x icon */}
                {product.track_inventory ? '✅' : '❌'} <!-- ORPHAN_FIELD: track_inventory -->
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};