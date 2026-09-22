/**
 * Logic hook to handle the state and submission of the New Stock Opname Product Form.
 * Maps UI inputs to the required API schema for stock reconciliation.
 */

import { useState } from 'react';

export const useStockOpnameForm = () => {
  const [formData, setFormData] = useState({
    product_id: '',
    counted_qty: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const submitStockOpnameItem = async () => {
    // Validate inputs before submission
    if (!formData.product_id || formData.counted_qty < 0) {
      throw new Error("Invalid product selection or quantity");
    }

    const payload = {
      product_id: formData.product_id,
      counted_qty: formData.counted_qty
    };

    const response = await fetch('/stock-opname/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Failed to record stock opname item");
    }

    return await response.json();
  };

  return {
    formData,
    handleInputChange,
    submitStockOpnameItem
  };
};