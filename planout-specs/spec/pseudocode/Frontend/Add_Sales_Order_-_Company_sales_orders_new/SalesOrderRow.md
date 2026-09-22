component SalesOrderRow:
  props:
    item: SalesOrderItem
    onUpdate: (item) => void
    onRemove: () => void

  // The "Discount" cell acts as a shortcut for "percent" type.
  // Typing here updates discount_rate and sets discount_type to "percent".
  // The pencil button triggers the DiscountPopup.
  
  // Fields:
  // product_id (Searchable dropdown)
  // product_alias (Text input)
  // quantity (Number)
  // unit_price (Decimal)
  // discount (Shortcut input)
  // final_price_inc_tax (Read-only)
  // amount_inc_tax (Read-only)