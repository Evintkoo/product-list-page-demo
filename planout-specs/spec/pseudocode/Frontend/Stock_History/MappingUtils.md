// Node: Store Stock History Mapping Rules (1290b371-6610-4521-b7f4-97cd5fa7b980)
Function mapStockHistory(data):
  Return {
    ID: data.id,
    Date: data.created_at,
    Store: data.store_name, <!-- ORPHAN_FIELD: store_name -->
    Type: data.type, <!-- ORPHAN_FIELD: type -->
    "Qty Changed": data.increasedQty || data.decreasedQty, <!-- ORPHAN_FIELD: increasedQty --> <!-- ORPHAN_FIELD: decreasedQty -->
    Notes: data.reason,
    "Created By": data.createdBy, <!-- ORPHAN_FIELD: createdBy -->
    "All Qty Changed": data.totalQtyChanged <!-- ORPHAN_FIELD: totalQtyChanged -->
  }
  Notes covered: The following is mapping rules from the JSON response to the elements on the screens: 1. id -> ID, 2. created_at -> Date, 3. store_name -> Store, 4. type -> Type, 5. increasedQty -> Qty Changed, 6. decreasedQty -> Qty Changed, 7. notes -> Notes, 8. createdBy -> Created By, 8. totalQtyChanged -> All Qty Changed.

// Node: Store Mapping Rules (a40ede3c-69fc-46cc-b768-86dba39bccea)
Function mapStores(data):
  Return {
    "dropdown id": data.id,
    "dropdown value": data.name
  }
  Notes covered: The following is mapping rules from the JSON response to the elements on the screens: 1. store_id -> dropdown id, 2. store_name -> dropdown value.