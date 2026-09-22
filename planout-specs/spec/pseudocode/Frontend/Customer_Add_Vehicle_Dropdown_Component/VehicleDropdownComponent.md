/**
 * Component: VehicleDropdownComponent
 * Manages the hierarchical selection of vehicle attributes and conditional rendering
 * for heavy equipment specific fields.
 */

import React, { useState, useEffect } from 'react';

export const VehicleDropdownComponent = ({ initialData }) => {
  // State management for form fields
  const [vehicle_type, setVehicleType] = useState(initialData?.vehicle_type || '');
  const [vehicle_make, setVehicleMake] = useState(initialData?.vehicle_make || '');
  const [vehicle_model, setVehicleModel] = useState(initialData?.vehicle_model || '');
  const [category, setCategory] = useState(initialData?.category || '');
  
  // Heavy Equipment specific state
  const [hour_meter, setHourMeter] = useState(initialData?.hour_meter || '');
  const [engine_power, setEnginePower] = useState(initialData?.engine_power || '');
  const [engine_brand, setEngineBrand] = useState(initialData?.engine_brand || '');
  const [engine_model, setEngineModel] = useState(initialData?.engine_model || '');
  const [engine_year, setEngineYear] = useState(initialData?.engine_year || '');

  const isHeavyEquipment = vehicle_type === 'heavy_equipment'; // <!-- ORPHAN_FIELD: heavy_equipment -->

  // Handle Vehicle Type change logic
  const handleVehicleTypeChange = (newType) => {
    setVehicleType(newType);
    
    // Reset dependent fields
    setVehicleMake('');
    setVehicleModel('');
    setCategory('');

    // Clear and hide heavy equipment fields if type is not heavy equipment
    if (newType !== 'heavy_equipment') {
      setHourMeter('');
      setEnginePower('');
      setEngineBrand('');
      setEngineModel('');
      setEngineYear('');
    }
    
    // Trigger API call to reload Vehicle Make options based on newType
    // fetchVehicleMakes(newType);
  };

  return (
    <div className="vehicle-dropdown-container">
      {/* Primary Selection Fields */}
      <select 
        value={vehicle_type} 
        onChange={(e) => handleVehicleTypeChange(e.target.value)}
        required
      >
        <option value="">Select Vehicle Type</option>
        <option value="car">Car</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="heavy_equipment">
          {/* Asset: assets/214998be-52e8-4889-b230-27b0d32e6d26.svg */}
          Heavy Equipment
        </option>
      </select>

      {/* Dependent Fields */}
      <input type="text" value={vehicle_make} onChange={(e) => setVehicleMake(e.target.value)} placeholder="Vehicle Make" />
      <input type="text" value={vehicle_model} onChange={(e) => setVehicleModel(e.target.value)} placeholder="Vehicle Model" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />

      {/* Conditional Heavy Equipment Fields */}
      {isHeavyEquipment && (
        <div className="heavy-equipment-block">
          <input 
            type="number" 
            value={hour_meter} 
            onChange={(e) => setHourMeter(e.target.value)} 
            placeholder="Hour Meter" 
          />
          
          <div className="engine-block">
            <input 
              type="text" 
              maxLength={60} 
              value={engine_power} 
              onChange={(e) => setEnginePower(e.target.value)} 
              placeholder="Engine Power" 
            />
            <input 
              type="text" 
              maxLength={60} 
              value={engine_brand} 
              onChange={(e) => setEngineBrand(e.target.value)} 
              placeholder="Engine Brand" 
            />
            <input 
              type="text" 
              maxLength={60} 
              value={engine_model} 
              onChange={(e) => setEngineModel(e.target.value)} 
              placeholder="Engine Model" 
            />
            <input 
              type="number" 
              step="1" 
              value={engine_year} 
              onChange={(e) => setEngineYear(e.target.value)} 
              placeholder="Engine Year" 
            />
          </div>
        </div>
      )}
    </div>
  );
};