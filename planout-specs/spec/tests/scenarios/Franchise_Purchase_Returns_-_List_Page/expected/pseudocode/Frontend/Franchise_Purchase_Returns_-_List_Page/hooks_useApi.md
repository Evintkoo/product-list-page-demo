export const useApi = () => {
  const get = async (path: string, config: any) => {
    // Implementation of fetch/axios call to the provided API paths
    // e.g., GET /api/franchise-purchase-returns
    return fetch(path, config).then(res => res.json());
  };

  return { get };
};