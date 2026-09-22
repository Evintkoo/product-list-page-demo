import React from 'react';
import { format } from 'date-fns'; // Assuming standard date formatting utility

/**
 * Retail Purchasing Table Component
 * Asset: assets/4cb10152-acf5-42b6-afb6-00c2fd42c42b.svg
 */
export const RetailPurchasingTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Document Number</th>
          <th>Created At</th>
          <th>Amount</th>
          <th>Store</th>
          <th>Created By</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {/* Document Number Column */}
            <td>
              <a 
                href={`/documents/${row.document_number}`} 
                style={{ color: 'blue', fontWeight: '600' }}
              >
                {row.document_number}
              </a>
            </td>

            {/* Created At Column */}
            <td>{format(new Date(row.created_at), 'dd-MMM yyyy hh:mm A')}</td>

            {/* Amount Column */}
            <td>
              {/* 
                Formatting: "." as group separator, "," as decimal separator.
                Example: 1.234,56
              */}
              {formatCurrency(row.amount)}
            </td>

            {/* Store Column */}
            <td>{row.store.toUpperCase()}</td>

            {/* Created By Column */}
            <td>{row.created_by.toUpperCase()}</td>

            {/* Status Column */}
            <td>
              <Badge status={row.status} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Helper for Status Badge
const Badge = ({ status }) => {
  const styles = {
    DRAFT: { backgroundColor: 'lightgrey', color: 'black' },
    COMPLETED: { backgroundColor: 'green', color: 'white' }
  };
  
  return (
    <span style={styles[status] || styles.DRAFT}>
      {status}
    </span>
  );
};

// Helper for Currency Formatting
const formatCurrency = (value) => {
  return value.toLocaleString('de-DE', { 
    minimumFractionDigits: 2 
  });
};