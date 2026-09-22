/**
 * API Controller for handling HTTP requests related to flexible vouchers.
 * Routes:
 * GET /api/voucher_flexibles/:id
 * PUT /api/voucher_flexibles/:id
 */

FUNCTION handleGetVoucher(request):
    id = request.params.id
    voucher = VoucherRepository.getVoucherById(id)
    IF NOT voucher:
        RETURN Response.error("Voucher not found", 404)
    RETURN Response.json(voucher)

FUNCTION handleUpdateVoucher(request):
    id = request.params.id
    payload = request.body
    
    // Perform update via repository
    updatedVoucher = VoucherRepository.updateVoucher(id, payload)
    
    RETURN Response.json({
        message: "Voucher updated successfully",
        data: updatedVoucher
    })