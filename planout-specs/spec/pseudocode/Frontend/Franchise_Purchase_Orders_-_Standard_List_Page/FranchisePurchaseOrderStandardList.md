import React, { useState, useEffect } from 'react';
import { fetchFranchisePurchaseOrders } from './api';

/**
 * Asset: assets/87a96138-3aca-4735-9a68-120174db5333.svg
 * Feature: Franchise Purchase Orders - Standard List Page
 */
export const FranchisePurchaseOrderStandardList = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    // ORPHAN_FIELD: from_date
    // ORPHAN_FIELD: to_date
    // ORPHAN_FIELD: store_id
    // ORPHAN_FIELD: supplier_id
    // ORPHAN_FIELD: status_id
    // ORPHAN_FIELD: source_id
  });

  const loadOrders = async (params = {}) => {
    const response = await fetchFranchisePurchaseOrders({
      page,
      limit: 20,
      order_type: 'external_standard',
      search,
      ...params
    });
    setOrders(response.data);
  };

  useEffect(() => {
    loadOrders();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    loadOrders({ search });
  };

  return (
    <div>
      <MainMenu activeTab="Inventory" />
      <SubMenu activeTab="Store" />
      
      <NavigationTabs 
        tabs={['Internal', 'Standard']} 
        active="Standard" 
        onTabClick={(tab) => tab === 'Internal' && navigateToInternalList()} 
      />

      <FilterBar>
        <input type="text" placeholder="Document Number" onChange={(e) => setSearch(e.target.value)} />
        {/* Additional filter inputs for Date, Store, Supplier, Status, Source */}
        <button onClick={handleSearch}>Search</button>
      </FilterBar>

      <Table>
        <thead>
          <tr>
            <th onClick={() => sort('ref_code')}>Document Number</th>
            <th onClick={() => sort('supplier_ref_code')}>Reference No.</th>
            <th onClick={() => sort('created_at')}>Created At</th>
            <th onClick={() => sort('due_at')}>Due At</th>
            <th onClick={() => sort('received_at')}>Received At</th>
            <th onClick={() => sort('store_name')}>Store</th>
            <th onClick={() => sort('supplier_name')}>Supplier</th>
            <th onClick={() => sort('warehouse_name')}>Warehouse</th>
            <th onClick={() => sort('workflow_state')}>Status</th>
            <th>Order Amount</th>
            <th>Receive Amount</th>
            <th onClick={() => sort('updater_name')}>User</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><a href={`/detail/${order.id}`}>{order.ref_code}</a></td>
              <td>{order.supplier_ref_code}</td>
              <td>{formatDate(order.created_at)}</td>
              <td>{formatDate(order.due_at)}</td>
              <td>{order.received_at ? formatDate(order.received_at) : '-'}</td>
              <td>{order.store_name}</td>
              <td>{order.supplier_name}</td>
              <td>{order.warehouse_name || '-'}</td>
              <td>
                <StatusBadge state={order.workflow_state} isPartial={order.received_partial} />
              </td>
              <td>{formatCurrency(order.order_amount)}</td>
              <td>{formatCurrency(order.receive_amount)}</td>
              <td>{order.updater_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination 
        currentPage={page} 
        onPageChange={setPage} 
      />
    </div>
  );
};