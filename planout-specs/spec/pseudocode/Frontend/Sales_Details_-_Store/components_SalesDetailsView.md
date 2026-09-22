export const SalesDetailsView = ({ data }) => {
  return (
    <div className="details-grid">
      <div className="field">Ref Code: {data.id}</div> <!-- ORPHAN_FIELD: ref_code -->
      <div className="field">Date: {data.transaction_date}</div>
      <div className="field">Store: {data.store_id}</div>
      <div className="field">Total Amount: {data.total_amount} {data.currency}</div>
      
      {/* Additional fields mapped from schema */}
      <div className="field">Status: {data.status}</div>
      
      {/* ORPHAN_FIELD: customer */}
      {/* ORPHAN_FIELD: vehicle */}
      {/* ORPHAN_FIELD: register */}
      {/* ORPHAN_FIELD: tax_ref_code */}
      {/* ORPHAN_FIELD: notes */}
      {/* ORPHAN_FIELD: promo_code */}
      {/* ORPHAN_FIELD: ecommerce_ref_code */}
      {/* ORPHAN_FIELD: created_by */}
      {/* ORPHAN_FIELD: updated_by */}
      {/* ORPHAN_FIELD: salesperson */}
      {/* ORPHAN_FIELD: source */}
      {/* ORPHAN_FIELD: created_at */}
      {/* ORPHAN_FIELD: updated_at */}
      {/* ORPHAN_FIELD: completed_date */}
    </div>
  );
};