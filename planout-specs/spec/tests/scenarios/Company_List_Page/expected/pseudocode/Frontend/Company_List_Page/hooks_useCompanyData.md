import { useState, useEffect } from 'react';

export const useCompanyData = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // API CONTRACT: GET /companies
        const response = await fetch('/companies', { method: 'GET' });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, isLoading, error };
};