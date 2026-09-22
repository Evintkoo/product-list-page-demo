/**
 * Logic triggered on page load to populate the Product History view.
 */
async function onPageLoad(productId: string) {
    try {
        const historyData = await getProductHistory(productId);
        // Update the UI state with the mapped historyData array
        UI.renderTable("ProductHistoryTable", historyData);
    } catch (error) {
        UI.showNotification("Failed to load product history", "error");
    }
}