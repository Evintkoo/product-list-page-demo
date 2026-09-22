import { fetchFranchiseList, searchFranchise } from './api';

// Component: FranchiseListPage
// Asset: assets/03f7418f-9d32-4c92-b53c-97bd484389b4.svg

const FranchiseListPage = () => {
  const [franchises, setFranchises] = useState([]);

  // On Page Load: Fetch initial list
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchFranchiseList(); // GET /customers/franchise
      setFranchises(data);
    };
    loadData();
  }, []);

  const handleSearch = async (filters) => {
    // Only include filters with values
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== null && v !== '')
    );
    const results = await searchFranchise(activeFilters); // GET /customers/franchise/search
    setFranchises(results);
  };

  return (
    <div>
      <FilterBar onApply={handleSearch} />
      <FranchiseTable data={franchises} />
    </div>
  );
};