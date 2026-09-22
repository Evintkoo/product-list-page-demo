/**
 * Validation logic for the Service Reservation form.
 * Ensures all required fields are present before submission.
 */

export const validateReservation = (data) => {
  const errors = {};
  
  if (!data.store_id) errors.store_id = "Servicing store is required";
  if (!data.customer_id) errors.customer_id = "Customer is required";
  if (!data.vehicle_id) errors.vehicle_id = "Vehicle is required";
  if (!data.planned_service_date) errors.planned_service_date = "Date is required";
  if (!data.planned_service_time) errors.planned_service_time = "Time is required";
  if (!data.odometer_reading) errors.odometer_reading = "Odometer reading is required";
  
  return errors;
};

// ORPHAN_FIELD: document_number
// ORPHAN_FIELD: store_id
// ORPHAN_FIELD: customer_id
// ORPHAN_FIELD: vehicle_id
// ORPHAN_FIELD: planned_service_date
// ORPHAN_FIELD: planned_service_time
// ORPHAN_FIELD: odometer_reading
// ORPHAN_FIELD: service_advisor_id
// ORPHAN_FIELD: salesperson_id
// ORPHAN_FIELD: booking_source
// ORPHAN_FIELD: additional_notes
// ORPHAN_FIELD: items