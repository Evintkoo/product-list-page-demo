export const ServiceProductTable = ({ data, loading }) => {
  if (loading) return <div>Loading...</div>;

  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Tag</th>
          <th>Estimated Time</th>
          <th>Tax</th>
          <th>Other Tax</th>
          <th>Price</th>
          <th>Open Price</th>
          <th>Other Tax Account</th>
          <th>Other Tax Refund Account</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td><a href={`/service-products/${item.id}`}>{item.sku}</a></td>
            <td><a href={`/service-products/${item.id}`}>{item.name}</a></td>
            <td>{item.description}</td>
            <td>{item.service_product_type}</td>
            <td><span className="badge-service">{item.service_product_tag}</span></td>
            <td>{item.estimated_time_in_minutes} Minute(s)</td>
            <td>{item.tax_name}</td>
            <td>{item.other_tax_name}</td>
            <td>{item.price_ex_tax}</td>
            <td>{item.open_price ? '✅' : ''}</td>
            <td>{item.open_tax_account}</td>
            <td>{item.open_tax_refund_account}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};