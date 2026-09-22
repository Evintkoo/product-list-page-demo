/**
 * Data Transfer Object mapping for the Stock Returns List API response.
 * Ensures consistency between the database schema and the frontend requirements.
 */

TYPE StockReturnResponse = {
    ref_code: string,
    created_at: datetime,
    sent_at: datetime | null,
    approved_at: datetime | null,
    from_store_name: string,
    warehouse_name: string,
    workflow_state: string,
    created_by: string
}