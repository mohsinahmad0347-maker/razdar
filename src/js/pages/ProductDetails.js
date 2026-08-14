// ============================================
// RAZDAR — Product Details Page
// ============================================

import products from '../data/products.js';
import store from '../core/store.js';
import events from '../core/events.js';
import ProductCard from '../components/ProductCard.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export async function renderProductDetailsPage(params = {}) {
  const app = document.getElementById('app');

  const productId = params.id || 'prod-1';
  const product = products.find(p => p.id === productId) || products[0];

  store.addRecentlyViewed(product);

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  let selectedQuantity = 1;
  let selectedColor = product.colors?.[0] || null;
  let selectedSize = product.sizes?.[0] || null;

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/shop?category=${product.category}">${product.category}</a>
          <span class="separator">/</span>
          <span>${product.name}</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Main Product Section -->
        <div class="grid grid-2 gap-8 mb-12">
          <!-- Gallery -->
          <div>
            <div style="position:relative;border-radius:var(--radius-2xl);overflow:hidden;background:var(--bg-secondary);border:1px solid var(--border-primary);">
              <img id="pd-main-img" src="${product.images[0]}" alt="${product.name}" style="width:100%;aspect-ratio:1;object-fit:cover;" />
              ${product.discount ? `<span class="badge badge-danger" style="position:absolute;top:16px;left:16px;font-size:12px;">-${product.discount}% OFF</span>` : ''}
            </div>
            
            ${product.images.length > 1 ? `
              <div class="flex gap-3 mt-4 overflow-x-auto">
                ${product.images.map((img, i) => `
                  <img class="pd-thumb" src="${img}" style="width:72px;height:72px;border-radius:var(--radius-lg);cursor:pointer;object-fit:cover;border:2px solid ${i === 0 ? 'var(--primary)' : 'var(--border-primary)'};" />
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Specs & Buy Box -->
          <div>
            <div class="flex items-center gap-2 mb-2 text-xs text-tertiary text-uppercase tracking-wider">
              <span>${product.brand}</span> • <span>${product.category}</span>
            </div>
            
            <h1 style="font-size:var(--fs-3xl);margin-bottom:var(--sp-3);">${product.name}</h1>

            <div class="flex items-center gap-3 mb-4">
              <div class="stars stars-lg">${ProductCard.renderStars(product.rating)}</div>
              <span class="font-bold">${product.rating}</span>
              <span class="text-tertiary">(${product.reviewsCount} reviews)</span>
              <span class="badge badge-success">${product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-4 mb-6 p-4 rounded-xl" style="background:var(--bg-secondary);border:1px solid var(--border-primary);">
              <span style="font-family:var(--font-heading);font-size:var(--fs-4xl);font-weight:800;color:var(--primary);">${formatPrice(product.price)}</span>
              ${product.oldPrice ? `<span style="text-decoration:line-through;color:var(--text-muted);font-size:var(--fs-lg);">${formatPrice(product.oldPrice)}</span>` : ''}
              ${product.freeShipping ? `<span class="badge badge-primary">FREE SHIPPING</span>` : ''}
            </div>

            <p class="text-secondary mb-6" style="line-height:1.6;">${product.description}</p>

            <!-- Color Options -->
            ${product.colors && product.colors.length > 0 ? `
              <div class="mb-5">
                <label class="form-label mb-2">Color: <strong id="pd-color-label" class="text-primary">${selectedColor}</strong></label>
                <div class="flex gap-2">
                  ${product.colors.map((c, i) => `
                    <button class="btn btn-secondary btn-sm pd-color-btn ${i === 0 ? 'border-focus' : ''}" data-color="${c}">${c}</button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Size Options -->
            ${product.sizes && product.sizes.length > 0 ? `
              <div class="mb-6">
                <label class="form-label mb-2">Size / Variant: <strong id="pd-size-label" class="text-primary">${selectedSize}</strong></label>
                <div class="flex gap-2 flex-wrap">
                  ${product.sizes.map((s, i) => `
                    <button class="btn btn-secondary btn-sm pd-size-btn ${i === 0 ? 'border-focus' : ''}" data-size="${s}">${s}</button>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Quantity & CTA Buttons -->
            <div class="flex gap-4 mb-6">
              <div class="qty-selector">
                <button class="qty-btn" id="pd-qty-minus">-</button>
                <span class="qty-value" id="pd-qty-val">1</span>
                <button class="qty-btn" id="pd-qty-plus">+</button>
              </div>

              <button class="btn btn-cart-premium flex-1" id="pd-add-cart-btn" style="height:44px;font-size:13px;">
                ${getIcon('shoppingBag')} Add to Cart
              </button>

              <button class="btn btn-secondary btn-xl" id="pd-buy-now-btn">
                Buy Now
              </button>

              <button class="btn btn-icon btn-secondary btn-xl ${store.isInWishlist(product.id) ? 'wishlisted' : ''}" id="pd-wishlist-btn">
                ${getIcon('heart')}
              </button>
            </div>

            <!-- Seller Box -->
            <div class="card p-4 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="avatar avatar-initials">S</div>
                <div>
                  <div class="font-semibold text-sm">${product.seller.name} ${product.seller.verified ? '✓' : ''}</div>
                  <div class="text-xs text-tertiary">${product.seller.followers} Followers • ${product.seller.rating} ★ Rating</div>
                </div>
              </div>
              <a href="#/seller/store" class="btn btn-outline btn-sm">Visit Store</a>
            </div>
          </div>
        </div>

        <!-- Specifications & Reviews Tabs -->
        <div class="card mb-12 p-6">
          <div class="tabs">
            <button class="tab-btn active" data-tab="desc">Description</button>
            <button class="tab-btn" data-tab="specs">Specifications</button>
            <button class="tab-btn" data-tab="reviews">Customer Reviews (${product.reviews.length})</button>
            <button class="tab-btn" data-tab="faqs">Q & A (${product.faqs.length})</button>
          </div>

          <div class="tab-content">
            <!-- Tab 1: Description -->
            <div class="tab-pane active" id="tab-desc">
              <h3 class="mb-3">Product Overview</h3>
              <p class="text-secondary" style="line-height:1.7;">${product.description}</p>
            </div>

            <!-- Tab 2: Specs Table -->
            <div class="tab-pane" id="tab-specs">
              <h3 class="mb-4">Technical Specifications</h3>
              <div class="data-table-wrap">
                <table class="data-table">
                  <tbody>
                    ${Object.entries(product.specs || {}).map(([key, val]) => `
                      <tr>
                        <td style="font-weight:600;width:30%;color:var(--text-secondary);">${key}</td>
                        <td>${val}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tab 3: Reviews -->
            <div class="tab-pane" id="tab-reviews">
              <h3 class="mb-4">Customer Reviews</h3>
              ${product.reviews.length > 0 ? product.reviews.map(r => `
                <div class="card p-4 mb-3">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-3">
                      <img src="${r.avatar}" class="avatar avatar-sm" />
                      <div>
                        <div class="font-semibold text-sm">${r.user}</div>
                        <div class="text-xs text-tertiary">${r.date}</div>
                      </div>
                    </div>
                    <div class="stars">${ProductCard.renderStars(r.rating)}</div>
                  </div>
                  <p class="text-secondary text-sm">${r.text}</p>
                </div>
              `).join('') : '<p class="text-secondary">No reviews yet for this product. Be the first to review!</p>'}
            </div>

            <!-- Tab 4: Q&A -->
            <div class="tab-pane" id="tab-faqs">
              <h3 class="mb-4">Questions & Answers</h3>
              ${product.faqs.length > 0 ? product.faqs.map(f => `
                <div class="mb-4 p-4 rounded-xl" style="background:var(--bg-secondary);">
                  <div class="font-bold text-sm mb-1">Q: ${f.q}</div>
                  <div class="text-sm text-secondary">A: ${f.a}</div>
                </div>
              `).join('') : '<p class="text-secondary">Have a question? Ask our seller community below!</p>'}
            </div>
          </div>
        </div>

        <!-- Related Products Section -->
        ${relatedProducts.length > 0 ? `
          <div class="mt-12">
            <div class="section-header">
              <h2>Recommended For You</h2>
            </div>
            <div class="grid grid-products">
              ${relatedProducts.map(p => ProductCard.render(p)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  // Attach tab switching logic
  const tabBtns = app.querySelectorAll('.tab-btn');
  const tabPanes = app.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const pane = app.querySelector(`#tab-${btn.getAttribute('data-tab')}`);
      if (pane) pane.classList.add('active');
    });
  });

  // Quantity +/- controls
  const qtyVal = app.querySelector('#pd-qty-val');
  app.querySelector('#pd-qty-minus')?.addEventListener('click', () => {
    if (selectedQuantity > 1) {
      selectedQuantity--;
      if (qtyVal) qtyVal.textContent = selectedQuantity;
    }
  });
  app.querySelector('#pd-qty-plus')?.addEventListener('click', () => {
    selectedQuantity++;
    if (qtyVal) qtyVal.textContent = selectedQuantity;
  });

  // Add to cart
  app.querySelector('#pd-add-cart-btn')?.addEventListener('click', () => {
    store.addToCart(product, selectedQuantity, selectedColor, selectedSize);
  });

  // Buy Now
  app.querySelector('#pd-buy-now-btn')?.addEventListener('click', () => {
    store.addToCart(product, selectedQuantity, selectedColor, selectedSize);
    window.location.hash = '#/checkout';
  });

  // Wishlist
  app.querySelector('#pd-wishlist-btn')?.addEventListener('click', (e) => {
    store.toggleWishlist(product);
    e.currentTarget.classList.toggle('wishlisted', store.isInWishlist(product.id));
  });

  ProductCard.attachEvents(app, products);
}

export default renderProductDetailsPage;
