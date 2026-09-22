FUNCTION getApprovalData(id):
    // 1. Validate authentication (throw 401 if missing)
    
    // 2. Retrieve document
    document = StockOutgoingRepository.getConfirmedOutgoingById(id)
    
    // 3. Fetch enriched lines
    lines = StockOutgoingRepository.getOutgoingLinesWithPricing(
        document.id, 
        document.source_warehouse_id
    )
    
    // 4. Construct response object
    RETURN {
        id: document.id,
        lines: lines
    }