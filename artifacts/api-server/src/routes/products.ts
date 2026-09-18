import { Router, type IRouter } from "express";
import {
  GetProductFiltersResponse,
  GetProductParams,
  GetProductResponse,
  ListProductsQueryParams,
  ListProductsResponse,
} from "@workspace/api-zod";

type Product = {
  id: number;
  sku: string;
  productName: string;
  brandName: string;
  productCode: string;
  productType: string;
  tags: boolean;
  tracking: boolean;
  bundle: boolean;
  bundleFlexible: boolean;
  tax: string;
  price: number;
  created_at: Date;
  category: string;
  unitBusiness: string;
  description: string;
  inventory: {
    onHand: number;
    reserved: number;
    available: number;
  };
};

const productSeed = [
  ["1010300001", "C-668", "CARSPEED", "NEYTECH", 0],
  ["1010300002", "C5020", "CARSPEED", "DOMO", 0],
  ["1010300003", "M-5857", "CARSPEED", "NEYTECH", 0],
  ["1010300004", "M-5858", "CARSPEED", "NEYTECH", 0],
  ["1010300005", "NYT-0008", "CARSPEED", "NEYTECH", 0],
  ["1010300006", "SP.DESEL INTAKE CLEANING ADAPTER.NYT-0028", "CARSPEED", "DOMO", 721500],
  ["1010300007", "NYT-0111", "CARSPEED", "NEYTECH", 0],
  ["1010400001", "C.DOMO.AIR INTAKE BENSIN", "9 CIRCLE", "DOMO", 160950],
  ["1010400002", "C.DOMO.AIR INTAKE DIESEL", "9 CIRCLE", "DOMO", 150500],
  ["1012800001", "O.ENGINE CLEASING FLUSH OIL.9CC-EC-3L", "9 CIRCLE", "DOMO", 0],
  ["1012800002", "C.MOTOR REBORN CLEANER.9CC-EXT26", "9 CIRCLE", "DOMO", 282051],
  ["1012800003", "C.DIESEL FUEL TREATMENT CLEANER 9L.9CC-EXT26D1L", "9 CIRCLE", "DOMO", 598290],
  ["1012800004", "C.GASOLINE INJECTOR CLEANER.9CC-EXT26G1L", "9 CIRCLE", "DOMO", 128205],
  ["1012800005", "9CC-EXT35 60L", "9 CIRCLE", "DOMO", 0],
  ["1012800006", "C.OIL BURN STOP.9CC-EXT40", "9 CIRCLE", "DOMO", 0],
  ["1012800007", "9CC-EXT55", "9 CIRCLE", "DOMO", 0],
  ["1012800008", "C.POWER EXTRA.9CC-EXT73", "9 CIRCLE", "DOMO", 239316],
  ["1012800009", "C.ENGINE REMETALIZER.9CC-EXT88N", "9 CIRCLE", "DOMO", 230769],
  ["1012800010", "C.ENGINE REMETALIZER 20L.9CC-EXT88N20L", "9 CIRCLE", "DOMO", 0],
  ["1012800011", "C.METAL PROTECT.9CC-EXT99", "9 CIRCLE", "DOMO", 0],
  ["1012800012", "C.ENGINE FLUSH.9CC-EXT16", "9 CIRCLE", "DOMO", 180000],
  ["1012800013", "C.TRANSMISSION CARE.9CC-EXT18", "9 CIRCLE", "DOMO", 210000],
  ["1012800014", "C.RADIATOR CLEANER.9CC-EXT22", "9 CIRCLE", "DOMO", 95000],
  ["1012800015", "C.FUEL SYSTEM GUARD.9CC-EXT31", "9 CIRCLE", "DOMO", 185000],
  ["1012800016", "C.CERAMIC ENGINE SHIELD.9CC-EXT44", "9 CIRCLE", "DOMO", 340000],
  ["1012800017", "C.DIESEL PERFORMANCE KIT.9CC-EXT61", "9 CIRCLE", "DOMO", 420000],
  ["1012800018", "C.OIL TREATMENT PRO.9CC-EXT70", "9 CIRCLE", "DOMO", 195000],
] as const;

const products: Product[] = productSeed.map(
  ([sku, productName, brandName, productType, price], index) => {
    const onHand = 24 + ((index * 17) % 140);
    const reserved = index % 4 === 0 ? 4 : index % 3;
    return {
      id: index + 1,
      sku,
      productName,
      brandName,
      productCode: `PC-${sku.slice(-6)}`,
      productType,
      tags: index % 2 === 0,
      tracking: true,
      bundle: false,
      bundleFlexible: false,
      tax: "PPN",
      price,
      created_at: new Date(Date.UTC(2026, 8, 17 - index)),
      category: "Automotive care",
      unitBusiness: "Piece",
      description: `${productName} from ${brandName}, maintained in the central product catalog.`,
      inventory: {
        onHand,
        reserved,
        available: onHand - reserved,
      },
    };
  },
);

const router: IRouter = Router();

router.get("/products/filters", (_req, res) => {
  const response = GetProductFiltersResponse.parse({
    brands: [...new Set(products.map((product) => product.brandName))],
    types: [...new Set(products.map((product) => product.productType))],
    taxes: [...new Set(products.map((product) => product.tax))],
  });
  res.json(response);
});

router.get("/products", (req, res) => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid pagination parameters" });
    return;
  }

  const { page, limit, search = "", brandName = "" } = parsed.data;
  const normalizedSearch = search.toLowerCase().trim();
  const normalizedBrand = brandName.toLowerCase().trim();
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        [product.productName, product.productCode, product.sku].some((field) =>
          field.toLowerCase().includes(normalizedSearch),
        );
      const matchesBrand =
        !normalizedBrand || product.brandName.toLowerCase() === normalizedBrand;
      return matchesSearch && matchesBrand;
    })
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

  const start = (page - 1) * limit;
  const response = ListProductsResponse.parse({
    data: filteredProducts.slice(start, start + limit),
    metadata: {
      page,
      limit,
      total_count: filteredProducts.length,
    },
  });
  res.json(response);
});

router.get("/products/:id", (req, res) => {
  const parsed = GetProductParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const product = products.find((item) => item.id === parsed.data.id);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  const response = GetProductResponse.parse(product);
  res.json(response);
});

export default router;