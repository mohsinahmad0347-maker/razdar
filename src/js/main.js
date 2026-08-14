// ============================================
// RAZDAR — Main Entry Point (Lazy-loaded SPA)
// ============================================

import app from './core/app.js';
import router from './core/router.js';
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import BottomNav from './components/BottomNav.js';
import SearchOverlay from './components/SearchOverlay.js';
import Toast from './components/Toast.js';
import Modal from './components/Modal.js';
import ChatWidget from './components/ChatWidget.js';

// ── Lazy page loader helper ──
// Each page module is only downloaded when that route is first visited.
const lazy = (importFn) => async (params) => {
  const mod = await importFn();
  const render = mod.default || Object.values(mod)[0];
  return render(params);
};

// Instantiate Core Layout Components (always needed immediately)
new Navbar();
new Footer();
new BottomNav();
new SearchOverlay();
new Toast();
new Modal();
new ChatWidget();

// ── Register Routes (all pages are lazy) ──
router
  // Customer Routes
  .add('/', lazy(() => import('./pages/Home.js')))
  .add('/shop', lazy(() => import('./pages/Shop.js')))
  .add('/categories', lazy(() => import('./pages/Categories.js')))
  .add('/category/:category', async (params) => {
    const { default: render } = await import('./pages/Shop.js');
    return render({ category: params.category });
  })
  .add('/product/:id', async (params) => {
    const { default: render } = await import('./pages/ProductDetails.js');
    return render({ id: params.id });
  })
  .add('/deals', lazy(() => import('./pages/Deals.js')))
  .add('/new-arrivals', lazy(() => import('./pages/NewArrivals.js')))
  .add('/best-sellers', lazy(() => import('./pages/Shop.js')))
  .add('/coupons', lazy(() => import('./pages/Deals.js')))
  .add('/search', async (params) => {
    const { default: render } = await import('./pages/SearchResults.js');
    return render(params);
  })
  .add('/cart', lazy(() => import('./pages/Cart.js')))
  .add('/checkout', lazy(() => import('./pages/Checkout.js')))
  .add('/order-success', lazy(() => import('./pages/OrderSuccess.js')))
  .add('/login', lazy(() => import('./pages/Login.js')))
  .add('/register', lazy(() => import('./pages/Register.js')))
  .add('/forgot-password', lazy(() => import('./pages/ForgotPassword.js')))
  .add('/wishlist', lazy(() => import('./pages/Wishlist.js')))
  .add('/about', lazy(() => import('./pages/About.js')))
  .add('/contact', lazy(() => import('./pages/Contact.js')))
  .add('/faq', lazy(() => import('./pages/FAQ.js')))
  .add('/privacy-policy', lazy(() => import('./pages/PrivacyPolicy.js')))
  .add('/terms', lazy(() => import('./pages/Terms.js')))
  .add('/refund-policy', lazy(() => import('./pages/RefundPolicy.js')))

  // Customer Dashboard Routes
  .add('/dashboard', lazy(() => import('./pages/dashboard/Dashboard.js')))
  .add('/dashboard/profile', lazy(() => import('./pages/dashboard/Profile.js')))
  .add('/dashboard/orders', lazy(() => import('./pages/dashboard/Orders.js')))
  .add('/dashboard/track-order', lazy(() => import('./pages/dashboard/TrackOrder.js')))
  .add('/dashboard/addresses', lazy(() => import('./pages/dashboard/Addresses.js')))
  .add('/dashboard/reviews', async (params) => {
    const mod = await import('./pages/dashboard/Reviews.js');
    return (mod.renderCustomerReviews || mod.default)(params);
  })
  .add('/dashboard/settings', async (params) => {
    const mod = await import('./pages/dashboard/Reviews.js');
    return (mod.renderCustomerSettings || mod.default)(params);
  })

  // Seller Routes
  .add('/seller/register', lazy(() => import('./pages/seller/Register.js')))
  .add('/seller/dashboard', lazy(() => import('./pages/seller/Dashboard.js')))
  .add('/seller/store', lazy(() => import('./pages/seller/Store.js')))
  .add('/seller/products', lazy(() => import('./pages/seller/Products.js')))

  .add('/sustainability', lazy(() => import('./pages/About.js')))
  .add('/careers', lazy(() => import('./pages/About.js')))
  .add('/blog', lazy(() => import('./pages/About.js')))
  .add('/seller-policies', lazy(() => import('./pages/Terms.js')))
  .add('/fulfillment', lazy(() => import('./pages/About.js')))

  // Admin Routes
  .add('/admin/login', lazy(() => import('./pages/admin/Login.js')))
  .add('/admin/dashboard', lazy(() => import('./pages/admin/Dashboard.js')))
  .add('/admin/users', async (params) => {
    const { renderAdminUsers } = await import('./pages/admin/Users.js');
    return renderAdminUsers(params);
  })
  .add('/admin/sellers', async (params) => {
    const { renderAdminSellers } = await import('./pages/admin/Users.js');
    return renderAdminSellers(params);
  })
  .add('/admin/products', async (params) => {
    const { renderAdminProducts } = await import('./pages/admin/Products.js');
    return renderAdminProducts(params);
  })
  .add('/admin/orders', async (params) => {
    const { renderAdminOrders } = await import('./pages/admin/Products.js');
    return renderAdminOrders(params);
  })
  .add('/admin/inventory', async (params) => {
    const { renderAdminInventory } = await import('./pages/admin/Products.js');
    return renderAdminInventory(params);
  })
  .add('/admin/analytics', async (params) => {
    const { renderAdminAnalytics } = await import('./pages/admin/Products.js');
    return renderAdminAnalytics(params);
  })
  .add('/admin/coupons', async (params) => {
    const { renderAdminCoupons } = await import('./pages/admin/Products.js');
    return renderAdminCoupons(params);
  })
  .add('/admin/support', async (params) => {
    const { renderAdminSupport } = await import('./pages/admin/Products.js');
    return renderAdminSupport(params);
  })

  // 404 Route
  .add('/404', lazy(() => import('./pages/NotFound.js')));

// Boot App & Start Router
app.init();
router.start();
