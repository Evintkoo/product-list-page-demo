/**
 * Handles initial page lifecycle and authentication check.
 */
async function onPageLoad() {
  try {
    const authResponse = await fetch("/api/auth/me");
    if (!authResponse.ok) {
      window.location.href = "/login";
      return;
    }

    // Load initial flexible voucher list
    const data = await fetchFlexibleVouchers();
    updateVouchersTable(data.map(mapVoucherToTableRow));
  } catch (error) {
    console.error("Initialization failed", error);
  }
}

/**
 * Handles Search Button interaction.
 */
async function onSearchClick(filters: { sku: string, name: string }) {
  const data = await fetchFlexibleVouchers(filters);
  updateVouchersTable(data.map(mapVoucherToTableRow));
}