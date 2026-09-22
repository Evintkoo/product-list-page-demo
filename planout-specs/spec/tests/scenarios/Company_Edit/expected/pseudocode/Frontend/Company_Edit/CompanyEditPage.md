import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

/**
 * Company Edit Page
 * Asset: assets/05bfe0e5-6075-4813-9282-4ae7f9bae78c.svg
 * Asset: assets/7fb145ab-6077-49da-bc2b-359bc6b5c8aa.svg
 */
export const CompanyEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Details');
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      // Initialized via API fetch on load
    }
  });

  // Load company data on mount
  useEffect(() => {
    // Fetch GET /companies/{id}
    // Populate all fields using setValue()
  }, [id]);

  const onSubmit = async (data) => {
    try {
      // PUT /companies/{id}
      await api.put(`/companies/${id}`, data);
      navigate('/companies');
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <MainMenu activeTab="Setup" />
      <SetupSubMenu activeTab="Company" />

      {/* Details Section */}
      <section hidden={activeTab !== 'Details'}>
        <input {...register("name", { required: true })} placeholder="Name" />
        <input {...register("code", { required: true })} placeholder="Code" />
        <input {...register("npwp")} placeholder="NPWP" />
        <input {...register("address", { required: true })} placeholder="Address" />
        <select {...register("country", { required: true })} />
        <select {...register("currency")} disabled />
        <select {...register("sales_tax", { required: true })} />
        <input {...register("phone")} placeholder="Phone" />
        <input {...register("fax")} placeholder="Fax" />
        <input {...register("email")} placeholder="Email" />
        <input {...register("logo_text", { required: true })} />
        <input {...register("business_name", { required: true })} />
        <select {...register("color_theme", { required: true })} disabled />
        <select {...register("time_zone", { required: true })} />
      </section>

      {/* Settings Section */}
      <section hidden={activeTab !== 'Settings'}>
        {/* Product Labels */}
        <input {...register("product_label_1")} />
        <input {...register("product_label_2")} />
        <input {...register("product_label_3")} />

        {/* Product Type Monitoring */}
        <select {...register("product_type_1_id")} />
        <select {...register("product_type_2_id")} />
        <select {...register("product_type_3_id")} />
        <select {...register("product_type_4_id")} />

        {/* Custom Attributes */}
        {[1, 2, 3, 4, 5, 6].map(i => (
          <React.Fragment key={i}>
            <input {...register(`product_attribute_${i}`)} />
            <input type="checkbox" {...register(`show_product_attribute_${i}_on_mobile`)} />
          </React.Fragment>
        ))}
        <select {...register("default_publisher_attribute")} />

        {/* Barcodes */}
        <select {...register("barcode_types")} />
        <input type="number" {...register("product_code_use_first")} />

        {/* POS Settings */}
        <select {...register("default_customer_id")} />
        <input type="checkbox" {...register("can_overpay_non_cash")} />
        <input type="number" {...register("overpay_non_cash_limit")} />
        <input type="checkbox" {...register("print_receipt_on_sales_draft")} />
        <input type="checkbox" {...register("enable_quick_button")} />
        <input type="checkbox" {...register("insert_user_code_to_sales_refcode")} />

        {/* Stock & Purchasing */}
        <input type="checkbox" {...register("stock_order_edit_received_qty")} />
        <input type="checkbox" {...register("stock_return_edit_approved_qty")} />
        <input type="checkbox" {...register("stock_transfer_edit_received_qty")} />
        <input type="checkbox" {...register("purchasing_show_approved_state")} />
        <input type="checkbox" {...register("purchasing_show_expired_state")} />

        {/* Serials */}
        <input type="checkbox" {...register("serials_show_sent_stock_transfer")} />
        <input type="checkbox" {...register("serials_show_sent_stock_order")} />

        {/* Reports */}
        <input {...register("csv_column_delimiter")} />
      </section>

      <button type="button" onClick={() => navigate('/companies')}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};