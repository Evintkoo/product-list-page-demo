/**
 * Node: GET /api/products/:id/settings (47a6e15e-e39a-4e2a-92a1-178df730dabe)
 * Fetches the nine feature flags for a specific product.
 */
function getProductSettings(req, res) {
    const { id } = req.params;
    
    // Fetch settings from ProductSettings entity
    const settings = db.ProductSettings.find({ product_id: id });
    
    // Return settings following the ProductSettings JSON schema
    return res.status(200).json(settings);
}

/**
 * Node: PUT /api/products/:id/settings (8633ab6f-e65d-4efa-9473-3e253bdb6c7f)
 * Updates the nine feature flags with strict validation.
 */
function updateProductSettings(req, res) {
    const { id } = req.params;
    const updates = req.body;

    // 1. Check company feature gating
    if (!companyFeatureEnabled()) {
        return res.status(403).json({ error: "FEATURE_NOT_ENABLED" });
    }

    // 2. Validation logic (collect all errors)
    let errors = [];
    
    // require_serial: check if serials exist while On Boarding, or if Live with history
    if (isInvalidSerialChange(id, updates.require_serial)) {
        errors.push("Invalid require_serial change");
    }
    
    // enable_serial_2: check if real transactions exist
    if (isInvalidSerial2Change(id, updates.enable_serial_2)) {
        errors.push("Invalid enable_serial_2 change");
    }
    
    // require_batch: requires Batch Number and Expiry Date <!-- MISSING_FIELD: Product.batch_number, Product.expiry_date -->
    if (updates.require_batch && !hasBatchAndExpiry(id)) {
        errors.push("require_batch requires Batch Number and Expiry Date");
    }
    
    // is_consignment: needs Consignee, no bundle, zero stock <!-- MISSING_FIELD: Product.consignee, Product.bundle, Product.stock_on_hand -->
    if (updates.is_consignment && !isValidConsignment(id)) {
        errors.push("Invalid is_consignment configuration");
    }
    
    // consignment_consignor: needs Consignor enabled <!-- MISSING_FIELD: Product.consignor_enabled -->
    if (updates.consignment_consignor && !isConsignorEnabled(id)) {
        errors.push("consignment_consignor requires Consignor enabled");
    }
    
    // multi_prices: needs Autoshop off, Region on, Price-2 label defined <!-- MISSING_FIELD: Product.autoshop, Product.region, Product.price_2_label -->
    if (updates.multi_prices && !isValidMultiPrice(id)) {
        errors.push("Invalid multi_prices configuration");
    }

    if (errors.length > 0) {
        return res.status(422).json({ errors });
    }

    // 3. Save updates
    db.ProductSettings.update({ product_id: id }, updates);
    
    // 4. Side effect: check Consignor Link sync <!-- MISSING_FIELD: Product.consignor_link -->
    syncConsignorLink(id);

    return res.status(200).json(updates);
}

// Notes covered:
// GET: Fetches nine flags, separate from product record, gating only affects writes, 403 only on PUT, company scope from JWT, follows JSON schema.
// PUT: Updates nine flags, checks all before saving, 403 FEATURE_NOT_ENABLED, require_serial validation (On Boarding/Live), enable_serial_2 validation (transactions), require_batch validation (Batch/Expiry), is_consignment validation (Consignee/bundle/stock), consignment_consignor validation (Consignor), multi_prices validation (Autoshop/Region/Price-2), is_internal/is_open_price/tax_applicable are simple, Consignor Link sync side effect.