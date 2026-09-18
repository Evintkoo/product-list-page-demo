import { useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Archive,
  BarChart3,
  Bell,
  Box,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ClipboardList,
  FileBarChart,
  Filter,
  Grid2X2,
  LayoutDashboard,
  Menu,
  PackagePlus,
  PanelTop,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  SlidersHorizontal,
  Tag,
  Truck,
  Users,
  X,
} from 'lucide-react';
import {
  getGetProductFiltersQueryKey,
  getGetProductQueryKey,
  getHealthCheckLegacyQueryKey,
  getHealthCheckQueryKey,
  getListProductsQueryKey,
  useGetProduct,
  useGetProductFilters,
  useHealthCheck,
  useHealthCheckLegacy,
  useListProducts,
} from '@workspace/api-client-react';
import type { ListProductsParams, Product, ProductDetail } from '@workspace/api-client-react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type IconType = typeof Grid2X2;

const modules: { label: string; href: string; icon: IconType }[] = [
  { label: 'Dashboard', href: '/dashboard', icon: Grid2X2 },
  { label: 'Sales', href: '/reports', icon: BarChart3 },
  { label: 'Customers', href: '/reports', icon: Users },
  { label: 'Suppliers', href: '/reports', icon: Truck },
  { label: 'Products', href: '/products', icon: Box },
  { label: 'Inventory', href: '/reports', icon: Archive },
  { label: 'Finance', href: '/reports', icon: FileBarChart },
  { label: 'Accounting', href: '/reports', icon: ClipboardList },
  { label: 'Reports', href: '/reports', icon: FileBarChart },
  { label: 'Setup', href: '/reports', icon: Settings2 },
  { label: 'User Guide', href: '/reports', icon: PanelTop },
];

const subnav = [
  { label: 'Products', href: '/products' },
  { label: 'Pricebooks', href: '/reports' },
  { label: 'Vouchers', href: '/reports' },
  { label: 'Pricelists', href: '/reports' },
  { label: 'Price Schedules', href: '/reports' },
  { label: 'Price Trackings', href: '/reports' },
  { label: 'Types', href: '/reports' },
  { label: 'Product Brands', href: '/reports' },
  { label: 'Tags', href: '/reports' },
];

function Shell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const health = useHealthCheck({ query: { queryKey: getHealthCheckQueryKey(), staleTime: 60000 } });
  const legacyHealth = useHealthCheckLegacy({ query: { queryKey: getHealthCheckLegacyQueryKey(), staleTime: 60000 } });
  const healthy = health.data?.status === 'ok' || legacyHealth.data?.status === 'ok';

  return (
    <div className="catalog-shell">
      <header>
        <div className="topbar">
          <button className="btn btn-ghost mobile-menu" data-testid="button-toggle-menu" aria-label="Toggle navigation" onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link href="/products" className="brand-mark" data-testid="link-brand-home" aria-label="Product catalog home" />
          <nav className={`module-nav ${mobileOpen ? 'mobile-visible' : ''}`} aria-label="Main navigation">
            {modules.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} className={`module-link ${label === 'Products' && location.startsWith('/products') ? 'active' : ''}`} data-testid={`link-module-${label.toLowerCase()}`}>
                <Icon size={13} strokeWidth={1.8} /><span>{label}</span>
              </Link>
            ))}
          </nav>
          <div className="top-actions">
            <button className="btn btn-quiet" data-testid="button-global-search" aria-label="Open global search"><Search size={14} /><span className="hidden sm:inline">Ctrl K</span></button>
            <button className="btn btn-ghost" data-testid="button-notifications" aria-label="Notifications"><Bell size={15} /></button>
            <div className="flex items-center gap-2 rounded-full bg-[#f4f5f7] py-1 pl-1 pr-3" data-testid="profile-summary">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#d8dcfc] text-[10px] font-bold text-[#4a54c4]">S</span>
              <span className="hidden text-[10px] font-semibold text-[#3b404b] sm:block">SPV<br /><small className="font-normal text-[#9297a1]">DEMO</small></span>
              <ChevronDown size={11} className="text-[#9297a1]" />
            </div>
          </div>
        </div>
        <div className="subbar" aria-label="Product submenu">
          {subnav.map((item) => (
            <Link key={item.label} href={item.href} className={`sub-link ${item.label === 'Products' && location.startsWith('/products') ? 'active' : ''}`} data-testid={`link-subnav-${item.label.toLowerCase().replaceAll(' ', '-')}`}>
              {item.label}{['Products', 'Pricebooks', 'Vouchers', 'Price Trackings', 'Types', 'Tags'].includes(item.label) && <ChevronDown size={10} className="ml-1 inline" />}
            </Link>
          ))}
        </div>
      </header>
      <div className="status-line mx-6 mt-3 justify-end sm:mx-8" data-testid="status-api">
        <span className={`status-dot ${healthy ? '' : 'bg-[#d3a03d]'}`} /> {healthy ? 'Catalog services connected' : 'Connecting to catalog services'}
      </div>
      {children}
    </div>
  );
}

