export const SalesTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Document Number</th>
        <th>Ecommerce Reference #</th>
        <th>Created At</th>
        <th>Completed At</th>
        <th>Name</th>
        <th>Registration No.</th>
        <th>Status</th>
        <th>Store</th>
        <th>Delivery</th>
        <th>Source</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {data.map(sale => (
        <tr key={sale.id}>
          <td><a href={`/sales/${sale.id}`}>{sale.ref_code}</a></td>
          <td>{sale.ecommerce_ref_code}</td>
          <td>{formatDate(sale.created_at)}</td>
          <td>{sale.completed_at ? formatDate(sale.completed_at) : ''}</td>
          <td><a href={`/customer/${sale.customer_id}`}>{sale.customer_name}</a></td>
          <td><a href={`/vehicle/${sale.vehicle_id}`}>{sale.vehicle_registration}</a></td>
          <td><Badge status={sale.workflow_state} /></td>
          <td>{sale.store_name}</td>
          <td>{sale.delivery_method}</td> <!-- ORPHAN_FIELD: delivery_method -->
          <td>{sale.source}</td>
          <td>{sale.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
);