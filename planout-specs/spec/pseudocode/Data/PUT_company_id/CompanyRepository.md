/**
 * Data access layer for Company entity operations.
 * Handles direct interaction with the database for the PUT /company/:id endpoint.
 */

// Function to verify if a company exists by ID
FUNCTION findCompanyById(id: uuid):
    RETURN Database.query("SELECT * FROM Company WHERE id = ?", [id])

// Function to update company details
FUNCTION updateCompany(id: uuid, data: Object):
    // Perform the update operation
    // Data object contains fields to be updated (name, tax_id, address)
    // Sets updated_at to current timestamp
    SET updated_at = CURRENT_TIMESTAMP
    
    TRY:
        result = Database.execute(
            "UPDATE Company SET name = ?, tax_id = ?, address = ?, updated_at = ? WHERE id = ?",
            [data.name, data.tax_id, data.address, updated_at, id]
        )
        
        IF result.affectedRows == 0:
            THROW Error("CompanyNotFound")
            
        RETURN Database.query("SELECT * FROM Company WHERE id = ?", [id])
        
    CATCH DatabaseError:
        // Handle unique constraint violations (e.g., duplicate tax_id)
        IF DatabaseError.code == "UNIQUE_VIOLATION":
            THROW Error("UnprocessableEntity")
        ELSE:
            THROW Error("InternalServerError")