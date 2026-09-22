// API endpoint handler for the Wholesale Customer Detail Page
GET /api/customers/:id:
    customerData = CustomerRepository.getCustomerById(params.id)
    
    IF NOT customerData:
        RETURN 404 "Customer not found"
        
    RETURN 200 JSON {
        "customer_code": customerData.customer_code,
        "name": customerData.name,
        "area_region": customerData.area_region,
        "address": customerData.address,
        "ktp": customerData.ktp,
        "phone": customerData.phone,
        "email": customerData.email,
        "notes": customerData.notes,
        "salesperson": customerData.salesperson,
        "detail_bank": customerData.detail_bank,
        "created_at_store": customerData.created_at_store,
        "contact_full_name": customerData.contact_full_name,
        "contact_phone": customerData.contact_phone,
        "contact_address": customerData.contact_address,
        "contact_region": customerData.contact_region,
        "contact_country": customerData.contact_country,
        "contact_email": customerData.contact_email,
        "contact_position": customerData.contact_position,
        "contact_departement": customerData.contact_departement,
        "created_at": customerData.created_at,
        "updated_at": customerData.updated_at,
        "created_by": customerData.created_by,
        "updated_by": customerData.updated_by,
        "source": customerData.source,
        "npwp": customerData.npwp,
        "nppkp": customerData.nppkp,
        "nitku": customerData.nitku,
        "franchise_store_owner": customerData.franchise_store_owner,
        "wholesale_customer": customerData.wholesale_customer,
        "is_card_qris_provider": customerData.is_card_qris_provider,
        "is_insurance_provider": customerData.is_insurance_provider,
        "sales_tax": customerData.sales_tax,
        "ar_invoice_account": customerData.ar_invoice_account,
        "credit_note_account": customerData.credit_note_account,
        "customer_down_payment_account": customerData.customer_down_payment_account,
        "deposit_account": customerData.deposit_account,
        "price_difference_account": customerData.price_difference_account,
        "currency": customerData.currency,
        "credit_term_days": customerData.credit_term_days,
        "credit_limit": customerData.credit_limit,
        "overdue_limit_days": customerData.overdue_limit_days,
        "customer_group": customerData.customer_group,
        "pricelist": customerData.pricelist
    }