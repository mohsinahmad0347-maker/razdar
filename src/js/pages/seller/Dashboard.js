// ============================================
// RAZDAR — Seller Merchant Dashboard Page
// ============================================

import sellers from '../../data/sellers.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderSellerDashboard() {
  const app = document.getElementById('app');

  const seller = sellers[0]; // TechMatrix

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Seller Merchant Hub</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Seller Hub</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-3 mb-6 p-2">
              <img src="${seller.logo}" class="avatar avatar-lg" />
              <div>
                <div class="font-bold text-base">${seller.name} ✓</div>
                <div class="text-xs text-tertiary">Verified Merchant</div>
              </div>
            </div>

            <nav class="sidebar-nav">
              <a href="#/seller/dashboard" class="sidebar-nav-item active">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/seller/store" class="sidebar-nav-item">${getIcon('store')} View My Store Page</a>
              <a href="#/seller/products" class="sidebar-nav-item">${getIcon('grid')} Product Catalog</a>
            </nav>
          </aside>

          <!-- Main Dashboard Overview -->
          <main class="dashboard-content">
            <!-- Stats -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Revenue</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${getIcon('sparkles')}</div>
                </div>
                <div class="stat-card-value">$184,250</div>
                <div class="stat-card-trend up">↑ +18.4% this month</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${getIcon('shoppingBag')}</div>
                </div>
                <div class="stat-card-value">1,420</div>
                <div class="stat-card-trend up">↑ 42 new orders</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Products Active</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${getIcon('grid')}</div>
                </div>
                <div class="stat-card-value">48</div>
                <div class="stat-card-trend">All in stock</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Store Followers</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${getIcon('user')}</div>
                </div>
                <div class="stat-card-value">12.4K</div>
                <div class="stat-card-trend up">↑ +420 this week</div>
              </div>
            </div>

            <!-- Recent Merchant Orders -->
            <h3 class="mb-4">Recent Merchant Orders</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-bold">ORD-98421</td>
                    <td>Mohsin Ahmad</td>
                    <td>Apex Pro ANC Headphones</td>
                    <td class="font-bold text-lime">$299.99</td>
                    <td><span class="badge badge-success">Delivered</span></td>
                  </tr>
                  <tr>
                    <td class="font-bold">ORD-98425</td>
                    <td>Sarah Jenkins</td>
                    <td>Spatial Soundbar 300W</td>
                    <td class="font-bold text-lime">$189.00</td>
                    <td><span class="badge badge-primary">Processing</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

export default renderSellerDashboard;
