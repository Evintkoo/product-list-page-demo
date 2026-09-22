/**
 * Maps database entities to the specific JSON structure required by the UI.
 * Ensures consistent naming conventions between the DB and the frontend.
 */

FUNCTION mapToUIModel(dbRecord):
    RETURN {
        id: dbRecord.id,
        name: dbRecord.name,
        payment_type: dbRecord.type,
        bank_card_provider: dbRecord.card_provider,
        payment_service_provider: dbRecord.payment_provider,
        provider_fee_rate: dbRecord.provider_fee_rate,
        enable_refund: dbRecord.enable_refund,
        skip_invoice_receivables: dbRecord.skip_invoice_receivables
    }