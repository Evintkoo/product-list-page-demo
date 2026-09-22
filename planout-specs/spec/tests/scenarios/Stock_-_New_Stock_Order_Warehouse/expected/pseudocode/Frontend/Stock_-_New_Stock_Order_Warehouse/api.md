export const postStockOrder = (payload) => {
  return fetch('/stock_orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).then(res => {
    if (!res.ok) throw new Error('Validation failed');
    return res.json();
  });
};