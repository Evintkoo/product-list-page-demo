/**
 * Validation Rules:
 * - Membership: Dropdown selection required.
 * - Vehicle: Dropdown selection required.
 * - Source: Dropdown selection required.
 * - Validation triggers immediately upon selection change.
 */
export const SearchFilterBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    membership: '', // ORPHAN_FIELD: membership
    vehicle: '',    // ORPHAN_FIELD: vehicle
    source: ''      // ORPHAN_FIELD: source
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Immediate validation: Ensure all fields are populated before enabling search
    if (newFilters.membership && newFilters.vehicle && newFilters.source) {
      setCanSearch(true);
    }
  };

  return (
    <div>
      <Dropdown name="membership" onChange={handleFilterChange} />
      <Dropdown name="vehicle" onChange={handleFilterChange} />
      <Dropdown name="source" onChange={handleFilterChange} />
      <Button onClick={() => onSearch(filters)}>Search</Button>
    </div>
  );
};