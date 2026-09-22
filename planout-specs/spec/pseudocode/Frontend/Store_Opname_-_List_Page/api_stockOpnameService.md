/**
 * API CONTRACT: GET /stock_takes
 */
export const fetchStockOpnames = async (params) => {
  const query = new URLSearchParams({
    ref_code: params.ref_code,
    from_date: params.from_date,
    to_date: params.to_date,
    store_id: params.store_id,
    status: params.status,
    page: params.page,
    per_page: params.per_page
  }).toString();

  const response = await fetch(`/stock_takes?${query}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};