import React from 'react';
import { Card, CardHeader, CardContent, Grid, Typography } from '@lumi/ui-components';

/**
 * Component: FranchiseCustomerSettingsCard
 * Displays read-only configuration settings for a franchisee customer.
 * Asset: assets/ab7c1273-6e83-4926-9621-1e7813619f4c.svg
 */
export const FranchiseCustomerSettingsCard = ({ customerData }) => {
  // Data is expected to be mapped from the Customer entity schema.
  // Fields are read-only as per requirements.

  return (
    <Card>
      <CardHeader title="Settings" />
      <CardContent>
        <Grid container spacing={2}>
          {/* Franchise/Wholesale Flags */}
          <Grid item xs={6}>
            <Typography label="Franchise Store Owner?">
              {customerData.is_franchise_owner ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="Wholesale Customer?">
              {customerData.is_wholesale_customer ? 'Yes' : 'No'}
            </Typography>
          </Grid>

          {/* Tax and Accounting Accounts */}
          <Grid item xs={6}>
            <Typography label="Sales Tax">{customerData.sales_tax_code}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="AR Invoice Account">{customerData.ar_invoice_account}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="Credit Note Account">{customerData.credit_note_account}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="Customer Down Payment Account">{customerData.down_payment_account}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="Deposit Account">{customerData.deposit_account}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography label="Price Difference Account">{customerData.price_difference_account}</Typography>
          </Grid>

          {/* Credit Terms and Limits */}
          <Grid item xs={4}>
            <Typography label="Credit Term (Days)">{customerData.credit_term_days}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography label="Credit Limit (Rp)">{customerData.credit_limit_amount}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography label="Overdue Limit (Days)">{customerData.overdue_limit_days}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

// Note: The fields above map to the Customer entity. 
// If any fields are missing from the current API response, they are treated as:
// <!-- ORPHAN_FIELD: is_franchise_owner -->
// <!-- ORPHAN_FIELD: is_wholesale_customer -->
// <!-- ORPHAN_FIELD: sales_tax_code -->
// <!-- ORPHAN_FIELD: ar_invoice_account -->
// <!-- ORPHAN_FIELD: credit_note_account -->
// <!-- ORPHAN_FIELD: down_payment_account -->
// <!-- ORPHAN_FIELD: deposit_account -->
// <!-- ORPHAN_FIELD: price_difference_account -->
// <!-- ORPHAN_FIELD: credit_term_days -->
// <!-- ORPHAN_FIELD: credit_limit_amount -->
// <!-- ORPHAN_FIELD: overdue_limit_days -->