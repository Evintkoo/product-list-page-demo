import { useCompanyData } from './hooks/useCompanyData';
import { MainMenu } from './components/MainMenu';
import { SetupMenu } from './components/SetupMenu';
import { CompanyTable } from './components/CompanyTable';

export const CompanyListPage = () => {
  const { companies, isLoading, error } = useCompanyData();

  return (
    <div className="page-container">
      <MainMenu activeTab="Setup" />
      <SetupMenu activeTab="Company" />
      
      <header className="company-header">
        <BoxIcon />
        <h1>Company</h1>
        <StarIcon />
      </header>

      {isLoading ? (
        <div>Loading companies...</div>
      ) : error ? (
        <div>Error loading company data</div>
      ) : (
        <CompanyTable data={companies} />
      )}
    </div>
  );
};