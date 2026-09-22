import React, { useState, useEffect } from 'react';
import { fetchStockTransfers } from './api';

/**
 * Asset: assets/c4202869-e71a-4882-9aca-5e4520a0cb57.svg
 */
export const StockTransferListPage = () => {
  const [transfers, setTransfers] = useState([]);
  const [pagination, setPagination] = useState({ limit: 20, offset: 0, total: 0 });
  
  // Filter State
  const [filters, setFilters] = useState({
    from_location_id: '',
    to_location_id: '',
    // ORPHAN_FIELD: ref_code
    // ORPHAN_FIELD: from_date
    // ORPHAN_FIELD: to_date
    // ORPHAN_FIELD: workflow_state
    // ORPHAN_FIELD: transfer_type
    // ORPHAN_FIELD: created_by_user_id
  });

  const loadData = async (newOffset = 0) => {
    const response = await fetchStockTransfers({
      ...filters,
      limit: pagination.limit,
      offset: newOffset
    });
    setTransfers(response.data);
    setPagination(response.pagination);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div>
      <header>
        <h1>Stock Transfer</h1>
        {/* Star and Recycle icons */}
      </header>

      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        onSearch={() => loadData(0)} 
      />

      <button onClick={() => navigate('/new-stock-transfer')}>
        New Stock Transfer
      </button>

      <StockTransferTable 
        data={transfers} 
        onSort={(column) => {/* Handle sort logic */}} 
      />

      <Pagination 
        pagination={pagination} 
        onPageChange={(newOffset) => loadData(newOffset)} 
      />
    </div>
  );
};