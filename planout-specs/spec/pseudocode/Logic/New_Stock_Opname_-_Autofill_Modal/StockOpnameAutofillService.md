/**
 * Logic to handle the collection and mapping of autofill criteria 
 * for the Stock Opname module.
 */

export const handleAutofillRequest = async (formData: {
  product_type_id: number | null,
  product_brand_id: number | null,
  supplier_id: number | null,
  product_info_field: string,
  product_info_value: string,
  sort_by: string,
  include_zero_stock: boolean,
  movement_days: number
}) => {
  
  // 1. Validate and sanitize input values
  const payload = {
    product_type_id: formData.product_type_id,
    product_brand_id: formData.product_brand_id,
    supplier_id: formData.supplier_id,
    product_info_field: formData.product_info_field,
    product_info_value: formData.product_info_value,
    sort_by: formData.sort_by,
    include_zero_stock: formData.include_zero_stock,
    movement_days: formData.movement_days
  };

  // 2. Execute API call to fetch filtered product list
  try {
    const response = await fetch('/stock-opname/autofill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch autofill product data');
    }

    return await response.json();
  } catch (error) {
    console.error('Autofill Request Error:', error);
    throw error;
  }
};