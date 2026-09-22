/**
 * Validates session state on page load.
 */
async function checkAuth() {
  const response = await fetch("/api/auth/me");
  if (!response.ok) {
    // Redirect to login if session is invalid
    window.location.href = "/login";
  }
}

/**
 * Fetches initial form defaults and dropdown data.
 */
async function getCustomerFormDefaults() {
  const response = await fetch("/api/customers/new?retail=1");
  return await response.json();
}