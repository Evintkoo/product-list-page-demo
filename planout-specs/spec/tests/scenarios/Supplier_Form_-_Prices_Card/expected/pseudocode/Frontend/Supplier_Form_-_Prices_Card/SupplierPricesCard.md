/**
 * Component: SupplierPricesCard
 * Description: Renders the pricing configuration section for the Supplier Form.
 * Asset: assets/e7fb1d88-63df-4ce3-b309-1832658acda8.svg
 */

Component SupplierPricesCard(props: { initialData?: SupplierPriceData }) {
  // State management for the form fields
  // Note: Fields are derived from expected API payload requirements
  State pricelistId = props.initialData?.pricelist_id || DEFAULT_COMPANY_PRICE_ID;
  State unitPrice = props.initialData?.unit_price || 0;
  State currency = props.initialData?.currency || 'USD';

  // Validation Logic (Immediate feedback)
  Function validateUnitPrice(value) {
    If (value < 0) return "Price cannot be negative";
    If (isNaN(value)) return "Must be a valid number";
    Return null;
  }

  Render {
    // Header Section
    Container(id: "prices-header") {
      Icon(name: "dollar-icon")
      Text("Pricing Configuration")
    }

    // Pricelist Selection
    // Node: Pricelist Dropdown (858d5a94-7b18-44d6-bf22-e449537b55c4)
    Dropdown(
      label: "Pricelist",
      value: pricelistId,
      options: FetchPricelists(), // Fetches available pricelists
      onChange: (val) => { pricelistId = val }
    )

    // Price Input
    InputField(
      label: "Unit Price",
      value: unitPrice,
      type: "number",
      onChange: (val) => {
        unitPrice = val;
        validateUnitPrice(val);
      },
      error: validateUnitPrice(unitPrice)
    )

    // Currency Input
    // <!-- ORPHAN_FIELD: currency -->
    InputField(
      label: "Currency",
      value: currency,
      onChange: (val) => { currency = val }
    )
  }
}