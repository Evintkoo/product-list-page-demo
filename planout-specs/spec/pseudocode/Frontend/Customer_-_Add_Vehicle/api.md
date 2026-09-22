export const getVehicleMetadata = () => {
  return fetch('/api/vehicles/new').then(res => res.json());
};

export const createVehicle = (data) => {
  return fetch('/api/vehicles', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error('Failed to create');
    return res.json();
  });
};