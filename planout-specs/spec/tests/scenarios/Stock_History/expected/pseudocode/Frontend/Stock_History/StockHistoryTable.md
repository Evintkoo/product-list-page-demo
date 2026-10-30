// Unit: Type Column (06f0bf3d-c2e4-4aa1-8880-4b26313f9d60)
// Receives: 'type' from Store Stock History Mapping Rules
// Logic: Render cell content as text. Add click handler (no-op).
// Notes covered: The type of change, such as restock or sale. It should be clickable with no action for now.

// Unit: Qty Changed Column (ce7a06aa-06ee-4500-a7dc-056fc63ca527)
// Receives: 'increasedQty' or 'decreasedQty' from Store Stock History Mapping Rules
// Logic: Render as signed integer (e.g., +2, -5).
// Notes covered: Displays the quantity change value for each row, typically shown as a signed number so increases (eg, +2) and decreases (eg, -5) in stock are immediately distinguishable.

// Unit: Notes Column (8ddf31c4-3c61-4abf-a173-0a25e68f7f78)
// Receives: 'notes' from Store Stock History Mapping Rules <!-- ORPHAN_FIELD: notes -->
// Logic: Render as plain text.
// Notes covered: A free-text notes field for additional context.

// Unit: Store Column (d8f14b03-adfb-4697-80ec-22d0f3f30a6d)
// Receives: 'store_name' from Store Stock History Mapping Rules <!-- ORPHAN_FIELD: store_name -->
// Logic: Render as plain text.
// Notes covered: The store name where the change took place.

// Unit: All Qty Changed (d11c82bc-0b86-4441-9999-d338270e5efc)
// Receives: 'totalQtyChanged' from Store Stock History Mapping Rules <!-- ORPHAN_FIELD: totalQtyChanged -->
// Logic: Display as a summary aggregate value above or below the table.
// Notes covered: The total number of changed quantity from the filtered result in the database.

// Unit: Created By Column (b18ce193-51bb-4da2-adc2-723a48bf5dc2)
// Receives: 'createdBy' from Store Stock History Mapping Rules <!-- ORPHAN_FIELD: createdBy -->
// Logic: Render as plain text.
// Notes covered: Shows the user who recorded the transaction, providing an audit trail for who made each stock adjustment and when.

// Unit: Store Stock History Table (96024191-9865-46db-9a21-5938e972a916)
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg
// Receives: Data from Store Stock History Filter or Page Load Event.
// Logic: 
// - Table headers: ID, Date (sortable), Store (sortable), Type (sortable), Qty Changed, Notes, Created By (sortable).
// - Pagination: Implement client-side or server-side pagination controls.
// - Sorting: Toggle asc/desc state on header click, trigger re-fetch or re-sort.
// Notes covered: Data table listing each stock change record for the selected product with pagination capability and the following column header 1. ID 2. Date, sortable (asc, desc) 3. Store, sortable (asc, desc) 4. Type, sortable (asc, desc) 5. Qty Changed 6. Notes 7. Created By, sortable (asc, desc)

// Unit: Main Menu (c5350205-988f-486f-8b33-1d43cb830996)
// Logic: Render navigation menu with "Products" tab set to active state.
// Notes covered: This component uses Main Menu component with "Products" tab set as active.