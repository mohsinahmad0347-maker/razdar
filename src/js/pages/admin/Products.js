// ============================================
// RAZDAR — Admin Product & Order Management Pages
// ============================================

import products from '../../data/products.js';
import orders from '../../data/orders.js';
import coupons from '../../data/coupons.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderAdminProducts() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Global Product Catalog</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Products</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/products" class="sidebar-nav-item active">${getIcon('grid')} Product Catalog</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>All Products (${products.length})</h3>
              <button class="btn btn-primary btn-sm" id="admin-add-prod-btn">${getIcon('plus')} Add Product</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Featured</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${products.map(p => `
                    <tr>
                      <td class="font-semibold text-sm">${p.name}</td>
                      <td class="text-sm text-secondary">${p.category}</td>
                      <td class="font-bold text-lime">${formatPrice(p.price)}</td>
                      <td>${p.stock}</td>
                      <td><span class="badge ${p.isTrending ? 'badge-success' : 'badge-secondary'}">${p.isTrending ? 'Featured' : 'Standard'}</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
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

export async function renderAdminOrders() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Global Marketplace Orders</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Orders</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/orders" class="sidebar-nav-item active">${getIcon('shoppingBag')} Global Orders</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-6">All Platform Orders (${orders.length})</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td class="font-bold">${o.id}</td>
                      <td class="text-sm text-secondary">${o.date}</td>
                      <td>${o.shippingAddress.name}</td>
                      <td class="font-bold text-lime">${formatPrice(o.total)}</td>
                      <td><span class="badge ${o.status === 'Delivered' ? 'badge-success' : 'badge-primary'}">${o.status}</span></td>
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

export async function renderAdminCoupons() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Coupons & Promo Codes Manager</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Coupons</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/coupons" class="sidebar-nav-item active">${getIcon('tag')} Coupons</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Active Coupons (${coupons.length})</h3>
              <button class="btn btn-primary btn-sm" id="admin-create-coupon-btn">${getIcon('plus')} Create Coupon</button>
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Min Order</th>
                    <th>Expiry</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${coupons.map(c => `
                    <tr>
                      <td class="font-bold text-lime">${c.code}</td>
                      <td>${c.discount}</td>
                      <td>$${c.minOrder}</td>
                      <td>${c.expiry}</td>
                      <td><button class="btn btn-secondary btn-sm">Edit</button></td>
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

export async function renderAdminInventory() {
  const app = document.getElementById('app');
  app.innerHTML = `<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Inventory Management</h2><p class="text-secondary mt-2">All warehouse stock levels are healthy.</p></div></div></div>`;
}

export async function renderAdminAnalytics() {
  const app = document.getElementById('app');
  app.innerHTML = `<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Platform Analytics</h2><p class="text-secondary mt-2">Conversion rate: 4.8% • Total Traffic: 420K monthly visitors.</p></div></div></div>`;
}

export async function renderAdminSupport() {
  const app = document.getElementById('app');
  app.innerHTML = `<div class="page-body"><div class="container"><div class="card p-8 text-center"><h2>Support Ticket Center</h2><p class="text-secondary mt-2">0 open urgent support tickets.</p></div></div></div>`;
}
