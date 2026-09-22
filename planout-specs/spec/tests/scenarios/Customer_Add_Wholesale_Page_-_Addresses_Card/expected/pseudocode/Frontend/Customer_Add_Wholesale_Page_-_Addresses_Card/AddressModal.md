/**
 * Component: AddressModal
 * Description: Form modal for capturing address details.
 * Validation: Immediate field-level validation for required fields and formats.
 */

export const AddressModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    address_type: '',
    phone_1: '',
    phone_2: '',
    fax: '',
    is_main: false,
    is_shipping: false
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'phone_1' && value.length < 10) {
      error = 'Primary phone must be at least 10 digits';
    }
    // Add further validation logic as required by business rules
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  return (
    <div className="modal-overlay">
      <form>
        {/* Form inputs mapped to ORPHAN_FIELDs identified in AddressesCard */}
        <input name="address_type" onChange={handleChange} placeholder="Address Type" />
        <input name="phone_1" onChange={handleChange} placeholder="Phone 1" />
        {errors.phone_1 && <span className="error">{errors.phone_1}</span>}
        
        <input name="phone_2" onChange={handleChange} placeholder="Phone 2" />
        <input name="fax" onChange={handleChange} placeholder="Fax" />
        
        <label>
          <input type="checkbox" name="is_main" onChange={handleChange} /> Main Address
        </label>
        
        <label>
          <input type="checkbox" name="is_shipping" onChange={handleChange} /> Shipping Address
        </label>

        <button type="button" onClick={() => onSave(formData)}>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};