/**
 * Data access layer for Purchase Return (Fixed Asset) operations.
 * Maps API response structures to the internal domain model.
 */

interface PurchaseReturnResponse {
  id: string;
  ref_code: string;
  created_at: string;
  sent_at: string | null;
  approved_at: string | null;
  supplier_id: string;
  status: string;
}

/**
 * Fetches the list of purchase returns filtered for Fixed Asset context.
 * Maps the API response to the UI table columns.
 */
async function getPurchaseReturns(): Promise<PurchaseReturnResponse[]> {
  const response = await fetch('/api/purchase-returns?type=fixed_asset', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch purchase returns');
  }

  const data: PurchaseReturnResponse[] = await response.json();

  // Mapping logic for Table columns:
  // Document Number -> ref_code
  // Created At      -> created_at
  // Sent At         -> sent_at
  // Approved Date   -> approved_at
  // To Supplier     -> supplier_id
  // Status          -> status
  
  return data.map((item) => ({
    id: item.id,
    ref_code: item.ref_code,
    created_at: item.created_at,
    sent_at: item.sent_at,
    approved_at: item.approved_at,
    supplier_id: item.supplier_id,
    status: item.status
  }));
}