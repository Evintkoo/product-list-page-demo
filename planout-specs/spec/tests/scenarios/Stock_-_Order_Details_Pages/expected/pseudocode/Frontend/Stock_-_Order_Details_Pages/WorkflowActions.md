/**
 * Handles state transitions based on the current status of the StockOrder.
 */
component ActionButtons(status: string) {
  state showConfirmModal: boolean = false;

  render {
    return (
      <>
        {status === 'DRAFT' && (
          <Button onClick={() => showConfirmModal = true}>Confirm</Button>
        )}
        
        {status === 'STORE_CONFIRMED' && (
          <Button onClick={navigateToReviewForm}>Review Qty to Send</Button>
        )}

        {status === 'WAREHOUSE_SENT' && (
          <Button onClick={navigateToReceiveForm}>Receive</Button>
        )}

        {/* Confirmation Modal for Confirm/Send actions */}
        {showConfirmModal && (
          <ConfirmationModal 
            onConfirm={handleConfirmAction} 
            onCancel={() => showConfirmModal = false} 
          />
        )}
      </>
    );
  }

  async function handleConfirmAction() {
    const result = await PATCH /api/stock-orders/:id/confirm(orderId);
    // Update local state with result.status
  }
}