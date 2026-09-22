// Manages Payment Type definitions and their mappings
interface PaymentTypeService {
  // Returns the master list of payment types
  getAvailablePaymentTypes(): Promise<PaymentType[]>;
  
  // Toggles availability of a payment type for a specific store
  updateMapping(mappingId: string, isActive: boolean, userId: string): Promise<PaymentTypeMapping>;
  
  // Ensures mappings exist for new stores/payment types
  syncMappings(): Promise<void>;
}