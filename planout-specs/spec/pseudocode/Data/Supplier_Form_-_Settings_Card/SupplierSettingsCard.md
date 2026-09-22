// Component for the Settings Card in the Supplier Form
COMPONENT SupplierSettingsCard(initialData):
  // Initialize dropdown options
  options = useAccountOptions()
  
  // State management for the four dropdowns
  state = {
    coa_id_ap_inventory_purchases: initialData.coa_id_ap_inventory_purchases,
    coa_id_ap_for_credit_note: initialData.coa_id_ap_for_credit_note,
    coa_id_supplier_down_payment: initialData.coa_id_supplier_down_payment,
    coa_id_deposit: initialData.coa_id_deposit
  }

  RENDER:
    // Render four Dropdown components using the same 'options' list
    // Each dropdown updates the corresponding field in the state object
    Dropdown(label="AP Invoice Account", options=options, value=state.coa_id_ap_inventory_purchases, onChange=(val) => updateState("coa_id_ap_inventory_purchases", val))
    Dropdown(label="AP Credit Note Non Consignment Account", options=options, value=state.coa_id_ap_for_credit_note, onChange=(val) => updateState("coa_id_ap_for_credit_note", val))
    Dropdown(label="Supplier Down Payment Account", options=options, value=state.coa_id_supplier_down_payment, onChange=(val) => updateState("coa_id_supplier_down_payment", val))
    Dropdown(label="Supplier Deposit Account", options=options, value=state.coa_id_deposit, onChange=(val) => updateState("coa_id_deposit", val))

  RETURN state // This state is merged into the main Supplier Form submission payload