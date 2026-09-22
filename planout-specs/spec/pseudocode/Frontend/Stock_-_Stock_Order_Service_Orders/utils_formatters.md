export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// ORPHAN_FIELD: store_id (Used in API request, but schema uses store_name)
// ORPHAN_FIELD: warehouse_id (Used in API request, but schema uses warehouse_name)