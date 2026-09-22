/**
 * API Service for Voucher operations
 */
export const fetchVoucherById = async (id: string) => {
  // API Contract: GET /voucher_flexibles/:id
  const response = await fetch(`/voucher_flexibles/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};