/**
 * RetailPurchasingTable
 * Renders the table of purchases based on the provided data mapping.
 */
export const RetailPurchasingTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Document Number</th>
          <th>Status</th>
          <th>Amount</th>
          <th>Store</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.documentNumber}</td>
            <td>{row.status}</td>
            <td>{row.amount}</td>
            <td>{row.store}</td>
            <td>{row.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};