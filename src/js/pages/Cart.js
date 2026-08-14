// ============================================
// RAZDAR — Cart Page
// ============================================

import store from '../core/store.js';
import events from '../core/events.js';
import coupons from '../data/coupons.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export async function renderCartPage() {
  const app = document.getElementById('app');

  const cart = store.getCart();
  const subtotal = store.getCartSubtotal();

  let appliedCoupon = null;
  let discountAmount = 0;
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Shopping Cart</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Cart</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        ${cart.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${getIcon('shoppingBag')}</div>
            <h3>Your Shopping Cart is Empty</h3>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <a href="#/shop" class="btn btn-primary btn-lg mt-4">Start Shopping</a>
          </div>
        ` : `
          <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--sp-8);">
            <!-- Cart Items List -->
            <div>
              <div class="data-table-wrap mb-6">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${cart.map(item => `
                      <tr data-cart-id="${item.id}" data-color="${item.color || ''}" data-size="${item.size || ''}">
                        <td>
                          <div class="flex items-center gap-3">
                            <img src="${item.images[0]}" style="width:60px;height:60px;border-radius:var(--radius-lg);object-fit:cover;" />
                            <div>
                              <a href="#/product/${item.id}" class="font-semibold text-sm link">${item.name}</a>
                              <div class="text-xs text-tertiary">
                                ${item.color ? `Color: ${item.color}` : ''} ${item.size ? `• Size: ${item.size}` : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="font-semibold">${formatPrice(item.price)}</td>
                        <td>
                          <div class="qty-selector">
                            <button class="qty-btn cart-qty-btn" data-change="-1">-</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button class="qty-btn cart-qty-btn" data-change="1">+</button>
                          </div>
                        </td>
                        <td class="font-bold text-lime">${formatPrice(item.price * item.quantity)}</td>
                        <td>
                          <button class="btn-icon btn-ghost cart-remove-btn" title="Remove Item" style="color:var(--danger);">
                            ${getIcon('trash')}
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div class="flex flex-between">
                <a href="#/shop" class="btn btn-secondary">
                  ${getIcon('chevronLeft')} Continue Shopping
                </a>
                <button class="btn btn-ghost" id="cart-clear-btn" style="color:var(--danger);">
                  Clear Cart
                </button>
              </div>
            </div>

            <!-- Order Summary Sidebar -->
            <div>
              <div class="card p-6">
                <h3 class="mb-4" style="font-size:18px;">Order Summary</h3>
                
                <!-- Coupon input -->
                <div class="form-group mb-4">
                  <label class="form-label">Have a Coupon?</label>
                  <div class="flex gap-2">
                    <input type="text" id="coupon-code-input" class="form-input" placeholder="e.g. NEWUSER20" />
                    <button class="btn btn-outline" id="coupon-apply-btn">Apply</button>
                  </div>
                </div>

                <div class="divider mb-4"></div>

                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Subtotal</span>
                  <span>${formatPrice(subtotal)}</span>
                </div>
                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Estimated Shipping</span>
                  <span>${shippingFee === 0 ? '<strong class="text-success">FREE</strong>' : formatPrice(shippingFee)}</span>
                </div>
                <div class="flex flex-between mb-2 text-sm text-secondary">
                  <span>Estimated Tax (8%)</span>
                  <span>${formatPrice(tax)}</span>
                </div>

                <div class="divider my-4"></div>

                <div class="flex flex-between mb-6">
                  <span class="font-bold text-lg">Grand Total</span>
                  <span class="font-bold text-2xl text-lime">${formatPrice(grandTotal)}</span>
                </div>

                <a href="#/checkout" class="btn btn-primary btn-xl btn-full mb-3">
                  Proceed to Checkout ${getIcon('chevronRight')}
                </a>

                <p class="text-xs text-tertiary text-center">
                  🔒 256-bit SSL encrypted safe checkout
                </p>
              </div>
            </div>
          </div>
        `}
      </div>
    </div>
  `;

  // Attach event handlers for cart table
  app.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-cart-id]');
    if (!row) return;

    const id = row.getAttribute('data-cart-id');
    const color = row.getAttribute('data-color') || null;
    const size = row.getAttribute('data-size') || null;

    const qtyBtn = e.target.closest('.cart-qty-btn');
    if (qtyBtn) {
      const change = parseInt(qtyBtn.getAttribute('data-change'), 10);
      const item = cart.find(i => i.id === id && (i.color || '') === (color || '') && (i.size || '') === (size || ''));
      if (item) {
        store.updateCartQuantity(id, item.quantity + change, color, size);
        renderCartPage();
      }
      return;
    }

    const removeBtn = e.target.closest('.cart-remove-btn');
    if (removeBtn) {
      store.removeFromCart(id, color, size);
      renderCartPage();
      return;
    }
  });

  app.querySelector('#cart-clear-btn')?.addEventListener('click', () => {
    store.clearCart();
    renderCartPage();
  });
}

export default renderCartPage;
