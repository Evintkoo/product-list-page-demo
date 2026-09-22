export const HistoryTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Updated At</th>
          <th>Updated By</th>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Fax</th>
          <th>Email</th>
          <th>Contact Name</th>
          <th>Registration No.</th>
          <th>Tax No.</th>
          <th>Credit Term (Days)</th>
          <th>Credit Limit</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.updated_at}</td>
            <td onClick={() => navigateToUser(row.updated_by)}>{row.updated_by}</td>
            <td>{row.changed_fields.name}</td>
            <td>{row.changed_fields.address}</td>
            <td>{row.changed_fields.phone}</td>
            <td>{row.changed_fields.fax}</td>
            <td>{row.changed_fields.email}</td>
            <td>{row.changed_fields.contact_name}</td>
            <td>{row.changed_fields.registration_no}</td>
            <td>{row.changed_fields.tax_no}</td>
            <td>{row.changed_fields.credit_term_days}</td>
            <td>{row.changed_fields.credit_limit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};