import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch retail customers for a franchisee.
 * Note: API path and method derived from project context requirements.
 */
export const useRetailCustomers = (franchiseeId: string) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Assuming GET /franchisees/{franchiseeId}/retail-customers based on project scope
        const response = await fetch(`/franchisees/${franchiseeId}/retail-customers`);
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Failed to fetch retail customers", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, [franchiseeId]);

  return { customers, isLoading };
};

// ORPHAN_FIELD: id (used for table key)
// ORPHAN_FIELD: customer_code (mapped from customer's code)
// ORPHAN_FIELD: name (mapped from customer's Name)
// ORPHAN_FIELD: phone_number (mapped from customer's Phone Number)