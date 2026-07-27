// Reusable hook: delays propagation of a rapidly-changing value until
// the user stops changing it for `delay` milliseconds.

FUNCTION useDebouncedValue(inputValue, delay):
  STATE debouncedValue = inputValue

  ON inputValue CHANGE:
    START timer FOR delay milliseconds:
      SET debouncedValue = inputValue
    // If inputValue changes again before timer completes, CANCEL previous timer
    // and restart — this is the core debounce behavior, ensuring validation/search
    // triggering never fires on every keystroke, only after a pause

  RETURN debouncedValue