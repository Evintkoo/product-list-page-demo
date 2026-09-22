/**
 * Interface representing the shape of a single history entry.
 * Used for both database mapping and API serialization.
 */

TYPE ProductHistoryRecord = {
  historyId: Integer,
  productId: Integer,
  updatedAt: DateTime,
  updatedBy: String,
  companySupplyPrice: Number,
  wholesalePrice: Number,
  supplyPrice: Number,
  retailPrice: Number,
  isTaxed: Boolean,
  tradeIn: Number,
  warranty: Number,
  isActive: Boolean,
  isTracked: Boolean,
  isBundle: Boolean
}