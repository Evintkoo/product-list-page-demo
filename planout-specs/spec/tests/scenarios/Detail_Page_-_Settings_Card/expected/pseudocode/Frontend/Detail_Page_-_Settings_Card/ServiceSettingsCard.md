/**
 * Component: ServiceSettingsCard
 * Displays the configuration settings for a service product.
 * Asset: assets/b417a351-d604-46e2-9c4c-ba7179275b9e.svg
 */

import React from 'react';
import { GearIcon, CheckCircleIcon, XCircleIcon } from './icons'; // Hypothetical icon library

// Props derived from ServiceProduct entity schema
interface ServiceSettingsCardProps {
  is_active: boolean;           // DATA SCHEMA: is_active
  is_open_estimated_time: boolean; // DATA SCHEMA: is_open_estimated_time
  estimated_time_minutes: number;  // DATA SCHEMA: estimated_time_minutes
  is_open_price: boolean;       // DATA SCHEMA: is_open_price
}

export const ServiceSettingsCard: React.FC<ServiceSettingsCardProps> = ({
  is_active,
  is_open_estimated_time,
  estimated_time_minutes,
  is_open_price
}) => {

  // Helper to render boolean status with icon
  const StatusIndicator = ({ value }: { value: boolean }) => (
    <div className="flex items-center gap-2">
      {value ? (
        <span className="text-green-600 flex items-center">
          <CheckCircleIcon /> Yes
        </span>
      ) : (
        <span className="text-red-600 flex items-center">
          <XCircleIcon /> No
        </span>
      )}
    </div>
  );

  return (
    <div className="settings-card-container border rounded-lg p-4">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold">
        <GearIcon />
        <span>SETTINGS</span>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Active Status */}
        <div className="field-group">
          <label className="block text-sm font-medium">Active</label>
          <StatusIndicator value={is_active} />
        </div>

        {/* Open Estimated Time Status */}
        <div className="field-group">
          <label className="block text-sm font-medium">Open Estimated Time</label>
          <StatusIndicator value={is_open_estimated_time} />
        </div>

        {/* Estimated Time Value */}
        <div className="field-group">
          <label className="block text-sm font-medium">Estimated Time</label>
          <div className="text-gray-700">
            {estimated_time_minutes} Minute(s)
          </div>
        </div>

        {/* Open Price Status */}
        <div className="field-group">
          <label className="block text-sm font-medium">Open Price</label>
          <StatusIndicator value={is_open_price} />
        </div>

      </div>
    </div>
  );
};

// ORPHAN_FIELD: is_active (Used in UI, verify presence in ServiceProduct entity)
// ORPHAN_FIELD: is_open_estimated_time (Used in UI, verify presence in ServiceProduct entity)
// ORPHAN_FIELD: estimated_time_minutes (Used in UI, verify presence in ServiceProduct entity)
// ORPHAN_FIELD: is_open_price (Used in UI, verify presence in ServiceProduct entity)