export const CustomerDetailMenu = ({ customerType }) => {
  // Logic: Variant depends on customer_type
  const isRetail = customerType === 'Retail';
  
  return (
    <nav>
      {isRetail ? (
        <RetailDetailMenu />
      ) : (
        <WholesaleFranchiseeDetailMenu />
      )}
    </nav>
  );
};