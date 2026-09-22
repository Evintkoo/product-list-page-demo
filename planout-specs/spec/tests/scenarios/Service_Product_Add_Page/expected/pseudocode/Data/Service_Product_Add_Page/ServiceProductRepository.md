/**
 * Handles persistence logic for Service Products.
 * Maps the incoming request body to the ServiceProduct entity.
 */
function createServiceProduct(requestData: {
  name: string,
  description: string,
  price: decimal,
  including_tax: boolean
}): ServiceProduct {
  
  // Calculate price_ex_tax based on business logic
  let price_ex_tax: decimal;
  
  if (requestData.including_tax) {
    // Logic: Strip tax from the entered price
    // Assuming a standard tax rate retrieval or calculation service
    price_ex_tax = calculateExTax(requestData.price);
  } else {
    // Logic: Price entered is already exclusive of tax
    price_ex_tax = requestData.price;
  }

  const newProduct: ServiceProduct = {
    id: generateUUID(),
    name: requestData.name,
    description: requestData.description,
    price: requestData.price,
    price_ex_tax: price_ex_tax,
    including_tax: requestData.including_tax,
    created_at: getCurrentTimestamp()
  };

  return database.insert("ServiceProduct", newProduct);
}