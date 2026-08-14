// ============================================
// RAZDAR — Master Admin Panel Dashboard
// ============================================

import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderAdminDashboard() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>RAZDAR Super Admin Dashboard</h1>
        <div class="breadcrumb">
          <a href="#/" style="color:var(--lime-300);">Home</a>
          <span class="separator">/</span>
          <span>Control Panel</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <!-- Admin Sidebar -->
          <aside class="dashboard-sidebar">
            <div class="flex items-center gap-2 mb-6 p-2">
              <span class="badge badge-danger">SUPER ADMIN</span>
            </div>

            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item active">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/users" class="sidebar-nav-item">${getIcon('user')} User Management</a>
              <a href="#/admin/sellers" class="sidebar-nav-item">${getIcon('store')} Seller Approvals</a>
              <a href="#/admin/products" class="sidebar-nav-item">${getIcon('grid')} Product Catalog</a>
              <a href="#/admin/orders" class="sidebar-nav-item">${getIcon('shoppingBag')} Global Orders</a>
              <a href="#/admin/inventory" class="sidebar-nav-item">${getIcon('truck')} Inventory</a>
              <a href="#/admin/analytics" class="sidebar-nav-item">${getIcon('sparkles')} Analytics</a>
              <a href="#/admin/coupons" class="sidebar-nav-item">${getIcon('tag')} Coupons</a>
              <a href="#/admin/support" class="sidebar-nav-item">${getIcon('messageSquare')} Support Tickets</a>
            </nav>
          </aside>

          <!-- Admin Main Content -->
          <main class="dashboard-content">
            <!-- Key Metric Stat Cards -->
            <div class="grid grid-4 gap-4 mb-8">
              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Platform Revenue</div>
                  <div class="stat-card-icon" style="background:var(--primary-muted);color:var(--primary);">${getIcon('sparkles')}</div>
                </div>
                <div class="stat-card-value">$1,248,500</div>
                <div class="stat-card-trend up">↑ +24.5% vs last month</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Total Orders</div>
                  <div class="stat-card-icon" style="background:var(--success-bg);color:var(--success);">${getIcon('shoppingBag')}</div>
                </div>
                <div class="stat-card-value">12,450</div>
                <div class="stat-card-trend up">↑ +1,200 this week</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Active Customers</div>
                  <div class="stat-card-icon" style="background:var(--info-bg);color:var(--info);">${getIcon('user')}</div>
                </div>
                <div class="stat-card-value">104,200</div>
                <div class="stat-card-trend up">↑ +3,400 new users</div>
              </div>

              <div class="stat-card">
                <div class="stat-card-header">
                  <div class="stat-card-label">Verified Sellers</div>
                  <div class="stat-card-icon" style="background:var(--warning-bg);color:var(--warning);">${getIcon('store')}</div>
                </div>
                <div class="stat-card-value">1,050</div>
                <div class="stat-card-trend up">14 pending review</div>
              </div>
            </div>

            <!-- Revenue Progress Charts UI -->
            <div class="card p-6 mb-8">
              <div class="flex flex-between items-center mb-4">
                <h3>Monthly Revenue & Sales Growth</h3>
                <span class="badge badge-primary">2026 Live Data</span>
              </div>
              <div style="display:flex;align-items:flex-end;gap:var(--sp-4);height:180px;padding-top:var(--sp-4);border-bottom:1px solid var(--border-primary);">
                <div style="flex:1;background:var(--primary-muted);height:40%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Jan</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:60%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Feb</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:55%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Mar</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:75%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Apr</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:85%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">May</span>
                </div>
                <div style="flex:1;background:var(--primary-muted);height:90%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold" style="position:absolute;top:-20px;width:100%;text-align:center;">Jun</span>
                </div>
                <div style="flex:1;background:var(--primary);height:100%;border-radius:var(--radius-md) var(--radius-md) 0 0;position:relative;">
                  <span class="text-xs font-bold text-lime" style="position:absolute;top:-20px;width:100%;text-align:center;">Aug</span>
                </div>
              </div>
            </div>

            <!-- Recent System Activity -->
            <h3 class="mb-4">Recent Marketplace Transactions</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Seller Store</th>
                    <th>Amount</th>
                    <th>Commission (10%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="font-bold">ORD-98421</td>
                    <td>Mohsin Ahmad</td>
                    <td>TechMatrix Official</td>
                    <td class="font-bold text-lime">$449.98</td>
                    <td class="font-bold">$44.99</td>
                    <td><span class="badge badge-success">Completed</span></td>
                  </tr>
                  <tr>
                    <td class="font-bold">ORD-98422</td>
                    <td>Mohsin Ahmad</td>
                    <td>Volt Store Official</td>
                    <td class="font-bold text-lime">$1,099.99</td>
                    <td class="font-bold">$109.99</td>
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

export default renderAdminDashboard;
