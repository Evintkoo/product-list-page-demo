/**
 * Component: StockOutgoingProductTable
 * Asset: assets/ebc7c254-6640-4bca-9772-6ef279a6af41.svg
 * 
 * Manages the collection of product lines for a stock outgoing document.
 * State: Array of line objects: { product_id, order_quantity, coa_id, average_cost, order_amount }
 */

Component StockOutgoingProductTable:
  State lines = [] // Array of product line objects
  
  // Computed properties for the Total Row
  Computed totalQuantity = lines.reduce((sum, line) => sum + (line.order_quantity || 0), 0)
  Computed totalAmount = lines.reduce((sum, line) => sum + (line.order_amount || 0), 0)

  // Handlers
  Function handleAddRow():
    lines.push({ product_id: null, order_quantity: 0, coa_id: null, average_cost: 0, order_amount: 0 })

  Function handleProductSelect(index, product):
    // Updates line with product_id, fills read-only fields from product data
    lines[index].product_id = product.id
    lines[index].average_cost = product.average_cost
    lines[index].stock_qty = product.on_hand_qty // <!-- ORPHAN_FIELD: stock_qty -->
    updateAmount(index)

  Function handleQtyChange(index, value):
    lines[index].order_quantity = value
    updateAmount(index)

  Function updateAmount(index):
    lines[index].order_amount = lines[index].order_quantity * lines[index].average_cost

  // Render Logic
  Render:
    Header("Products")
    Button("Upload Outgoing File", onClick: triggerFileUpload)
    Button("Example Outgoing File", onClick: downloadTemplate)
    
    Table:
      Headers: ["No", "Product", "Stock Qty", "Order Qty", "Average Cost (Rp)", "Expense Account", "Amount (Rp)"]
      
      For each line, index in lines:
        Row:
          Cell(index + 1) // No column
          Cell(SearchInput(placeholder: "Search SKU, Code or Name", onSelect: handleProductSelect)) // Product column
          Cell(line.stock_qty) // Stock Qty column (Read-only)
          Cell(NumberInput(value: line.order_quantity, onChange: handleQtyChange)) // Order Qty column
          Cell(line.average_cost) // Average Cost (Rp) column (Read-only)
          Cell(Dropdown(options: chartOfAccounts, onSelect: (val) => line.coa_id = val)) // Expense Account column
          Cell(line.order_amount) // Amount (Rp) column (Read-only)

      // Total Row
      Row(Total):
        Cell("Total")
        Cell(totalQuantity)
        Cell(totalAmount)

    Button("Add Product", onClick: handleAddRow)