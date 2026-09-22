/**
 * Executes the atomic update of a retail customer and their associated addresses.
 * Ensures data integrity by validating business rules within a single transaction.
 */
function updateRetailCustomer(customer_id, company_id, updateData, updater_id) {
  return transaction(async (db) => {
    // 1. Update the main customer record
    const updated = await db.customer.update({
      where: { 
        customer_id, 
        company_id, 
        is_wholesale: false, 
        is_franchise: false, 
        is_consignment: false 
      },
      data: {
        customer_code: updateData.customer_code,
        name: updateData.name,
        phone: updateData.phone,
        customer_region: updateData.customer_region,
        identity_number: updateData.identity_number,
        occupation_id: updateData.occupation_id,
        customer_wholesale_id: updateData.customer_wholesale_id,
        email: updateData.email,
        gender: updateData.gender,
        birthdate: updateData.birthdate,
        store_id: updateData.store_id,
        salesperson_id: updateData.salesperson_id,
        notes: updateData.notes,
        tax_no: updateData.tax_no,
        nppkp: updateData.nppkp,
        nitku: updateData.nitku,
        sap_assignment: updateData.sap_assignment,
        sap_profit_center: updateData.sap_profit_center,
        sap_cost_center: updateData.sap_cost_center,
        customer_group_id: updateData.customer_group_id,
        tax_id: updateData.tax_id,
        updater_id: updater_id,
        updated_at: now()
      }
    });

    if (!updated) throw new NotFoundError("Customer not found or not eligible for retail update");

    // 2. Process address collection
    for (const item of updateData.addresses) {
      if (item._destroy && item.customer_address_id) {
        await db.customer_address.delete({ where: { customer_address_id: item.customer_address_id, customer_id } });
      } else if (item.customer_address_id) {
        await db.customer_address.update({
          where: { customer_address_id: item.customer_address_id, customer_id },
          data: {
            ...item,
            is_shipping_address: item.is_shipping_address || item.is_main_address,
            updated_at: now()
          }
        });
      } else {
        await db.customer_address.create({
          data: {
            ...item,
            customer_id,
            is_shipping_address: item.is_shipping_address || item.is_main_address,
            created_at: now(),
            updated_at: now()
          }
        });
      }
    }

    // 3. Validate address constraints
    const addressCount = await db.customer_address.count({ where: { customer_id } });
    const mainAddressCount = await db.customer_address.count({ where: { customer_id, is_main_address: true } });

    if (addressCount > 0 && mainAddressCount !== 1) {
      throw new ValidationError("Exactly one main address is required.");
    }

    // 4. Sync main address string to customer header
    const mainAddress = await db.customer_address.findFirst({ where: { customer_id, is_main_address: true } });
    await db.customer.update({
      where: { customer_id },
      data: { address: mainAddress?.address }
    });

    return await getRetailCustomerDetail(customer_id);
  });
}