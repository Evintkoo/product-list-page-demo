// Asset: assets/5bd561a0-2d5b-4113-aec0-55ae26145bc9.svg

Component PrintBarcodesPage {
  State template = "continuous";
  State quantity = 1;

  // Validation: quantity must be a positive integer
  Function validateQuantity(val) {
    return val > 0;
  }

  Render {
    <Page>
      <Select 
        label="Select Template" 
        options={["continuous", "continuous_wide", "avery_3x11", "avery_5x13", "tom_jerry_107", "tom_jerry_108"]}
        onChange={(v) => template = v}
      />
      <Input 
        label="Number of Barcodes" 
        type="number"
        value={quantity}
        onChange={(v) => quantity = v}
        error={!validateQuantity(quantity) ? "Must be > 0" : null}
      />
      <Button onClick={previewBarcodes}>Preview</Button>
      <Button onClick={printBarcodes}>Print</Button>
      <BarcodeDisplay template={template} quantity={quantity} />
    </Page>
  }
}