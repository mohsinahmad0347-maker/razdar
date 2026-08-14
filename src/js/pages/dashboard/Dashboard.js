// ============================================
// RAZDAR — Customer Dashboard Overview Page
// ============================================

import store from '../../core/store.js';
import orders from '../../data/orders.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderCustomerDashboard() {
  const app = document.getElementById('app');

  const user = store.getUser() || { name: 'Mohsin Ahmad', email: 'customer@razdar.com', points: 1250 };
  const wishlistCount = store.getWishlist().length;

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Customer Dashboard</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Dashboard</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Dashboard Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-3 mb-6 p-2">
              <div class="avatar avatar-initials avatar-lg">${user.name.charAt(0)}</div>
              <div>
                <div class="font-bold text-base">${user.name}</div>
                <div class="text-xs text-tertiary">${user.email}</div>
              </div>
            </div>

            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item active">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${getIcon('shoppingBag')} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item">${getIcon('truck')} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${getIcon('heart')} Wishlist (${wishlistCount})</a>
              <a href="#/dashboard/profile" class="sidebar-nav-item">${getIcon('user')} My Profile</a>
              <a href="#/dashboard/addresses" class="sidebar-nav-item">${getIcon('home')} Addresses</a>
              <a href="#/dashboard/reviews" class="sidebar-nav-item">${getIcon('star')} My Reviews</a>
              <a href="#/dashboard/settings" class="sidebar-nav-item">${getIcon('tag')} Settings</a>
            </nav>
          </aside>

          <!-- Dashboard Content Area -->
          <main class="dashboard-content">
            <!-- Stats Cards -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${getIcon('shoppingBag')}</div>
                </div>
                <div class="stat-card-value">8</div>
                <div class="stat-card-trend up">All-time purchases</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Pending Orders</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${getIcon('truck')}</div>
                </div>
                <div class="stat-card-value">1</div>
                <div class="stat-card-trend">In transit</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Delivered Orders</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${getIcon('check')}</div>
                </div>
                <div class="stat-card-value">7</div>
                <div class="stat-card-trend up">Completed</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Reward Points</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${getIcon('sparkles')}</div>
                </div>
                <div class="stat-card-value">1,250</div>
                <div class="stat-card-trend up">Value $12.50</div>
              </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="flex flex-between items-center mb-4">
              <h3 style="font-size:18px;">Recent Orders</h3>
              <a href="#/dashboard/orders" class="link text-sm font-semibold">View All</a>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td class="font-bold">${o.id}</td>
                      <td class="text-sm text-secondary">${o.date}</td>
                      <td class="font-bold text-lime">${formatPrice(o.total)}</td>
                      <td><span class="badge badge-success">${o.paymentStatus}</span></td>
                      <td><span class="badge ${o.status === 'Delivered' ? 'badge-success' : 'badge-primary'}">${o.status}</span></td>
                      <td>
                        <a href="#/dashboard/track-order" class="btn btn-outline btn-sm">
                          Track Order
                        </a>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

export default renderCustomerDashboard;
