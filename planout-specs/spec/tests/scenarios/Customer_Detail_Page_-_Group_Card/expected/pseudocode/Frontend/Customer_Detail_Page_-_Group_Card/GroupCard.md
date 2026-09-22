/**
 * Component: GroupCard
 * Description: Displays the core identity fields of the customer's group.
 * Asset: assets/f9331ca4-4911-4c30-bbc3-65be95726e03.svg
 */

import React from 'react';

interface GroupCardProps {
  // Data sourced from the Customer entity context
  customerGroup?: string; // <!-- ORPHAN_FIELD: customerGroup -->
}

export const GroupCard: React.FC<GroupCardProps> = ({ customerGroup }) => {
  
  /**
   * Logic:
   * The field is strictly read-only.
   * If the customerGroup is null, undefined, or an empty string, 
   * the component renders a blank state or a placeholder indicating no group assignment.
   */
  
  return (
    <div className="group-card-container">
      <h3>Customer Group</h3>
      <div className="group-display-field">
        {customerGroup && customerGroup.trim().length > 0 
          ? customerGroup 
          : <span className="placeholder-text">No group assigned</span>}
      </div>
    </div>
  );
};