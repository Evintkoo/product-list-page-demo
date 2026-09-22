function handleCreateStockOutgoing(request, session) {
  // 1. Validate Session & Permissions
  if (!session.user) throw UnauthorizedError();
  
  const { location_id, lines } = request.body;
  
  if (!userHasAccessToLocation(session.user.id, location_id)) {
    throw ForbiddenError("User may not create for that location");
  }

  // 2. Validate Input
  if (!lines || lines.length === 0) {
    throw UnprocessableEntity("At least one line is required");
  }

  // 3. Process Lines & Check Stock
  const processedLines = [];
  for (const line of lines) {
    // Validate product existence and quantity
    const currentStock = getStockAtLocation(line.product_id, location_id);
    
    if (line.quantity <= 0) {
      throw UnprocessableEntity("Quantity must be greater than zero");
    }
    
    if (line.quantity > currentStock.quantity) {
      throw UnprocessableEntity(`Insufficient stock for product ${line.product_id}. Available: ${currentStock.quantity}`);
    }

    // Fetch current cost for pricing (server-side)
    const unitCost = getCurrentAverageCost(line.product_id, location_id);
    
    processedLines.push({
      product_id: line.product_id,
      quantity: line.quantity,
      expense_account: line.expense_account,
      unit_cost: unitCost <!-- MISSING_FIELD: stock_outgoing_line.unit_cost -->
    });
  }

  // 4. Create Document
  const documentNumber = generateDocumentNumber(); // Server-side generation
  const newOutgoing = db.stock_outgoings.create({
    document_number: documentNumber,
    location_id: location_id,
    company_id: session.company_id,
    entity_id: session.entity_id,
    status: "DRAFT",
    lines: processedLines
  });

  return response.status(201).json(newOutgoing);
}