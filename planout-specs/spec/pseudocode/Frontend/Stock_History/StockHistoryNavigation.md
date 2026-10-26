// Node ID: 40a311a3-531c-4354-8a2e-c6c93907daac
// Title: Stock History Navigation
// Description: Handles routing to the Stock History module from the Main Menu.
// Asset: assets/6e5f4d92-5031-4c71-ad5d-1e561c6be354.svg

Component StockHistoryNavigation {
  // Triggered by "Main Menu" selection
  Function navigateToStockHistory() {
    Router.push("/stock-history")
  }

  Render {
    Button(onClick: navigateToStockHistory) {
      Text("View Stock History")
    }
  }
}
// Notes covered: Handles routing to the Stock History module from the Main Menu.