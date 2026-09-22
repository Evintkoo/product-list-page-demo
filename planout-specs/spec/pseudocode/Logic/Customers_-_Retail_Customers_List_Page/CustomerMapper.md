/**
 * Maps the API response entity to the UI Table row structure.
 */
function mapCustomerToTableRow(customer: any) {
  return {
    id: customer.id,
    group: customer.customer_group,
    code: customer.customer_code,
    name: customer.name,
    address: customer.address,
    region: customer.customer_region,
    phone: customer.phone,
    email: customer.email,
    birthdate: customer.birthdate,
    store: customer.store_name,
    isActive: customer.is_active // Used for Customer Status Action
  };
}