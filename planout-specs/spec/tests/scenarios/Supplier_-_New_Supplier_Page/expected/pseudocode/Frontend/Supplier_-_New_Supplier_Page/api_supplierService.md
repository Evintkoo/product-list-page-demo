/**
 * API Service for Supplier operations.
 */
export const postSupplier = async (payload) => {
  // POST /api/suppliers
  const response = await fetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) throw new Error('Failed to create supplier');
  return response.json();
};