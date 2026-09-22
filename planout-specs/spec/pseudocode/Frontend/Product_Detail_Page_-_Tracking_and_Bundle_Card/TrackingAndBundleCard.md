/**
 * Component: TrackingAndBundleCard
 * Displays the status of stock tracking and bundle configurations for a product.
 * Asset: assets/e2db2214-ec60-4a47-b368-a2584e00c1be.svg
 */

import React from 'react';

// Props derived from Product entity schema
interface TrackingAndBundleCardProps {
  stock_tracking_enabled: boolean; // DATA SCHEMA: stock_tracking_enabled
  is_flexible_bundle: boolean;     // DATA SCHEMA: is_flexible_bundle
  is_bundle: boolean;              // DATA SCHEMA: is_bundle
}

export const TrackingAndBundleCard: React.FC<TrackingAndBundleCardProps> = ({
  stock_tracking_enabled,
  is_flexible_bundle,
  is_bundle
}) => {

  // Helper to render status icons
  const StatusIcon = ({ active }: { active: boolean }) => (
    <span className={active ? 'icon-green-check' : 'icon-red-cross'}>
      {active ? '✓' : '✗'}
    </span>
  );

  return (
    <div className="tracking-bundle-card-container">
      <h3>Product Configuration</h3>
      
      {/* Stock Tracking Section */}
      <div className="card-row">
        <span>Stock Tracking</span>
        <StatusIcon active={stock_tracking_enabled} />
        <div className="help-icon" title="When enabled, the system will automatically reduce stock during sales. For services, this should be disabled">
          (?)
        </div>
      </div>

      {/* Bundle Flexible Section */}
      <div className="card-row">
        <span>Bundle Flexible</span>
        <StatusIcon active={is_flexible_bundle} />
      </div>

      {/* Bundle Section */}
      <div className="card-row">
        <span>Bundle</span>
        <StatusIcon active={is_bundle} />
      </div>
    </div>
  );
};