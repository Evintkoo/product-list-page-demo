import React, { useState, useEffect, useCallback } from 'react';
import { fetchProvinces, checkAuth } from './api'; // Logic layer calls

/**
 * Asset: assets/4bef03ad-7d55-4f13-ab33-6ba72c6a3b79.svg
 * View: Province List Management
 */
export const ProvinceList = () => {
  const [provinces, setProvinces] = useState([]);
  const [search, setSearch] = useState(''); // Maps to 'search' query param
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Initial Load & Auth Check
  useEffect(() => {
    const init = async () => {
      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) {
        window.location.href = '/login'; // Redirect to Login Page
        return;
      }
      loadData();
    };
    init();
  }, []);

  const loadData = async (pageNumber = 1, searchQuery = '') => {
    setLoading(true);
    try {
      // API: GET /areas?area_type=province&page={page}&search={search}
      const data = await fetchProvinces({ 
        area_type: 'province', 
        page: pageNumber, 
        search: searchQuery 
      });
      setProvinces(data);
    } catch (error) {
      console.error("Failed to fetch provinces", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    loadData(1, search);
  };

  return (
    <div>
      {/* Header Section */}
      <header>
        <h1>Province</h1>
        {/* Icons: Location (left), Star (right) */}
      </header>

      {/* Tab Navigation */}
      <nav>
        <button className="active">Province</button>
        <button>Regency/Municipality</button>
        <button>District</button>
        <button>Village</button>
      </nav>

      {/* Filter Bar */}
      <section>
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      {/* Province Table */}
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Province</th>
          </tr>
        </thead>
        <tbody>
          {provinces.map((item) => (
            <tr key={item.id}>
              <td>{item.code}</td>
              <td>
                <a href={`/provinces/${item.id}`}>{item.name}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};