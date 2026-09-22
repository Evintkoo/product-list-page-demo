import React, { useState, useEffect } from 'react';
import { fetchPaymentTypeMappings, fetchStores, fetchPaymentTypes } from './api';

/**
 * Main Page Component for Payment Type Mapping
 * Asset: assets/30faa2cb-55a7-4ec3-a639-47419a6e65e7.svg
 */
export const PaymentTypeMappingPage = () => {
  // State for filters
  const [storeId, setStoreId] = useState('');
  const [paymentTypeId, setPaymentTypeId] = useState('');
  const [isActive, setIsActive] = useState<boolean | null>(null);
  
  // State for data
  const [mappings, setMappings] = useState([]);
  const [stores, setStores] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);

  // On Page Load: Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      const [mappingsData, storesData, paymentTypesData] = await Promise.all([
        fetchPaymentTypeMappings({}),
        fetchStores(),
        fetchPaymentTypes()
      ]);
      setMappings(mappingsData);
      setStores(storesData);
      setPaymentTypes(paymentTypesData);
    };
    loadInitialData();
  }, []);

  // Handle Filter Submission
  const handleFilter = async () => {
    const params = {
      store_id: storeId,
      payment_type_id: paymentTypeId,
      is_active: isActive
    };
    const filteredData = await fetchPaymentTypeMappings(params);
    setMappings(filteredData);
  };

  return (
    <div>
      <MainMenu activeTab="Setup" />
      <SubMenu activeTab="Finances" />
      
      <header>
        <PaymentIcon />
        <h1>Payment Type Mapping</h1>
        <StarIcon />
      </header>

      {/* Filter Section */}
      <section>
        <select onChange={(e) => setStoreId(e.target.value)}>
          <option value="">Select Store</option>
          {stores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>

        <select onChange={(e) => setPaymentTypeId(e.target.value)}>
          <option value="">Select Payment Type</option>
          {paymentTypes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>

        <select onChange={(e) => setIsActive(e.target.value === 'true')}>
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button onClick={handleFilter}>Show</button>
      </section>

      {/* Data Table */}
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Store</th>
            <th>Payment Type</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mappings.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td> <!-- ORPHAN_FIELD: row_number -->
              <td>{row.store}</td>
              <td>{row.payment_type}</td>
              <td>{row.active ? <GreenCheckmark /> : null}</td>
              <td>
                <button>
                  <EditIcon /> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={1} />
    </div>
  );
};