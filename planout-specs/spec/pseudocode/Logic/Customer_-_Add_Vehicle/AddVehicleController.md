async function handleSaveVehicle(formData) {
    try {
        const response = await createVehicle(formData);
        if (response.status === 201) {
            // Redirect to the customer's Vehicles tab upon success
            router.push(`/customers/${formData.customer_id}/vehicles`);
        }
    } catch (error) {
        // Display error message to user if the request fails
        ui.showErrorMessage("Failed to add vehicle: " + error.message);
    }
}