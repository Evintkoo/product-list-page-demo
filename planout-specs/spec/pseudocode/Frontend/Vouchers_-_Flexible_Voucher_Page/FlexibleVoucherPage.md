import { useEffect, useState } from 'react';
import { getAuthMe, getVouchers } from './api'; // Derived from API CONTRACTS

export const FlexibleVoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [filters, setFilters] = useState({ sku: '', name: '' });

  // On page load: Auth check then fetch data
  useEffect(() => {
    const init = async () => {
      try {
        await getAuthMe();
        fetchVouchers();
      } catch (error) {
        window.location.href = '/login';
      }
    };
    init();
  }, []);

  const fetchVouchers = async () => {
    // Only include filters with values
    const queryParams = {
      voucher_type: 'flexible',
      ...(filters.sku && { sku: filters.sku }),
      ...(filters.name && { name: filters.name }),
    };

    const response = await getVouchers(queryParams);
    setVouchers(response);
  };

  return (
    <div>
      <HeaderNavigation /> {/* Active: Products */}
      <VouchersHeader />
      <Tabs active="Flexible" />
      
      <FilterBar 
        onSearch={fetchVouchers}
        filters={filters}
        setFilters={setFilters}
      />
      
      <NewVoucherButton />
      
      <VouchersTable data={vouchers} />
    </div>
  );
};