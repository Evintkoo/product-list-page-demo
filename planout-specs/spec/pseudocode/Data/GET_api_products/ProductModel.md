Define the Product record as it is stored in the database:
  - id: unique identifier (primary key)
  - sku: unique stock keeping code, used for lookups and uniqueness checks
  - name: display name of the product
  - description: optional longer text about the product
  - category: optional grouping label
  - price: numeric value of the product's price
  - currency: currency code associated with the price
  - stock_quantity: number of units currently available
  - is_active: flag indicating whether the product should be shown in listings
  - created_at / updated_at: audit timestamps

This model is the single source of truth for the "Product" shape returned
by the API. Any list response built on top of it must expose these same
field names so the Logic swimlane and Frontend swimlane stay aligned.