// On Page Load
// 1. Initialize state with default filters: is_active = true, page = 1, page_size = 20.
// 2. Call getPaymentTypes() with defaults.
// 3. Pass result through mapPaymentTypeResponse().
// 4. Render table rows.

// On Search Button Click
// 1. Capture values from filter bar inputs.
// 2. Reset page to 1.
// 3. Call getPaymentTypes() with captured filters.
// 4. Pass result through mapPaymentTypeResponse().
// 5. Update table state with new data.