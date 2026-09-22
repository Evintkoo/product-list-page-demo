export const VouchersTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Price Ex Tax</th>
          <th>Value</th>
          <th>Open Price</th>
          <th>Sell/Issue Locations</th>
          <th>Receive/Redeem Locations</th>
          <th>Valid for Member</th>
          <th>Valid From</th>
          <th>Valid Until</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((voucher) => (
          <tr key={voucher.voucher_id}>
            <td>
              <a href={`/vouchers/${voucher.voucher_id}`}>{voucher.sku}</a>
            </td>
            <td>{voucher.name}</td>
            <td>{voucher.price_ex_tax}</td>
            <td>{voucher.value}</td>
            <td>{voucher.open_price ? '✓' : ''}</td>
            <td>{voucher.sell_locations}</td>
            <td>{voucher.redeem_locations}</td>
            <td>{voucher.member_only ? 'Yes' : 'No'}</td>
            <td>{voucher.valid_from}</td>
            <td>{voucher.valid_until}</td>
            <td>
              <Badge status={voucher.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};