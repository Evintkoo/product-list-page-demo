/**
 * Custom hook to manage the state of the New Order Form Card.
 */

function usePurchaseOrderForm() {
    const [formState, setFormState] = useState({
        from_warehouse_id: '',
        to_store_id: '',
        from_supplier_id: '',
        ref_code: '',
        due_at: '',
        notes: ''
    });

    const updateField = (field, value) => {
        setFormState(prev => ({ ...prev, [field]: value }));
    };

    const submitForm = async () => {
        return await handleCreatePurchaseOrder(formState);
    };

    return { formState, updateField, submitForm };
}