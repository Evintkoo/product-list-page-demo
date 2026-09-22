/**
 * Handles the form submission logic.
 */
async function handleCompanyUpdate(companyId, formData) {
  try {
    const response = await CompanyService.updateCompany(companyId, formData);
    
    // Trigger navigation to Company List page upon success
    router.push('/companies');
    
    return response;
  } catch (error) {
    console.error("Failed to update company:", error);
    throw error;
  }
}