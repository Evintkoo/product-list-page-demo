/**
 * Updates the status of a specific customer record.
 * 
 * @param id - The UUID of the customer to update.
 * @param is_active - The new status to apply.
 * @param updater_id - The UUID of the user performing the update.
 * @returns The updated Customer record or null if not found.
 */
function updateCustomerStatus(id: uuid, is_active: boolean, updater_id: uuid): Customer | null {
    const updated_at = current_timestamp();

    const result = db.execute(
        "UPDATE Customer SET is_active = :is_active, updater_id = :updater_id, updated_at = :updated_at WHERE id = :id",
        { id, is_active, updater_id, updated_at }
    );

    if (result.rowsAffected === 0) {
        return null;
    }

    return db.query("SELECT id, is_active, updated_at FROM Customer WHERE id = :id", { id });
}