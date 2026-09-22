/**
 * Validation Rules:
 * - Discount value cannot be negative.
 * - If discountType is 'percent', discountValue cannot exceed 100.
 * - Validation triggers on input change (immediate).
 */

Function validateDiscount(value: number, type: string) {
    if (value < 0) throw Error("Discount cannot be negative");
    if (type === 'percent' && value > 100) throw Error("Percent cannot exceed 100");
}

Function calculateFinalPrice(basePrice: number, discount: number, type: string, taxIncluded: boolean) {
    let final = basePrice;
    if (type === 'amount') {
        final = basePrice - discount;
    } else {
        final = basePrice - (basePrice * (discount / 100));
    }
    return Math.max(0, final); // Ensure price doesn't go below 0
}

// ORPHAN_FIELD: discount_type
// ORPHAN_FIELD: discount_value
// ORPHAN_FIELD: is_tax_included