/**
 * Logic for calculating totals and change.
 * Note: total_amount is sourced from SalesTransaction.total_amount
 */
function calculatePaymentSummary(totalAmount, tenderedAmounts) {
    // totalAmount: SalesTransaction.total_amount
    const totalTendered = tenderedAmounts.reduce((sum, payment) => sum + payment.amount, 0);
    
    return {
        total_with_tax: totalAmount, 
        change_due: totalTendered - totalAmount
    };
}