// Node: Warehouse Table (fb8ded44-b9b5-4939-a616-d22b8f9df3cb)
// Receives: Warehouse Stock Table (id reference)
// Logic: Define table structure for warehouse management.
CREATE TABLE Warehouse (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  warehouse_code VARCHAR(50),
  active BOOLEAN,
  updated_at DATETIME
);
// Notes covered: 1. id - integer, AUTO-INCREMENT. Primary Key, 2. name - string, 3. warehouse_code - string, 4. active - boolean, 5. updated_at - date.