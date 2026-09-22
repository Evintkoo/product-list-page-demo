/**
 * Logic layer for Service Product Tags
 */
export const postServiceProductTag = async (payload) => {
  // API CONTRACT: POST /api/service_product_tags
  const response = await fetch('/api/service_product_tags', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      description: payload.description
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw errorData; // Propagates field_errors for UI handling
  }

  return response.json();
};