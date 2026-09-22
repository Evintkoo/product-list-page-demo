/**
 * Maps the raw SupplierHistory entity records into the structured format 
 * required by the Supplier History Table UI component.
 */
function mapSupplierHistoryToTable(historyRecords: SupplierHistory[]): TableRow[] {
  return historyRecords.map(record => ({
    updatedAt: record.updated_at,
    updatedBy: record.updated_by,
    name: record.changed_fields.name,
    address: record.changed_fields.address,
    phone: record.changed_fields.phone,
    fax: record.changed_fields.fax,
    email: record.changed_fields.email,
    contactName: record.changed_fields.contact_name,
    registrationNo: record.changed_fields.registration_no,
    taxNo: record.changed_fields.tax_no,
    creditTermDays: record.changed_fields.credit_term_days,
    creditLimit: record.changed_fields.credit_limit
  }));
}

/**
 * Extracts the current supplier name from the most recent history record
 * to populate the page header.
 */
function getLatestSupplierName(historyRecords: SupplierHistory[]): string {
  // Assumes records are sorted by updated_at descending
  const latestRecord = historyRecords[0];
  return latestRecord ? latestRecord.changed_fields.name : "Unknown Supplier";
}