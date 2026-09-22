/**
 * Main container for the Stock Order Details view.
 * Asset: assets/7e91967e-a39f-4f69-a9b8-d7009945fbb8.svg
 */
component StockOrderDetailsPage(orderId: UUID) {
  state orderData: StockOrder = null;
  state items: StockOrderItem[] = [];
  state isLoading: boolean = true;

  // Page Load Logic
  onMount {
    // Initialize Main Menu (Inventory active) and Sub Menu (Store active)
    fetchOrderDetails(orderId);
    fetchOrderItems(orderId);
  }

  async function fetchOrderDetails(id) {
    const response = await GET /api/stock-orders/:id(id);
    orderData = response;
    isLoading = false;
  }

  async function fetchOrderItems(id) {
    const response = await GET /api/stock-orders/:id/items(id);
    items = response;
  }

  render {
    if (isLoading) return <LoadingSpinner />;

    return (
      <Layout>
        <MainMenu active="Inventory" />
        <SubMenu active="Store" />
        
        <Header>
          <BackButton onClick={navigateBack} />
          <Title>Stock Order (Warehouse)</Title>
          <WorkflowStatusBar status={orderData.status} />
        </Header>

        <DetailsPanel data={orderData} />

        <Tabs>
          <Tab label="Details" active={true} />
        </Tabs>

        <SearchAndFilterBar />

        <StockTable>
          <StockTableHeader />
          {items.map(item => (
            <StockTableRow key={item.id} data={item} />
          ))}
          <TotalSummaryRow items={items} />
        </StockTable>

        <ActionButtons status={orderData.status} />
      </Layout>
    );
  }
}