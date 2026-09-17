// Component: MainHeader
// Description: The primary navigation header for the ERP system.
// Asset: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.svg

import { useState } from 'react';

export const MainHeader = () => {
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Handler: Products Menu Toggle
  const handleProductsClick = () => {
    setIsProductsMenuOpen(!isProductsMenuOpen);
  };

  // Handler: Navigation Item Click
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    // Logic: Navigate to corresponding page section
  };

  // Handler: Search Input (Debounced)
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Logic: Debounce implementation here
  };

  return (
    <header className="topnav">
      {/* Top Navigation Items */}
      <nav>
        <button onClick={() => handleNavClick('dashboard')}>Dashboard</button>
        <button onClick={handleProductsClick}>Products</button>
        
        {/* Products Menu (Conditional Rendering) */}
        {isProductsMenuOpen && (
          <div className="products-menu">
            {/* Products Menu content */}
          </div>
        )}
      </nav>

      {/* Search Field */}
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => handleSearchChange(e.target.value)} 
      />

      {/* Notification Bell */}
      <button onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
        <img src="notification-bell-icon" alt="Notifications" />
      </button>
      {isNotificationOpen && <div className="notification-dropdown">...</div>}

      {/* User Profile Menu */}
      <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
        <img src="avatar-icon" alt="User Profile" />
      </button>
      {isProfileMenuOpen && (
        <div className="profile-dropdown">
          <ul>
            <li>Settings</li>
            <li>Sign Out</li>
          </ul>
        </div>
      )}
    </header>
  );
};