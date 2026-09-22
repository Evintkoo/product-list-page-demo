// Handles persistence logic for ServiceProduct and associated tags.

FUNCTION getServiceProductById(id):
  RETURN DB.ServiceProduct.find(id)
    .include(ServiceProductType, Tags, Tax, OtherTax, Coa, TaxProductCode, TaxUom)

FUNCTION listServiceProducts(page, limit, filters):
  RETURN DB.ServiceProduct.paginate(page, limit)
    .filter(filters)
    .orderBy(created_at, DESC)

FUNCTION saveServiceProduct(data):
  // Transactional save to ensure atomicity
  DB.transaction(() => {
    record = DB.ServiceProduct.upsert(data.service_product)
    
    // Sync tags
    DB.ServiceProductTag.deleteWhere(service_product_id = record.id)
    FOR tag_id IN data.service_product_tag_ids:
      DB.ServiceProductTag.insert({ service_product_id: record.id, tag_id: tag_id })
      
    RETURN record
  })