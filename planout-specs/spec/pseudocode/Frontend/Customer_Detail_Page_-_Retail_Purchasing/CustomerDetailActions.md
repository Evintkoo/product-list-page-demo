/**
 * Navigation component for Customer Detail Page
 */
export const CustomerDetailActions = ({ customerId }) => {
  const handleNavigateToPurchasing = () => {
    window.location.href = `/customers/${customerId}/purchasing`;
  };

  return (
    <button onClick={handleNavigateToPurchasing}>
      Show Purchasing Details
    </button>
  );
};

/* 
  ORPHAN_FIELD LOG:
  - document_number: Referenced in UI but missing from DATA SCHEMAS.
  - created_at: Referenced in UI but missing from DATA SCHEMAS.
  - amount: Referenced in UI but missing from DATA SCHEMAS.
  - store: Referenced in UI but missing from DATA SCHEMAS.
  - created_by: Referenced in UI but missing from DATA SCHEMAS.
  - status: Referenced in UI but missing from DATA SCHEMAS.
*/