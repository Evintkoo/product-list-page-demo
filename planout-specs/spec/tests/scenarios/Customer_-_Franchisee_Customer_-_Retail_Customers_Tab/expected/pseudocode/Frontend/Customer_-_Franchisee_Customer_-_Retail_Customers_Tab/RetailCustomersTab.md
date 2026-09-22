import React from 'react';
import { useRetailCustomers } from './hooks/useRetailCustomers';
import { MainMenu } from './components/MainMenu';
import { SubMenu } from './components/SubMenu';
import { NavigationTabs } from './components/NavigationTabs';

/**
 * RetailCustomersTab Component
 * Displays the list of retail customers associated with a specific franchisee.
 * Asset: assets/ab4050ec-248a-409c-941b-98916886a7cf.svg
 */
export const RetailCustomersTab: React.FC<{ franchiseeId: string }> = ({ franchiseeId }) => {
  const { customers, isLoading } = useRetailCustomers(franchiseeId);

  return (
    <div className="page-container">
      <MainMenu activeTab="Customers" />
      <SubMenu activeTab="Customers" />
      
      <header>
        <h1>{/* Customer's Name from context */}</h1>
      </header>

      <NavigationTabs activeTab="Retail Customers" />

      <section className="retail-customers-section">
        <h2>Retail Customers</h2>
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Customer Code</th>
                <th>Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => (
                <tr key={customer.id}>
                  <td>{index + 1}</td>
                  <td>{customer.customer_code}</td>
                  <td>{customer.name}</td>
                  <td>{customer.phone_number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};