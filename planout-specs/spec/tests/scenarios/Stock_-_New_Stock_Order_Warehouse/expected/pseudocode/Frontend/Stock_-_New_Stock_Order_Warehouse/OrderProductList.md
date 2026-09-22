export const OrderProductList = ({ items, onChange }) => {
  const addItem = () => {
    const newItem = {
      product_id: '',
      store_qty: 0,
      order_qty: 0,
      company_average_cost: 0,
      store_remark: ''
    };
    onChange([...items, newItem]);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          {/* product_id: Product.id */}
          <input type="text" value={item.product_id} onChange={/* update specific item */} />
          
          {/* store_qty: StockOrderItem.store_qty */}
          <input type="number" value={item.store_qty} onChange={/* update specific item */} />
          
          {/* order_qty: StockOrderItem.order_qty */}
          <input type="number" value={item.order_qty} onChange={/* update specific item */} />
          
          {/* company_average_cost: StockOrderItem.company_average_cost */}
          <input type="number" value={item.company_average_cost} readOnly />
          
          {/* store_remark: StockOrderItem.store_remark */}
          <input type="text" value={item.store_remark} onChange={/* update specific item */} />
        </div>
      ))}
      <button onClick={addItem}>Add Product</button>
    </div>
  );
};