import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from './api'; // Assuming standard axios/fetch wrapper

/**
 * Edit Supplier Page
 * Asset: assets/08cfad07-4f86-4e21-b60d-24b0bc0c0e80.svg
 */
export const EditSupplierPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    // Page Load — Fetch Supplier
    api.get(`/api/supplier/${id}`)
      .then(response => {
        setSupplier(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        if (error.status === 401) navigate('/login');
        if (error.status === 404) /* Show Not Found State */;
      });
  }, [id]);

  const handleSave = async (formData) => {
    setIsSaving(true);
    try {
      const response = await api.patch(`/api/supplier/${id}`, formData);
      setSupplier(response.data);
      alert("Supplier updated successfully");
    } catch (error) {
      // Display API validation errors
      console.error(error.response?.data?.errors);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <header>
        <h1>Edit Supplier</h1>
        {/* Star Icon */}
      </header>

      <SupplierDetailsCard data={supplier} />
      <CreditTermsCard data={supplier} />
      <PricesCard data={supplier} />
      <NotesTab data={supplier} />
      <SettingsCard data={supplier} />

      <button onClick={() => navigate(-1)}>Cancel</button>
      <button 
        disabled={isSaving} 
        onClick={() => handleSave(currentFormState)}
      >
        {isSaving ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};