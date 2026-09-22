/**
 * Component: RegencyList
 * Asset: assets/033197b5-cd49-4b9a-bb2f-5d10734c6479.svg
 * 
 * Displays a paginated table of Regencies with filtering capabilities.
 */

import { useState, useEffect } from 'react';
import { fetchRegencies, fetchProvinces } from './api';

export const RegencyList = () => {
  // State for filters and pagination
  const [name, setName] = useState('');
  const [province_id, setProvinceId] = useState('');
  const [limit] = useState(10);
  const [offset, setOffset] = useState(0);
  
  // State for data
  const [regencies, setRegencies] = useState([]);
  const [provinces, setProvinces] = useState([]);

  // Fetch provinces for the filter dropdown on mount
  useEffect(() => {
    fetchProvinces().then(setProvinces);
  }, []);

  // Fetch regencies whenever filters or pagination change
  const loadRegencies = async () => {
    const params = { name, province_id, limit, offset };
    const data = await fetchRegencies(params);
    setRegencies(data);
  };

  useEffect(() => {
    loadRegencies();
  }, [offset, province_id]); // Triggered by pagination or province filter

  return (
    <div>
      {/* Filters */}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Search by name" 
      />
      
      <select value={province_id} onChange={(e) => setProvinceId(e.target.value)}>
        <option value="">All Provinces</option>
        {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <button onClick={loadRegencies}>Search</button>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Regency/Municipality</th>
            <th>Province</th> <!-- ORPHAN_FIELD: province_name -->
          </tr>
        </thead>
        <tbody>
          {regencies.map((regency) => (
            <tr key={regency.id}>
              <td>{regency.code}</td>
              <td>
                <a href={`/regencies/${regency.id}`}>{regency.name}</a>
              </td>
              <td>
                <a href={`/provinces/${regency.province_id}`}>
                  {/* Display logic for province name mapping */}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination 
        offset={offset} 
        onPageChange={(newOffset) => setOffset(newOffset)} 
      />
    </div>
  );
};