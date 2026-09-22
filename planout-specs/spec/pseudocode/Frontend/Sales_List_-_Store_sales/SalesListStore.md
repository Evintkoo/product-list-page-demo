import { useState, useEffect } from 'react';
import { fetchSales } from './api'; // Maps to GET /api/sales

const SalesListStore = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 });
  const [filters, setFilters] = useState({
    store_id: '',
    ref_code: '',
    ecommerce_ref_code: '', // <!-- ORPHAN_FIELD: ecommerce_ref_code_cont -->
    customer_name: '',      // <!-- ORPHAN_FIELD: customer_name_cont -->
    workflow_state: '',
    vehicle_registration: '', // <!-- ORPHAN_FIELD: vehicle_registration_start -->
    salesperson_id: '',
    date_option: 'created_at',
    from_date: '',
    to_date: ''
  });

  const loadSales = async (params = {}) => {
    const response = await fetchSales({ 
      limit: 20, 
      offset: 0, 
      ...params 
    });
    setSales(response.data);
    setPagination(response.pagination);
  };

  // Initial load
  useEffect(() => { loadSales(); }, []);

  return (
    <div>
      <Header title="Recent Sales" />
      <SalesTabs active="Store Sales" />
      
      <FilterBar 
        onSearch={(newFilters) => {
          setFilters(newFilters);
          loadSales(newFilters);
        }} 
      />

      <SalesTable 
        data={sales} 
        onPageChange={(page) => loadSales({ offset: (page - 1) * 20 })}
      />
    </div>
  );
};