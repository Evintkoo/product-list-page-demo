export const useForm = ({ initialValues, onSubmit }) => {
  const [formState, setFormState] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({});

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.phone || values.phone.length < 6) errors.phone = "Phone must be at least 6 characters";
    if (!values.store_id) errors.store_id = "Store is required";
    if (!values.service_tax_id) errors.service_tax_id = "Service Tax is required";
    return errors;
  };

  const updateField = (name, value) => {
    const nextState = { ...formState, [name]: value };
    setFormState(nextState);
    // Immediate validation
    setValidationErrors(validate(nextState));
  };

  const submitForm = async () => {
    const errors = validate(formState);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    try {
      await onSubmit(formState);
      // Redirect on success
    } catch (err) {
      if (err.status === 422) {
        setValidationErrors(err.body.errors);
      }
    }
  };

  return { formState, updateField, submitForm, validationErrors };
};