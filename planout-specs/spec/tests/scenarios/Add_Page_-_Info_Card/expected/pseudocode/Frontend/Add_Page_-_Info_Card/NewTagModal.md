/**
 * Handles creation of new tags.
 * Fields: name, description
 */
Component NewTagModal:
  // ORPHAN_FIELD: name
  // ORPHAN_FIELD: description

  Render:
    Form:
      Input(name="name")
      TextArea(name="description")
      Button("Save") // Triggers POST /tags (Logic node implied)