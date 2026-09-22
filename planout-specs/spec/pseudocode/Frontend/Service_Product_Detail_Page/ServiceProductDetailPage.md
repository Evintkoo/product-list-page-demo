import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './api'; // Assuming standard axios/fetch wrapper

/**
 * Asset: assets/e8c6a4ae-2169-48b4-a1f8-7d1d08c7744f.svg
 */
export const ServiceProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/service_products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to load service product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="page-container">
      <MainMenu activeTab="Product" />
      <SubMenu activeTab="Product" />
      
      <header>
        <h1>Service Product Details</h1>
        <div className="header-badge">
          {product.sku} - {product.name} - RSV <!-- ORPHAN_FIELD: RSV -->
        </div>
      </header>

      <section id="details-card">
        <h2>Details</h2>
        <p>SKU: {product.sku}</p>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        <p>Type: <!-- ORPHAN_FIELD: Type --></p>
        <p>Tag: <!-- ORPHAN_FIELD: Tag --></p>
      </section>

      <section id="tax-card">
        <h2>Tax</h2>
        <p>Tax Category ID: {product.tax_category_id}</p>
        <p>Tax: <!-- ORPHAN_FIELD: Tax --></p>
        <p>Other Tax: <!-- ORPHAN_FIELD: Other Tax --></p>
        <p>Other Tax Account: <!-- ORPHAN_FIELD: Other Tax Account --></p>
        <p>Other Tax Refund Account: <!-- ORPHAN_FIELD: Other Tax Refund Account --></p>
        <p>Tax Product Code: <!-- ORPHAN_FIELD: Tax Product Code --></p>
        <p>Tax Unit of Measure: <!-- ORPHAN_FIELD: Tax Unit of Measure --></p>
      </section>

      <section id="settings-card">
        <h2>Settings</h2>
        <p>Active: {product.is_active ? 'Yes' : 'No'}</p>
        <p>Open Price: <!-- ORPHAN_FIELD: Open Price --></p>
        <p>Estimated Time: <!-- ORPHAN_FIELD: Estimated Time --></p>
        <p>Open Estimated Time: <!-- ORPHAN_FIELD: Open Estimated Time --></p>
      </section>

      <section id="store-pricing-card">
        <h2>Store Pricing</h2>
        <p>Price: {product.base_price} {product.currency}</p>
      </section>

      <section id="changes-card">
        <h2>Changes</h2>
        <p>Updated At: {product.updated_at}</p>
        <p>Created By: <!-- ORPHAN_FIELD: Created By --></p>
        <p>Created At: <!-- ORPHAN_FIELD: Created At --></p>
        <p>Updated By: <!-- ORPHAN_FIELD: Updated By --></p>
      </section>

      <footer>
        <button onClick={() => navigate('/service-products')}>Service Products</button>
        <button className="btn-blue" onClick={() => navigate(`/service-products/${id}/edit`)}>Edit</button>
      </footer>
    </div>
  );
};