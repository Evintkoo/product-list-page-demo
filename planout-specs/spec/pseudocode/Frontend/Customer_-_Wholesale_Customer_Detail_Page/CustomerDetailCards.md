/**
 * Read-only components for displaying customer data.
 * All fields are mapped directly from the Customer entity schema.
 */

export const DetailsCard = ({ data }) => (
  <div className="card">
    <h3>Details</h3>
    <p>Customer Code: {data.customer_code}</p>
    <p>Name: {data.name}</p>
    <p>Area/Region: {data.area_region}</p>
    <p>Address: {data.address}</p>
    <p>KTP: {data.ktp}</p>
    <p>Phone: {data.phone}</p>
    <p>Email: {data.email}</p>
    <p>Notes: {data.notes}</p>
    <p>Salesperson: {data.salesperson}</p>
    <p>Detail Bank: {data.detail_bank}</p>
    <p>Created At Store: {data.created_at_store}</p>
    <p>Contact Full Name: {data.contact_full_name}</p>
    <p>Contact Phone: {data.contact_phone}</p>
    <p>Contact Address: {data.contact_address}</p>
    <p>Contact Region: {data.contact_region}</p>
    <p>Contact Country: {data.contact_country}</p>
    <p>Contact Email: {data.contact_email}</p>
    <p>Contact Position: {data.contact_position}</p>
    <p>Contact Department: {data.contact_departement}</p>
  </div>
);

export const ChangesCard = ({ data }) => (
  <div className="card">
    <h3>Changes</h3>
    <p>Created At: {data.created_at}</p>
    <p>Created By: {data.created_by}</p>
    <p>Updated At: {data.updated_at}</p>
    <p>Updated By: {data.updated_by}</p>
    <p>Source: {data.source}</p>
  </div>
);

export const TaxInformationCard = ({ data }) => (
  <div className="card">
    <h3>Tax Information</h3>
    <p>NPWP: {data.npwp}</p>
    <p>NPPKP: {data.nppkp}</p>
    <p>NITKU: {data.nitku}</p>
  </div>
);

export const SettingsCard = ({ data }) => (
  <div className="card">
    <h3>Settings</h3>
    <p>Franchise Store Owner: {data.franchise_store_owner ? 'Yes' : 'No'}</p>
    <p>Wholesale Customer: {data.wholesale_customer ? 'Yes' : 'No'}</p>
    <p>Is Card/QRIS Provider: {data.is_card_qris_provider ? 'Yes' : 'No'}</p>
    <p>Is Insurance Provider: {data.is_insurance_provider ? 'Yes' : 'No'}</p>
    <p>Sales Tax: {data.sales_tax}</p>
    <p>AR Invoice Account: {data.ar_invoice_account}</p>
    <p>Credit Note Account: {data.credit_note_account}</p>
    <p>Customer Down Payment Account: {data.customer_down_payment_account}</p>
    <p>Deposit Account: {data.deposit_account}</p>
    <p>Price Difference Account: {data.price_difference_account}</p>
    <p>Currency: {data.currency}</p>
    <p>Credit Term (Days): {data.credit_term_days}</p>
    <p>Credit Limit (Rp): {data.credit_limit}</p>
    <p>Overdue Limit (Days): {data.overdue_limit_days}</p>
  </div>
);

export const DataMappingCard = ({ data }) => (
  <div className="card">
    <h3>Data Mapping</h3>
    <p>Salesperson: {data.salesperson}</p> <!-- ORPHAN_FIELD: salesperson_mapping -->
  </div>
);

export const GroupCard = ({ data }) => (
  <div className="card">
    <h3>Group</h3>
    <p>Customer Group: {data.customer_group}</p>
  </div>
);

export const PricesCard = ({ data }) => (
  <div className="card">
    <h3>Prices</h3>
    <p>Pricelist: {data.pricelist}</p>
  </div>
);