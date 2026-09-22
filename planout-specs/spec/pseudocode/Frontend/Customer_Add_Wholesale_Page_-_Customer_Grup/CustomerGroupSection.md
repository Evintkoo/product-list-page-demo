/**
 * Component: CustomerGroupSection
 * Renders the "Customer Group" block with a dropdown and a "New Group" trigger.
 * Asset: assets/bd30de57-c53a-44c1-991b-30abd3c59dd7.svg
 */

import React, { useState } from 'react';
import { NewGroupModal } from './NewGroupModal';

export const CustomerGroupSection = () => {
  const [selectedGroupId, setSelectedGroupId] = useState<string>(''); // ORPHAN_FIELD: customer_group_id
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Validation: Ensure a group is selected before form submission
  const validateSelection = (value: string) => {
    if (!value || value === 'default') {
      return "Please select a valid customer group.";
    }
    return null;
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedGroupId(value);
    // Trigger immediate validation logic here
    const error = validateSelection(value);
    if (error) {
      // Display inline error message
    }
  };

  return (
    <div className="customer-group-container">
      <h3>CUSTOMER GROUP</h3>
      
      <label htmlFor="group-select">Group</label>
      <select 
        id="group-select" 
        value={selectedGroupId} 
        onChange={handleGroupChange}
      >
        <option value="default">Select Customer Group</option>
        {/* Map through available groups from API */}
      </select>

      <button 
        type="button" 
        onClick={() => setIsModalOpen(true)}
      >
        + New Group
      </button>

      {isModalOpen && (
        <NewGroupModal 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={(newGroupId) => setSelectedGroupId(newGroupId)} 
        />
      )}
    </div>
  );
};