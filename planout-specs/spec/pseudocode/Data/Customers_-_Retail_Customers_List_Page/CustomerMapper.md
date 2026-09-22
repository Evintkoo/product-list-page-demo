/**
 * Maps raw database entities to the UI-friendly Customer Table format.
 */

function mapToCustomerTableRow(customer: Customer) {
  return {
    id: customer.id,
    group: customer.customer_group,
    code: customer.customer_code,
    name: customer.name,
    address: customer.address,
    area_region: customer.customer_region,
    phone: customer.phone,
    email: customer.email,
    birthdate: customer.birthdate,
    store: customer.store_name,
    status: customer.is_active // Used for Customer Status Action toggle
  };
}