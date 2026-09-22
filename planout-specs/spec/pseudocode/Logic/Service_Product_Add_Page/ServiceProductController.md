/**
 * Handles the initialization of the Service Product creation form.
 * Fetches necessary metadata for dropdowns and configuration.
 */
FUNCTION getCreateFormMetadata():
    RETURN API.GET("/api/service_products/new")

/**
 * Processes the submission of the Service Product creation form.
 * Calculates tax-exclusive pricing based on user input.
 */
FUNCTION createServiceProduct(formData):
    // Extract raw inputs
    SET rawPrice = formData.price
    SET isIncludingTax = formData.including_tax
    
    // Logic for price_ex_tax calculation
    IF isIncludingTax IS FALSE:
        // Price entered is already exclusive of tax
        SET priceExTax = rawPrice
    ELSE:
        // Derive price_ex_tax by stripping tax
        // <!-- MISSING_FIELD: TaxRate.percentage -->
        SET taxRate = FETCH_ACTIVE_TAX_RATE() 
        SET priceExTax = rawPrice / (1 + taxRate)
    ENDIF

    // Construct payload for ServiceProduct entity
    SET payload = {
        "name": formData.name,
        "description": formData.description,
        "price": rawPrice,
        "including_tax": isIncludingTax,
        "price_ex_tax": priceExTax
    }

    // Persist to database
    SET response = API.POST("/api/service_products/", payload)
    
    RETURN response