/**
 * Component: AreasMenuTab
 * Description: A navigation menu component for the Areas page, allowing users to switch 
 * between different administrative levels (Province, Regency/Municipality, District, Village).
 * 
 * Asset: assets/95934567-a2ee-4d7a-a31a-b0f09bd993f7.svg
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AreasMenuTab = () => {
  const navigate = useNavigate();

  // Navigation Handlers
  // These handlers trigger the transition to the respective list pages as defined in the canvas.
  
  const handleNavigateToProvince = () => {
    // Trigger: On Click Province
    navigate('/areas/provinces');
  };

  const handleNavigateToRegency = () => {
    // Trigger: On Click Regency/Municipality
    navigate('/areas/regencies');
  };

  const handleNavigateToDistrict = () => {
    // Trigger: On Click District
    navigate('/areas/districts');
  };

  const handleNavigateToVillage = () => {
    // Trigger: On Click Village
    navigate('/areas/villages');
  };

  return (
    <nav className="areas-menu-container">
      <ul className="menu-list">
        <li 
          role="button" 
          onClick={handleNavigateToProvince}
          aria-label="Navigate to Province list"
        >
          Province
        </li>
        <li 
          role="button" 
          onClick={handleNavigateToRegency}
          aria-label="Navigate to Regency/Municipality list"
        >
          Regency/Municipality
        </li>
        <li 
          role="button" 
          onClick={handleNavigateToDistrict}
          aria-label="Navigate to District list"
        >
          District
        </li>
        <li 
          role="button" 
          onClick={handleNavigateToVillage}
          aria-label="Navigate to Village list"
        >
          Village
        </li>
      </ul>
    </nav>
  );
};

// Note: The navigation paths (/areas/provinces, etc.) are derived from the 
// node titles and descriptions provided in the canvas flow. 
// No API payloads or data schemas were required for this navigation component.