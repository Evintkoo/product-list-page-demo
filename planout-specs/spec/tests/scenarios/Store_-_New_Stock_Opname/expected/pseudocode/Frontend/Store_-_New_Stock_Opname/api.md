export const getNewStockOpnameMetadata = async () => {
  const response = await fetch('/api/stock_takes/new');
  return response.json();
};

export const postStockOpname = async (payload) => {
  const response = await fetch('/api/stock-opname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw await response.json();
  return response.json();
};