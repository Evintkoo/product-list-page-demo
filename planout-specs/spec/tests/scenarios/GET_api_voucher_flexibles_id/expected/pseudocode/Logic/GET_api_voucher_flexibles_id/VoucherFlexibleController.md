FUNCTION handleGetVoucherFlexible(request, response):
    // 1. Validate Authentication
    IF NOT request.isAuthenticated():
        RETURN response.status(401).json({ error: "Unauthorized" })

    // 2. Extract ID from path
    SET voucherId = request.params.id

    // 3. Fetch record from database
    SET voucher = Database.VoucherFlexible.findById(voucherId)

    // 4. Handle Not Found
    IF voucher IS NULL:
        RETURN response.status(404).json({ error: "Voucher not found" })

    // 5. Authorization Check
    // Ensure the authenticated user has permission to view this specific voucher
    IF NOT User.hasPermissionToAccess(request.user, voucher.owner_id):
        RETURN response.status(403).json({ error: "Forbidden" })

    // 6. Return the voucher details
    RETURN response.status(200).json({
        id: voucher.id,
        code: voucher.code,
        amount: voucher.amount,
        currency: voucher.currency,
        status: voucher.status,
        expiry_date: voucher.expiry_date,
        owner_id: voucher.owner_id,
        created_at: voucher.created_at
    })

CATCH Exception:
    RETURN response.status(500).json({ error: "Internal Server Error" })