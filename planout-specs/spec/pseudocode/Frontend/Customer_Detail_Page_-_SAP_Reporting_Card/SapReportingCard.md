/**
 * Component: SapReportingCard
 * Description: Displays SAP reporting details for the customer, including Assignment, 
 * Cost Center, and Profit Center. All fields are read-only.
 * Asset: assets/eac69cdf-90cb-4528-b9c4-40f90ac3b05c.svg
 */

import React, { useEffect, useState } from 'react';

export const SapReportingCard = ({ customerId }) => {
  const [sapData, setSapData] = useState({
    assignment: null,
    costCenter: null,
    profitCenter: null
  });
  const [loading, setLoading] = useState(true);

  // Fetching SAP reporting data
  // Note: API CONTRACTS is empty, assuming GET /customers/{customerId}/sap-reporting
  useEffect(() => {
    fetch(`/customers/${customerId}/sap-reporting`)
      .then((res) => res.json())
      .then((data) => {
        setSapData({
          assignment: data.assignment, // ORPHAN_FIELD: assignment
          costCenter: data.costCenter, // ORPHAN_FIELD: costCenter
          profitCenter: data.profitCenter // ORPHAN_FIELD: profitCenter
        });
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch SAP reporting data", err));
  }, [customerId]);

  if (loading) return <div>Loading SAP Reporting...</div>;

  return (
    <div className="sap-reporting-card">
      <h3>SAP Reporting</h3>
      
      <div className="field-group">
        <label>Assignment</label>
        <input 
          type="text" 
          value={sapData.assignment || 'N/A'} 
          readOnly 
          disabled 
        />
      </div>

      <div className="field-group">
        <label>Cost Center</label>
        <input 
          type="text" 
          value={sapData.costCenter || 'N/A'} 
          readOnly 
          disabled 
        />
      </div>

      <div className="field-group">
        <label>Profit Center</label>
        <input 
          type="text" 
          value={sapData.profitCenter || 'N/A'} 
          readOnly 
          disabled 
        />
      </div>
    </div>
  );
};