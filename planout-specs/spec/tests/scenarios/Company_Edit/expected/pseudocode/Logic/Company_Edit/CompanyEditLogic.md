/**
 * Logic for handling Company Edit form state and persistence.
 */

// 1. Initialization: Fetch current company data
// GET /companies/{id} (Implicitly called on page load to populate form)
// Map response fields to UI state based on Mapping Rules defined in the canvas.

// 2. Form Submission Handler
async function handleSaveCompany(formData: Company) {
  try {
    // Validate required fields (name, code, address, country, sales_tax, logo_text, business_name, color_theme, time_zone)
    
    // Construct payload from form state
    const payload = {
      name: formData.name,
      code: formData.code,
      npwp: formData.npwp,
      address: formData.address,
      country: formData.country,
      currency: formData.currency,
      sales_tax: formData.sales_tax,
      phone: formData.phone,
      fax: formData.fax,
      email: formData.email,
      logo_text: formData.logo_text,
      business_name: formData.business_name,
      color_theme: formData.color_theme,
      time_zone: formData.time_zone,
      product_label_1: formData.product_label_1,
      product_label_2: formData.product_label_2,
      product_label_3: formData.product_label_3,
      product_type_1_id: formData.product_type_1_id,
      product_type_2_id: formData.product_type_2_id,
      product_type_3_id: formData.product_type_3_id,
      product_type_4_id: formData.product_type_4_id,
      product_attribute_1: formData.product_attribute_1,
      show_product_attribute_1_on_mobile: formData.show_product_attribute_1_on_mobile,
      product_attribute_2: formData.product_attribute_2,
      show_product_attribute_2_on_mobile: formData.show_product_attribute_2_on_mobile,
      product_attribute_3: formData.product_attribute_3,
      show_product_attribute_3_on_mobile: formData.show_product_attribute_3_on_mobile,
      product_attribute_4: formData.product_attribute_4,
      show_product_attribute_4_on_mobile: formData.show_product_attribute_4_on_mobile,
      product_attribute_5: formData.product_attribute_5,
      show_product_attribute_5_on_mobile: formData.show_product_attribute_5_on_mobile,
      product_attribute_6: formData.product_attribute_6,
      show_product_attribute_6_on_mobile: formData.show_product_attribute_6_on_mobile,
      default_publisher_attribute: formData.default_publisher_attribute,
      barcode_types: formData.barcode_types,
      product_code_use_first: formData.product_code_use_first,
      default_customer_id: formData.default_customer_id,
      can_overpay_non_cash: formData.can_overpay_non_cash,
      overpay_non_cash_limit: formData.overpay_non_cash_limit,
      print_receipt_on_sales_draft: formData.print_receipt_on_sales_draft,
      enable_quick_button: formData.enable_quick_button,
      insert_user_code_to_sales_refcode: formData.insert_user_code_to_sales_refcode,
      stock_order_edit_received_qty: formData.stock_order_edit_received_qty,
      stock_return_edit_approved_qty: formData.stock_return_edit_approved_qty,
      stock_transfer_edit_received_qty: formData.stock_transfer_edit_received_qty,
      purchasing_show_approved_state: formData.purchasing_show_approved_state,
      purchasing_show_expired_state: formData.purchasing_show_expired_state,
      serials_show_sent_stock_transfer: formData.serials_show_sent_stock_transfer,
      serials_show_sent_stock_order: formData.serials_show_sent_stock_order,
      csv_column_delimiter: formData.csv_column_delimiter
    };

    // Execute API call
    const response = await api.put(`/companies/${formData.id}`, payload);

    if (response.status === 200) {
      // Navigate to Company List page
      router.push('/companies');
    }
  } catch (error) {
    // Handle validation or server errors
    console.error("Failed to update company:", error);
  }
}