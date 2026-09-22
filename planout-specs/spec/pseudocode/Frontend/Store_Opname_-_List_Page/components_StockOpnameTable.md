export const StockOpnameTable = ({ data, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('ref_code')}>Document Number</th>
          <th onClick={() => onSort('scheduled_date')}>Date</th>
          <th onClick={() => onSort('warehouse_id')}>Store</th>
          <th onClick={() => onSort('status')}>Status</th>
          <th onClick={() => onSort('completed_at')}>Completed At</th>
          <th onClick={() => onSort('updated_by')}>User</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.stock_opname_id}>
            <td onClick={() => navigate(`/stock_takes/${row.stock_opname_id}`)}>
              {row.ref_code}
            </td>
            <td>{row.document_date}</td>
            <td>{row.store_name}</td>
            <td>{row.workflow_state}</td>
            <td>{row.completed_at}</td>
            <td>{row.updated_by}</td>
            <td>{row.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};