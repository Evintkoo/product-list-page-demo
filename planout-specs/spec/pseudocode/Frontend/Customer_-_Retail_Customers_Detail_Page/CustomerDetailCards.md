export const CustomerDetailsCard = ({ data }) => (
  <div className="details-card">
    <p>Customer Code: {data.customer_code}</p>
    <p>Name: {data.name}</p>
    <p>Phone: {data.phone}</p>
    <p>Area/Region: {data.customer_region}</p>
    <p>KTP / Identity Number: {data.identity_number}</p>
    <p>Occupation: {data.occupation}</p>
    <p>Company: {data.customer_wholesale_name}</p>
    <p>Email: {data.email}</p>
    <p>Gender: {data.gender}</p>
    <p>Birthdate: {data.birthdate}</p>
    <p>Store: {data.store_name}</p>
    <p>Salesperson: {data.salesperson_id}</p>
    <p>Notes: {data.notes}</p>
  </div>
);

export const GroupCard = ({ data }) => (
  <div className="group-card">
    <p>Customer Group: {data}</p>
  </div>
);

export const TaxInformationCard = ({ data }) => (
  <div className="tax-card">
    <p>NPWP: {data.tax_no}</p>
    <p>NPPKP: {data.nppkp}</p>
    <p>NITKU: {data.nitku}</p>
    <p>Service Tax / Tax: {data.tax_id}</p>
  </div>
);

export const SAPReportingCard = ({ data }) => (
  <div className="sap-card">
    <p>Assignment: {data.sap_assignment}</p>
    <p>Profit Center: {data.sap_profit_center}</p>
    <p>Cost Center: {data.sap_cost_center}</p>
  </div>
);

export const SettingsCard = ({ data }) => (
  <div className="settings-card">
    <p>Customer Settings: {JSON.stringify(data.customer_settings)}</p>
    <p>Pricelist: {data.pricelist_id}</p>
    <p>Account Receivable: {data.coa_id_account_receivable}</p>
  </div>
);

export const AddressesCard = ({ data }) => (
  <div className="addresses-card">
    {data.map((addr, index) => (
      <div key={index}>
        <p>Address Type: {addr.address_type}</p>
        <p>Address: {addr.address}</p>
        <p>Phone 1: {addr.phone_1}</p>
        <p>Phone 2: {addr.phone_2}</p>
        <p>Fax: {addr.fax}</p>
        <p>Main Address: {addr.is_main_address ? 'Yes' : 'No'}</p>
        <p>Shipping Address: {addr.is_shipping_address ? 'Yes' : 'No'}</p>
      </div>
    ))}
  </div>
);

export const ChangesCard = ({ data }) => (
  <div className="changes-card">
    <p>Created By: {data.creator_id}</p>
    <p>Created At: {data.created_at}</p>
    <p>Updated By: {data.updater_id}</p>
    <p>Updated At: {data.updated_at}</p>
  </div>
);