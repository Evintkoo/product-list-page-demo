/**
 * Component: ProductSettingsCard
 * Description: Displays a read-only summary of product configuration flags.
 * Asset: assets/493d0332-96a9-4142-9a86-dabf7dbcbb5a.svg
 */

import React from 'react';
import { useProductDetails } from './hooks/useProductDetails';

export const ProductSettingsCard = ({ productId }) => {
  // Fetching product data based on the authoritative schema
  const { data: product, isLoading } = useProductDetails(productId);

  if (isLoading) return <div className="skeleton-loader" />;

  // Helper to render status icons
  const StatusIcon = ({ isActive }) => (
    <span className={isActive ? 'icon-green-check' : 'icon-red-cross'}>
      {isActive ? '✓' : '✗'}
    </span>
  );

  return (
    <div className="settings-card-container">
      <h3>Product Settings</h3>
      
      <div className="setting-row">
        <span>Open Price</span>
        <StatusIcon isActive={product.open_price} />
        {/* ORPHAN_FIELD: open_price */}
      </div>

      <div className="setting-row">
        <span>Product Freeze</span>
        <StatusIcon isActive={product.product_freeze} />
        <div className="help-icon" title="Active Product Freeze make product cannot be used when receive and transfer" />
        {/* ORPHAN_FIELD: product_freeze */}
      </div>

      <div className="setting-row">
        <span>Can Order</span>
        <StatusIcon isActive={product.can_order} />
        <div className="help-icon" title="Product can be selected for stock order" />
        {/* ORPHAN_FIELD: can_order */}
      </div>

      <div className="setting-row">
        <span>Is Internal</span>
        <StatusIcon isActive={product.is_internal} />
        {/* ORPHAN_FIELD: is_internal */}
      </div>

      <div className="setting-row">
        <span>Active</span>
        <StatusIcon isActive={product.active} />
        {/* ORPHAN_FIELD: active */}
      </div>
    </div>
  );
};