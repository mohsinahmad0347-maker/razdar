// ============================================
// RAZDAR — Main Entry Point
// ============================================

import app    from './core/app.js';
import router from './core/router.js';
import Navbar       from './components/Navbar.js';
import Footer       from './components/Footer.js';
import BottomNav    from './components/BottomNav.js';
import SearchOverlay from './components/SearchOverlay.js';
import Toast        from './components/Toast.js';
import Modal        from './components/Modal.js';
import ChatWidget   from './components/ChatWidget.js';

// ── Layout components (needed on every page) ──
new Navbar();
new Footer();
new BottomNav();
new SearchOverlay();
new Toast();
new Modal();
new ChatWidget();

// ── Lazy helper ──
const lazy = (fn) => async (params) => {
  const mod = await fn();
  const render = mod.default ?? Object.values(mod).find(v => typeof v === 'function');
  return render(params);
};

// ── Routes ──
router
  .add('/', lazy(() => import('./pages/Home.js')))
  .add('/shop', lazy(() => import('./pages/Shop.js')))
  .add('/categories', lazy(() => import('./pages/Categories.js')))
  .add('/category/:category', async (p) => {
    const {default:r} = await import('./pages/Shop.js'); return r(p);
  })
  .add('/product/:id', async (p) => {
    const {default:r} = await import('./pages/ProductDetails.js'); return r(p);
  })
  .add('/deals',        lazy(() => import('./pages/Deals.js')))
  .add('/new-arrivals', lazy(() => import('./pages/NewArrivals.js')))
  .add('/best-sellers', lazy(() => import('./pages/Shop.js')))
  .add('/coupons',      lazy(() => import('./pages/Deals.js')))
  .add('/search', async (p) => {
    const {default:r} = await import('./pages/SearchResults.js'); return r(p);
  })
  .add('/cart',           lazy(() => import('./pages/Cart.js')))
  .add('/checkout',       lazy(() => import('./pages/Checkout.js')))
  .add('/order-success',  lazy(() => import('./pages/OrderSuccess.js')))
  .add('/login',          lazy(() => import('./pages/Login.js')))
  .add('/register',       lazy(() => import('./pages/Register.js')))
  .add('/forgot-password',lazy(() => import('./pages/ForgotPassword.js')))
  .add('/wishlist',       lazy(() => import('./pages/Wishlist.js')))
  .add('/about',          lazy(() => import('./pages/About.js')))
  .add('/contact',        lazy(() => import('./pages/Contact.js')))
  .add('/faq',            lazy(() => import('./pages/FAQ.js')))
  .add('/privacy-policy', lazy(() => import('./pages/PrivacyPolicy.js')))
  .add('/terms',          lazy(() => import('./pages/Terms.js')))
  .add('/refund-policy',  lazy(() => import('./pages/RefundPolicy.js')))
  .add('/sustainability', lazy(() => import('./pages/About.js')))
  .add('/careers',        lazy(() => import('./pages/About.js')))
  .add('/blog',           lazy(() => import('./pages/About.js')))
  .add('/seller-policies',lazy(() => import('./pages/Terms.js')))
  .add('/fulfillment',    lazy(() => import('./pages/About.js')))

  // Dashboard
  .add('/dashboard',              lazy(() => import('./pages/dashboard/Dashboard.js')))
  .add('/dashboard/profile',      lazy(() => import('./pages/dashboard/Profile.js')))
  .add('/dashboard/orders',       lazy(() => import('./pages/dashboard/Orders.js')))
  .add('/dashboard/track-order',  lazy(() => import('./pages/dashboard/TrackOrder.js')))
  .add('/dashboard/addresses',    lazy(() => import('./pages/dashboard/Addresses.js')))
  .add('/dashboard/reviews', async (p) => {
    const m = await import('./pages/dashboard/Reviews.js');
    return (m.renderCustomerReviews ?? m.default)(p);
  })
  .add('/dashboard/settings', async (p) => {
    const m = await import('./pages/dashboard/Reviews.js');
    return (m.renderCustomerSettings ?? m.default)(p);
  })

  // Seller
  .add('/seller/register',  lazy(() => import('./pages/seller/Register.js')))
  .add('/seller/dashboard', lazy(() => import('./pages/seller/Dashboard.js')))
  .add('/seller/store',     lazy(() => import('./pages/seller/Store.js')))
  .add('/seller/products',  lazy(() => import('./pages/seller/Products.js')))

  // Admin
  .add('/admin/login',      lazy(() => import('./pages/admin/Login.js')))
  .add('/admin/dashboard',  lazy(() => import('./pages/admin/Dashboard.js')))
  .add('/admin/users', async (p) => {
    const {renderAdminUsers} = await import('./pages/admin/Users.js'); return renderAdminUsers(p);
  })
  .add('/admin/sellers', async (p) => {
    const {renderAdminSellers} = await import('./pages/admin/Users.js'); return renderAdminSellers(p);
  })
  .add('/admin/products', async (p) => {
    const {renderAdminProducts} = await import('./pages/admin/Products.js'); return renderAdminProducts(p);
  })
  .add('/admin/orders', async (p) => {
    const {renderAdminOrders} = await import('./pages/admin/Products.js'); return renderAdminOrders(p);
  })
  .add('/admin/inventory', async (p) => {
    const {renderAdminInventory} = await import('./pages/admin/Products.js'); return renderAdminInventory(p);
  })
  .add('/admin/analytics', async (p) => {
    const {renderAdminAnalytics} = await import('./pages/admin/Products.js'); return renderAdminAnalytics(p);
  })
  .add('/admin/coupons', async (p) => {
    const {renderAdminCoupons} = await import('./pages/admin/Products.js'); return renderAdminCoupons(p);
  })
  .add('/admin/support', async (p) => {
    const {renderAdminSupport} = await import('./pages/admin/Products.js'); return renderAdminSupport(p);
  })
  .add('/404', lazy(() => import('./pages/NotFound.js')));

// ── Boot ──
app.init();
router.start();  // Start immediately — no waiting for loader

// Tell the loader it can hide (if it hasn't already)
if (typeof window.__razdarHideLoader === 'function') {
  window.__razdarHideLoader();
}
