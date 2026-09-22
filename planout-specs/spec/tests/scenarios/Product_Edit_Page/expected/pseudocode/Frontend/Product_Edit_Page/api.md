// Logic layer for API interaction
export const updateProduct = (id, data) => {
  // PUT /api/products/:id
  return fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(res => res.json());
};

export const getProduct = (id) => {
  // GET /api/products/:id
  return fetch(`/api/products/${id}`).then(res => res.json());
};