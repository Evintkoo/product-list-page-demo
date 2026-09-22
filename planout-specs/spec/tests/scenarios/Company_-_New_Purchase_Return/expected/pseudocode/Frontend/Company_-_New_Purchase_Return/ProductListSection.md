// Component: ProductListSection
// Asset: assets/53a96928-33f2-4674-9eaf-9bd7ba0bd543.svg

Render:
  - For each item in items:
    - Display product (SKU + Name) [Read-only]
    - Display price [Read-only]
    - Input qty [Editable]
    - Input reason [Text input]
    - Button "Remove Item" [Triggers removal from items array and recalculates totals]