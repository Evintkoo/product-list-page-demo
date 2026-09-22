/**
 * Logic handler for the Return Tab lifecycle.
 * Triggered on component mount or tab switch.
 */
async function handleReturnTabLoad(customerId: string) {
  setLoadingState(true);
  clearErrorState();

  try {
    const returns = await fetchCustomerReturns(customerId);
    updateReturnTable(returns);
  } catch (err) {
    displayErrorState(err.message);
  } finally {
    setLoadingState(false);
  }
}