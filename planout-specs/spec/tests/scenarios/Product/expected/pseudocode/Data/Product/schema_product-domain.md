DEFINE TABLE ProductBrand
  - productBrandID: integer, PRIMARY KEY, auto-increment
  - brandName: string, UNIQUE, REQUIRED
  - productBrandDescription: text, optional
  - updated_at: datetime, set on every update
  PURPOSE: lookup list of brands a Product can belong to.

DEFINE TABLE ProductType
  - productTypeID: integer, PRIMARY KEY, auto-increment
  - productTypeName: string, UNIQUE, REQUIRED
  - productTypeDesc: string, optional
  - updated_at: datetime, set on every update
  PURPOSE: lookup list of product types a Product can belong to.

DEFINE TABLE Product  (core entity of this feature)
  - productID: integer, PRIMARY KEY, auto-increment
  - SKU: string, UNIQUE, REQUIRED, business identifier used by other modules for price/lookup joins
  - productName: string, REQUIRED, no max length
  - brand: integer, REQUIRED, FOREIGN KEY -> ProductBrand.productBrandID
  - type: integer, REQUIRED, FOREIGN KEY -> ProductType.productTypeID
  - isActive: boolean, default true, controls whether product can be sold
  - isOpenPrice: boolean, default false, when true the branch/store may override price at point of sale
  - category: text, optional, free-form bucket label
  - carType: string, optional
  - tax: enum [PPN, PPN10], REQUIRED
  - isStockTracked: boolean, default true, when true inventory quantities auto-decrement on sale
  - isProductFrozen: boolean, default false, when true product cannot be transferred between branches
  - storePricing: number, default 0, computed as store price + tax
  - productDescription: text, optional
  - updatedAt: datetime, set on every update
  - createdAt: datetime, set on creation
  CONSTRAINTS:
    - SKU must be unique across all rows
    - brand must reference an existing ProductBrand row
    - type must reference an existing ProductType row
  INDEXES: unique index on SKU, index on brand, index on type, index on isActive

DEFINE TABLE ProductHistory
  - history_id: integer, PRIMARY KEY, auto-increment
  - product_id: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - updated_at: datetime, when this snapshot was recorded
  - updated_by: string, name/identifier of the user who made the change
  - company_supply_price: number
  - wholesale_price: number
  - supply_price: number
  - retail_price: number  (reflects whether tax was applied)
  - trade_in: number
  - warranty: number
  - is_active: boolean, snapshot of Product.isActive at the time
  - is_tracked: boolean, snapshot of Product.isStockTracked at the time
  - is_bundle: boolean, snapshot indicating whether product was a bundle at the time
  PURPOSE: append-only audit trail of price and status changes for a Product.
  BEHAVIOR: a new row is inserted whenever pricing or status fields change on Product; rows are never updated or deleted.

DEFINE TABLE PriceTracking
  - id: integer, PRIMARY KEY, auto-increment
  - sku: string, REQUIRED, FOREIGN KEY -> Product.SKU
  - product_id: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - price: number, override price for the given scope
  - price_2: number, secondary price tier, default 0 when unused
  - price_type: enum [1=purchase, 2=sale, 3=trade-in], REQUIRED
  - tracking_type: enum [Region, Store, Warehouse, CustomerGroup], REQUIRED
  - tracking_id: integer, REQUIRED, id of the scope entity (region/store/warehouse/customer-group) matching tracking_type
  - tracking_name: string, denormalized name of the scope entity for display
  - updated_at: datetime
  - created_at: datetime
  PURPOSE: allows a Product to have different override prices depending on region, store, warehouse, or customer group.
  INDEXES: composite index on (product_id, tracking_type, tracking_id, price_type)

DEFINE TABLE ProductTagMapping
  - productID: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - tagName: string, REQUIRED
  - tagDescription: string, optional
  - active: boolean, default true, whether this tag can currently be applied/used
  - updated_at: datetime
  PURPOSE: combines the product-to-tag mapping and the tag definition into a single denormalized table (one row per product/tag pair).
  INDEXES: composite index on (productID, tagName)

