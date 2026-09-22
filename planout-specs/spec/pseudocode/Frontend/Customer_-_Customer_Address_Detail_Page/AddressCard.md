export const AddressCard = ({ addressData }) => {
  // Helper to format full address string
  const fullAddress = [
    addressData.address,
    addressData.village,
    addressData.district,
    addressData.regency_municipality,
    addressData.province,
    addressData.country,
    addressData.postal_code
  ].filter(Boolean).join(', ');

  return (
    <div className="address-card">
      <div>
        <label>Address Type</label>
        <span>{addressData.address_type}</span>
      </div>

      <div>
        <label>Address</label>
        <p>{fullAddress}</p>
      </div>

      <div>
        <label>Phone 1</label>
        <span>{addressData.phone_1}</span>
      </div>

      <div>
        <label>Phone 2</label>
        <span>{addressData.phone_2}</span>
      </div>

      <div>
        <label>Fax</label>
        <span>{addressData.fax}</span>
      </div>

      <div>
        <label>Main Address</label>
        <span>{addressData.is_main_address ? 'Yes' : 'No'}</span>
      </div>

      <div>
        <label>Shipping Address</label>
        <span>{addressData.is_shipping_address ? 'Yes' : 'No'}</span>
      </div>

      <div>
        <label>Latitude</label>
        <span>{addressData.latitude}</span>
      </div>

      <div>
        <label>Longitude</label>
        <span>{addressData.longitude}</span>
      </div>

      <footer>
        <small>Created At: {addressData.created_at}</small>
        <small>Updated At: {addressData.updated_at}</small>
      </footer>

      <button onClick={() => window.location.href = `/customers/${addressData.customer_id}/edit`}>
        Edit
      </button>
    </div>
  );
};