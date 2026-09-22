function search({ ref_code_cont, store_id, company_id, limit, offset }) {
  // Query the ServiceWorkOrder table
  // Filter by:
  // - company_id (from session)
  // - store_id (from query)
  // - ref_code contains ref_code_cont
  // - (Optional) aasm_state filter (e.g., only 'completed' or 'ready_for_pickup')
  
  return db.ServiceWorkOrder.findMany({
    where: {
      company_id: company_id,
      store_id: store_id,
      ref_code: { contains: ref_code_cont }
    },
    select: {
      id: true,
      ref_code: true,
      aasm_state: true
    },
    take: limit,
    skip: offset
  });
}