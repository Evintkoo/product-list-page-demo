// Node: SKU Text Form (id: f7675d92-a79d-49ab-88f2-c1619ea3b16d)
// Asset: assets/a8d0aaca-932a-4403-93e7-fd2cd8ae57d2.svg

COMPONENT SKUTextForm:
  STATE:
    skuValue: string (default: "")
    isValid: boolean (default: true)

  RENDER:
    Input(
      type: "text",
      placeholder: "Enter SKU",
      value: skuValue,
      icon: "search-icon",
      className: "narrow-input-field",
      onChange: (e) => {
        skuValue = e.target.value;
        VALIDATE(skuValue);
      }
    )

  VALIDATE(value):
    // Immediate validation: SKU must be alphanumeric and non-empty if touched
    // ORPHAN_FIELD: sku
    isValid = /^[a-zA-Z0-9]*$/.test(value);
    IF !isValid:
      DisplayError("Invalid SKU format");

  HAPPY_PATH:
    User types valid alphanumeric string; state updates; no dropdown rendered.

  ERROR_STATE:
    Non-alphanumeric characters trigger immediate visual error state (e.g., red border).

  EMPTY_STATE:
    Field displays placeholder; no icon interaction; no API call triggered until "Apply Search Button" (step 1) is clicked.

  SIDE_EFFECTS:
    Updates local component state; triggers validation logic on every keystroke.

Notes covered:
- A narrow text input field at the start of the filter bar.
- User types a SKU value to filter the product list.
- Renders as a plain field with a small icon.
- No dropdown arrow.
- Sized to fit short codes.