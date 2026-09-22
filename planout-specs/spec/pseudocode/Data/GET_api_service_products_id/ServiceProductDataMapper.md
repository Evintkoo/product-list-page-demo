/**
 * Maps database records to the Service Product Detail JSON Schema.
 * Ensures consistent API output format.
 */

FUNCTION mapToServiceProductDetail(record):
    RETURN {
        "id": record.id,
        "name": record.name,
        "description": record.description,
        "price": record.price,
        "currency": record.currency,
        "is_active": record.is_active,
        "metadata": {
            "created_at": record.created_at,
            "updated_at": record.updated_at
        }
    }