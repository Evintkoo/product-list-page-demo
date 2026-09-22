const FranchiseTable = ({ data }) => {
  return (
    <table>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td><a href={`/customers/${row.id}`}>{row.name}</a></td>
          <td><a href={`/customers/${row.id}`}>{row.franchise_code}</a> <!-- ORPHAN_FIELD: franchise_code --></td>
          <td>{row.address}</td>
          <td>{row.phone}</td>
          <td>{row.status}</td>
          <td>{row.customer_region}</td> <!-- ORPHAN_FIELD: customer_region -->
          <td>{row.email}</td> <!-- ORPHAN_FIELD: email -->
          <td>
            <button>Edit</button>
            <DeactivateButton customerId={row.id} />
          </td>
        </tr>
      ))}
    </table>
  );
};