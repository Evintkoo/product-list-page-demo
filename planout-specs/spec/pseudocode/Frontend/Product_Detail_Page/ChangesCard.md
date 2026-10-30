/**
 * Node: Changes Card (ee1d73b3-222e-4dd4-bab2-c4f553f5c2e6)
 * Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg
 * 
 * Description: A read-only card displaying the record audit trail for the product.
 */

import React from 'react';

export const ChangesCard = ({ auditTrailData }) => {
  // Happy Path: Renders a list or table of audit entries.
  // Empty State: Displays "No changes recorded" if auditTrailData is null or empty.
  
  if (!auditTrailData || auditTrailData.length === 0) {
    return <div className="empty-state">No changes recorded</div>;
  }

  return (
    <section className="changes-card">
      <h3>Changes</h3>
      <ul>
        {auditTrailData.map((entry, index) => (
          <li key={index}>
            <span className="timestamp">{entry.created_at}</span> <!-- ORPHAN_FIELD: created_at -->
            <span className="user">{entry.user_name}</span> <!-- ORPHAN_FIELD: user_name -->
            <span className="action">{entry.change_description}</span> <!-- ORPHAN_FIELD: change_description -->
          </li>
        ))}
      </ul>
    </section>
  );
};

/**
 * Notes covered:
 * - The Changes section of the product detail page.
 * - A read only card of the record audit trail from the Product Detail Page.
 */