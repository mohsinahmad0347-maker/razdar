// ============================================
// RAZDAR — Visual Order Tracking Page
// ============================================

import store from '../../core/store.js';
import orders from '../../data/orders.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderTrackOrderPage() {
  const app = document.getElementById('app');

  const activeOrder = orders[1]; // Shipped status order

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Track Your Order</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Track Order</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Sidebar -->
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${getIcon('shoppingBag')} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item active">${getIcon('truck')} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${getIcon('heart')} Wishlist</a>
            </nav>
          </aside>

          <!-- Tracking Content -->
          <main class="dashboard-content">
            <div class="card p-6 mb-8" style="background:var(--bg-secondary);">
              <div class="flex flex-between flex-wrap gap-4 items-center">
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Tracking Number</div>
                  <div class="font-bold text-lg text-lime">${activeOrder.trackingNumber}</div>
                </div>
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Order ID</div>
                  <div class="font-bold text-base">${activeOrder.id}</div>
                </div>
                <div>
                  <div class="text-xs text-tertiary uppercase tracking-wider">Estimated Delivery</div>
                  <div class="font-bold text-base text-success">${activeOrder.estimatedDelivery}</div>
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <h3 class="mb-6">Order Status Progression</h3>
            <div class="timeline card p-6 mb-8">
              ${activeOrder.timeline.map((t, idx) => `
                <div class="timeline-item ${t.completed ? 'completed' : ''} ${t.step === activeOrder.status ? 'active' : ''}">
                  <div class="timeline-dot"></div>
                  <div class="timeline-title">${t.step}</div>
                  <div class="timeline-desc">${t.date}</div>
                </div>
              `).join('')}
            </div>

            <!-- Items in Package -->
            <h3 class="mb-4">Package Contents</h3>
            <div class="card p-4">
              ${activeOrder.items.map(item => `
                <div class="flex items-center justify-between p-2">
                  <div class="flex items-center gap-3">
                    <img src="${item.image}" style="width:48px;height:48px;border-radius:var(--radius-md);object-fit:cover;" />
                    <div>
                      <div class="font-semibold text-sm">${item.name}</div>
                      <div class="text-xs text-tertiary">Qty: ${item.quantity} ${item.color ? `• ${item.color}` : ''}</div>
                    </div>
                  </div>
                  <div class="font-bold">${formatPrice(item.price)}</div>
                </div>
              `).join('')}
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

export default renderTrackOrderPage;
