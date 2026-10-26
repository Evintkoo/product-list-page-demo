/**
 * Node: On Click Products (535ff43c-8460-4b75-9d79-73fc73a92a48)
 * Description: When a user clicks Products item, toggle the Product Sub Menu component as an accordion menu.
 */
component ProductsMenu {
  state isSubMenuOpen: boolean = false;

  function handleProductsClick() {
    isSubMenuOpen = !isSubMenuOpen;
  }

  render {
    <button onClick={handleProductsClick}>Products</button>
    if (isSubMenuOpen) {
      <ProductSubMenu />
    }
  }
}

// Notes covered:
// - When a user clicks Products item, toggle the Product Sub Menu component as an accordion menu.