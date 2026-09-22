import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { postProduct } from './api'; // Assuming API client setup

/**
 * Asset: assets/d266841a-7488-4661-9b9f-65f54c6a29d1.svg
 */
export const AddProductForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Mapping form fields to API payload structure
    const payload = {
      sku: data.sku,
      name: data.name,
      description: data.description,
      type: data.type,
      brand: data.brand,
      tags: data.tags,
      product_code: data.product_code,
      supplier_product_code: data.supplier_product_code,
      supplier: data.supplier,
      tax: parseFloat(data.tax),
      tax_product_code: data.tax_product_code,
      tax_unit_of_measure: data.tax_unit_of_measure,
      company_supply_price: parseFloat(data.company_supply_price),
      wholesale_price: parseFloat(data.wholesale_price),
      wholesale_including_tax: !!data.wholesale_including_tax,
      supply_price: parseFloat(data.supply_price),
      retail_price: parseFloat(data.retail_price),
      retail_including_tax: !!data.retail_including_tax,
      mrp: parseFloat(data.mrp),
      images: [data.image_1, data.image_2, data.image_3, data.image_4, data.image_5], // ORPHAN_FIELD: image_1...5
      attributes: [data.attribute_1, data.attribute_2, data.attribute_3, data.attribute_4, data.attribute_5, data.attribute_6], // ORPHAN_FIELD: attribute_1...6
      weight: parseInt(data.weight),
      volume: parseInt(data.volume),
      valid_from: data.valid_from,
      valid_to: data.valid_to,
      quick_button: !!data.quick_button,
      quick_button_order: parseInt(data.quick_button_order),
      barcode_type: data.barcode_type,
      stock_tracking: !!data.stock_tracking,
      bundle_flexible: !!data.bundle_flexible,
      bundle: !!data.bundle,
      is_active: !!data.is_active,
      internal_product: !!data.internal_product,
      open_price: !!data.open_price,
      can_order: !!data.can_order,
      product_freeze: !!data.product_freeze,
      warranty_period: parseInt(data.warranty_period),
      return_days_limit: parseInt(data.return_days_limit)
    };

    await postProduct(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Basic Info */}
      <input {...register("sku", { required: true })} placeholder="SKU" />
      <input {...register("name", { required: true })} placeholder="Name" />
      <textarea {...register("description")} placeholder="Description" />
      
      {/* Pricing & Tax */}
      <input type="number" {...register("tax", { required: true })} placeholder="Tax" />
      <input type="number" {...register("retail_price", { required: true })} placeholder="Retail Price (IDR)" />
      <input type="checkbox" {...register("retail_including_tax")} />
      
      {/* ... other fields mapped similarly ... */}

      <button type="button" onClick={() => window.location.href = '/products'}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};