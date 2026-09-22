/**
 * FinanceSubMenu Component
 * Displays the sub-navigation items for the Invoices section.
 */

export const FinanceSubMenu = () => {
  // Default page logic: When mounted, this component triggers the default view
  // for the Invoices sub-module.
  
  return (
    <ul className="finance-sub-menu">
      <li className="sub-nav-item">All Invoices</li>
      <li className="sub-nav-item">Drafts</li>
      <li className="sub-nav-item">Pending Approval</li>
    </ul>
  );
};