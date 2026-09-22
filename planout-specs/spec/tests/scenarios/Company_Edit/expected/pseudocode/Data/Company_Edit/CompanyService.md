/**
 * Fetches the current company details for the Edit form.
 * @param {uuid} companyId 
 * @returns {Promise<Company>}
 */
async function getCompanyDetails(companyId) {
  return await api.get(`/companies/${companyId}`);
}

/**
 * Updates the company information.
 * @param {uuid} companyId 
 * @param {Object} payload - The full form state mapping to Company entity fields.
 * @returns {Promise<Company>}
 */
async function updateCompany(companyId, payload) {
  // Validates required fields before submission
  validateCompanyPayload(payload);
  
  return await api.put(`/companies/${companyId}`, payload);
}

function validateCompanyPayload(data) {
  const requiredFields = ['name', 'code', 'address', 'country', 'sales_tax', 'logo_text', 'business_name', 'color_theme', 'time_zone'];
  requiredFields.forEach(field => {
    if (!data[field]) throw new Error(`Missing required field: ${field}`);
  });
}