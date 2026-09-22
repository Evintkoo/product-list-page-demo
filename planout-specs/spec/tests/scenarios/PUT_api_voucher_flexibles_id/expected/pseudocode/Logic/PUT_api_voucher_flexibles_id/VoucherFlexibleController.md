FUNCTION handleUpdateVoucherFlexible(request, response):
    // 1. Authentication & Authorization Check
    IF NOT user.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })
    
    IF NOT user.hasPermission("write:voucher_flexibles"):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 2. Extract ID and Payload
    SET voucherId = request.params.id
    SET payload = request.body

    // 3. Validate Payload Structure
    IF payload IS NULL OR payload IS EMPTY:
        RETURN response.status(400).json({ error: "Malformed request body" })

    // 4. Business Logic Execution
    TRY:
        SET updatedVoucher = VoucherFlexibleService.update(voucherId, payload)
        RETURN response.status(201).json(updatedVoucher)
    CATCH ConflictError:
        RETURN response.status(409).json({ error: "SKU already exists" })
    CATCH ValidationError:
        RETURN response.status(422).json({ errors: error.details })
    CATCH Exception:
        RETURN response.status(500).json({ error: "Internal Server Error" })