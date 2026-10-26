/**
 * Node: 8b8fef10-104b-4afb-961a-06123f9fb990
 * Title: Product Sub Menu component
 * Description: Renders the flyout or dropdown menu containing product-related navigation links.
 * Asset: assets/16fbbd8a-2141-4a70-a6bc-1c62a3c55ee3.svg
 */

// Input: Receives trigger event from "On Click Products" (535ff43c-8460-4b75-9d79-73fc73a92a48)
// Output: None (Terminal node for this interaction)

Component ProductSubMenu {
  State:
    - isOpen: boolean (default: false)
    - menuItems: Array<{ label: string, path: string }> (populated via static config or context)

  Effect:
    - On mount: Initialize menu items list.
    - On "On Click Products" event: Toggle isOpen state.

  Render:
    - If isOpen is true:
        - Render container div with absolute positioning relative to the "Products" trigger.
        - Map over menuItems:
            - Render <a> tag for each item with href set to item.path.
            - Apply hover styles for visual feedback.
    - If isOpen is false:
        - Return null (do not render).

  Validation/Error States:
    - If menuItems is empty: Render a "No items available" placeholder or keep menu hidden.
    - If click occurs outside the component: Set isOpen to false (Close on outside click).

  Side Effects:
    - Global event listener for 'mousedown' to detect outside clicks and trigger close.
    - Accessibility: Ensure 'aria-expanded' attribute on the trigger is updated based on isOpen.

  Notes covered:
    - Renders flyout/dropdown menu.
    - Triggered by "On Click Products".
    - Handles open/close state.
    - Maps navigation links.
    - Implements outside-click closing.
    - Accessibility support (aria-expanded).
}