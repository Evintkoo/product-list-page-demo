import { useSalesData } from './hooks/useSalesData';
import { WorkflowStatusBar } from './components/WorkflowStatusBar';
import { SalesDetailsView } from './components/SalesDetailsView';

export const SalesDetailsPage = ({ id }) => {
  const { data, loading, error } = useSalesData(id);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="sales-details-container">
      <WorkflowStatusBar 
        status={data.status} 
        transactionId={data.id} 
      />
      <SalesDetailsView data={data} />
      
      <div className="action-bar">
        <PrintAndSendButton />
        {data.status === 'draft' && (
          <>
            <CompleteButton transactionId={data.id} />
            <CancelButton transactionId={data.id} />
          </>
        )}
      </div>
    </div>
  );
};