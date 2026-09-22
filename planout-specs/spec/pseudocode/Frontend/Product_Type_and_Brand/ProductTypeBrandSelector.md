/**
 * Component: ProductTypeBrandSelector
 * Renders the conditional fields for Product Type and Brand selection within the Voucher configuration.
 * 
 * Logic:
 * - These fields are only visible when the parent "Product Condition" dropdown 
 *   is set to "By Product Type and Brand".
 * - Validation is immediate: selections are required if the parent condition is active.
 */

Asset: assets/441b3cf7-b97f-459e-8ee1-12b3cc81e0ba.svg

Component ProductTypeBrandSelector(props: { isVisible: boolean }) {
  // State management for the selections
  // Note: Field names must align with the API PAYLOADS requirements for Voucher creation/update
  State product_type_id = null; // ORPHAN_FIELD: product_type_id
  State product_brand_id = null; // ORPHAN_FIELD: product_brand_id
  State errors = { product_type_id: "", product_brand_id: "" };

  // Validation Logic
  Function validateFields() {
    let newErrors = { product_type_id: "", product_brand_id: "" };
    
    if (props.isVisible) {
      if (!product_type_id) newErrors.product_type_id = "Product Type is required.";
      if (!product_brand_id) newErrors.product_brand_id = "Product Brand is required.";
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === "");
  }

  // Event Handlers
  Function handleTypeChange(value) {
    setProduct_type_id(value);
    validateFields(); // Immediate validation
  }

  Function handleBrandChange(value) {
    setProduct_brand_id(value);
    validateFields(); // Immediate validation
  }

  // Render
  If (!props.isVisible) return null;

  Return (
    <Container>
      <Dropdown 
        label="Product Type"
        value={product_type_id}
        onChange={handleTypeChange}
        error={errors.product_type_id}
        placeholder="Select a product type"
      />
      
      <Dropdown 
        label="Product Brand"
        value={product_brand_id}
        onChange={handleBrandChange}
        error={errors.product_brand_id}
        placeholder="Select a product brand"
      />
    </Container>
  );
}