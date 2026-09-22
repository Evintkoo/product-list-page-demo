/**
 * Handles the POST /api/suppiler request to create a new supplier.
 */
async function createSupplier(req, res) {
    // 1. Authentication & Authorization Check
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (!req.user.hasPermission('create_supplier')) {
        return res.status(403).json({ error: "Forbidden" });
    }

    // 2. Validate Input
    const { name, tax_id, email, phone, address } = req.body;
    if (!name || !tax_id || !email) {
        return res.status(400).json({ error: "Missing required fields: name, tax_id, or email" });
    }

    try {
        // 3. Check for existing supplier (Conflict check)
        const existingSupplier = await SupplierService.findByTaxId(tax_id);
        if (existingSupplier) {
            return res.status(409).json({ error: "Conflict", message: "Supplier with this tax_id already exists" });
        }

        // 4. Create Supplier
        const newSupplier = await SupplierService.create({
            name,
            tax_id,
            email,
            phone,
            address
        });

        return res.status(201).json(newSupplier);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}