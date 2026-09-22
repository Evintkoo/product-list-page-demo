// Manages hierarchical administrative regions
interface AreaService {
  // Fetches areas by type (province, regency, district, village)
  getAreasByType(type: 'province' | 'regency' | 'district' | 'village'): Promise<Area[]>;
}