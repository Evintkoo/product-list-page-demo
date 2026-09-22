/**
 * Hook to handle the POST /api/products/tags request.
 */

import { useMutation } from 'react-query';

export const useProductTagMutation = () => {
  return useMutation(async (payload) => {
    const response = await fetch('/api/products/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        description: payload.description
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw { response: { data: errorData } };
    }

    return response.json();
  });
};