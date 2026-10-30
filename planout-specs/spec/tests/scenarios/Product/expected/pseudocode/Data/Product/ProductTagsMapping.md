// Node: Product Tags Mapping (5bdf2617-a322-4e82-af1f-2143db5a19aa)
// Next: Products Table (productID)
// Logic: Mapping table for product tags.
CREATE TABLE ProductTagsMapping (
  productID INTEGER REFERENCES Products(productID),
  tagName VARCHAR(255),
  tagDescription TEXT,
  active BOOLEAN,
  updated_at DATETIME
);
// Notes covered: 1. productID - integer, 2. tagName - string, 3. tagDescription - string, 4. active - boolean, 5. updated_at - time.