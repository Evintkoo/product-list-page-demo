/**
 * Component: BarcodeTemplateRenderer
 * Purpose: Renders the specific barcode layout based on the selected template type.
 * Each template maps to a specific SVG asset structure.
 */

import React from 'react';

// Import SVG assets as components
import ContinuousTemplate from 'assets/0aecac81-6622-413b-ace4-27750b4d66d1.svg'; // Asset: assets/0aecac81-6622-413b-ace4-27750b4d66d1.svg
import Avery5x13Template from 'assets/dfe67f00-444b-483a-87b8-bd201c6805d4.svg'; // Asset: assets/dfe67f00-444b-483a-87b8-bd201c6805d4.svg
import Avery3x11Template from 'assets/f20c0e6f-8891-404b-a3c1-fcb86a1014bd.svg'; // Asset: assets/f20c0e6f-8891-404b-a3c1-fcb86a1014bd.svg
import TomJerry108Template from 'assets/88b3e73e-dd3f-42ad-92f6-6bcf1c66f5fe.svg'; // Asset: assets/88b3e73e-dd3f-42ad-92f6-6bcf1c66f5fe.svg
import ContinuousWideTemplate from 'assets/af973e92-7385-4713-9937-9f0b9e4d7124.svg'; // Asset: assets/af973e92-7385-4713-9937-9f0b9e4d7124.svg
import TomJerry107Template from 'assets/43f2792c-4b5b-4741-a956-96d95e602aa8.svg'; // Asset: 43f2792c-4b5b-4741-a956-96d95e602aa8.svg

interface BarcodeTemplateProps {
  templateType: 'continuous' | 'avery5x13' | 'avery3x11' | 'tomjerry108' | 'continuouswide' | 'tomjerry107';
  barcodeData: string; // ORPHAN_FIELD: barcodeData
}

export const BarcodeTemplateRenderer: React.FC<BarcodeTemplateProps> = ({ templateType, barcodeData }) => {
  
  const renderTemplate = () => {
    switch (templateType) {
      case 'continuous':
        return <ContinuousTemplate data={barcodeData} />;
      case 'avery5x13':
        return <Avery5x13Template data={barcodeData} />;
      case 'avery3x11':
        return <Avery3x11Template data={barcodeData} />;
      case 'tomjerry108':
        return <TomJerry108Template data={barcodeData} />;
      case 'continuouswide':
        return <ContinuousWideTemplate data={barcodeData} />;
      case 'tomjerry107':
        return <TomJerry107Template data={barcodeData} />;
      default:
        return <div>Template not supported</div>;
    }
  };

  return (
    <div className="barcode-display-container">
      {renderTemplate()}
    </div>
  );
};