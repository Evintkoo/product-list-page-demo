/**
 * Transforms the raw database entity into the UI-ready format
 * based on the defined mapping rules.
 */
FUNCTION mapAddressToUI(data: CustomerAddress):
    RETURN {
        address: data.address + ", " + [data.village, data.district, data.regency_municipality, data.province, data.country, data.postal_code].join(", "),
        address_type: data.address_type,
        phone_1: data.phone_1,
        phone_2: data.phone_2,
        fax: data.fax,
        is_main_address: data.is_main_address,
        is_shipping_address: data.is_shipping_address,
        latitude: data.latitude,
        longitude: data.longitude,
        created_at: data.created_at,
        updated_at: data.updated_at
    }