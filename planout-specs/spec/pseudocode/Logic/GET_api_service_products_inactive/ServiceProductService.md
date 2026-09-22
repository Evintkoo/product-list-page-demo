/**
 * Logic layer for ServiceProduct data access.
 */
FUNCTION EXISTS_IN_DB(entity_name, id):
    // Helper to verify existence of related entities (Type/Tag)
    RETURN COUNT(SELECT id FROM entity_name WHERE id = id) > 0 <!-- MISSING_FIELD: ServiceProductType.id --> <!-- MISSING_FIELD: ServiceProductTag.id -->