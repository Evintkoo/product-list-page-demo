// Manages company-level configuration and assets
interface CompanySettingsService {
  getCompanyProfile(companyId: string): Promise<Company>;
  updateCompanyProfile(companyId: string, data: Partial<Company>): Promise<Company>;
  
  // Handles platform-specific JSONB settings
  getPlatformSettings(companyId: string): Promise<CompanyPlatformSettings>;
  updatePlatformSettings(companyId: string, section: string, settings: object): Promise<void>;
}