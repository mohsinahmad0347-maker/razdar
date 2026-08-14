// ============================================
// RAZDAR — Order Success Page
// ============================================

import { getIcon } from '../utils/icons.js';

export async function renderOrderSuccessPage() {
  const app = document.getElementById('app');

  const orderId = `RZD-${Math.floor(100000 + Math.random() * 900000)}`;

  app.innerHTML = `
    <div class="page-body">
      <div class="container container-sm text-center">
        <div class="order-success">
          <div class="success-check">
            ${getIcon('check')}
          </div>

          <span class="badge badge-success mb-3">ORDER CONFIRMED</span>
          <h1 style="font-size:var(--fs-4xl);margin-bottom:var(--sp-2);">Thank You For Your Order!</h1>
          <p class="text-secondary mb-6" style="max-width:440px;">
            Your order <strong>#${orderId}</strong> has been successfully placed. We have sent a confirmation email with full tracking details.
          </p>

          <div class="card p-6 w-full text-left mb-8">
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Order ID:</span>
              <span class="font-bold">${orderId}</span>
            </div>
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Estimated Delivery:</span>
              <span class="font-semibold text-lime">In 2 - 4 Business Days</span>
            </div>
            <div class="flex flex-between mb-3 text-sm">
              <span class="text-tertiary">Payment Method:</span>
              <span>Cash on Delivery</span>
            </div>
            <div class="flex flex-between text-sm">
              <span class="text-tertiary">Status:</span>
              <span class="badge badge-primary">Processing</span>
            </div>
          </div>

          <div class="flex gap-4 w-full justify-center">
            <a href="#/dashboard/track-order" class="btn btn-primary btn-lg flex-1">
              ${getIcon('truck')} Track Order Status
            </a>
            <a href="#/shop" class="btn btn-secondary btn-lg flex-1">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

export default renderOrderSuccessPage;
