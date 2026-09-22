/**
 * Component: ServiceWorkOrderPicker
 * Logic:
 * - Trigger search on input change (min 3 chars).
 * - Call GET /api/service-work-orders?{filters} 
 *   (filters include typed text and current formState.source_id).
 * - Allow multi-selection of work orders.
 */

// ORPHAN_FIELD: total_order_quantity (Calculated UI field)
// ORPHAN_FIELD: total_amount (Calculated UI field)