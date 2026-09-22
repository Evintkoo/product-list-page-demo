/**
 * Table component rendering the list of CustomerReturn entities.
 * Asset: assets/78440155-2f00-4a3f-be38-3d4271663b55.svg
 */
component CustomerReturnTable(props: { data: CustomerReturn[] }) {
  render {
    return (
      <table>
        <thead>
          <tr>
            <th>Document Number</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Store</th>
            <th>Created By</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(item => (
            <tr key={item.id}>
              <td>{item.document_number}</td>
              <td>{formatDate(item.created_at)}</td>
              <td>{item.status}</td>
              <td>{formatCurrency(item.amount)}</td>
              <td>{item.store_name}</td>
              <td>{item.created_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}