function Catalog() {
  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [page, setPage] = useState(1);
  const limit = 20;
  const params = useMemo<ListProductsParams>(() => ({ page, limit, ...(submittedSearch ? { search: submittedSearch } : {}), ...(brand ? { brandName: brand } : {}) }), [page, limit, submittedSearch, brand]);
  const productsQuery = useListProducts(params, { query: { queryKey: getListProductsQueryKey(params), placeholderData: (previous) => previous } });
  const filtersQuery = useGetProductFilters({ query: { queryKey: getGetProductFiltersQueryKey(), staleTime: 300000 } });
  const response = productsQuery.data;
  const products = response?.data ?? [];
  const total = response?.metadata.total_count ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / limit));
  const runSearch = (event: React.FormEvent) => { event.preventDefault(); setPage(1); setSubmittedSearch(search.trim()); };

  return (
    <main className="page-wrap">
      <div className="page-heading">
        <div>
          <div className="page-title"><span className="title-icon"><Tag size={16} /></span><h1>Products</h1><span className="muted text-xs">☆</span></div>
          <p className="mt-2 text-[11px] text-[#9297a1]" data-testid="text-catalog-summary">{total ? `${total.toLocaleString()} catalog records` : 'Catalog workspace'}</p>
        </div>
        <Link href="/products/add" className="btn btn-primary" data-testid="link-add-product"><Plus size={14} /> New Product</Link>
      </div>
      <form className="filter-panel" onSubmit={runSearch} data-testid="form-product-filters">
        <div className="filter-control filter-search"><Search size={14} className="text-[#9297a1]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products" data-testid="input-product-search" /></div>
        <select value={brand} onChange={(event) => { setBrand(event.target.value); setPage(1); }} className="filter-control" data-testid="select-brand-filter" aria-label="Product brand">
          <option value="">Product Brand</option>{(filtersQuery.data?.brands ?? []).map((item) => <option value={item} key={item}>{item}</option>)}
        </select>
        <select className="filter-control" data-testid="select-product-type" aria-label="Product type"><option>Product Type</option>{(filtersQuery.data?.types ?? []).map((item) => <option value={item} key={item}>{item}</option>)}</select>
        <select className="filter-control" data-testid="select-tax" aria-label="Tax"><option>Tax</option>{(filtersQuery.data?.taxes ?? []).map((item) => <option value={item} key={item}>{item}</option>)}</select>
        <button type="submit" className="btn btn-primary h-[30px]" data-testid="button-search-products"><Search size={13} /> Search</button>
        {(submittedSearch || brand) && <button type="button" className="btn btn-ghost h-[30px]" onClick={() => { setSearch(''); setSubmittedSearch(''); setBrand(''); setPage(1); }} data-testid="button-clear-filters"><X size={13} /> Clear</button>}
      </form>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] text-[#9297a1]" data-testid="text-page-position">Page {page} of {pageCount}</span>
        <button className="btn btn-ghost h-[28px]" data-testid="button-more-filters"><SlidersHorizontal size={13} /> More filters</button>
      </div>
      <ProductTable loading={productsQuery.isLoading} error={productsQuery.isError} products={products} onRetry={() => productsQuery.refetch()} />
      <div className="pagination mt-3 rounded-lg border border-[#ebedf1] bg-white" data-testid="pagination-products">
        <button className="page-button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} data-testid="button-previous-page"><ChevronLeft size={14} /></button>
        {Array.from({ length: Math.min(pageCount, 6) }, (_, index) => index + 1).map((value) => <button key={value} className={`page-button ${value === page ? 'current' : ''}`} onClick={() => setPage(value)} data-testid={`button-page-${value}`}>{value}</button>)}
        {pageCount > 6 && <span className="px-1 text-xs text-[#9297a1]">…</span>}
        <button className="page-button" disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)} data-testid="button-next-page"><ChevronRight size={14} /></button>
        <span className="ml-3 hidden text-[11px] text-[#9297a1] sm:inline">{total ? `${((page - 1) * limit) + 1}–${Math.min(page * limit, total)} of ${total}` : 'No records'}</span>
      </div>
    </main>
  );
}

