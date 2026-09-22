/**
 * Component: SalesOrderReturnNew
 * Asset: assets/f459d2b4-5c84-408e-9a3f-59f67cef1ef0.svg
 */

const SalesOrderReturnNew = () => {
  // State Management
  const [warehouse_id, setWarehouseId] = useState(null);
  const [customer_id, setCustomerId] = useState(null);
  const [sales_invoice_id, setSalesInvoiceId] = useState(null);
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState([]); // Array of { sales_invoice_item_id, returned_quantity, reason, price, remaining_quantity }
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived State
  const totalReturned = items.reduce((sum, item) => sum + (Number(item.returned_quantity) || 0), 0);
  const totalAmount = items.reduce((sum, item) => sum + (Number(item.returned_quantity) * item.price), 0);

  // Handlers
  const handleCustomerChange = (id) => {
    setCustomerId(id);
    setSalesInvoiceId(null);
    setItems([]);
    // Trigger: Customer Invoice Loading Logic
  };

  const handleInvoiceChange = async (id) => {
    setSalesInvoiceId(id);
    // Fetch items from GET /api/sales-invoices/:id
    // Populate items state with { sales_invoice_item_id, price, remaining_quantity, returned_quantity: 0, reason: "" }
  };

  const handleReturnedQuantityChange = (index, value) => {
    const newItems = [...items];
    const qty = Number(value);
    
    // Validation: Must not exceed remaining_quantity
    if (qty <= newItems[index].remaining_quantity && qty >= 0) {
      newItems[index].returned_quantity = qty;
      setItems(newItems);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!warehouse_id || !customer_id || !sales_invoice_id) return;
    if (totalReturned === 0) return;

    setIsSubmitting(true);
    
    const payload = {
      warehouse_id,
      customer_id,
      sales_invoice_id,
      notes,
      items: items.filter(i => i.returned_quantity > 0).map(i => ({
        sales_invoice_item_id: i.sales_invoice_item_id,
        returned_quantity: i.returned_quantity,
        reason: i.reason
      }))
    };

    try {
      const response = await api.post('/api/sales-order-returns', payload);
      // Navigate to Sales Order Return Details page using response.id
    } catch (error) {
      // Display error
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Render form components:
    // - To Warehouse Dropdown (warehouse_id)
    // - From Customer Dropdown (customer_id)
    // - Invoice Dropdown (sales_invoice_id)
    // - Products Section (Table with No., Product, Price, Returned, Amount, Reason, Remove)
    // - Notes Field (notes)
    // - Save Button (handleSave)
    // - Cancel Button
  );
};