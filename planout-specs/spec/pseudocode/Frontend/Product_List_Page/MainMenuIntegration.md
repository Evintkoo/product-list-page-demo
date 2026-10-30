// Node: (Unnamed) [ID: d5b6c86c-ec16-448a-80f2-73be4e0f532f]
// Description: Integration point for the Main Menu component within the Product List Page layout.
// Asset: assets/67ab07a3-36e5-4169-bc37-60c90863d1d8.svg

component MainMenuIntegration {
  // Receives: "Main menu" [ID: 3efa8f68-3fa1-41a3-b7ce-d12bc6d383f6]
  // Connection: "Common Component"
  
  state isMenuExpanded: boolean = false;
  state activeRoute: string = "products";

  render() {
    return (
      <nav className="main-navigation">
        {/* 
          The Main Menu provides global navigation. 
          It must persist across the Product List Page.
          It triggers navigation events to other modules.
        */}
        <button onClick={toggleMenu}>Menu</button>
        {isMenuExpanded && (
          <ul>
            <li className={activeRoute === "products" ? "active" : ""}>Products</li>
            {/* ORPHAN_FIELD: dashboardLink */}
            {/* ORPHAN_FIELD: settingsLink */}
          </ul>
        )}
      </nav>
    );
  }

  function toggleMenu() {
    isMenuExpanded = !isMenuExpanded;
  }
}

// Notes covered:
// - Integration of Main menu component as a common layout element.
// - Persistence of navigation state across the product list view.
// - Handling of active route highlighting for the "Products" module.