import React, { useState, useEffect } from 'react';
import { fetchSuppliers } from './api'; // Wrapper for GET /suppliers

/**
 * Asset: assets/dd5b3156-7861-4e33-b76b-ee47f8d2384c.svg
 */
export const SupplierListPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isInternal, setIsInternal] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Filter Bar State
  const [filterSupplierCode, setFilterSupplierCode] = useState(''); // ORPHAN_FIELD: supplier_code
  const [filterName, setFilterName] = useState(''); // ORPHAN_FIELD: name
  const [filterContactName, setFilterContactName] = useState(''); // ORPHAN_FIELD: contact_name
  const [filterPhone, setFilterPhone] = useState(''); // ORPHAN_FIELD: phone
  const [filterStatus, setFilterStatus] = useState(''); // ORPHAN_FIELD: status

  const loadSuppliers = async () => {
    const response = await fetchSuppliers({ is_internal: isInternal, search, page });
    setSuppliers(response);
  };

  useEffect(() => {
    loadSuppliers();
  }, [isInternal, page]);

  return (
    <div>
      <MainMenu activeTab="Suppliers" />
      <SubMenu activeTab="Supplier" />
      
      {/* Navigation Tabs */}
      <button onClick={() => setIsInternal(false)}>Supplier</button>
      <button onClick={() => setIsInternal(true)}>Internal</button>

      {/* Filter Bar */}
      <input placeholder="Supplier Code" onChange={(e) => setFilterSupplierCode(e.target.value)} />
      <input placeholder="Name" onChange={(e) => setFilterName(e.target.value)} />
      <input placeholder="Contact Name" onChange={(e) => setFilterContactName(e.target.value)} />
      <input placeholder="Phone" onChange={(e) => setFilterPhone(e.target.value)} />
      <select onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      
      <button onClick={loadSuppliers}>Search Button</button>
      <button onClick={() => window.location.href = '/add-supplier'}>New Supplier</button>

      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Contact Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Tax</th>
            <th>Allow Store Purchase Order?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.supplier_id}>
              <td><a href={`/suppliers/${s.supplier_code}`}>{s.supplier_code}</a></td>
              <td><a href={`/suppliers/${s.supplier_id}`}>{s.name}</a></td>
              <td>{s.contact_name}</td>
              <td>{s.phone}</td>
              <td>{`${s.address}, ${s.country}`}</td>
              <td>{s.tax_no}</td>
              <td>{s.can_spo ? '✅' : '❌'}</td>
              <td>
                <button onClick={() => window.location.href = `/edit-supplier/${s.supplier_id}`}>Edit</button>
                <button onClick={() => openDeactivatePopup(s.supplier_id)}>
                  {s.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};