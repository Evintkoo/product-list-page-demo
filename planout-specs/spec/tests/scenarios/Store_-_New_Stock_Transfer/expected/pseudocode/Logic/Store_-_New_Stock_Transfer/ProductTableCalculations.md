/**
 * Recalculates totals when quantities change.
 */
function updateRowTotals(row: any) {
  // Total Cost = qty * snapshot_cost (from lookup)
  row.total_cost = row.transferred_qty * row.sender_average_cost;
  
  // Recalculate global total
  const totalStockCost = calculateSum(allRows, "total_cost");
  updateUI("Total Stock Cost", totalStockCost);
}