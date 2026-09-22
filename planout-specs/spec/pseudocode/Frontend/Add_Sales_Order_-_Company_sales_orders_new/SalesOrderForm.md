// Asset: assets/9c888928-ce97-4b0a-803f-cdc0dde00422.svg

component SalesOrderForm:
  state:
    warehouse_id: uuid | null
    customer_id: uuid | null
    customer_ref_code: string = ""
    due_at: datetime | null
    delivery_address: string = ""
    notes: string = ""
    items: Array<SalesOrderItem> = []
    zip_code: string = "" // ORPHAN_FIELD: zip_code

  onMount:
    GET /api/warehouses
    // Populate From Warehouse dropdown with response

  computed isFormValid:
    return warehouse_id != null AND 
           customer_id != null AND 
           items.length > 0 AND 
           items.every(item => item.product_id != null AND item.quantity > 0)

  function handleSave:
    if not isFormValid: return
    
    payload = {
      customer_id,
      customer_ref_code,
      warehouse_id,
      due_at,
      delivery_address: delivery_address + " " + zip_code,
      notes,
      items: items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
        discount_type: item.discount_type,
        discount_rate: item.discount_rate,
        unit_discount_amount: item.unit_discount_amount,
        discount_including_tax: item.discount_including_tax
      }))
    }
    
    POST /api/sales-orders(payload)