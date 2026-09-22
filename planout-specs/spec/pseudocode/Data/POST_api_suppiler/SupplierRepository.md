/**
 * Data access layer for Supplier entities.
 * Handles persistence logic and database constraints.
 */

FUNCTION findSupplierByTaxId(tax_id: string):
    // Query the Supplier table for an existing record with the provided tax_id
    RETURN Supplier.findOne({ where: { tax_id } })

FUNCTION createSupplier(supplierData: Object):
    // Persist a new supplier record to the database
    // supplierData includes: name, tax_id, email, phone, address
    // Returns the newly created Supplier object
    SET newSupplier = {
        id: generateUUID(),
        ...supplierData,
        created_at: getCurrentTimestamp(),
        updated_at: getCurrentTimestamp()
    }
    
    INSERT INTO Supplier (newSupplier)
    RETURN newSupplier