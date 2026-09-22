/**
 * Maps database records to the API response format.
 * Ensures consistency with the Voucher List Response JSON Schema.
 */
function mapToVoucherResponse(records: Array<Voucher>) {
  return {
    data: records.map(record => ({
      id: record.id,
      voucher_type: record.voucher_type,
      sku: record.sku,
      name: record.name,
      status: record.status,
      created_at: record.created_at
    })),
    meta: {
      count: records.length
    }
  };
}