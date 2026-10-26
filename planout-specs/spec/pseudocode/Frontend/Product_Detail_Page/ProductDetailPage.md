// This component renders the Product Detail Page.
// Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg

Component ProductDetailPage:
  State: productData (Object, initialized null)
  State: isLoading (Boolean, initialized true)
  State: error (String, initialized null)

  // Node: Page Load (id: c16a1ff1-fcc6-41ef-849d-882afe172acb)
  OnMount:
    Call GET /api/products/:id
    If success:
      Set productData = response.body
      Set isLoading = false
    If error:
      Set error = "Failed to load product details"
      Set isLoading = false

  Render:
    If isLoading: Show LoadingSpinner
    If error: Show ErrorMessage(error)
    
    // Sticky Header
    HeaderNavigation(activeTab: "Products") // Node: Header Navigation Bar (id: f90cc08d-9fa9-499a-b006-d02fd9586e9a)
    ProductChip(text: "{productData.SKU} - {productData.productName}") // Node: Product Chip / Code (id: 2e479e14-278b-481a-947e-6aa7e4f85f07)
    
    // Actions
    Button("Back", onClick: navigateToProductList) // Node: Back to Product List page (id: 0196a982-26fd-4749-bb84-8bdb6eeb66c5)
    Button("Edit", onClick: navigateToEditPage) // Node: Edit Button (id: 34a78578-dd11-4a73-a5c3-24513c64ea30)
    Button("QR Code", onClick: navigateToQRPage) // Node: QR code page (id: 29437d12-93aa-48cc-b160-dc02518bb5a9)
    Button("Barcode", onClick: navigateToBarcodePage) // Node: Barcode page (id: c10aea61-0852-4acd-8ef5-f9efc9f5b3a7)

    // Sub-navigation
    SubMenu(activeTab: "product") // Node: Sub menu (id: 0f7694e2-5d18-4067-9ac7-7f6b3747ee5c)
    ProductTab() // Node: Product Tab (id: eb267d6b-3e47-4b1e-b506-b48be3fe53ea)
    
    // Layout: Two-Column Grid
    // LEFT COLUMN
    DetailsCard(data: productData) // Node: Details Card (id: 7319c217-54c3-45dc-a3b2-fa66acb824b5)
    TaxCard(data: productData) // Node: Tax Card (id: 8b05b472-f6b4-419f-a111-fa670ab14de0)
    CompanyPricingCard(data: productData) // Node: Company Pricing (id: 232f7f36-19bb-48d4-b8b1-132b0b47fec4)
    StorePricingCard(data: productData) // Node: Store Pricing card (id: eba63604-26d8-4ddc-82e7-ab43f47de6c4)
    ExternalPricingCard(data: productData) // Node: External Pricing (id: a587b710-8e93-4930-bd1d-b5cc9f4c27c2)
    TrackingBundleCard(data: productData) // Node: Tracking and Bundle (id: d51784bf-1e88-47a2-a3de-6176300902dc)

    // RIGHT COLUMN
    ChangesCard(data: productData) // Node: Changes Card (id: ee1d73b3-222e-4dd4-bab2-c4f553f5c2e6)
    AttributesCard(data: productData) // Node: Attributes (id: 616a2fe5-f29d-4686-9533-fa011e55a97d)
    DimensionsCard(data: productData) // Node: Dimension (id: 159c7be8-5787-49bc-b3c4-333c1294ba18)
    ProductScheduleCard(data: productData) // Node: Products Schedule (id: b1f41250-f73d-456e-8215-28f09287a02b)
    BarcodeCard(data: productData) // Node: Barcode (id: 1704f89a-d3ef-43e9-b2f7-03dfd6dc286b)
    SettingsCard(data: productData) // Node: Settings (id: 2a8f7fe9-b152-4337-b17e-a0abcab73c9f)
    WarrantyCard(data: productData) // Node: Warranty (id: 217c5a48-ee86-46ab-b864-d4e28e330656)
    ReturnCard(data: productData) // Node: Return (id: ae096f6b-05dd-4a05-bcfb-992cf2493e85)
    TradeInCard(data: productData) // Node: Trade In (id: 9e3222e1-48b3-4408-afa1-d7986db152c5)

    // Additional Menus
    WarehouseStockMenu(onClick: openWarehouseDetails) // Node: Warehouse Stock Menu (id: 9c85438b-7baf-4847-8fe1-9e1eb3bc8e95)
    PurchaseHistoryMenu(onClick: openPurchaseHistory) // Node: Purchase History Menu (id: 3af7249e-4a24-45e2-8459-b4cf8a41fdce)

// Notes covered:
// 1. Back to Product List page (id: 0196a982-26fd-4749-bb84-8bdb6eeb66c5)
// 2. QR code page (id: 29437d12-93aa-48cc-b160-dc02518bb5a9)
// 3. Barcode page (id: c10aea61-0852-4acd-8ef5-f9efc9f5b3a7)
// 4. Attributes (id: 616a2fe5-f29d-4686-9533-fa011e55a97d)
// 5. Tracking n Bundle (id: 94a9de59-829c-4e65-9afa-31e9f5c33494)
// 6. Sub menu (id: 0f7694e2-5d18-4067-9ac7-7f6b3747ee5c)
// 7. Return (id: ae096f6b-05dd-4a05-bcfb-992cf2493e85)
// 8. Warranty (id: 217c5a48-ee86-46ab-b864-d4e28e330656)
// 9. Barcode (id: 1704f89a-d3ef-43e9-b2f7-03dfd6dc286b)
// 10. Trade In (id: 9e3222e1-48b3-4408-afa1-d7986db152c5)
// 11. Settings (id: 2a8f7fe9-b152-4337-b17e-a0abcab73c9f)
// 12. Products Schedule (id: b1f41250-f73d-456e-8215-28f09287a02b)
// 13. Changes Card (id: ee1d73b3-222e-4dd4-bab2-c4f553f5c2e6)
// 14. Page Load (id: c16a1ff1-fcc6-41ef-849d-882afe172acb)
// 15. Mapping Rules (id: 034f6eb8-63ad-4a09-bade-d9e20d2a5e67)
// 16. Product Details JSON Schema (id: 84a9ac74-afa9-4b7c-a17f-7c97f63f92dc)
// 17. Product Tab (id: eb267d6b-3e47-4b1e-b506-b48be3fe53ea)
// 18. Dimension (id: 159c7be8-5787-49bc-b3c4-333c1294ba18)
// 19. Header Navigation Bar (id: f90cc08d-9fa9-499a-b006-d02fd9586e9a)
// 20. Details Card (id: 7319c217-54c3-45dc-a3b2-fa66acb824b5)
// 21. Tax Card (id: 8b05b472-f6b4-419f-a111-fa670ab14de0)
// 22. Company Pricing (id: 232f7f36-19bb-48d4-b8b1-132b0b47fec4)
// 23. Store Pricing card (id: eba63604-26d8-4ddc-82e7-ab43f47de6c4)
// 24. External Pricing (id: a587b710-8e93-4930-bd1d-b5cc9f4c27c2)
// 25. Tracking and Bundle (id: d51784bf-1e88-47a2-a3de-6176300902dc)
// 26. Product Chip / Code (id: 2e479e14-278b-481a-947e-6aa7e4f85f07)
// 27. Edit Button (id: 34a78578-dd11-4a73-a5c3-24513c64ea30)
// 28. Warehouse Stock Menu (id: 9c85438b-7baf-4847-8fe1-9e1eb3bc8e95)
// 29. Purchase History Menu (id: 3af7249e-4a24-45e2-8459-b4cf8a41fdce)