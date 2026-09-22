/**
 * Product Details Page
 * Asset: assets/96ac3482-2e7c-4cff-a944-f84e3671ec7b.svg
 */

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetails } from './hooks/useProductDetails';

export const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetails(id);

  if (loading) return <div>Loading...</div>;
  if (error || !product) return <div>Error loading product details.</div>;

  return (
    <div className="product-details-container">
      {/* Sticky Header Navigation */}
      <nav className="sticky-header">
        <MainMenu activeTab="Products" />
      </nav>

      {/* Sticky Identity Bar */}
      <div className="sticky-identity-bar">
        <span>{product.sku} - {product.name}</span>
        <button onClick={() => navigateToEdit(product.id)}>Edit</button>
      </div>

      <button onClick={() => history.back()}>Back to Product List</button>

      {/* Submenu */}
      <SubMenu activeTab="product" />

      {/* Details Card */}
      <section>
        <h3>Details</h3>
        <p>SKU: {product.sku}</p>
        <p>Name: {product.name}</p>
        <p>Description: {product.description}</p>
        <p>Price: {product.price} {product.currency}</p>
        <p>Stock: {product.stock_quantity}</p>
        <p>Category ID: {product.category_id}</p>
      </section>

      {/* Additional Sections */}
      <section>
        <button onClick={openQrCodePage}>QR code button</button>
        <button onClick={openBarcodePage}>Barcode button</button>
      </section>

      {/* Read-only Cards */}
      <div className="cards-grid">
        <AttributesCard />
        <TrackingBundleCard />
        <ReturnCard />
        <WarrantyCard />
        <BarcodeCard />
        <TradeInCard />
        <SettingsCard />
        <ProductScheduleCard />
        <ChangesCard />
        <TaxCard />
        <CompanyPricingCard />
        <StorePricingCard />
        <DimensionsCard />
        <ExternalPricingCard />
      </div>
    </div>
  );
};