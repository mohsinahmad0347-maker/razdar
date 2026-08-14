// ============================================
// RAZDAR — Multi-Step Checkout Page
// ============================================

import store from '../core/store.js';
import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export async function renderCheckoutPage() {
  const app = document.getElementById('app');

  const cart = store.getCart();
  if (cart.length === 0) {
    window.location.hash = '#/cart';
    return;
  }

  const subtotal = store.getCartSubtotal();
  const tax = subtotal * 0.08;
  const shippingFee = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shippingFee;

  let currentStep = 1;

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Checkout</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/cart">Cart</a>
          <span class="separator">/</span>
          <span>Checkout</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <!-- Steps Indicator -->
        <div class="checkout-steps max-w-container-md m-auto mb-10">
          <div class="checkout-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}" id="step-ind-1">
            <div class="checkout-step-number">1</div>
            <span class="checkout-step-label">Info</span>
          </div>
          <div class="checkout-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}" id="step-ind-2">
            <div class="checkout-step-number">2</div>
            <span class="checkout-step-label">Shipping</span>
          </div>
          <div class="checkout-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}" id="step-ind-3">
            <div class="checkout-step-number">3</div>
            <span class="checkout-step-label">Delivery</span>
          </div>
          <div class="checkout-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}" id="step-ind-4">
            <div class="checkout-step-number">4</div>
            <span class="checkout-step-label">Payment</span>
          </div>
          <div class="checkout-step ${currentStep >= 5 ? 'active' : ''}" id="step-ind-5">
            <div class="checkout-step-number">5</div>
            <span class="checkout-step-label">Review</span>
          </div>
        </div>

        <div class="grid" style="grid-template-columns:1fr 340px;gap:var(--sp-8);">
          <!-- Step Forms -->
          <div class="card p-6" id="checkout-form-container">
            <!-- Dynamic Content loaded per step -->
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <div class="card p-6">
              <h3 class="mb-4" style="font-size:18px;">Order Summary</h3>
              <div class="flex flex-col gap-3 mb-4" style="max-height:220px;overflow-y:auto;">
                ${cart.map(item => `
                  <div class="flex items-center gap-3">
                    <img src="${item.images[0]}" style="width:44px;height:44px;border-radius:var(--radius-md);object-fit:cover;" />
                    <div style="flex:1;">
                      <div class="text-xs font-semibold">${item.name}</div>
                      <div class="text-xs text-tertiary">Qty: ${item.quantity}</div>
                    </div>
                    <div class="text-xs font-bold">${formatPrice(item.price * item.quantity)}</div>
                  </div>
                `).join('')}
              </div>

              <div class="divider mb-4"></div>

              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Shipping</span>
                <span>${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</span>
              </div>
              <div class="flex flex-between mb-2 text-sm text-secondary">
                <span>Tax</span>
                <span>${formatPrice(tax)}</span>
              </div>

              <div class="divider my-4"></div>

              <div class="flex flex-between mb-4">
                <span class="font-bold text-lg">Total</span>
                <span class="font-bold text-2xl text-lime">${formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  function renderStep(step) {
    currentStep = step;
    const formContainer = document.getElementById('checkout-form-container');
    if (!formContainer) return;

    // Update indicator UI
    for (let i = 1; i <= 5; i++) {
      const ind = document.getElementById(`step-ind-${i}`);
      if (ind) {
        ind.classList.toggle('active', i <= step);
        ind.classList.toggle('completed', i < step);
      }
    }

    if (step === 1) {
      formContainer.innerHTML = `
        <h3 class="mb-4">Step 1 — Customer Information</h3>
        <div class="form-group mb-4">
          <label class="form-label">Full Name <span class="required">*</span></label>
          <input type="text" class="form-input" id="co-name" value="Mohsin Ahmad" required />
        </div>
        <div class="grid grid-2 gap-4 mb-6">
          <div class="form-group">
            <label class="form-label">Email Address <span class="required">*</span></label>
            <input type="email" class="form-input" id="co-email" value="customer@razdar.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Phone Number <span class="required">*</span></label>
            <input type="tel" class="form-input" id="co-phone" value="+1 (555) 234-5678" required />
          </div>
        </div>
        <button class="btn btn-primary btn-lg" id="co-next-1">Next: Shipping Address ${getIcon('chevronRight')}</button>
      `;
      document.getElementById('co-next-1')?.addEventListener('click', () => renderStep(2));
    } else if (step === 2) {
      formContainer.innerHTML = `
        <h3 class="mb-4">Step 2 — Shipping Address</h3>
        <div class="form-group mb-4">
          <label class="form-label">Street Address <span class="required">*</span></label>
          <input type="text" class="form-input" id="co-street" value="452 Innovation Blvd, Suite 300" required />
        </div>
        <div class="grid grid-2 gap-4 mb-4">
          <div class="form-group">
            <label class="form-label">City <span class="required">*</span></label>
            <input type="text" class="form-input" value="San Francisco" />
          </div>
          <div class="form-group">
            <label class="form-label">Province / State <span class="required">*</span></label>
            <input type="text" class="form-input" value="California" />
          </div>
        </div>
        <div class="grid grid-2 gap-4 mb-6">
          <div class="form-group">
            <label class="form-label">Postal Code <span class="required">*</span></label>
            <input type="text" class="form-input" value="94107" />
          </div>
          <div class="form-group">
            <label class="form-label">Country <span class="required">*</span></label>
            <input type="text" class="form-input" value="United States" />
          </div>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-2">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-2">Next: Delivery Method ${getIcon('chevronRight')}</button>
        </div>
      `;
      document.getElementById('co-prev-2')?.addEventListener('click', () => renderStep(1));
      document.getElementById('co-next-2')?.addEventListener('click', () => renderStep(3));
    } else if (step === 3) {
      formContainer.innerHTML = `
        <h3 class="mb-4">Step 3 — Delivery Method</h3>
        <div class="flex flex-col gap-3 mb-6">
          <label class="radio-wrapper card p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input type="radio" name="delivery" value="standard" checked />
              <div>
                <div class="font-semibold">Standard Shipping (3-5 Business Days)</div>
                <div class="text-xs text-tertiary">Reliable ground shipping with tracking</div>
              </div>
            </div>
            <strong class="text-success">${shippingFee === 0 ? 'FREE' : formatPrice(shippingFee)}</strong>
          </label>

          <label class="radio-wrapper card p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <input type="radio" name="delivery" value="express" />
              <div>
                <div class="font-semibold">Express Air Priority (1-2 Business Days)</div>
                <div class="text-xs text-tertiary">Lightning fast priority delivery</div>
              </div>
            </div>
            <strong>$19.99</strong>
          </label>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-3">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-3">Next: Payment ${getIcon('chevronRight')}</button>
        </div>
      `;
      document.getElementById('co-prev-3')?.addEventListener('click', () => renderStep(2));
      document.getElementById('co-next-3')?.addEventListener('click', () => renderStep(4));
    } else if (step === 4) {
      formContainer.innerHTML = `
        <h3 class="mb-4">Step 4 — Payment Options</h3>
        <div class="flex flex-col gap-3 mb-6">
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="cod" checked />
            <span class="font-semibold ml-2">Cash on Delivery (COD)</span>
          </label>
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="card" />
            <span class="font-semibold ml-2">Credit / Debit Card (Visa, MasterCard, Amex)</span>
          </label>
          <label class="radio-wrapper card p-4">
            <input type="radio" name="payment" value="wallet" />
            <span class="font-semibold ml-2">Digital Wallet (Apple Pay, PayPal, Google Pay)</span>
          </label>
        </div>
        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-4">Back</button>
          <button class="btn btn-primary btn-lg" id="co-next-4">Next: Final Review ${getIcon('chevronRight')}</button>
        </div>
      `;
      document.getElementById('co-prev-4')?.addEventListener('click', () => renderStep(3));
      document.getElementById('co-next-4')?.addEventListener('click', () => renderStep(5));
    } else if (step === 5) {
      formContainer.innerHTML = `
        <h3 class="mb-4">Step 5 — Final Order Review</h3>
        <div class="card p-4 mb-4" style="background:var(--bg-secondary);">
          <div class="text-sm font-semibold mb-1">Shipping To:</div>
          <div class="text-xs text-secondary">Mohsin Ahmad • 452 Innovation Blvd, Suite 300, San Francisco, CA 94107</div>
        </div>
        <div class="card p-4 mb-6" style="background:var(--bg-secondary);">
          <div class="text-sm font-semibold mb-1">Payment Method:</div>
          <div class="text-xs text-secondary">Cash on Delivery / Direct Verification</div>
        </div>

        <div class="flex gap-4">
          <button class="btn btn-secondary btn-lg" id="co-prev-5">Back</button>
          <button class="btn btn-primary btn-xl flex-1" id="co-place-order-btn">
            ${getIcon('check')} Place Order Now (${formatPrice(total)})
          </button>
        </div>
      `;
      document.getElementById('co-prev-5')?.addEventListener('click', () => renderStep(4));
      document.getElementById('co-place-order-btn')?.addEventListener('click', () => {
        store.clearCart();
        window.location.hash = '#/order-success';
      });
    }
  }

  renderStep(1);
}

export default renderCheckoutPage;
