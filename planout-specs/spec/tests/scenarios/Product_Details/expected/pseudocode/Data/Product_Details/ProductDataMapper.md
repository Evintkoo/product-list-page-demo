/**
 * Maps raw database records to the JSON Schema format required by the API.
 */

FUNCTION mapProductToSchema(record):
    RETURN {
        "id": record.id,
        "sku": record.sku,
        "displayName": record.name,
        "details": {
            "description": record.description,
            "price": record.price,
            "currency": record.currency,
            "inventoryCount": record.stock_quantity,
            "category": record.category_name
        }
    }