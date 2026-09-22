// API CONTRACTS implementation
export const fetchSales = (params) => {
  // GET /sales/ecommerce
  // Maps filters to query string: q[store_id_eq], q[ref_code_start], etc.
  return fetch(`/sales/ecommerce?${serialize(params)}`).then(res => res.json());
};

export const fetchStores = () => fetch('/stores').then(res => res.json());
export const fetchUsers = () => fetch('/users').then(res => res.json());
export const checkAuth = () => fetch('/auth/me').then(res => res.status === 200);