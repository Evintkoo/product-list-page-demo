/**
 * Logic for formatting and calculating financial fields
 */
function formatDiscount(value) {
    // Ensure decimal format with ,00 suffix for whole numbers
    const num = parseFloat(value);
    if (Number.isInteger(num)) {
        return `${num},00`;
    }
    return num.toString();
}

function calculateTax(subtotal, taxRate) {
    // <!-- MISSING_FIELD: PurchaseOrder.tax_rate -->
    // Logic: subtotal * (taxRate / 100)
    return subtotal * (taxRate / 100);
}