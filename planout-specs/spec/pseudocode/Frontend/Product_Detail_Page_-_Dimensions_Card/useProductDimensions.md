/**
 * Hook: useProductDimensions
 * Logic: Fetches or selects product dimension data from the global state/store.
 * Note: Since the fields are read-only, this hook ensures the data is 
 * synchronized with the product detail page context.
 */

import { useSelector } from 'react-redux'; // Assuming standard state management

export const useProductDimensions = () => {
  // Selects the product entity from the store
  const product = useSelector((state: any) => state.productDetail.data);

  return {
    volume_ml: product?.volume_ml, // ORPHAN_FIELD: volume_ml
    weight_g: product?.weight_g,   // ORPHAN_FIELD: weight_g
    isLoading: !product
  };
};