function ProductTable({ loading, error, products, onRetry }: { loading: boolean; error: boolean; products: Product[]; onRetry: () => void }) {
  if (loading) return <div className="table-card p-3" data-testid="state-products-loading">{Array.from({ length: 9 }, (_, index) => <div key={index} className="skeleton mb-2 h-8 rounded-md" />)}</div>;
  if (error) return <div className="table-card empty-state" data-testid="state-products-error"><div><div className="empty-icon"><Archive size={19} /></div><h2 className="text-sm font-bold">Product list unavailable</h2><p className="mb-4 mt-1 text-xs text-[#9297a1]">The catalog service did not respond. Try again.</p><button className="btn btn-primary" onClick={onRetry} data-testid="button-retry-products">Retry connection</button></div></div>;
  if (!products.length) return <div className="table-card empty-state" data-testid="state-products-empty"><div><div className="empty-icon"><Search size={19} /></div><h2 className="text-sm font-bold">No products found</h2><p className="mt-1 text-xs text-[#9297a1]">Try a different search term or clear the brand filter.</p></div></div>;
  return <div className="table-card table-scroll" data-testid="table-products"><table className="product-table"><thead><tr><th>SKU</th><th>Name</th><th>Product Code</th><th>Brand</th><th>Type</th><th>Tags</th><th>Tracking</th><th>Bundle</th><th>Bundle Flexible</th><th>Tax</th><th className="text-right">Price (Rp)</th></tr></thead><tbody>{products.map((product) => <tr key={product.id} data-testid={`row-product-${product.id}`}><td><Link href={`/products/${product.id}`} className="sku" data-testid={`link-product-sku-${product.id}`}>{product.sku}</Link></td><td className="max-w-[310px] overflow-hidden text-ellipsis"><Link href={`/products/${product.id}`} className="product-link" data-testid={`link-product-name-${product.id}`}>{product.productName}</Link></td><td>{product.productCode}</td><td>{product.brandName}</td><td>{product.productType}</td><td><Bool value={product.tags} /></td><td><Bool value={product.tracking} /></td><td><Bool value={product.bundle} /></td><td><Bool value={product.bundleFlexible} /></td><td>{product.tax}</td><td className="price">{product.price.toLocaleString('id-ID')}</td></tr>)}</tbody></table></div>;
}

function Bool({ value }: { value: boolean }) { return <span className={`bool ${value ? 'yes' : 'no'}`} aria-label={value ? 'Yes' : 'No'}>{value ? '✓' : '×'}</span>; }

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const query = useGetProduct(productId, { query: { enabled: Number.isFinite(productId), queryKey: getGetProductQueryKey(productId) } });
  const product = query.data as ProductDetail | undefined;
  return <main className="page-wrap">
    <div className="breadcrumb"><Link href="/products" data-testid="link-detail-breadcrumb">Products</Link><ChevronRight size={12} /> {product?.productName ?? 'Product detail'}</div>
    {query.isLoading && <div className="detail-grid" data-testid="state-detail-loading"><div className="detail-card h-72"><div className="skeleton h-5 w-48 rounded mb-6" /><div className="grid grid-cols-2 gap-5">{Array.from({ length: 8 }, (_, index) => <div key={index} className="skeleton h-8 rounded" />)}</div></div><div className="detail-card h-72"><div className="skeleton h-5 w-32 rounded mb-6" /><div className="skeleton h-24 rounded" /></div></div>}
    {query.isError && <div className="placeholder-card" data-testid="state-detail-error"><div><div className="empty-icon"><Archive size={19} /></div><h2 className="text-sm font-bold">Product detail unavailable</h2><button className="btn btn-primary mt-4" onClick={() => query.refetch()} data-testid="button-retry-detail">Retry connection</button></div></div>}
    {product && <><div className="detail-header"><div><div className="eyebrow">PRODUCT RECORD / {product.productCode}</div><h1 className="mt-2 text-2xl font-bold tracking-tight" data-testid="text-detail-name">{product.productName}</h1><p className="mt-1 text-xs text-[#9297a1]">{product.brandName} · {product.productType} · SKU {product.sku}</p></div><Link href="/products" className="btn btn-quiet" data-testid="link-back-catalog"><ChevronLeft size={14} /> Back to catalog</Link></div><div className="detail-grid"><section className="detail-card"><h2>Product information</h2><div className="detail-fields"><Field label="SKU" value={product.sku} mono /><Field label="Product code" value={product.productCode} /><Field label="Brand" value={product.brandName} /><Field label="Category" value={product.category} /><Field label="Product type" value={product.productType} /><Field label="Business unit" value={product.unitBusiness} /><Field label="Tax" value={product.tax} /><Field label="Price" value={`Rp ${product.price.toLocaleString('id-ID')}`} mono /></div><div className="mt-6 border-t border-[#edf0f3] pt-5"><div className="field-label">Description</div><p className="text-xs leading-5 text-[#606671]" data-testid="text-detail-description">{product.description || 'No description recorded for this product.'}</p></div></section><section className="detail-card"><h2>Inventory position</h2><div className="inventory-grid"><Inventory label="On hand" value={product.inventory.onHand} testId="on-hand" /><Inventory label="Reserved" value={product.inventory.reserved} testId="reserved" /><Inventory label="Available" value={product.inventory.available} testId="available" /></div><div className="mt-7 border-t border-[#edf0f3] pt-5"><div className="field-label">Catalog settings</div><div className="mt-3 flex flex-wrap gap-2"><Setting label="Tags" value={product.tags} /><Setting label="Tracking" value={product.tracking} /><Setting label="Bundle" value={product.bundle} /><Setting label="Flexible bundle" value={product.bundleFlexible} /></div></div></section></div></>}
  </main>;
}

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) { return <div><div className="field-label">{label}</div><div className={`field-value ${mono ? 'font-mono text-[11px]' : ''}`}>{value || '—'}</div></div>; }
function Inventory({ label, value, testId }: { label: string; value: number; testId: string }) { return <div className="inventory-cell" data-testid={`inventory-${testId}`}><div className="inventory-number">{value.toLocaleString()}</div><div className="inventory-label">{label}</div></div>; }
function Setting({ label, value }: { label: string; value: boolean }) { return <div className="flex items-center gap-2 rounded-md bg-[#f7f8fa] px-2 py-1.5 text-[10px] text-[#6b707b]"><Bool value={value} />{label}</div>; }

