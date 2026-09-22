/**
 * Component: AddDiscountModal
 * Asset: assets/ed29efe2-79f5-4998-8935-22f97939147c.svg
 * 
 * Logic:
 * - Receives product data (SKU, name, price) via props.
 * - Manages local state for discount type (amount/percent), discount value, and tax inclusion.
 * - Real-time calculation of Final Price Inc. Tax.
 */

Component AddDiscountModal(props: { sku: string, name: string, price: number, onClose: () => void }) {
    // State
    State discountType = 'amount'; // 'amount' | 'percent'
    State discountValue = 0;
    State isTaxIncluded = false;
    
    // Derived State
    Computed finalPrice = calculateFinalPrice(props.price, discountValue, discountType, isTaxIncluded);

    // Handlers
    Handler handleClose = () => props.onClose();
    
    Handler handleSave = () => {
        // Payload construction based on current state
        // Note: API PAYLOADS/CONTRACTS are empty, using logical field names
        Payload data = {
            discount_type: discountType,
            discount_value: discountValue,
            is_tax_included: isTaxIncluded
        };
        // Call API (Logic layer)
        submitDiscount(data);
        props.onClose();
    };

    // UI Rendering
    Render {
        Modal {
            Header("Discount for {{props.sku}} - {{props.name}}");
            
            // Price Inc. Tax (Disabled)
            TextField(value: formatRupiah(props.price), disabled: true, label: "Price Inc. Tax");

            // Discount Type Radio Group
            RadioGroup(
                value: discountType,
                options: ["amount", "percent"],
                onChange: (val) => discountType = val
            );

            // Discount Unit Fields
            // Validation: Must be >= 0. If percent, must be <= 100.
            NumberInput(
                value: discountValue,
                onChange: (val) => {
                    validateDiscount(val, discountType);
                    discountValue = val;
                },
                label: discountType === 'amount' ? "Discount (IDR)" : "Discount (%)"
            );

            // Including Tax Checkbox
            Checkbox(
                checked: isTaxIncluded,
                onChange: (val) => isTaxIncluded = val,
                label: "Including Tax"
            );

            // Final Price Inc. Tax (Disabled)
            TextField(value: formatRupiah(finalPrice), disabled: true, label: "Final Price Inc. Tax");

            // Actions
            Button("Cancel", onClick: handleClose);
            Button("Save", onClick: handleSave);
        }
    }
}