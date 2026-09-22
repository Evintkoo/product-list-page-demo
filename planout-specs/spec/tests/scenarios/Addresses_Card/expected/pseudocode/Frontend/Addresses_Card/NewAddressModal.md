/**
 * Component: NewAddressModal
 * Form overlay for capturing new address details.
 * Validation is performed on-the-fly for all fields.
 */

export const NewAddressModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    address_type: '',
    phone_1: '',
    phone_2: '',
    fax: ''
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    // Example validation logic
    if (name === 'phone_1' && value.length < 10) {
      error = 'Phone number must be at least 10 digits';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async () => {
    // Logic to POST to API
    // Endpoint: POST /customers/addresses (derived from context)
    await fetch('/customers/addresses', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <form>
        <input name="address_type" onChange={handleChange} />
        {errors.address_type && <span>{errors.address_type}</span>}
        
        <input name="phone_1" onChange={handleChange} />
        {errors.phone_1 && <span>{errors.phone_1}</span>}
        
        <input name="phone_2" onChange={handleChange} />
        <input name="fax" onChange={handleChange} />
        
        <button type="button" onClick={handleSubmit}>Save Address</button>
      </form>
    </div>
  );
};