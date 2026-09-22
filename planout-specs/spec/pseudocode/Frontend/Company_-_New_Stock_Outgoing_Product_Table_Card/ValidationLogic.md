/**
 * Validation Rules:
 * 1. At least one line must exist before saving.
 * 2. order_quantity must not exceed stock_qty (checked on save).
 * 3. All fields (product_id, order_quantity, coa_id) are required per line.
 */

Function validateTable(lines):
  If lines.length == 0:
    Return Error("At least one line is required.")
  
  For each line in lines:
    If line.order_quantity > line.stock_qty:
      Return Error("Insufficient stock for product: " + line.product_name) // <!-- ORPHAN_FIELD: product_name -->
    If !line.product_id OR !line.coa_id OR line.order_quantity <= 0:
      Return Error("All fields must be filled correctly.")
  
  Return Success