import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSupplierHistory, checkAuth } from './api';

/**
 * Asset: assets/1b0059f9-07b5-46a8-b3dc-b68051b23361.svg
 * Supplier History Page: Displays the audit log of changes for a specific supplier.
 */
export const SupplierHistoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializePage = async () => {
      try {
        // 1. Verify authentication
        await checkAuth();
        
        // 2. Fetch history data
        const data = await fetchSupplierHistory(id);
        setHistory(data.history);
      } catch (error) {
        if (error.status === 401) {
          navigate('/login');
        } else if (error.status === 404) {
          // Handle 404: Supplier not found
          showNotification("Supplier history not found.");
        }
      } finally {
        setLoading(false);
      }
    };

    initializePage();
  }, [id]);

  // The Supplier's Name header is derived from the most recent history entry
  const currentSupplierName = history.length > 0 ? history[0].changed_fields.name : "Loading...";

  return (
    <Layout>
      <MainMenu activeTab="Suppliers" />
      <SubMenu activeTab="Suppliers" />
      
      <h1>{currentSupplierName}</h1>
      <SupplierDetailMenu activeTab="History" />

      <HistoryTable data={history} />
    </Layout>
  );
};