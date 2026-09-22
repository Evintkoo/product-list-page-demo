import { useCustomerContext } from './hooks/useCustomerContext';
import { useProductTable } from './hooks/useProductTable';

export const CustomerProductsPage = () => {
  const { customer_id } = useParams();
  const { customerData } = useCustomerContext(); // Loaded via GET /api/customers/:id

  return (
    <Layout>
      <MainMenu activeTab="Customers" />
      
      <Banner>
        <CustomerName value={customerData.name} />
      </Banner>

      <CustomerDetailMenu type={customerData.type} />

      <section>
        <CustomerProductsHeader />
        
        <SearchFilterBar 
          onSearch={(filters) => fetchProducts(filters)} 
        />

        <Toolbar>
          <AddProductButton onClick={openAddProductModal} />
          <ExportToExcelButton onClick={handleExport} />
        </Toolbar>

        <ProductTable>
          <TableHeader>
            <Column>No.</Column>
            <Column>SKU</Column>
            <Column>Product</Column>
            <Column>Alias Name</Column>
            <Column>Alias SKU</Column>
            <Column>Customer Discount (%)</Column>
            <Column>Actions</Column>
          </TableHeader>
          
          <TableBody>
            {products.map((product, index) => (
              <Row key={product.id}>
                <Cell><RowSelector id={product.id} /></Cell>
                <Cell>{index + 1}</Cell>
                <Cell><Link to={`/products/${product.sku}`}>{product.sku}</Link></Cell>
                <Cell>{product.name}</Cell>
                <Cell>{product.alias_name}</Cell>
                <Cell>{product.alias_sku}</Cell>
                <Cell>{product.discount_percentage}</Cell>
                <Cell>
                  <EditButton onClick={() => editProduct(product.id)} />
                  <DeleteButton onClick={() => deleteProduct(product.id)} />
                </Cell>
              </Row>
            ))}
          </TableBody>
        </ProductTable>
      </section>
    </Layout>
  );
};