DEFINE TABLE PurchaseHistory
  - purchase_history_id: integer, PRIMARY KEY, auto-increment
  - product_id: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - purchase_date: datetime
  - supplier_id: integer, REQUIRED, references an external Supplier table (not part of this swimlane)
  - purchase_delivery_id: integer, REQUIRED, references an external Purchase Delivery table (not part of this swimlane)
  - quantity: number
  - unit_price: number
  - subtotal: number, DERIVED = quantity * unit_price
  - tax: number
  - total: number, DERIVED = subtotal + tax
  PURPOSE: append-only log of every purchase transaction affecting a Product.

DEFINE TABLE Warehouse
  - id: integer, PRIMARY KEY, auto-increment
  - name: string, REQUIRED
  - warehouse_code: string, REQUIRED, human-readable code (e.g. "WH001")
  - active: boolean, default true
  - updated_at: datetime

DEFINE TABLE WarehouseStock
  - productID: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - productName: text, denormalized copy of Product.productName for fast display
  - warehouseID: integer, REQUIRED, FOREIGN KEY -> Warehouse.id
  - warehouseName: text, denormalized copy of Warehouse.name for fast display
  - inventoryQuantity: number, total physical stock on hand
  - reservedQuantity: number, stock reserved for pending orders
  - consignementQuantity: number, stock held on consignment
  - availableQuantity: number, DERIVED = inventoryQuantity - reservedQuantity - consignementQuantity (or business-defined equivalent)
  PURPOSE: per-warehouse stock ledger for a Product.
  INDEXES: composite unique index on (productID, warehouseID)

DEFINE TABLE Store
  - store_id: integer, PRIMARY KEY, auto-increment
  - store_name: text, REQUIRED

DEFINE TABLE StoreStock
  - id: uuid, PRIMARY KEY, auto-generated
  - product_id: integer, REQUIRED, FOREIGN KEY -> Product.productID
  - store_id: integer, REQUIRED, FOREIGN KEY -> Store.store_id
  - quantity: number, stock on hand for this product at this store
  - updated_at: datetime
  PURPOSE: per-store stock ledger for a Product.
  INDEXES: composite unique index on (product_id, store_id)

DEFINE TABLE StoreStockHistory
  - id: uuid, PRIMARY KEY, auto-generated
  - store_stock_id: uuid, REQUIRED, FOREIGN KEY -> StoreStock.id
  - increased_qty: integer, amount stock increased by in this event
  - decreased_qty: integer, amount stock decreased by in this event
  - created_at: datetime
  - type: enum [SALE, FPO, SWO], REQUIRED, event that triggered the stock change
  - notes: string, optional
  PURPOSE: append-only audit trail of every stock change event applied to a StoreStock row.
  BEHAVIOR: whenever StoreStock.quantity changes, insert a new row here capturing the delta and the triggering event type; StoreStock.quantity is then updated to reflect the new total.

RELATIONSHIP SUMMARY (for downstream Logic/API swimlanes):
  - Product.brand -> ProductBrand.productBrandID (many Products per Brand)
  - Product.type -> ProductType.productTypeID (many Products per Type)
  - ProductHistory.product_id -> Product.productID (many History rows per Product, append-only)
  - PriceTracking.product_id / PriceTracking.sku -> Product.productID / Product.SKU (many override prices per Product, scoped by tracking_type + tracking_id)
  - ProductTagMapping.productID -> Product.productID (many tags per Product)
  - PurchaseHistory.product_id -> Product.productID (many purchase records per Product)
  - WarehouseStock.productID -> Product.productID, WarehouseStock.warehouseID -> Warehouse.id (stock per Product per Warehouse)
  - StoreStock.product_id -> Product.productID, StoreStock.store_id -> Store.store_id (stock per Product per Store)
  - StoreStockHistory.store_stock_id -> StoreStock.id (audit trail per StoreStock row)

NOTE FOR LOGIC SWIMLANE:
  Any Create/Update operation on Product that changes pricing or active/tracked/bundle status must also insert a ProductHistory row in the same transaction. Any stock-changing operation on StoreStock must also insert a StoreStockHistory row in the same transaction, and must update StoreStock.quantity and StoreStock.updated_at accordingly. Use Product.productID and Product.SKU (never re-cased or renamed) as the join keys expected by all downstream services and API responses.