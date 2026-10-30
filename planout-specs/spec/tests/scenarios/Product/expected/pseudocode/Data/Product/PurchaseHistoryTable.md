// Node: Purchase History Table (fbf5a52e-cc02-46ae-9229-a1f7026358f6)
// Next: Products Table (product_id)
// Logic: Transactional history for product purchases.
CREATE TABLE PurchaseHistory (
  purchase_history_id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER REFERENCES Products(productID),
  purchase_date DATETIME,
  supplier_id INTEGER,
  purchase_delivery_id INTEGER,
  quantity DECIMAL,
  unit_price DECIMAL,
  subtotal DECIMAL, -- Calculated: quantity * unit_price
  tax DECIMAL,
  total DECIMAL -- Calculated: subtotal + tax
);
// Notes covered: 1. purchase_history_id - integer, AUTO-INCREMENT, 2. product_id - integer, 3. purchase_date - datetime, 4. supplier_id - integer, 5. purchase_delivery_id - integer, 6. quantity - number, 7. unit_price - number, 8. subtotal - number, 9. tax - number, 10. total - number.