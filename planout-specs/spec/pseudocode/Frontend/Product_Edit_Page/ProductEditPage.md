import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from './api'; // Assuming API service layer

// Asset: assets/75a4524f-921b-45fc-95c8-4418a1ebc425.svg

export const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch product data on load
    getProduct(id).then(data => {
      setFormData(data);
      setLoading(false);
    });
  }, [id]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProduct(id, formData);
      navigate('/products'); // Redirect to list/details
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form>
      {/* Main Menu & Sub Menu components rendered here */}
      
      <input name="SKU" value={formData.SKU} onChange={e => handleInputChange('SKU', e.target.value)} required />
      <input name="productName" value={formData.productName} onChange={e => handleInputChange('productName', e.target.value)} required />
      <textarea name="productDescription" value={formData.productDescription} onChange={e => handleInputChange('productDescription', e.target.value)} />
      
      {/* Dropdowns for Type, Brand, Tag, Tax, Tax Product Code, Tax Unit Of Measure */}
      {/* Include New Brand/New Tag buttons as overlays */}

      <input type="number" name="companySupplyPrice" value={formData.companySupplyPrice} onChange={e => handleInputChange('companySupplyPrice', parseFloat(e.target.value))} />
      <input type="number" name="wholesalePrice" value={formData.wholesalePrice} onChange={e => handleInputChange('wholesalePrice', parseFloat(e.target.value))} />
      <input type="checkbox" name="includingTaxCompany" checked={formData.includingTaxCompany} onChange={e => handleInputChange('includingTaxCompany', e.target.checked)} />
      
      <input type="number" name="storePricing" value={formData.storePricing} onChange={e => handleInputChange('storePricing', parseFloat(e.target.value))} />
      <input type="checkbox" name="includingTaxStore" checked={formData.includingTaxStore} onChange={e => handleInputChange('includingTaxStore', e.target.checked)} />
      
      <input type="number" name="mrp" value={formData.mrp} onChange={e => handleInputChange('mrp', parseFloat(e.target.value))} />
      
      {/* Trade In: Two inputs for tradeInValue and tradeInPercent */}
      
      <input type="checkbox" name="isActive" checked={formData.isActive} onChange={e => handleInputChange('isActive', e.target.checked)} />
      <input type="checkbox" name="isInternal" checked={formData.isInternal} onChange={e => handleInputChange('isInternal', e.target.checked)} />
      <input type="checkbox" name="isOpenPrice" checked={formData.isOpenPrice} onChange={e => handleInputChange('isOpenPrice', e.target.checked)} />
      <input type="checkbox" name="canOrder" checked={formData.canOrder} onChange={e => handleInputChange('canOrder', e.target.checked)} />
      <input type="checkbox" name="isProductFrozen" checked={formData.isProductFrozen} onChange={e => handleInputChange('isProductFrozen', e.target.checked)} />
      <input type="checkbox" name="isStockTracked" checked={formData.isStockTracked} onChange={e => handleInputChange('isStockTracked', e.target.checked)} />
      
      {/* Numeric inputs for warrantyPeriodDays, returnDaysLimit, weightGrams, volumeMl */}
      
      {/* Date inputs for validFrom, validTo */}
      
      {/* Checkboxes for posQuickButton, isBundle, isBundleFlexible */}
      {/* Note: isBundle is disabled if product has sales */}

      {/* Text inputs for category, businessUnit, carType, attribute4, attribute5, attribute6 */}
      
      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={() => navigate(-1)}>Cancel</button>
    </form>
  );
};