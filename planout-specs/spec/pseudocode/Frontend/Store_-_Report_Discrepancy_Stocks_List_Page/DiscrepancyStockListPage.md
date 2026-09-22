import React, { useState, useEffect } from 'react';
import { MainMenu, SubMenu, Table, Button, Input, Select, DatePicker } from 'lumi-erp-components';
import { fetchDiscrepancyStocks } from './api';

/**
 * Asset: assets/80c7c13d-9d22-4a64-b795-ac75100a8b7e.svg
 */
export const DiscrepancyStockListPage = () => {
  // Filter State
  const [filters, setFilters] = useState({
    sku: '',
    product_name: '',
    document_ref_code: '', // ORPHAN_FIELD: document_ref_code
    from_date: null,       // ORPHAN_FIELD: from_date
    to_date: null,         // ORPHAN_FIELD: to_date
    entity_id: '',         // ORPHAN_FIELD: entity_id
    status: ''
  });

  const [data, setData] = useState([]);

  const handleSearch = async () => {
    // Only include filters with values
    const queryParams = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
    );
    
    const response = await fetchDiscrepancyStocks(queryParams);
    setData(response);
  };

  return (
    <div>
      <MainMenu activeTab="Inventory" />
      <SubMenu activeTab="Store" />

      {/* Filter Bar */}
      <div className="filter-bar">
        <Input placeholder="Product SKU" onChange={(v) => setFilters({...filters, sku: v})} />
        <Input placeholder="Product Name" onChange={(v) => setFilters({...filters, product_name: v})} />
        <Input placeholder="Document Ref Code" onChange={(v) => setFilters({...filters, document_ref_code: v})} />
        <DatePicker placeholder="From Date" onChange={(v) => setFilters({...filters, from_date: v})} />
        <DatePicker placeholder="To Date" onChange={(v) => setFilters({...filters, to_date: v})} />
        <Select placeholder="Entity" onChange={(v) => setFilters({...filters, entity_id: v})} />
        <Select placeholder="Status" onChange={(v) => setFilters({...filters, status: v})} />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Button onClick={() => navigate('/new-report')}>New Report</Button>
      <Button onClick={() => navigate('/reports')}>Download</Button>

      <Table data={data}>
        <Column title="No." render={(_, __, index) => index + 1} />
        <Column title="Date" dataIndex="created_at" />
        <Column title="Entity" dataIndex="entity_name" />
        <Column title="Document Ref Code" dataIndex="ref_code" />
        <Column title="Reference" dataIndex="reference" />
        <Column title="Product SKU" dataIndex="product_sku" />
        <Column title="Product" dataIndex="product_name" />
        <Column title="Quantity" dataIndex="quantity" />
        <Column title="Notes" dataIndex="notes" />
        <Column title="Feedback" dataIndex="feedback" />
        <Column title="Status" dataIndex="aasm_state" />
        <Column title="Action" render={(row) => (
          <>
            <Button onClick={() => navigate(`/detail/${row.id}`)}>Show</Button>
            <Dropdown>
              <MenuItem onClick={() => navigate(`/edit/${row.id}`)}>Edit</MenuItem>
              <MenuItem onClick={() => navigate(`/feedback/${row.id}`)}>Add Feedback</MenuItem>
            </Dropdown>
          </>
        )} />
      </Table>
    </div>
  );
};