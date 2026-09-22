/**
 * Logic to fetch paginated products with inventory context.
 * Requires from_location_id to calculate source-specific metrics.
 */
function getProductLookup(search, from_location_id, to_location_id, limit = 30, page = 1) {
  // 1. Validate mandatory source location
  if (!from_location_id) {
    throw new Error("422: from_location_id is required");
  }

  const offset = (page - 1) * limit;

  // 2. Query products matching search criteria (SKU, code, or name)
  // Join with Inventory table filtered by from_location_id
  const products = db.Product.findMany({
    where: {
      OR: [
        { sku: { contains: search } },
        { code: { contains: search } },
        { name: { contains: search } }
      ]
    },
    include: {
      inventories: {
        where: { location_id: { in: [from_location_id, to_location_id] } }
      }
    },
    limit: limit,
    offset: offset
  });

  // 3. Map to response shape
  const data = products.map(product => {
    const sourceInv = product.inventories.find(i => i.location_id === from_location_id);
    const destInv = product.inventories.find(i => i.location_id === to_location_id);

    return {
      product_id: product.id,
      product_sku: product.sku,
      product_code: product.code,
      product_name: product.name,
      source_qty: sourceInv ? sourceInv.quantity_on_hand : 0,
      dest_qty: destInv ? destInv.quantity_on_hand : 0,
      sender_average_cost: sourceInv ? sourceInv.average_unit_cost : 0
    };
  });

  // 4. Return paginated result
  return {
    data: data,
    pagination: {
      limit: limit,
      page: page,
      total: db.Product.count({ where: { ...searchCriteria } })
    }
  };
}