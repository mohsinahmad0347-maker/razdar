// ============================================
// RAZDAR — Home Page
// ============================================

import HeroCarousel from '../components/HeroCarousel.js';
import CategoryCard from '../components/CategoryCard.js';
import ProductCard from '../components/ProductCard.js';
import categories from '../data/categories.js';
import products from '../data/products.js';
import { getIcon } from '../utils/icons.js';
import router from '../core/router.js';

export async function renderHomePage() {
  const app = document.getElementById('app');

  const trendingProducts = products.filter(p => p.isTrending);
  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNewArrival);

  app.innerHTML = `
    <!-- Hero Carousel Section -->
    <div id="hero-carousel-wrap"></div>

    <!-- Featured Categories Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Top Categories</h2>
          <a href="#/categories" class="view-all">View All Categories ${getIcon('chevronRight')}</a>
        </div>
        <div class="grid grid-categories">
          ${categories.slice(0, 12).map(cat => CategoryCard.render(cat)).join('')}
        </div>
      </div>
    </section>

    <!-- Flash Sale Section with Countdown -->
    <section class="section" style="background:var(--bg-secondary);border-block:1px solid var(--border-primary);">
      <div class="container">
        <div class="section-header flash-sale-header">
          <div class="flex items-center gap-3">
            <h2 style="color:var(--primary);">${getIcon('zap')} Flash Sale</h2>
            <div class="countdown" id="home-flash-countdown">
              <div class="countdown-item">
                <div class="countdown-value" id="cd-hours">08</div>
                <div class="countdown-label">Hours</div>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-item">
                <div class="countdown-value" id="cd-mins">45</div>
                <div class="countdown-label">Mins</div>
              </div>
              <span class="countdown-sep">:</span>
              <div class="countdown-item">
                <div class="countdown-value" id="cd-secs">30</div>
                <div class="countdown-label">Secs</div>
              </div>
            </div>
          </div>
          <a href="#/deals" class="view-all">See All Deals ${getIcon('chevronRight')}</a>
        </div>
        
        <div class="grid grid-products" id="flash-products-grid">
          ${flashSaleProducts.slice(0, 4).map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Trending Products</h2>
          <a href="#/shop?sort=trending" class="view-all">Explore Trending ${getIcon('chevronRight')}</a>
        </div>
        <div class="grid grid-products" id="trending-products-grid">
          ${trendingProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Promo Banner Section -->
    <section class="section-sm">
      <div class="container">
        <div class="card-glass p-8 flex flex-between flex-wrap gap-6" style="background:linear-gradient(135deg, var(--graphite-800), var(--graphite-900));border:1px solid var(--primary-muted);">
          <div>
            <span class="badge badge-primary mb-2">LIMITED TIME</span>
            <h2 style="font-size:var(--fs-3xl);color:#fff;margin-bottom:var(--sp-2);">Upgrade Your Tech Ecosystem</h2>
            <p style="color:var(--text-secondary);max-width:480px;">Save up to $300 on flagship laptops, smartphones and active noise canceling headsets.</p>
          </div>
          <a href="#/shop?category=electronics" class="btn btn-primary btn-xl">
            Explore Offers ${getIcon('chevronRight')}
          </a>
        </div>
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Best Sellers</h2>
          <a href="#/shop?sort=best-seller" class="view-all">View All ${getIcon('chevronRight')}</a>
        </div>
        <div class="grid grid-products" id="bestseller-products-grid">
          ${bestSellers.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section" style="background:var(--bg-secondary);">
      <div class="container">
        <div class="section-header">
          <h2>New Arrivals</h2>
          <a href="#/new-arrivals" class="view-all">Discover New ${getIcon('chevronRight')}</a>
        </div>
        <div class="grid grid-products" id="newarrivals-products-grid">
          ${newArrivals.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Value Propositions -->
    <section class="section-sm" style="border-top:1px solid var(--border-primary);">
      <div class="container">
        <div class="grid grid-4 text-center">
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${getIcon('truck')}</div>
            <h4 style="font-size:16px;">Fast Global Shipping</h4>
            <p class="text-xs text-secondary">Free delivery on orders over $50 worldwide.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${getIcon('shieldCheck')}</div>
            <h4 style="font-size:16px;">100% Secure Checkout</h4>
            <p class="text-xs text-secondary">256-bit SSL encrypted safe payments.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${getIcon('repeat')}</div>
            <h4 style="font-size:16px;">30-Day Money Back</h4>
            <p class="text-xs text-secondary">Hassle-free 30 days return and exchange policy.</p>
          </div>
          <div class="card p-6 flex flex-col items-center gap-3">
            <div class="category-card-icon">${getIcon('sparkles')}</div>
            <h4 style="font-size:16px;">24/7 Dedicated Support</h4>
            <p class="text-xs text-secondary">Instant assistance via live chat and email support.</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Mount Hero Carousel
  const heroWrap = document.getElementById('hero-carousel-wrap');
  if (heroWrap) {
    const hero = new HeroCarousel('hero-carousel-wrap');
    hero.render();
    // Destroy the rAF loop when navigating away from home
    router.onLeave(() => hero.destroy());
  }

  // Attach card event listeners
  ProductCard.attachEvents(app, products);

  // Countdown timer logic
  initCountdownTimer();
}

function initCountdownTimer() {
  let seconds = 8 * 3600 + 45 * 60 + 30;
  const interval = setInterval(() => {
    seconds--;
    if (seconds <= 0) {
      clearInterval(interval);
      return;
    }
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    const elH = document.getElementById('cd-hours');
    const elM = document.getElementById('cd-mins');
    const elS = document.getElementById('cd-secs');

    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
  }, 1000);
}

export default renderHomePage;
