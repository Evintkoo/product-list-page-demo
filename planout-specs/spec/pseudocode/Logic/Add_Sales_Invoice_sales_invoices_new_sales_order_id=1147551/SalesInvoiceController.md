/**
 * Logic for initializing the "Add Sales Invoice" page.
 * Triggered by the route: /sales_invoices/new?sales_order_id={id}
 */

async function initializeSalesInvoicePage(salesDeliveryId: string) {
    // 1. Verify Authentication
    const userSession = await fetch("/auth/me", { method: "GET" });
    
    if (!userSession.ok) {
        redirectTo("/login");
        return;
    }

    // 2. Fetch Delivery Details to pre-populate the form
    // The sales_order_id from the URL query param is used to fetch the delivery context
    const deliveryResponse = await fetch(`/sales-deliveries/${salesDeliveryId}`, { 
        method: "GET" 
    });

    if (deliveryResponse.ok) {
        const deliveryData = await deliveryResponse.json();
        
        // Map the fetched data to the UI state
        // These fields are used to pre-fill the "Sales Order" and "For Customer" inputs
        const formData = {
            salesOrderRef: deliveryData.sales_order_ref_code,
            customerName: deliveryData.customer_name
        };
        
        updateFormState(formData);
    } else {
        handleError("Failed to load delivery details for pre-filling.");
    }
}

// Helper to update the UI state (Frontend bridge)
function updateFormState(data: { salesOrderRef: string, customerName: string }) {
    // Logic to bind data to the form fields in the view
    setFieldValue("sales_order_input", data.salesOrderRef);
    setFieldValue("customer_input", data.customerName);
}