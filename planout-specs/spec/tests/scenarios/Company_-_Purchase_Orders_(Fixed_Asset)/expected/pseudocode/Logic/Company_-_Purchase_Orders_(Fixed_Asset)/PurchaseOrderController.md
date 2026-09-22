/**
 * Orchestrates the page load logic for the Fixed Asset Purchase Order browser.
 */
async function onPageLoad() {
    // 1. Verify user session/authorization
    const session = await Auth.getSession();
    if (!session.isAuthenticated) {
        redirectToLogin();
        return;
    }

    // 2. Fetch and map data
    try {
        const tableData = await fetchFixedAssetPurchaseOrders();
        
        // 3. Send to table component
        TableComponent.render(tableData);
    } catch (error) {
        Notification.show("Failed to load Fixed Asset Purchase Orders: " + error.message);
    }
}