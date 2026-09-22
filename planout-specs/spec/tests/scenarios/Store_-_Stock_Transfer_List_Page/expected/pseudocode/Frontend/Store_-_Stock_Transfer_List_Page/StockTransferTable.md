export const StockTransferTable = ({ data, onSort }) => {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onSort('ref_code')}>Ref Code</th>
          <th onClick={() => onSort('transfer_type')}>Type</th>
          <th onClick={() => onSort('created_at')}>Date</th>
          <th onClick={() => onSort('due_at')}>Due At</th>
          <th onClick={() => onSort('from_location_id')}>From</th>
          <th onClick={() => onSort('to_location_id')}>To</th>
          <th onClick={() => onSort('workflow_state')}>Status</th>
          <th onClick={() => onSort('created_by_user_id')}>User</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} onClick={() => navigate(`/stock-transfers/${row.id}`)}>
            <td>{row.ref_code}</td>
            <td>{row.transfer_type}</td>
            <td>{row.created_at}</td>
            <td>{row.due_at}</td>
            <td>{row.from_location_id}</td>
            <td>{row.to_location_id}</td>
            <td><Badge status={row.workflow_state} /></td>
            <td>{row.created_by_user_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};