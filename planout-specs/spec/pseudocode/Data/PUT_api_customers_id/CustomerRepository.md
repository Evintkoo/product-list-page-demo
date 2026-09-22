/**
 * Performs an atomic update of a customer and their associated addresses.
 * Transaction ensures that address modifications (insert/update/delete) 
 * and customer details are committed together.
 */
function updateCustomerTransaction(companyId: UUID, customerId: UUID, data: CustomerUpdateRequest) {
  return database.transaction(async (tx) => {
    // 1. Verify existence within company scope
    const customer = await tx.CUSTOMER.findFirst({
      where: { id: customerId, company_id: companyId }
    });

    if (!customer) {
      throw new Error("NOT_FOUND");
    }

    // 2. Update Customer fields
    // Note: company_id, is_active, and audit fields are explicitly excluded from update
    await tx.CUSTOMER.update({
      where: { id: customerId },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        customer_code: data.customer_code,
        store: data.store,
        service_tax: data.service_tax
      }
    });

    // 3. Process Addresses
    // Logic: 
    // - If _destroy is true: delete record
    // - If customer_address_id exists: update record
    // - If no id: insert new record
    for (const address of data.addresses) {
      if (address._destroy) {
        await tx.ADDRESS.delete({ where: { id: address.customer_address_id } });
      } else if (address.customer_address_id) {
        await tx.ADDRESS.update({
          where: { id: address.customer_address_id },
          data: { ...address }
        });
      } else {
        await tx.ADDRESS.create({
          data: { ...address, customer_id: customerId }
        });
      }
    }

    // 4. Validate Business Rules
    // - Exactly one address must be marked as main
    // - Main address must be a shipping address
    // - Last remaining address cannot be removed
    const remainingAddresses = await tx.ADDRESS.findMany({ where: { customer_id: customerId } });
    validateAddressRules(remainingAddresses);

    return await tx.CUSTOMER.findUnique({
      where: { id: customerId },
      include: { addresses: true }
    });
  });
}

function validateAddressRules(addresses: Address[]) {
  const mainAddresses = addresses.filter(a => a.is_main);
  
  if (mainAddresses.length !== 1) {
    throw new Error("UNPROCESSABLE_ENTITY: Exactly one main address required");
  }
  
  if (addresses.length === 0) {
    throw new Error("UNPROCESSABLE_ENTITY: At least one address must remain");
  }
}