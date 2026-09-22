/**
 * Main Edit Page for Wholesale Customers.
 * Asset: assets/9152721c-5965-422c-bc6d-158f86fece0f.svg
 */
component WholesaleCustomerEditPage {
  state customerData = fetchCustomerDetails() // Populated from Detail Page
  
  render() {
    <MainMenu activeTab="Customers" />
    <SubMenu activeTab="Customers" />
    
    // Form fields bound to customerData
    <TextField name="Customer Code" value={customerData.customer_code} />
    <TextField name="Name" value={customerData.name} />
    <TextField name="Phone" value={customerData.phone} />
    <TextField name="Area/Region" value={customerData.area_region} />
    <TextField name="KTP" value={customerData.ktp} />
    <TextField name="Email" value={customerData.email} />
    <TextField name="Detail Bank" value={customerData.detail_bank} />
    
    // Contact Information
    <TextField name="Contact Full Name" value={customerData.contact_full_name} />
    <TextField name="Contact Phone" value={customerData.contact_phone} />
    <TextField name="Contact Region" value={customerData.contact_region} />
    <Dropdown name="Contact Country" options={countries} value={customerData.contact_country} />
    <TextField name="Contact Email" value={customerData.contact_email} />
    <TextField name="Contact Position" value={customerData.contact_position} />
    <TextField name="Contact Departement" value={customerData.contact_departement} />
    <TextField name="Notes" value={customerData.notes} />
    
    // Tax IDs
    <TextField name="NPWP" value={customerData.npwp} />
    <TextField name="NPPKP" value={customerData.nppkp} />
    <TextField name="NITKU" value={customerData.nitku} />
    
    // Addresses Section
    <Table data={customerData.addresses}>
      <Column name="Address Type" />
      <Column name="Phone 1" />
      <Column name="Phone 2" />
      <Column name="Fax" />
      <Column name="Main Address" />
      <Column name="Shipping Address" />
      <ActionColumn>
        <Icon name="Edit" onClick={openAddressModal} />
        <Button name="Delete" onClick={deleteAddress} />
      </ActionColumn>
    </Table>
    <Button name="Add Address" onClick={openAddressModal} />
    
    // Financials
    <Dropdown name="Customer Group" />
    <TextField name="Credit Term (Days)" />
    <TextField name="Credit Limit" />
    <TextField name="Overdue Limit (Days)" />
    <Dropdown name="Currency" />
    <Dropdown name="Pricelist" />
    <Dropdown name="Sales Tax" />
    
    // Accounting Accounts
    <Dropdown name="Ar Invoice Account" />
    <Dropdown name="Credit Note Account" />
    <Dropdown name="Customer Down Payment Account" />
    <Dropdown name="Deposit Account" />
    
    // Checkboxes
    <Checkbox name="Is As Card/QRIS Provider" />
    <Checkbox name="Is As Insurance Provider" />
    <Checkbox name="Tax On Sales Invoice Print" />
    
    // Data Mapping
    <Dropdown name="Salesperson" />
    
    <Button name="Cancel" onClick={handleCancel} />
    <Button name="Save" onClick={handleSave} />
  }
}