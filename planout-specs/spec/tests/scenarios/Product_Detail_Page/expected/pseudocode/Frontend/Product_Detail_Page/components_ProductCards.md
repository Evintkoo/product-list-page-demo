// Mapping logic implementation for read-only display
export const DetailsCard = ({ data }) => (
  <div className="card">
    <h3>Details</h3>
    <p>SKU: {data.SKU} <button onClick={() => navigator.clipboard.writeText(data.SKU)}>Copy</button></p>
    <p>Name: {data.productName}</p>
    <p>Description: {data.productDescription}</p>
    <p>Brand: {data.brand}</p>
    <p>Type: {data.type}</p>
    <p>Tags: {data.tag}</p>
    <p>Product Code: {data.productCode}</p> <!-- ORPHAN_FIELD: productCode -->
    <p>Supplier Product Code: {data.supplierProductCode}</p>
    <p>Suppliers: {data.supplierId}</p>
  </div>
);

export const TaxCard = ({ data }) => (
  <div className="card">
    <h3>Tax</h3>
    <p>Tax: {data.tax}</p>
    <p>Tax Product Code: {data.taxProductCodeId}</p>
    <p>Tax Unit Of Measure: {data.taxUomId}</p>
  </div>
);

export const WarrantyCard = ({ data }) => (
  <div className="card">
    <h3>Warranty</h3>
    <p>Warranty Period: {data.warrantyPeriodDays ? `${data.warrantyPeriodDays} days` : '-'}</p>
  </div>
);

export const ReturnCard = ({ data }) => (
  <div className="card">
    <h3>Return</h3>
    <p>Return Days Limit: {data.returnDaysLimit ?? '-'}</p>
  </div>
);

export const TradeInCard = ({ data }) => (
  <div className="card">
    <h3>Trade In</h3>
    <p>Trade In (Rp): {data.tradeInValue ?? '-'}</p>
  </div>
);

export const BarcodeCard = ({ data }) => (
  <div className="card">
    <h3>Barcode</h3>
    <p>Barcode Type: {data.barcodeType}</p>
  </div>
);