import { useState, useEffect } from 'react';
import { fetchAuthMe, fetchCustomerDefaults, createCustomer } from './api';

// Asset: assets/bcc1b6fe-24ca-4056-99a6-ac0ebc649cea.svg

export const AddWholesaleCustomerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'wholesale',
    tax_id: '',
    addresses: []
  });
  
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPage = async () => {
      try {
        // Auth check
        await fetchAuthMe();
        
        // Fetch defaults and options
        const { defaults, options } = await fetchCustomerDefaults();
        setOptions(options);
        setFormData(prev => ({ ...prev, ...defaults }));
      } catch (error) {
        window.location.href = '/login';
      } finally {
        setLoading(false);
      }
    };
    initPage();
  }, []);

  const handleSave = async () => {
    try {
      await createCustomer(formData);
      // Redirect to list on success
    } catch (error) {
      // Handle 422 validation errors
    }
  };

  return (
    <div>
      <h1>New Wholesale Customer *</h1>
      
      {/* User Details Card */}
      <input 
        value={formData.name} 
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
        placeholder="Name" 
      />
      <input 
        value={formData.email} 
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
        placeholder="Email" 
      />
      <input 
        value={formData.tax_id} 
        onChange={(e) => setFormData({...formData, tax_id: e.target.value})} 
        placeholder="Tax ID" 
      />

      {/* Addresses Card */}
      <button onClick={() => {/* Open New Address Modal */}}>+ Add Address</button>
      
      {/* Action Buttons */}
      <button onClick={handleSave}>Save</button>
      <button onClick={() => window.location.href = '/customers'}>Cancel</button>
    </div>
  );
};