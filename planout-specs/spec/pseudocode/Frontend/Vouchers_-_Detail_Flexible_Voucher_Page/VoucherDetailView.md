import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVoucherById } from './api/voucherService';

/**
 * Component: VoucherDetailView
 * Displays the details of a flexible voucher product.
 * Asset: assets/3807f13f-a08d-4e44-90e7-3c7584e8262d.svg
 */
export const VoucherDetailView = () => {
  const { id } = useParams<{ id: string }>();
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On Page Load: Fetch voucher record
    const loadVoucher = async () => {
      try {
        const data = await fetchVoucherById(id);
        setVoucher(data);
      } catch (error) {
        console.error("Failed to fetch voucher", error);
      } finally {
        setLoading(false);
      }
    };
    loadVoucher();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!voucher) return <div>Voucher not found</div>;

  return (
    <div className="voucher-detail-container">
      {/* Main Menu Navigation & Product Sub Menu rendered via layout components */}
      
      <h1>{voucher.name}</h1>
      
      <section className="details-grid">
        {/* Mapping based on API-to-Field Mapping Rules */}
        <div field="name">{voucher.name}</div>
        <div field="description">{voucher.description}</div>
        <div field="base_value">{voucher.base_value} {voucher.currency}</div>
        <div field="status">{voucher.status}</div>
        <div field="created_at">{new Date(voucher.created_at).toLocaleDateString()}</div>
        
        {/* ORPHAN_FIELD: sku */}
        {/* ORPHAN_FIELD: price */}
        {/* ORPHAN_FIELD: expireInMonths */}
        {/* ORPHAN_FIELD: expireInDays */}
        {/* ORPHAN_FIELD: sellLocation */}
        {/* ORPHAN_FIELD: receiveLocation */}
        {/* ORPHAN_FIELD: validFrom */}
        {/* ORPHAN_FIELD: validUntil */}
        {/* ORPHAN_FIELD: externalPublisher */}
        {/* ORPHAN_FIELD: openPrice */}
        {/* ORPHAN_FIELD: validForMember */}
        {/* ORPHAN_FIELD: updatedAt */}
        {/* ORPHAN_FIELD: creatorId */}
        {/* ORPHAN_FIELD: updaterId */}
      </section>

      <button onClick={() => window.location.href = `/vouchers/${id}/edit`}>
        Edit
      </button>
    </div>
  );
};