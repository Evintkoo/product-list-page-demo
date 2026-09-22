/**
 * Hook: useProductListState
 * Logic for managing product selection state and file upload interactions.
 */

import { useState } from 'react';

export const useProductListState = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation: Immediate check for file type/size
    if (!file.name.match(/\.(csv|xlsx)$/)) {
      alert("Invalid file format. Please upload a CSV or XLSX file.");
      return;
    }

    setIsUploading(true);
    try {
      // Logic to trigger API call for bulk upload
      // API CONTRACTS: POST /vouchers/products/upload (implied)
      console.log("Uploading file:", file.name);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleFile = () => {
    // Logic to trigger download of the sample template
    window.location.href = '/templates/product_upload_sample.csv';
  };

  return {
    selectedProducts,
    handleFileChange,
    downloadSampleFile,
    isUploading
  };
};