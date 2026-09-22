/**
 * Component: CustomerGroupCard
 * Description: Displays the customer's assigned group and provides 
 * functionality to manage or create new groups.
 * Asset: assets/3ef68b7a-d86c-4cbf-8926-b4c93333b800.svg
 */

import React, { useState, useEffect } from 'react';
import { useCustomerGroupData } from './hooks/useCustomerGroupData';
import { NewCustomerGroupModal } from './NewCustomerGroupModal';

export const CustomerGroupCard = ({ customerId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Fetching available groups for the dropdown
  const { groups, loading, error } = useCustomerGroupData();

  // State for the selected group
  // Field: customer_group_id (from DATA SCHEMAS)
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const handleGroupChange = (event) => {
    const value = event.target.value;
    setSelectedGroupId(value);
    // Logic to persist the change to the customer entity would trigger here
  };

  return (
    <div className="customer-group-card">
      {/* Header Section */}
      <div className="card-header">
        <span className="customer-group-icon" /> {/* 25919fef-51c1-48d0-b2e3-7f61f32c21b4 */}
        <h3>CUSTOMER GROUP</h3>
      </div>

      {/* Group Selection */}
      <div className="form-group">
        <label htmlFor="customer_group_id">Group</label>
        <select 
          id="customer_group_id"
          value={selectedGroupId}
          onChange={handleGroupChange}
          disabled={loading}
        >
          <option value="">Select a group...</option>
          {groups.map((group) => (
            <option key={group.customer_group_id} value={group.customer_group_id}>
              {group.name} <!-- ORPHAN_FIELD: name -->
            </option>
          ))}
        </select>
      </div>

      {/* Action Button */}
      <button 
        type="button" 
        className="new-group-button" 
        onClick={() => setIsModalOpen(true)}
      >
        New Group
      </button>

      {/* Modal Trigger */}
      {isModalOpen && (
        <NewCustomerGroupModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};