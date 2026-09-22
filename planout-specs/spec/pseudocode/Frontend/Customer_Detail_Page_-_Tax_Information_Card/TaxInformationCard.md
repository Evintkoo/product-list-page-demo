/**
 * Component: TaxInformationCard
 * Description: Displays the tax-related identification numbers for a customer.
 * Asset: assets/a8440d1a-4354-4ce6-80fd-0530cf637059.svg
 */

import React from 'react';
import { useCustomerData } from './hooks/useCustomerData';

export const TaxInformationCard = ({ customerId }) => {
  // Fetching customer data from the context/store
  const { customer, isLoading } = useCustomerData(customerId);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="tax-information-card">
      <h3>Tax Information</h3>
      
      <div className="field-group">
        <label>NPWP</label>
        <div className="field-content">
          <span>{customer.npwp}</span> <!-- ORPHAN_FIELD: npwp -->
          <InfoIcon tooltip="Nomor Pokok Wajib Pajak" />
        </div>
      </div>

      <div className="field-group">
        <label>NITKU</label>
        <div className="field-content">
          <span>{customer.nitku}</span> <!-- ORPHAN_FIELD: nitku -->
          <InfoIcon tooltip="Nomor Identitas Tempat Kegiatan Usaha" />
        </div>
      </div>

      <div className="field-group">
        <label>NPPKP</label>
        <div className="field-content">
          <span>{customer.nppkp}</span> <!-- ORPHAN_FIELD: nppkp -->
          <InfoIcon tooltip="Nomor Pengukuhan Pengusaha Kena Pajak" />
        </div>
      </div>
    </div>
  );
};