/**
 * Transforms database entities into the standard API JSON schema.
 */

FUNCTION mapProductToSchema(productRecord):
    RETURN {
        "id": productRecord.id,
        "name": productRecord.name,
        "sku": productRecord.sku,
        "price": productRecord.price,
        "description": productRecord.description,
        "created_at": productRecord.created_at,
        "updated_at": productRecord.updated_at
    }