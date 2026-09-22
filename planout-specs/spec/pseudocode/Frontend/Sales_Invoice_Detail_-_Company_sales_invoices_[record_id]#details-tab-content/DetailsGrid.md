/**
 * Displays static fields from the SalesInvoice entity.
 */
const DetailsGrid = ({ invoice }) => {
  return (
    <div className="details-grid">
      <div>Invoice Date: {invoice.invoice_date}</div>
      <div>Due Date: {invoice.due_date}</div>
      <div>Customer: {invoice.customer_name}</div>
      <div>Billing Address: {invoice.billing_address}</div>
      <div>Tax Number: {invoice.tax_number}</div>
      <div>Notes: {invoice.notes}</div>
      <div>Closed: {invoice.closed ? 'Yes' : 'No'}</div>
    </div>
  );
};