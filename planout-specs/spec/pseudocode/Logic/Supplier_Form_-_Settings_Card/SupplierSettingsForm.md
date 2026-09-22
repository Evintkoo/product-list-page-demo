/**
 * Logic for the Supplier Settings Card component.
 * Maps form state to the SupplierSettings entity fields.
 */
function SupplierSettingsForm({ initialData }) {
  // Form state initialized with SupplierSettings fields
  const [settings, setSettings] = useState({
    coa_id_ap_inventory_purchases: initialData?.coa_id_ap_inventory_purchases || null,
    coa_id_ap_for_credit_note: initialData?.coa_id_ap_for_credit_note || null,
    coa_id_supplier_down_payment: initialData?.coa_id_supplier_down_payment || null,
    coa_id_deposit: initialData?.coa_id_deposit || null
  });

  // Handler for dropdown changes
  const handleAccountChange = (field, selectedId) => {
    setSettings((prev) => ({
      ...prev,
      [field]: selectedId
    }));
  };

  return {
    settings,
    handleAccountChange
  };
}