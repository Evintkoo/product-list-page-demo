/**
 * Data access layer for Customer entities.
 * Focuses on retrieving franchise-specific data for the Lumi ERP Customer module.
 */

function getFranchiseList(filters: { status?: string, search?: string }) {
  // Query the Customer table where type is 'FRANCHISE'
  // Apply optional filters for status (e.g., 'ACTIVE', 'INACTIVE') 
  // and search (matching against name)
  
  return db.Customer.findMany({
    where: {
      type: 'FRANCHISE',
      ...(filters.status && { status: filters.status }),
      ...(filters.search && { name: { contains: filters.search } })
    },
    orderBy: {
      created_at: 'desc'
    }
  });
}

function getFranchiseById(id: uuid) {
  // Fetch a single franchise record including potential parent corporate entity details
  return db.Customer.findUnique({
    where: { id: id },
    include: {
      parent_customer: true
    }
  });
}