Component DiscountModal:
  // Asset: assets/900be722-d5de-460c-8ea3-d6398ded1122.svg
  Props: { productName, onSave, onCancel }
  State:
    - discountType: "Amount" | "Percent"
    - discountValue: Float
    - isTaxIncluded: Boolean

  Render:
    - Header: "Discount for {productName}"
    - RadioGroup(name: "discount_type", options: ["Amount", "Percent"], onChange: updateType)
    - Input(name: "discount_unit", value: discountValue)
    - Checkbox(name: "including_tax", onChange: toggleTax)
    - ReadOnlyField(label: "Price Inc Tax", value: calculatedPrice)
    - ReadOnlyField(label: "Final Price Inc Tax", value: calculatedFinalPrice)
    - Button("Cancel", onClick: onCancel)
    - Button("Save", onClick: () => onSave(state))

  Logic:
    - If "Amount" selected: Enable Rp field, disable % field.
    - If "Percent" selected: Enable % field, disable Rp field.
    - Validation: Trigger immediately on input change to ensure discount does not exceed price.