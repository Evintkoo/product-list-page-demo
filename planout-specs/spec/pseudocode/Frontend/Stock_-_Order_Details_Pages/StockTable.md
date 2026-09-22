/**
 * Table component for displaying StockOrderItem entities.
 * Implements sorting logic for columns.
 */
component StockTable(items: StockOrderItem[]) {
  state sortConfig: { key: string, direction: 'asc' | 'desc' } = { key: null, direction: 'asc' };

  function handleSort(columnKey: string) {
    // Toggle sort direction logic
    if (sortConfig.key === columnKey) {
      sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      sortConfig.key = columnKey;
      sortConfig.direction = 'asc';
    }
  }

  render {
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('sku')}>SKU</th>
            <th onClick={() => handleSort('product_name')}>Product</th>
            <th onClick={() => handleSort('product_code')}>Product Code</th>
            <th onClick={() => handleSort('order_qty')}>Order Qty</th>
            <th onClick={() => handleSort('company_average_cost')}>Average Cost (Rp)</th>
            <th onClick={() => handleSort('store_remark')}>Store Remark</th>
          </tr>
        </thead>
        <tbody>
          {/* Map items based on Mapping Rules */}
        </tbody>
      </table>
    );
  }
}