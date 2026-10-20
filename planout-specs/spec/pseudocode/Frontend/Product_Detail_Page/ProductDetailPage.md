import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductDetails } from './api/productService';

/**
 * Product Detail Page
 * Asset: assets/adba229c-083f-44ef-8266-5500bc46aee5.svg
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product-detail-container">
      <HeaderNavigationBar />
      <ProductChip sku={product.SKU} name={product.productName} />
      
      <div className="content-grid">
        <div className="left-column">
          <DetailsCard data={product} />
          <TaxCard data={product} />
          <CompanyPricingCard data={product} />
          <StorePricingCard data={product} />
          <ExternalPricingCard data={product} />
          <TrackingAndBundleCard data={product} />
        </div>
        
        <div className="right-column">
          <ChangesCard data={product} />
          <AttributesCard data={product} />
          <DimensionsCard data={product} />
          <ProductScheduleCard data={product} />
          <BarcodeCard data={product} />
          <SettingsCard data={product} />
          <WarrantyCard data={product} />
          <ReturnCard data={product} />
          <TradeInCard data={product} />
        </div>
      </div>
    </div>
  );
};