/**
 * Handles persistence logic for Product Brands.
 */
function createBrand(brandData) {
    // Inserts a new record into the Brand table.
    // brandData includes: company_id, name, description, and created_at.
    return database.table('Brand').insert({
        id: generateUuid(),
        company_id: brandData.company_id,
        name: brandData.name,
        description: brandData.description,
        created_at: getCurrentTimestamp()
    });
}

function findBrandByNameAndCompany(name, companyId) {
    // Checks if a brand with the same name already exists for the specific company.
    return database.table('Brand')
        .where('name', '=', name)
        .andWhere('company_id', '=', companyId)
        .first();
}