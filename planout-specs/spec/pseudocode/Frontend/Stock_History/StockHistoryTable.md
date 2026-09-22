export const StockHistoryTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Store</th>
          <th>Type</th>
          <th>Qty Changed</th>
          <th>Notes</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.created_at}</td>
            <td>{row.store_id}</td> {/* Note: Mapping logic requires store_name lookup */}
            <td>{row.type}</td>
            <td>
              {/* Logic: Display signed number based on increasedQty/decreasedQty */}
              {row.increasedQty > 0 ? `+${row.increasedQty}` : `-${row.decreasedQty}`}
            </td>
            <td>{row.notes}</td>
            <td>{row.createdBy}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};