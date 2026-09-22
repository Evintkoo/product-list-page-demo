/**
 * Controller for GET /api/sales-quotations
 * Maps request query parameters to the repository and formats the response.
 */
async function listSalesQuotations(req, res) {
  const { 
    document_number, 
    sales_order_id, 
    customer, 
    status, 
    sort = 'created_at', 
    direction = 'desc', 
    limit = 20, 
    offset = 0 
  } = req.query;

  const companyId = req.user.company_id;

  const data = await SalesQuotationRepository.getSalesQuotations(
    companyId,
    { document_number, sales_order_id, customer, status },
    { limit: parseInt(limit), offset: parseInt(offset) },
    { field: sort, direction }
  );

  const totalCount = await SalesQuotationRepository.countSalesQuotations(companyId, { 
    document_number, sales_order_id, customer, status 
  });

  return res.status(200).json({
    data: data,
    pagination: {
      limit: parseInt(limit),
      offset: parseInt(offset),
      total: totalCount
    }
  });
}