// Logic to fetch the full customer profile from the database
FUNCTION getCustomerById(id: UUID):
    RETURN Database.query("SELECT * FROM Customer WHERE id = ?", [id])