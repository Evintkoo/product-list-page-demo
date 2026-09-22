/**
 * Logic for the Save Button interaction.
 */
function handleSaveSupplier(formState) {
  try {
    // Trigger loading state
    setLoading(true);
    
    // Execute API call
    const newSupplier = await createSupplier(formState);
    
    // Handle success (e.g., redirect or show success toast)
    notifySuccess(`Supplier ${newSupplier.name} created successfully.`);
    
  } catch (error) {
    // Handle error
    notifyError('Could not save supplier. Please check the provided information.');
  } finally {
    setLoading(false);
  }
}