/**
 * Displays the financial breakdown of the invoice.
 */
const FinancialSummary = ({ invoice }) => {
  return (
    <div className="amounts-section">
      <h3>Amounts</h3>
      <p>Subtotal: {invoice.subtotal}</p>
      <p>Discount: {invoice.discount}</p>
      <p>Credit Note: {invoice.credit_note}</p>
      <p>Net Subtotal: {invoice.net_subtotal}</p>
      <p>Tax: {invoice.tax}</p>
      <p>Total: {invoice.total}</p>
      <p>Amount Due: {invoice.amount_due}</p>
      <p>Amount Paid: {invoice.amount_paid}</p>
    </div>
  );
};