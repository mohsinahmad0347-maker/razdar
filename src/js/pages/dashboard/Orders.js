// ============================================
// RAZDAR — Customer Orders List Page
// ============================================

import orders from '../../data/orders.js';
import { getIcon } from '../../utils/icons.js';
import { formatPrice } from '../../utils/formatters.js';

export async function renderCustomerOrders() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>My Orders</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
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
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item active">${getIcon('shoppingBag')} My Orders</a>
              <a href="#/dashboard/track-order" class="sidebar-nav-item">${getIcon('truck')} Track Order</a>
              <a href="#/wishlist" class="sidebar-nav-item">${getIcon('heart')} Wishlist</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${orders.map(o => `
                    <tr>
                      <td class="font-bold">${o.id}</td>
                      <td class="text-sm text-secondary">${o.date}</td>
                      <td class="text-sm">${o.items.length} Product(s)</td>
                      <td class="font-bold text-lime">${formatPrice(o.total)}</td>
                      <td><span class="badge ${o.status === 'Delivered' ? 'badge-success' : 'badge-primary'}">${o.status}</span></td>
                      <td>
                        <a href="#/dashboard/track-order" class="btn btn-outline btn-sm">
                          Track Status
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

export default renderCustomerOrders;
