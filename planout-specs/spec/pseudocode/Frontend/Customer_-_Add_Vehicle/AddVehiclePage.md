import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { getVehicleMetadata, createVehicle } from './api';

// Asset: assets/fa20a797-d72c-45af-b526-c865e4b473ad.svg

export const AddVehiclePage = () => {
  const history = useHistory();
  const location = useLocation();
  
  // Extract customer_id from URL query params
  const queryParams = new URLSearchParams(location.search);
  const customerId = queryParams.get('customer_id');

  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: customerId,
    registration_no: '',
    hull_number: '',
    vehicle_type: '',
    vehicle_make_id: '',
    vehicle_model_id: '',
    year: '',
    vin: '',
    registration_date: '',
    engine_number: '',
    odometer: 0,
    color: '',
    model_code: '',
    is_active: true,
    engine_capacity_cc: '',
    transmission_type: '',
    last_service: '',
    next_service: '',
    notes: ''
  });

  // ORPHAN_FIELD: hour_meter
  // ORPHAN_FIELD: engine_power
  // ORPHAN_FIELD: engine_brand
  // ORPHAN_FIELD: engine_model
  // ORPHAN_FIELD: engine_year

  useEffect(() => {
    getVehicleMetadata().then(data => {
      setMakes(data.vehicle_makes);
      setModels(data.vehicle_models);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async () => {
    try {
      await createVehicle(formData);
      history.push(`/customers/${customerId}/vehicles`);
    } catch (err) {
      alert("Error saving vehicle: " + err.message);
    }
  };

  return (
    <form>
      {/* Hidden field for customer_id */}
      <input type="hidden" name="customer_id" value={formData.customer_id} />

      {/* Vehicle Type with conditional rendering for heavy_equipment */}
      <select name="vehicle_type" onChange={handleInputChange} required>
        <option value="car">Car</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="heavy_equipment">Heavy Equipment</option>
      </select>

      {/* Vehicle Make & Model */}
      <select name="vehicle_make_id" onChange={handleInputChange} required>
        {makes.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
      </select>

      <select name="vehicle_model_id" onChange={handleInputChange} required>
        {models.filter(m => m.make_id === formData.vehicle_make_id).map(m => (
          <option key={m.id} value={m.id}>{m.name}</option>
        ))}
      </select>

      {/* Required Fields */}
      <input type="number" name="year" onChange={handleInputChange} required />
      <input type="number" name="odometer" min="0" onChange={handleInputChange} required />
      
      {/* Optional Fields */}
      <input type="text" name="registration_no" maxLength="32" onChange={handleInputChange} />
      <input type="text" name="hull_number" maxLength="60" onChange={handleInputChange} />
      <input type="text" name="vin" maxLength="60" onChange={handleInputChange} />
      <input type="date" name="registration_date" onChange={handleInputChange} />
      <input type="text" name="engine_number" maxLength="60" onChange={handleInputChange} />
      <input type="text" name="color" maxLength="40" onChange={handleInputChange} />
      <input type="text" name="model_code" maxLength="60" onChange={handleInputChange} />
      <input type="number" name="engine_capacity_cc" onChange={handleInputChange} />
      <select name="transmission_type" onChange={handleInputChange}>
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
      </select>
      <input type="date" name="last_service" onChange={handleInputChange} />
      <input type="date" name="next_service" onChange={handleInputChange} />
      <textarea name="notes" rows={3} onChange={handleInputChange} />
      <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleInputChange} />

      <button type="button" onClick={handleSubmit}>Save</button>
      <button type="button" onClick={() => history.goBack()}>Cancel</button>
    </form>
  );
};