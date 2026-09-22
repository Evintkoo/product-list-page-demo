// Renders the table rows mapping Sale entity fields
const SalesTable = ({ data }) => (
  <table>
    {data.map((sale) => (
      <tr key={sale.id}>
        <td>
          <Link to={`/sales/${sale.id}`}>{sale.ref_code}</Link>
        </td>
        <td>{formatDate(sale.created_at)}</td>
        <td>{sale.completed_at ? formatDate(sale.completed_at) : '-'}</td>
        <td>
          <Link to={`/customer/${sale.customer_id}`}>{sale.customer_name}</Link>
        </td>
        <td>
          <Link to={`/vehicle/${sale.vehicle_id}`}>{sale.vehicle_registration}</Link>
        </td>
        <td><Badge state={sale.workflow_state} /></td>
        <td>{sale.store_name}</td>
        <td>{sale.salesperson_name}</td>
        <td>{sale.source}</td>
        <td align="right">{formatCurrency(sale.total)}</td>
      </tr>
    ))}
  </table>
);