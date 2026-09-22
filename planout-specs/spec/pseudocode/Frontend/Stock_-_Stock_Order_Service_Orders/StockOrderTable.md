/**
 * Renders the list of Stock Orders.
 * Mapping rules applied per node 76923583-6328-4061-b21f-843cb0d75105.
 */
export const StockOrderTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock Order</th>
          <th>Service Order</th>
          <th>Date</th>
          <th>Due At</th>
          <th>Received At</th>
          <th>Store</th>
          <th>Warehouse</th>
          <th>Status</th>
          <th>Order Amount</th>
          <th>Receive Amount</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            <td><a href={`/stock_orders/${order.ref_code}`}>{order.ref_code}</a></td>
            <td><a href={order.reference_path}>{order.source_ref_code}</a></td>
            <td>{order.created_at}</td>
            <td>{order.due_at}</td>
            <td>{order.received_at || '-'}</td>
            <td>{order.store_name}</td>
            <td>{order.warehouse_name}</td>
            <td><StatusBadge status={order.workflow_state} /></td>
            <td>{formatCurrency(order.order_amount)}</td>
            <td>{formatCurrency(order.receive_amount)}</td>
            <td>{order.updater_name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};