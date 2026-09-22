/**
 * Component: ServiceProductInfoCard
 * Description: Displays the core details of a service product item.
 * Asset: assets/69ceafc3-a1f0-4181-ac18-6cc2b11dcfe2.svg
 */

import React from 'react';

// Props interface derived from DATA SCHEMAS
interface ServiceProductInfoCardProps {
  name: string;           // Entity: ServiceProduct, Field: name
  tags: string[];         // Entity: ServiceProduct, Field: tags
  type: string;           // Entity: ServiceProduct, Field: type
  description: string;    // Entity: ServiceProduct, Field: description
  sku: string;            // Entity: ServiceProduct, Field: sku
}

export const ServiceProductInfoCard: React.FC<ServiceProductInfoCardProps> = ({
  name,
  tags,
  type,
  description,
  sku
}) => {
  return (
    <div className="info-card-container">
      {/* Header Section */}
      <div className="header-section">
        <span className="badge-blue">
          <Icon name="docs" /> DETAILS
        </span>
      </div>

      {/* Content Grid */}
      <div className="info-grid">
        
        {/* Name Field */}
        <div className="field-group">
          <label>Name</label>
          <div className="read-only-value">{name}</div>
        </div>

        {/* Tag Field */}
        <div className="field-group">
          <label>Tag</label>
          <div className="tag-container">
            {tags.map((tag, index) => (
              <span key={index} className="dark-pill-badge">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Type Field */}
        <div className="field-group">
          <label>Type</label>
          <div className="read-only-value">{type}</div>
        </div>

        {/* Description Field */}
        <div className="field-group">
          <label>Description</label>
          <div className="read-only-value">{description}</div>
        </div>

        {/* SKU Field */}
        <div className="field-group">
          <label>SKU</label>
          <div className="read-only-value">{sku}</div>
        </div>

      </div>
    </div>
  );
};

// Note: All fields are read-only as per requirements. 
// No validation logic is required for display-only components.
// ORPHAN_FIELD: Icon <!-- Used for the docs icon in the header -->