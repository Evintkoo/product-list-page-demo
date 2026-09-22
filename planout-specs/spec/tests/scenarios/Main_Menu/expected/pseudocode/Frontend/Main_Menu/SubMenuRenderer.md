/**
 * Renders the specific sub-menu based on the active top-level item.
 */
export const SubMenuRenderer = ({ type }: { type: string }) => {
  switch (type) {
    case 'customers': return <div>Customers Menu</div>;
    case 'products': return <div>Products Menu</div>;
    case 'inventory': return <div>Inventory Menu</div>;
    case 'suppliers': return <div>Suppliers Menu</div>;
    case 'finance': return <div>Finance Menu</div>;
    case 'sales': return <div>Sales Menu</div>;
    case 'setup': return <div>Company list</div>;
    default: return null;
  }
};