import React, { useState, useEffect } from 'react';
import { MainMenu, SubMenu, NavigationTabs, FilterBar, DataTable, Pagination } from './components';

/**
 * Asset: assets/0953873a-d317-4181-ae34-19c5f713513b.svg
 * Feature: Areas - District
 */
export const DistrictListPage = () => {
  // State for filters
  const [filters, setFilters] = useState({
    name: '',
    province_id: null, // ORPHAN_FIELD: province_id
    regency_id: null   // ORPHAN_FIELD: regency_id
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [districtData, setDistrictData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data based on filters and pagination
  const fetchDistricts = async (page = 1, currentFilters = filters) => {
    setIsLoading(true);
    try {
      // API call logic derived from context
      // GET /areas/districts?page={page}&name={name}&province_id={...}&regency_id={...}
      const response = await api.get('/areas/districts', { 
        params: { page, ...currentFilters } 
      });
      setDistrictData(response.data);
    } catch (error) {
      console.error("Failed to fetch districts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDistricts(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchDistricts(1, filters);
  };

  return (
    <div className="page-container">
      <MainMenu activeTab="Setup" />
      <SubMenu activeTab="Areas" />
      
      <h1>Areas - District</h1>
      
      <NavigationTabs 
        active="District" 
        items={['Province', 'Regency/Municipality', 'District', 'Village']} 
      />

      <FilterBar>
        <input 
          placeholder="Name" 
          value={filters.name}
          onChange={(e) => setFilters({...filters, name: e.target.value})}
        />
        <Dropdown 
          placeholder="Province"
          onChange={(val) => setFilters({...filters, province_id: val})}
        />
        <Dropdown 
          placeholder="Regency/Municipality"
          onChange={(val) => setFilters({...filters, regency_id: val})}
        />
        <button onClick={handleSearch}>Search</button>
      </FilterBar>

      <DataTable 
        data={districtData}
        columns={[
          { header: 'Code', accessor: 'code' },
          { header: 'District', accessor: 'name' },
          { header: 'Regency/Municipality', accessor: 'regency_name' },
          { header: 'Province', accessor: 'province_name' }
        ]}
        onRowClick={(row) => navigateTo(`/districts/${row.id}`)}
      />

      <Pagination 
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};