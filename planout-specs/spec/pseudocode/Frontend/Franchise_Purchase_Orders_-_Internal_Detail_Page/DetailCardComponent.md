export const DetailCardComponent = ({ data }) => {
  return (
    <div className="details-panel">
      <p>Document No: {data.ref_code}</p>
      <p>Reference Number: {data.supplier_ref_code}</p>
      <p>From Warehouse: {data.warehouse_name}</p>
      <p>Deliver To: {data.store_name}</p>
      <p>From Supplier: {data.supplier_name}</p>
      <p>Created By: {data.creator_name}</p>
      <p>Updated By: {data.updater_name}</p>
      <p>Notes: {data.notes}</p>
      <p>Created At: {data.created_at}</p>
      <p>Updated At: {data.updated_at}</p>
      <p>Due Date: {data.due_at}</p>
      <p>Sent At: {data.sent_at}</p>
      <p>Received Date: {data.received_at}</p>
      <p>Journal: <!-- ORPHAN_FIELD: Journal --></p>
    </div>
  );
};