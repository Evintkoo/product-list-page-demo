/**
 * Hook to handle search and pagination triggers.
 */
function useStockTransferList() {
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ limit: 20, offset: 0 });

  const refresh = () => {
    return loadStockTransferPage(filters, pagination);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPagination({ ...pagination, offset: 0 }); // Reset to first page
  };

  const handlePageChange = (newOffset) => {
    setPagination({ ...pagination, offset: newOffset });
  };

  return { refresh, handleSearch, handlePageChange };
}