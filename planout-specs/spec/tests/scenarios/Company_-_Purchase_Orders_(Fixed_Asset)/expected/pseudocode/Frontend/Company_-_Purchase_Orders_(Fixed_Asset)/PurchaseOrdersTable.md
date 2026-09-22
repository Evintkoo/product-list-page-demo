const PurchaseOrdersTable = ({ data }) => {
  // Mapping Rules:
  // ref_code -> Document Number
  // supplier_ref_code -> Reference Number
  // created_at -> Created At
  // due_at -> Due Date
  // supplier_name -> From Supplier
  // workflow_state -> Status
  // total -> Amount
  // delivery_count -> Deliveries
  // invoices_count -> Invoices
  // return_count -> Returns

  return (
    <table>
      <thead>
        <tr>
          <th>Document Number</th>
          <th>Reference Number</th>
          <th>Created At</th>
          <th>Due Date</th>
          <th>From Supplier</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Deliveries</th>
          <th>Invoices</th>
          <th>Returns</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            <td>{order.ref_code}</td>
            <td>{order.supplier_ref_code}</td>
            <td>{order.created_at}</td>
            <td>{order.due_at}</td>
            <td>{order.supplier_name}</td>
            <td>{order.workflow_state}</td>
            <td>{order.total}</td>
            <td>{order.delivery_count}</td>
            <td>{order.invoices_count}</td>
            <td>{order.return_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};