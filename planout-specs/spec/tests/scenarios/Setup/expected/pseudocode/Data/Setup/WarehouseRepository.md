// Handles persistence for Warehouse entities
interface WarehouseRepository {
  create(data: Omit<Warehouse, 'id' | 'created_at' | 'updated_at'>): Promise<Warehouse>;
  update(id: number, data: Partial<Warehouse>): Promise<Warehouse>;
  findAll(): Promise<Warehouse[]>;
}