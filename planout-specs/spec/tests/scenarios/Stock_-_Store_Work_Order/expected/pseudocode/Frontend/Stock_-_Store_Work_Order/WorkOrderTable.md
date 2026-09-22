/**
 * Renders the table rows based on mapping rules.
 * Nullable fields (store_name, warehouse_name) are handled gracefully.
 */
export const WorkOrderTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Stock Order</th>
        <th>Service Work Order</th>
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
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.ref_code}</td>
          <td>{row.source_ref_code}</td>
          <td>{row.created_at}</td>
          <td>{row.due_at}</td>
          <td>{row.received_at}</td>
          <td>{row.store_name || ''}</td>
          <td>{row.warehouse_name || ''}</td>
          <td>{row.workflow_state}</td>
          <td>{row.order_amount}</td>
          <td>{row.receive_amount}</td>
          <td>{row.updater_name}</td>
        </tr>
      ))}
    </tbody>
  </table>
);