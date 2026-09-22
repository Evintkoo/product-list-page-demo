/**
 * Component: NewSupplierButton
 * Description: Trigger to navigate the user to the New Supplier creation page.
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const NewSupplierButton = () => {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    // Navigates to the New Supplier Page
    navigate('/suppliers/new');
  };

  return (
    <button 
      className="btn-new-supplier" 
      onClick={handleCreateClick}
      aria-label="Create New Supplier"
    >
      New Supplier
    </button>
  );
};