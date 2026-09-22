/**
 * Data fetching and state management hooks
 */

function useFetchStockOutgoing(id) {
  return useQuery({
    queryKey: ['stock-outgoing', id],
    queryFn: () => api.get(`/api/stock-outgoings/${id}`)
  });
}

// API Interaction Logic:
// - Confirm: PATCH /api/stock-outgoings/:id/confirm
// - Cancel: PATCH /api/stock-outgoings/:id/cancel
// - Reset: PATCH /api/stock-outgoings/:id/reset

// Note: The "Edit" route is restricted. If a user attempts to edit a confirmed 
// document, the frontend must block navigation or the backend must reject the request.