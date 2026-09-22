import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Component: ServiceReservationForm
 * Asset: assets/96e55957-c374-4785-8f7b-94b78894eb6f.svg
 * 
 * Handles the creation of a new Sales Service Reservation.
 * Validation is enforced via react-hook-form with immediate feedback.
 */

export const ServiceReservationForm = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const [items, setItems] = useState([{ id: Date.now(), description: '' }]);

  const onSubmit = async (data) => {
    // Logic to POST /sales/service-reservations
    console.log("Submitting reservation:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Read-only Document Number */}
      <input readOnly placeholder="Auto-generated" {...register("document_number")} />

      {/* Required Fields */}
      <select {...register("store_id", { required: true })}>
        {/* Options populated from /stores */}
      </select>
      {errors.store_id && <span>Store is required</span>}

      <select {...register("customer_id", { required: true })}>
        {/* Options populated from /customers */}
      </select>
      <button type="button">Add New Customer</button>

      <select {...register("vehicle_id", { required: true })}>
        {/* Options populated from /vehicles */}
      </select>

      <input type="date" {...register("planned_service_date", { required: true })} />
      <input type="time" {...register("planned_service_time", { required: true })} />
      
      <input type="number" {...register("odometer_reading", { required: true, min: 0 })} />

      {/* Optional Fields */}
      <select {...register("service_advisor_id")}></select>
      <select {...register("salesperson_id")}></select>
      <select {...register("booking_source")}></select>
      <textarea {...register("additional_notes")}></textarea>

      {/* Items Table */}
      {items.map((item, index) => (
        <div key={item.id}>
          <input 
            {...register(`items.${index}.description`, { required: true })} 
            placeholder="Service item description" 
          />
        </div>
      ))}
      
      <button type="button" onClick={() => setItems([...items, { id: Date.now(), description: '' }])}>
        Add Item
      </button>

      <button type="submit">Save Reservation</button>
    </form>
  );
};