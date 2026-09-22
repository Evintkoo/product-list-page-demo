/* 
   Styling rules for the read-only audit fields:
   - Fields must be visually distinct from editable inputs.
   - Ensure alignment within the grid layout as per assets/63596fc7-c4d0-40a9-a208-2139f010a5d1.svg
*/

.changes-card-container {
  border: 1px solid #e0e0e0;
  padding: 16px;
  border-radius: 8px;
}

.read-only-value {
  color: #666;
  font-weight: 500;
  background-color: #f9f9f9;
  padding: 4px 8px;
  border-radius: 4px;
}

.audit-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}