import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVoucherFlexible, updateVoucherFlexible } from './api';

// Asset: assets/a2f2b9fe-c387-4b1a-a691-38c69443e750.svg

export const EditFlexibleVoucherPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    open_price: false,
    price_ex_tax: 0,
    value: 0,
    expire_in_months: 0,
    expire_in_days: 0,
    product_condition: '',
    sell_issue_locations: [],
    receive_redeem_locations: [],
    valid_for_member: false,
    valid_from: '',
    valid_until: '',
    external_publisher: ''
  });

  useEffect(() => {
    // Node: 1767be63-b85f-4464-9dd4-5f5821e170bb (Page Load)
    getVoucherFlexible(id).then((data) => {
      setFormData(data);
    });
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Node: 23e3f9f5-35d8-4e09-9e7a-737c0c90c367 (Save Button)
    await updateVoucherFlexible(id, formData);
    navigate(`/vouchers/${id}`);
  };

  return (
    <div>
      <h1>Edit Voucher Flexible</h1>
      
      {/* Node: 95a6e4ca-9fec-4a33-a95f-41f499727362 */}
      <input 
        required 
        value={formData.sku} 
        onChange={(e) => handleInputChange('sku', e.target.value)} 
      />

      {/* Node: f4f155f3-b809-4f79-a804-3fc13bf68424 */}
      <input 
        required 
        value={formData.name} 
        onChange={(e) => handleInputChange('name', e.target.value)} 
      />

      {/* Node: 980e28a9-75df-4c89-a381-054ca684aaf4 */}
      <textarea 
        value={formData.description} 
        onChange={(e) => handleInputChange('description', e.target.value)} 
      />

      {/* Node: cf04afe8-13d7-425d-839c-2774baa1dce2 */}
      <input 
        type="checkbox" 
        checked={formData.open_price} 
        onChange={(e) => handleInputChange('open_price', e.target.checked)} 
      />

      {/* Node: 7fdd2718-7285-44df-8259-de19d1d9c1cc (Read-only) */}
      <input readOnly value={formData.price_ex_tax} />

      {/* Node: 27bdd1b4-603f-48e2-b13e-c3e24c2763a1 (Read-only) */}
      <input readOnly value={formData.value} />

      {/* Node: 7b23fa3e-c4ae-4eb1-abc5-1ddf23dedf57 */}
      <input 
        type="number" 
        value={formData.expire_in_months} 
        onChange={(e) => handleInputChange('expire_in_months', parseInt(e.target.value))} 
      />

      {/* Node: 5fe98491-fc12-4f67-9b37-0109917fbdcb */}
      <input 
        type="number" 
        value={formData.expire_in_days} 
        onChange={(e) => handleInputChange('expire_in_days', parseInt(e.target.value))} 
      />

      {/* Node: f75c0592-1738-49a6-8d72-d7bb84161a1a */}
      <select 
        value={formData.product_condition} 
        onChange={(e) => handleInputChange('product_condition', e.target.value)}
      >
        {/* Options logic */}
      </select>

      {/* Node: 3be2bcb3-4415-435f-b024-d64372c84ff0 */}
      <LocationPicker 
        value={formData.sell_issue_locations} 
        onChange={(val) => handleInputChange('sell_issue_locations', val)} 
      />

      {/* Node: 81beb34f-82f9-4bc9-bdd7-2e1190448d27 */}
      <LocationPicker 
        value={formData.receive_redeem_locations} 
        onChange={(val) => handleInputChange('receive_redeem_locations', val)} 
      />

      {/* Node: 35357a04-22f4-4239-a5b2-9e2b7fc9e223 */}
      <MemberSelector 
        value={formData.valid_for_member} 
        onChange={(val) => handleInputChange('valid_for_member', val)} 
      />

      {/* Node: e96eefb1-d334-410f-8477-d487475d309d */}
      <DatePicker 
        value={formData.valid_from} 
        onChange={(val) => handleInputChange('valid_from', val)} 
      />

      {/* Node: df85f12a-1994-4493-b6ac-6fd0565d6b58 */}
      <DatePicker 
        value={formData.valid_until} 
        onChange={(val) => handleInputChange('valid_until', val)} 
      />

      {/* Node: 8669fdd3-c405-44f1-8861-3c859ffc9eb8 */}
      <PublisherSearch 
        value={formData.external_publisher} 
        onChange={(val) => handleInputChange('external_publisher', val)} 
      />

      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(`/vouchers/${id}`)}>Cancel</button>
    </div>
  );
};