/**
 * Orchestrates the loading and filtering of Flexible Vouchers.
 */
async function fetchFlexibleVouchers(filters: { sku?: string, name?: string } = {}) {
  const queryParams = new URLSearchParams({
    voucher_type: 'flexible',
    ...(filters.sku && { sku: filters.sku }),
    ...(filters.name && { name: filters.name })
  });

  const response = await fetch(`/api/vouchers?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch vouchers");
  }

  return await response.json();
}

/**
 * Maps raw Voucher entity data to the UI table row format.
 */
function mapVoucherToTableRow(voucher: Voucher) {
  return {
    id: voucher.voucher_id, // Used for row keys/navigation
    sku: voucher.sku,
    name: voucher.name,
    priceExTax: voucher.price_ex_tax,
    value: voucher.value,
    openPrice: voucher.open_price,
    sellLocations: voucher.sell_locations,
    redeemLocations: voucher.redeem_locations,
    memberOnly: voucher.member_only ? "Yes" : "No",
    validFrom: voucher.valid_from,
    validUntil: voucher.valid_until,
    status: voucher.status,
    // Internal references retained for logic
    productId: voucher.product_id,
    sellLocationScope: voucher.sell_location_scope,
    redeemLocationScope: voucher.redeem_location_scope
  };
}