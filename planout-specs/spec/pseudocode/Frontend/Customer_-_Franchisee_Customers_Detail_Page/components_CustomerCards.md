// These components receive the response object from GET /api/customers/:id

export const DetailsCard = ({ data }) => (
  <section>
    <h3>Details</h3>
    <p>Name: {data.name}</p>
    <p>Email: {data.email}</p>
    <p>Phone: {data.phone}</p>
    <p>Salesperson: {data.salesperson_name}</p>
  </section>
);

export const GroupCard = ({ data }) => (
  <section>
    <h3>Customer Group</h3>
    <p>{data.customer_group}</p>
  </section>
);

export const TaxInformationCard = ({ data }) => (
  <section>
    <h3>Tax Information</h3>
    <p>Tax ID: {data.tax_id}</p>
    <p>VAT Number: {data.vat_number}</p>
    {/* ORPHAN_FIELD: NPWP */}
    {/* ORPHAN_FIELD: NPPKP */}
    {/* ORPHAN_FIELD: NITKU */}
  </section>
);

export const SettingsCard = ({ data }) => (
  <section>
    <h3>Settings</h3>
    <p>Credit Terms: {data.credit_terms}</p>
    <p>Account Status: {data.account_status}</p>
    {/* ORPHAN_FIELD: franchise_flag */}
    {/* ORPHAN_FIELD: wholesale_flag */}
    {/* ORPHAN_FIELD: sales_tax */}
    {/* ORPHAN_FIELD: price_difference_account */}
  </section>
);

export const PricesCard = ({ data }) => (
  <section>
    <h3>Prices</h3>
    <p>Pricelist: {data.pricelist_name}</p>
  </section>
);

export const DataMappingCard = ({ data }) => (
  <section>
    <h3>Data Mapping</h3>
    <p>Salesperson: {data.salesperson_name}</p>
  </section>
);

export const ChangesCard = ({ data }) => (
  <section>
    <h3>Changes</h3>
    <p>Created At: {data.created_at}</p>
    <p>Created By: {data.created_by_name}</p>
    <p>Updated At: {data.updated_at}</p>
    <p>Updated By: {data.updated_by_name}</p>
    <p>Source: {data.source}</p>
  </section>
);