/**
 * Fetches the flexible voucher details for the edit form.
 * @param {string} id - The UUID of the voucher.
 */
async function getVoucherFlexible(id) {
  const response = await fetch(`/api/voucher_flexibles/${id}`, {
    method: 'GET'
  });
  return await response.json();
}

/**
 * Updates the flexible voucher with new form data.
 * @param {string} id - The UUID of the voucher.
 * @param {Object} data - The form data mapped to VoucherFlexible fields.
 */
async function updateVoucherFlexible(id, data) {
  const response = await fetch(`/api/voucher_flexibles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}