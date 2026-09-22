import React, { useState, useEffect } from 'react';
import { fetchVillages } from './api'; // Logic layer

/**
 * Asset: assets/areas-village-list.svg
 * Component: VillageList
 * Displays a paginated table of villages with filtering capabilities.
 */
export const VillageList = () => {
  // State for filters
  const [name, setName] = useState('');
  const [province_id, setProvinceId] = useState('');
  const [regency_id, setRegencyId] = useState(''); // <!-- ORPHAN_FIELD: regency_municipality_id -->
  const [district_id, setDistrictId] = useState('');
  
  // State for pagination
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  
  // State for data
  const [villages, setVillages] = useState([]);

  const loadData = async () => {
    const params = { name, province_id, regency_id, district_id, limit, offset };
    const data = await fetchVillages(params);
    setVillages(data);
  };

  // Initial load and filter trigger
  useEffect(() => {
    loadData();
  }, [offset]);

  return (
    <div>
      {/* Filter Controls */}
      <input 
        placeholder="Search by name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      {/* Dropdowns for Province, Regency, District would be implemented here 
          using their respective GET endpoints to populate options */}
      
      <button onClick={() => { setOffset(0); loadData(); }}>Search</button>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Village</th>
            <th>District</th>
            <th>Regency/Municipality</th>
            <th>Province</th>
          </tr>
        </thead>
        <tbody>
          {villages.map((v) => (
            <tr key={v.id}>
              <td>{v.code}</td>
              <td>{v.name}</td>
              <td>{v.district_name}</td>
              <td>{v.regency_municipality_name}</td>
              <td>{v.province_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <button onClick={() => setOffset(prev => prev + limit)}>Next</button>
    </div>
  );
};