function validateVoucherInput(data) {
    // Ensure SKU is unique
    if (Database.Voucher.exists({ sku: data.sku })) {
        throw new Error("SKU already exists");
    }

    // Ensure logical consistency for expiration
    if (data.expire_in_months && data.expire_in_days) {
        throw new Error("Cannot set both expire_in_months and expire_in_days");
    }
    
    // Ensure logical consistency for pricing
    if (!data.open_price && data.price_ex_tax === null) {
        throw new Error("Price is required when open_price is false");
    }
}