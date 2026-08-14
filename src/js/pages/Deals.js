// ============================================
// RAZDAR — Deals & Flash Sales Page
// ============================================

import products from '../data/products.js';
import coupons from '../data/coupons.js';
import ProductCard from '../components/ProductCard.js';
import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export async function renderDealsPage() {
  const app = document.getElementById('app');

  const dealProducts = products.filter(p => p.discount > 0);

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Exclusive Deals & Flash Sales</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Deals</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Coupon Cards Section -->
        <h2 class="mb-6">Active Discount Coupons</h2>
        <div class="grid grid-2 gap-4 mb-12">
          ${coupons.map(c => `
            <div class="coupon-card">
              <div class="coupon-left">
                <div class="coupon-discount">${c.discount}</div>
                <div class="text-xs text-secondary mt-1">Min order $${c.minOrder}</div>
              </div>
              <div class="coupon-right">
                <div class="font-bold text-base mb-1">${c.description}</div>
                <div class="text-xs text-tertiary mb-3">Expires: ${c.expiry}</div>
                <button class="coupon-code copy-coupon-btn" data-code="${c.code}">
                  <span>Code: ${c.code}</span>
                  ${getIcon('tag')}
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Flash Sale Products -->
        <h2 class="mb-6">Mega Discounts & Clearance</h2>
        <div class="grid grid-products">
          ${dealProducts.map(p => ProductCard.render(p)).join('')}
        </div>
      </div>
    </div>
  `;

  app.querySelectorAll('.copy-coupon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code');
      navigator.clipboard.writeText(code);
      events.emit('toast:show', {
        type: 'success',
        title: 'Coupon Copied!',
        message: `Coupon code "${code}" copied to clipboard.`
      });
    });
  });

  ProductCard.attachEvents(app, products);
}

export default renderDealsPage;
