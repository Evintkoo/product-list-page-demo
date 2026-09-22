/**
 * Supplier Details Page
 * Displays comprehensive information for a specific supplier.
 * Asset: assets/ec0a57d0-17d1-4ecd-9eef-b491b4a415ab.svg
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const SupplierDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch supplier data
  const { data: supplier, isLoading } = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => fetch(`/api/supplier/${id}`).then(res => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!supplier) return <div>Supplier not found</div>;

  return (
    <div className="supplier-details-container">
      <header>
        <button onClick={() => navigate('/suppliers')}>&lt; Supplier</button>
        <h1>{supplier.name}</h1> <!-- ORPHAN_FIELD: car_icon -->
        <button onClick={() => navigate(`/suppliers/${id}/edit`)}>Edit</button>
      </header>

      <nav>
        <Tabs active="Suppliers">
          <Tab label="Suppliers" />
          <Tab label="Products" />
          <Tab label="History" />
        </Tabs>
      </nav>

      <section id="details-section">
        <h2>Details</h2>
        <p>Code: {supplier.id}</p> <!-- ORPHAN_FIELD: supplier_code -->
        <p>Name: {supplier.name}</p>
        <p>Email: {supplier.email}</p>
        <p>Phone: {supplier.phone}</p>
        <p>Address: {supplier.address}</p>
        <!-- ORPHAN_FIELD: tax_number -->
        <!-- ORPHAN_FIELD: registration_number -->
        <!-- ORPHAN_FIELD: contact_name -->
        <!-- ORPHAN_FIELD: fax -->
        <!-- ORPHAN_FIELD: mobile -->
      </section>

      <section id="credit-terms-section">
        <h2>Credit Terms</h2>
        <p>Credit Limit: {supplier.credit_limit}</p>
        <p>Payment Terms: {supplier.payment_terms}</p>
      </section>

      <section id="settings-section">
        <h2>Settings</h2>
        <p>Active: {supplier.is_active ? 'Yes' : 'No'}</p>
        <p>Internal Supplier: {supplier.is_internal ? 'Yes' : 'No'}</p>
        <p>Allow Store PO: {supplier.allow_store_po ? 'Yes' : 'No'}</p>
        <p>Sales Tax: {supplier.sales_tax_name}</p>
      </section>

      <section id="prices-section">
        <h2>Prices</h2>
        <p>Pricelist: {supplier.pricelist_name}</p>
      </section>

      <section id="note-section">
        <h2>Notes</h2>
        <p>Bank Account: {supplier.bank_account_number}</p>
        <p>Notes: {supplier.notes}</p>
      </section>

      <section id="changes-section">
        <h2>Changes</h2>
        <p>Created At: {supplier.created_at}</p>
        <p>Created By: {supplier.created_by_name}</p>
        <p>Updated At: {supplier.updated_at}</p>
        <p>Updated By: {supplier.updated_by_name}</p>
      </section>
    </div>
  );
};

export default SupplierDetailsPage;