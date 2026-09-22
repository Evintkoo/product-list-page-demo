/**
 * Handles incoming requests for the Stock Opname list.
 * Orchestrates the retrieval of StockOpname records and associated Warehouse names.
 */

export const getStockOpnameList = async (req, res) => {
  const { page, per_page, status, store_id, ref_code } = req.query;

  // Query StockOpname table with filters
  const data = await db.StockOpname.findMany({
    where: {
      reference_number: ref_code,
      warehouse_id: store_id,
      status: status
    },
    include: {
      Warehouse: true // Join to fetch Warehouse.name
    },
    skip: (page - 1) * per_page,
    take: per_page
  });

  res.status(200).json(data);
};