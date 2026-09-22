FUNCTION update(id, data):
    // 1. Check if record exists
    SET existingVoucher = Database.find("VoucherFlexible", id)
    IF existingVoucher IS NULL:
        THROW NotFoundError("Voucher not found")

    // 2. Check for SKU uniqueness if SKU is being changed
    IF data.sku IS NOT NULL AND data.sku != existingVoucher.sku:
        SET duplicate = Database.findOne("VoucherFlexible", { sku: data.sku })
        IF duplicate IS NOT NULL:
            THROW ConflictError("SKU already exists")

    // 3. Prepare update object
    SET updateData = {
        sku: data.sku,
        name: data.name,
        description: data.description,
        value: data.value,
        updated_at: CurrentTimestamp()
    }

    // 4. Persist to database
    RETURN Database.update("VoucherFlexible", id, updateData)