import { useNavigate } from 'react-router-dom';

export const CompanyTable = ({ data }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Country</th>
          <th>Currency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            <td>{company.address}</td>
            <td>{company.country}</td>
            <td>{company.currency}</td>
            <td>
              <button onClick={() => navigate(`/companies/${company.id}/edit`)}>
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/**
 * MAPPING RULES SUMMARY:
 * - name (Company entity) -> Name Column
 * - address (Company entity) -> Address Column
 * - country (Company entity) -> Country Column
 * - currency (Company entity) -> Currency Column
 * - id (Company entity) -> Used for Edit button navigation
 */