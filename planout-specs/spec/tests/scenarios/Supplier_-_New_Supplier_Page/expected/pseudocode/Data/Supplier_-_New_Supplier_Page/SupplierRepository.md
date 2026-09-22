/**
 * Data Access Layer for Supplier entities.
 * Handles persistence logic for the New Supplier Page.
 */

// Function to persist a new supplier record to the database
// Input: Supplier object (excluding id and created_at)
// Output: The created Supplier record including generated id and timestamp
FUNCTION createSupplier(supplierData):
    SET newSupplier = {
        id: GENERATE_UUID(),
        name: supplierData.name,
        tax_id: supplierData.tax_id,
        email: supplierData.email,
        phone: supplierData.phone,
        address: supplierData.address,
        status: "ACTIVE",
        created_at: CURRENT_TIMESTAMP()
    }
    
    INSERT INTO Supplier (id, name, tax_id, email, phone, address, status, created_at)
    VALUES (newSupplier.id, newSupplier.name, newSupplier.tax_id, newSupplier.email, newSupplier.phone, newSupplier.address, newSupplier.status, newSupplier.created_at)
    
    RETURN newSupplier

// Function to validate uniqueness of tax_id before insertion
// Input: tax_id string
// Output: Boolean (true if unique, false if exists)
FUNCTION isTaxIdUnique(tax_id):
    SET existing = SELECT id FROM Supplier WHERE tax_id = tax_id
    RETURN existing IS NULL