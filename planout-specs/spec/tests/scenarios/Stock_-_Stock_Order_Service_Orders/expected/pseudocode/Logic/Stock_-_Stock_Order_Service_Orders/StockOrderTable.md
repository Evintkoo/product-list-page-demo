/**
 * Logic for rendering the table rows based on the mapped data.
 */
function renderTableRows(orders) {
  return orders.map(order => {
    return {
      stockOrderLink: `/stock_orders/${order.id}`,
      serviceOrderLink: order.referencePath,
      statusBadge: order.status,
      formattedOrderAmount: formatCurrency(order.orderAmount),
      formattedReceiveAmount: formatCurrency(order.receiveAmount),
      receivedAtDisplay: order.receivedAt ? formatDate(order.receivedAt) : ""
    };
  });
}

function formatCurrency(amount: decimal) {
  // Logic to format decimal as monetary value
}

function formatDate(date: datetime) {
  // Logic to format ISO string to readable date
}