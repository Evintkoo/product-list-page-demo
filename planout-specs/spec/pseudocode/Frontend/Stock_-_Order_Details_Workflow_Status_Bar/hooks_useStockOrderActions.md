/**
 * Hook for handling StockOrder state transitions.
 * Maps UI actions to authoritative API endpoints.
 */
export const useStockOrderActions = (id: string) => {
  
  const handleConfirm = async () => {
    // Payload: { "id": id }
    const response = await fetch(`/api/stock-orders/${id}/confirm`, {
      method: 'PATCH',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  };

  const handleCancel = async () => {
    // Confirmation prompt logic should be handled here before execution
    const confirmed = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmed) return;

    // Payload: { "id": id }
    const response = await fetch(`/api/stock-orders/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    return response.json();
  };

  const handlePrint = () => {
    // Triggers browser print dialog
    window.print();
  };

  return { handleConfirm, handleCancel, handlePrint };
};

// ORPHAN_FIELD: status (inferred from StockOrder entity, used for conditional styling)
// ORPHAN_FIELD: id (inferred from StockOrder entity, used for API path parameters)