/**
 * Page: Edit Retail Customer
 * Asset: assets/83db808a-7ac6-4647-91fa-709f5aeaf9ad.svg
 */

import { useForm } from 'hooks/useForm';
import { useCustomerData } from 'hooks/useCustomerData';

export const EditRetailCustomerPage = ({ customerId }) => {
  const { data, isLoading, error } = useCustomerData(customerId);
  const { formState, updateField, submitForm, isSubmitting, validationErrors } = useForm({
    initialValues: data,
    onSubmit: (values) => PUT('/api/customers/:id', { 
      params: { id: customerId }, 
      body: values 
    })
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <Header title="Edit Customer" icon="star" />
      
      <DetailsCard 
        data={formState} 
        onChange={updateField}
        errors={validationErrors}
        // ORPHAN_FIELD: customer_code
        // ORPHAN_FIELD: area_region
        // ORPHAN_FIELD: ktp
        // ORPHAN_FIELD: occupation
        // ORPHAN_FIELD: company
        // ORPHAN_FIELD: email
        // ORPHAN_FIELD: gender
        // ORPHAN_FIELD: birthdate
        // ORPHAN_FIELD: salesperson
        // ORPHAN_FIELD: notes
      />

      <TaxInformationCard 
        data={formState} 
        onChange={updateField}
        // ORPHAN_FIELD: npwp
        // ORPHAN_FIELD: nppkp
        // ORPHAN_FIELD: nitku
      />

      <SAPReportingCard 
        data={formState} 
        onChange={updateField}
        // ORPHAN_FIELD: assignment
        // ORPHAN_FIELD: profit_center
        // ORPHAN_FIELD: cost_center
      />

      <CustomerGroupCard 
        data={formState} 
        onChange={updateField}
      />

      <SettingsCard 
        data={formState} 
        onChange={updateField}
        errors={validationErrors}
      />

      <AddressesCard 
        data={formState} 
        onChange={updateField}
      />

      <Footer>
        <CancelButton onClick={navigateToRetailCustomersList} />
        <SaveButton 
          onClick={submitForm} 
          disabled={isSubmitting} 
        />
      </Footer>
    </PageLayout>
  );
};