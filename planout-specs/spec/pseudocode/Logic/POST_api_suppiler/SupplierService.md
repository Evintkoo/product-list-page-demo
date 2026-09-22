/**
 * Logic layer for Supplier data operations
 */
const SupplierService = {
    async findByTaxId(tax_id) {
        // Query database for Supplier where tax_id matches
        return await db.Supplier.findOne({ where: { tax_id } });
    },

    async create(data) {
        // Generate UUID and timestamps
        const supplierData = {
            ...data,
            id: generateUUID(),
            created_at: new Date(),
            updated_at: new Date()
        };
        
        // Persist to database
        return await db.Supplier.insert(supplierData);
    }
};