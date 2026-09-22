/**
 * GET /api/service_products/new
 * Returns the initial state and dropdown options for the Service Product creation form.
 */
async function getNewServiceProductForm(req, res) {
  try {
    // 1. Fetch all necessary reference data for dropdowns
    const [types, tags, taxes, coas, taxProductCodes, taxUoms] = await Promise.all([
      db.ServiceProductType.findAll(),
      db.ServiceProductTag.findAll(),
      db.Tax.findAll(),
      db.Coa.findAll({ where: { is_default: true } }),
      db.TaxProductCode.findAll(),
      db.TaxUnitOfMeasure.findAll()
    ]);

    // 2. Construct the default form object
    const formDefaults = {
      details: {
        sku: "",
        name: "",
        description: "",
        type_id: null,
        tag_ids: []
      },
      settings: {
        active: true,
        open_price: false,
        estimated_time: null,
        open_estimated_time: false
      },
      tax: {
        tax_id: null,
        other_tax_id: null,
        other_tax_account_id: coas.find(c => c.code === '100.104.003')?.id || null,
        other_tax_refund_account_id: coas.find(c => c.code === '100.104.003')?.id || null,
        tax_product_code_id: null,
        tax_unit_of_measure_id: null
      },
      pricing: {
        price: 0,
        including_tax: false
      }
    };

    // 3. Return combined defaults and options
    return res.status(200).json({
      defaults: formDefaults,
      options: {
        types,
        tags,
        taxes,
        accounts: coas,
        tax_product_codes: taxProductCodes,
        tax_unit_of_measures: taxUoms
      }
    });

  } catch (error) {
    // Log error internally
    console.error("Failed to load service product form:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}