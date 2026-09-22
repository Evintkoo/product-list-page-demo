/**
 * Logic layer for Customer status operations.
 */
const CustomerService = {
    async updateStatus(id, is_active, updater_id) {
        // 1. Check if customer exists
        const existingCustomer = await db.Customer.findOne({ where: { id } });
        if (!existingCustomer) return null;

        // 2. Update fields
        const updatedData = {
            is_active: is_active,
            updater_id: updater_id,
            updated_at: new Date()
        };

        await db.Customer.update(updatedData, { where: { id } });

        // 3. Return the updated record matching CustomerStatusUpdateResponse
        return {
            id: id,
            is_active: updatedData.is_active,
            updated_at: updatedData.updated_at
        };
    }
};