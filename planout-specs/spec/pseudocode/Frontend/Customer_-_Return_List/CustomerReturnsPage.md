/**
 * Main container for the Customer Detail Page.
 * Orchestrates authentication checks and data fetching for the Return list.
 */
component CustomerReturnsPage {
  state user = null;
  state returns = [];
  state isLoading = true;
  state error = null;

  // On page load, verify authentication
  onMount {
    try {
      user = await api.get("/api/auth/me");
      
      // If Return tab is active, fetch data
      if (isReturnTabActive()) {
        await fetchCustomerReturns();
      }
    } catch (err) {
      // Redirect to login on failure
      router.push("/login");
    } finally {
      isLoading = false;
    }
  }

  function fetchCustomerReturns() {
    const customerId = router.params.id;
    // API call derived from logic: GET /api/customers/:id/returns
    const response = await api.get(`/api/customers/${customerId}/returns`);
    returns = response.data;
  }

  render {
    if (isLoading) return <LoadingSpinner />;
    
    return (
      <Layout>
        <MainMenu activeTab="Customers" />
        <SubMenu activeTab="Customers" />
        
        <CustomerHeader />
        
        <section>
          <CustomerPurchaseReturnsHeader />
          <CustomerReturnTable data={returns} />
        </section>
      </Layout>
    );
  }
}