function AddProductPage() {
  const [saved, setSaved] = useState(false);
  return <main className="page-wrap"><div className="breadcrumb"><Link href="/products" data-testid="link-add-breadcrumb">Products</Link><ChevronRight size={12} /> New product</div><div className="page-heading"><div><div className="eyebrow">CATALOG INTAKE</div><h1 className="mt-2 text-2xl font-bold">Add product</h1><p className="mt-1 text-xs text-[#9297a1]">Create a clean product record for the operations catalog.</p></div><Link href="/products" className="btn btn-quiet" data-testid="link-cancel-add">Cancel</Link></div><form className="detail-card max-w-3xl" onSubmit={(event) => { event.preventDefault(); setSaved(true); }} data-testid="form-add-product"><div className="grid gap-5 sm:grid-cols-2"><label><div className="field-label">Product name</div><input required className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-name" /></label><label><div className="field-label">SKU</div><input required className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-sku" /></label><label><div className="field-label">Brand</div><input className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-brand" /></label><label><div className="field-label">Product type</div><input className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-type" /></label><label><div className="field-label">Product code</div><input className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-code" /></label><label><div className="field-label">Price (Rp)</div><input type="number" min="0" className="filter-control w-full border border-[#e7e9ee] bg-[#fafafb]" data-testid="input-new-product-price" /></label></div><div className="mt-6 flex items-center gap-3"><button className="btn btn-primary" type="submit" data-testid="button-save-new-product"><PackagePlus size={14} /> Save product</button>{saved && <span className="text-xs text-[#1fa971]" data-testid="status-add-product">Draft captured locally. Connect the create endpoint to publish.</span>}</div></form></main>;
}

function Destination({ title, kicker, icon: Icon, copy }: { title: string; kicker: string; icon: IconType; copy: string }) {
  return <main className="page-wrap"><div className="eyebrow">{kicker}</div><h1 className="mt-2 text-2xl font-bold" data-testid={`text-${title.toLowerCase().replaceAll(' ', '-')}-title`}>{title}</h1><div className="placeholder-card mt-6"><div><div className="empty-icon"><Icon size={20} /></div><h2 className="text-sm font-bold">{title} is ready for its workspace</h2><p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-[#9297a1]" data-testid={`text-${title.toLowerCase().replaceAll(' ', '-')}-placeholder`}>{copy}</p><Link href="/products" className="btn btn-primary mt-5" data-testid={`link-${title.toLowerCase().replaceAll(' ', '-')}-catalog`}>Return to catalog</Link></div></div></main>;
}

function Router() {
  return <ErrorBoundary><Shell><Switch><Route path="/" component={Catalog} /><Route path="/products" component={Catalog} /><Route path="/products/add" component={AddProductPage} /><Route path="/products/:id" component={ProductDetailPage} /><Route path="/service-products" component={() => <Destination title="Service products" kicker="PRODUCT SERVICES" icon={ShoppingBag} copy="Service items will live here, separate from stocked inventory and physical product records." />} /><Route path="/dashboard" component={() => <Destination title="Dashboard" kicker="OPERATIONS OVERVIEW" icon={LayoutDashboard} copy="Your operational pulse will appear here once dashboard metrics are connected." />} /><Route path="/reports" component={() => <Destination title="Reports" kicker="REPORTING" icon={FileBarChart} copy="Saved catalog, inventory, and pricing reports will be available here." />} /><Route component={NotFound} /></Switch></Shell></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><Router /><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;