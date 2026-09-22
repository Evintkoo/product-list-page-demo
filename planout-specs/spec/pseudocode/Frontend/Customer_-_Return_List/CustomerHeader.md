/**
 * Displays customer identification.
 */
component CustomerHeader {
  render {
    return (
      <header>
        <UserIcon />
        <h1>{customer.name}</h1> <!-- ORPHAN_FIELD: name -->
      </header>
    );
  }
}