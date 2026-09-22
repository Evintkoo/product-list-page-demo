/**
 * Logic to handle the initialization and data fetching for the Supplier Details Page.
 */
export const useSupplierDetailLoader = (supplierId: string) => {
  
  // 1. Check Authentication
  const checkAuth = async () => {
    const response = await fetch("/api/auth/me");
    if (!response.ok) {
      // Redirect to Login Page if unauthenticated
      window.location.href = "/login";
      return false;
    }
    return true;
  };

  // 2. Fetch Supplier Data
  const fetchSupplier = async (id: string) => {
    const response = await fetch(`/api/supplier/${id}`);
    
    if (response.status === 404) {
      return { status: "NOT_FOUND" };
    }
    
    if (!response.ok) {
      throw new Error("Failed to fetch supplier details");
    }

    const data = await response.json();
    return { status: "SUCCESS", data };
  };

  return { checkAuth, fetchSupplier };
};