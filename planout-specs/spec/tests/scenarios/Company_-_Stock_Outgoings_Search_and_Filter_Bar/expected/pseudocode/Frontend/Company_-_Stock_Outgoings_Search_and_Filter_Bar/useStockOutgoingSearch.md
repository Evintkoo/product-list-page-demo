/**
 * Logic hook to handle the API interaction for the Stock Outgoing list.
 */
export const useStockOutgoingSearch = () => {
  const performSearch = async (params) => {
    // API CONTRACT: GET /api/stock-outgoings
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`/api/stock-outgoings?${queryString}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (!response.ok) throw new Error('Failed to fetch stock outgoings');
    return await response.json();
  };

  return { performSearch };
};