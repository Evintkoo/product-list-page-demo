import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './hooks/useDebounce';

/**
 * MainHeader Component
 * Asset: assets/d7b674ec-8d8a-4ff5-8d16-5fd270967a12.svg
 * Sticky global header for the ERP system.
 */
export const MainHeader = () => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Page Load: Check Session
  useEffect(() => {
    fetch('/auth/me')
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error('Unauthorized');
      })
      .then(data => setUser(data))
      .catch(() => window.location.href = '/login');
  }, []);

  // Search Input with Debounce
  const debouncedSearch = useDebounce(searchQuery, 300);
  useEffect(() => {
    if (debouncedSearch) {
      console.log('Triggering search for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />

      {/* Navigation Items */}
      <nav>
        <button onClick={() => setActiveMenu('customers')}>Customer</button>
        <button onClick={() => setActiveMenu('products')}>Products</button>
        <button onClick={() => setActiveMenu('inventory')}>Inventory</button>
        <button onClick={() => setActiveMenu('suppliers')}>Suppliers</button>
        <button onClick={() => setActiveMenu('finance')}>Finance</button>
        <button onClick={() => setActiveMenu('sales')}>Sales</button>
        <button onClick={() => setActiveMenu('setup')}>Setup</button>
      </nav>

      {/* Notification Icon */}
      <button onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}>
        {/* Asset: Notification Bell Icon */}
      </button>

      {/* User Profile Menu */}
      <div onClick={() => setIsProfileOpen(!isProfileOpen)}>
        <span>{user?.name}</span>
        {isProfileOpen && (
          <ul>
            <li>Settings</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        )}
      </div>

      {/* Sub-menu rendering logic based on activeMenu state */}
      {activeMenu && <SubMenuRenderer type={activeMenu} />}
    </header>
  );
};