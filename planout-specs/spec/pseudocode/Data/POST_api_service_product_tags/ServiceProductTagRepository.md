/**
 * Data access layer for ServiceProductTag entities.
 * Handles persistence logic for the POST /api/service_product_tags endpoint.
 */

interface CreateTagDTO {
  name: string;
}

class ServiceProductTagRepository {
  /**
   * Persists a new tag to the ServiceProductTag table.
   * @param data The validated tag data.
   * @returns The created entity including the generated UUID.
   */
  async create(data: CreateTagDTO): Promise<ServiceProductTag> {
    // SQL: INSERT INTO service_product_tags (id, name, created_at) 
    //      VALUES (gen_random_uuid(), :name, NOW())
    //      RETURNING id, name, created_at;
    
    const newTag = await db.table('service_product_tags').insert({
      name: data.name,
      created_at: new Date().toISOString()
    }).returning('*');

    return newTag;
  }

  /**
   * Checks if a tag with the given name already exists to ensure uniqueness.
   */
  async existsByName(name: string): Promise<boolean> {
    const count = await db.table('service_product_tags')
      .where({ name })
      .count();
    
    return count > 0;
  }
}

export default new ServiceProductTagRepository();