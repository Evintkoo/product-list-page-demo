// Asset: assets/e20a41bc-1f8c-497e-b40b-d60ae2aa7aec.svg

component DiscountPopup:
  props:
    initialPrice: decimal
    onSave: (updatedDiscountData) => void
    onCancel: () => void

  state:
    discount_type: "percent" | "amount"
    discount_rate: decimal = 0
    unit_discount_amount: decimal = 0
    discount_including_tax: boolean = false

  // Validation: 
  // If discount_type is "percent", disable unit_discount_amount input.
  // If discount_type is "amount", disable discount_rate input.
  
  function handleSave:
    onSave({
      discount_type,
      discount_rate,
      unit_discount_amount,
      discount_including_tax
    })