/**
 * Logic for initializing the edit page.
 */
async function onPageLoad(voucherId) {
  const voucherData = await getVoucherFlexible(voucherId);
  // Populate form fields with voucherData (sku, name, description, etc.)
  // Map JSON response fields directly to UI components as per mapping rules.
}

/**
 * Logic for handling the Save button submission.
 */
async function onSave(voucherId, formData) {
  // Construct payload from form state
  const payload = {
    sku: formData.sku,
    name: formData.name,
    description: formData.description,
    open_price: formData.open_price,
    price_ex_tax: formData.price_ex_tax,
    value: formData.value,
    expire_in_months: formData.expire_in_months,
    expire_in_days: formData.expire_in_days,
    product_condition: formData.product_condition,
    sell_issue_locations: formData.sell_issue_locations,
    receive_redeem_locations: formData.receive_redeem_locations,
    valid_for_member: formData.valid_for_member,
    valid_from: formData.valid_from,
    valid_until: formData.valid_until,
    external_publisher: formData.external_publisher
  };

  const result = await updateVoucherFlexible(voucherId, payload);
  
  if (result.id) {
    // Redirect to voucher detail page upon successful update
    navigateTo(`/vouchers/${voucherId}`);
  }
}