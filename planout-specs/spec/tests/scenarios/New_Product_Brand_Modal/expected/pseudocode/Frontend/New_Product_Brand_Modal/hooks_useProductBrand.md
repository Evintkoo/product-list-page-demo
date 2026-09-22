import { useMutation } from 'react-query';
import axios from 'axios';

/**
 * Logic for POST /api/products/brand
 */
export const useProductBrandMutation = () => {
  return useMutation(async (payload) => {
    const { data } = await axios.post('/api/products/brand', {
      name: payload.name,
      description: payload.description
    });
    return data;
  });
};