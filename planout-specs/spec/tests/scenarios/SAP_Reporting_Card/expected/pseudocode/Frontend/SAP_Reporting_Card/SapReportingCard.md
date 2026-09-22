/**
 * Component: SapReportingCard
 * Description: A card component containing SAP reporting configurations for the Lumi ERP Project.
 * Asset: assets/91b98a16-8c43-4869-851d-e4cf3cb1df17.svg
 */

import React, { useState } from 'react';

export const SapReportingCard = () => {
  // State management for SAP reporting fields
  // Note: Field names are derived from expected API PAYLOADS (currently empty, 
  // so we define local state based on the node requirements).
  const [formData, setFormData] = useState({
    cost_center: '',      // ORPHAN_FIELD: cost_center
    profit_center: '',    // ORPHAN_FIELD: profit_center
    assignment: ''        // ORPHAN_FIELD: assignment
  });

  const [errors, setErrors] = useState({});

  // Validation logic triggered immediately on change
  const validateField = (name, value) => {
    let error = '';
    if (name === 'cost_center' && value.length > 10) {
      error = 'Cost Center must be 10 characters or less.';
    }
    // Add further SAP-specific validation rules here
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div className="sap-reporting-card">
      {/* Header Section */}
      <div className="card-header">
        <span className="icon-document" />
        <h3>SAP REPORTING</h3>
      </div>

      {/* SAP Cost Center Field */}
      <div className="field-group">
        <label htmlFor="cost_center">Cost Center</label>
        <input
          id="cost_center"
          name="cost_center"
          type="text"
          value={formData.cost_center}
          onChange={handleChange}
        />
        {errors.cost_center && <span className="error">{errors.cost_center}</span>}
      </div>

      {/* SAP Profit Center Field */}
      <div className="field-group">
        <label htmlFor="profit_center">Profit Center</label>
        <input
          id="profit_center"
          name="profit_center"
          type="text"
          value={formData.profit_center}
          onChange={handleChange}
        />
        {errors.profit_center && <span className="error">{errors.profit_center}</span>}
      </div>

      {/* SAP Assignment Field */}
      <div className="field-group">
        <label htmlFor="assignment">Assignment</label>
        <input
          id="assignment"
          name="assignment"
          type="text"
          value={formData.assignment}
          onChange={handleChange}
        />
        {errors.assignment && <span className="error">{errors.assignment}</span>}
      </div>
    </div>
  );
};