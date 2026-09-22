/**
 * Handles the persistence logic for creating a new Sales Order Return.
 * Maps the UI form state to the API request structure.
 */

interface CreateSalesOrderReturnRequest {
  warehouse_id: string;
  customer_id: string;
  sales_invoice_id: string;
  notes: string;
  items: Array<{
    sales_invoice_item_id: string;
    returned_quantity: number;
    reason: string;
  }>;
}

interface SalesOrderReturnDetailResponse {
  id: string;
  warehouse_id: string;
  customer_id: string;
  sales_invoice_id: string;
  notes: string;
  status: string;
  items: Array<{
    id: string;
    sales_invoice_item_id: string;
    returned_quantity: number;
    reason: string;
  }>;
}

/**
 * POST /api/sales-order-returns
 * Creates a new return record and associated line items.
 */
async function createSalesOrderReturn(data: CreateSalesOrderReturnRequest): Promise<SalesOrderReturnDetailResponse> {
  // 1. Validate that at least one item has returned_quantity > 0
  const validItems = data.items.filter(item => item.returned_quantity > 0);
  
  if (validItems.length === 0) {
    throw new Error("At least one item must have a returned quantity greater than zero.");
  }

  // 2. Execute API call
  const response = await fetch('/api/sales-order-returns', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      items: validItems
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create Sales Order Return");
  }

  // 3. Return the created entity for navigation
  return await response.json();
}