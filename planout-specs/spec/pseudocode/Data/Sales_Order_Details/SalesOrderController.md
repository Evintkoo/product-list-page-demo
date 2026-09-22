/**
 * API Endpoint: GET /api/sales-orders/:id
 * Maps the database aggregate to the specific JSON structure required by the UI.
 */
FUNCTION handleGetSalesOrder(request):
    orderId = request.params.id
    data = getSalesOrderDetails(orderId)
    
    RETURN JSON {
        "ref_code": data.ref_code,
        "external_ref_code": data.external_ref_code,
        "warehouse": { "id": data.warehouse_id, "name": data.warehouse_name, "address": data.warehouse_address },
        "customer": { "id": data.customer_id, "name": data.customer_name, "address": data.delivery_address },
        "notes": data.notes,
        "salesperson_name": data.salesperson_name,
        "source": data.source,
        "due_at": data.due_at,
        "approved_at": data.approved_at,
        "created_by": data.created_by,
        "updated_by": data.updated_by,
        "created_at": data.created_at,
        "updated_at": data.updated_at,
        "closed": data.closed,
        "status": data.status,
        "items": data.items.map(item => ({
            "sku": item.sku,
            "product_name": item.product_name,
            "product_code": item.product_code,
            "order_qty": item.order_qty,
            "delivered_qty": item.delivered_qty,
            "price": item.price,
            "discount_rate": item.discount_rate,
            "amount": item.amount
        })),
        "totals": {
            "subtotal": data.subtotal,
            "tax": data.tax,
            "total": data.total
        }
    }