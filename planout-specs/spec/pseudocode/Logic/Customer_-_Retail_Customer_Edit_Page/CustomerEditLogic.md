/**
 * Handles the initialization and update lifecycle for the Retail Customer Edit page.
 */

export const useCustomerEdit = (customerId: string) => {
  const [customer, setCustomer] = useState(null);
  const [lookups, setLookups] = useState({ stores: [], serviceTaxes: [] });
  const [loading, setLoading] = useState(true);

  // Page Load: Fetch customer data and dropdown options
  useEffect(() => {
    Promise.all([
      fetch(`/api/customers/${customerId}`),
      fetch(`/api/customers/new?retail=1`)
    ])
    .then(([resCustomer, resLookups]) => {
      if (resCustomer.status === 404) {
        redirectTo("/customers");
        return;
      }
      return Promise.all([resCustomer.json(), resLookups.json()]);
    })
    .then(([customerData, lookupData]) => {
      setCustomer(customerData);
      setLookups(lookupData);
      setLoading(false);
    });
  }, [customerId]);

  // Validation and Submission
  const handleSave = async (formData) => {
    // Validation Rules
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.phone || formData.phone.length < 6) errors.phone = "Phone must be at least 6 characters";
    if (!formData.store_id) errors.store_id = "Store is required";
    if (!formData.service_tax_id) errors.service_tax_id = "Service Tax is required";

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // API Submission
    const response = await fetch(`/api/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(formData)
    });

    if (response.status === 200) {
      navigateTo("/customers/detail", { message: "Customer was successfully updated" });
    } else if (response.status === 422) {
      const errorData = await response.json();
      return { success: false, errors: errorData.errors };
    }
  };

  return { customer, lookups, loading, handleSave };
};