// ============================================
// RAZDAR — Admin User Management & Seller Approvals
// ============================================

import users from '../../data/users.js';
import sellers from '../../data/sellers.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';

export async function renderAdminUsers() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>User Management</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Users</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/users" class="sidebar-nav-item active">${getIcon('user')} User Management</a>
              <a href="#/admin/sellers" class="sidebar-nav-item">${getIcon('store')} Seller Approvals</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <div class="flex flex-between items-center mb-6">
              <h3>Registered Users (${users.length})</h3>
              <input type="text" class="form-input" placeholder="Search user by email or name..." style="max-width:260px;" />
            </div>

            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map(u => `
                    <tr>
                      <td class="font-bold">${u.name}</td>
                      <td class="text-sm text-secondary">${u.email}</td>
                      <td><span class="badge ${u.role === 'admin' ? 'badge-danger' : u.role === 'seller' ? 'badge-primary' : 'badge-secondary'}">${u.role.toUpperCase()}</span></td>
                      <td><span class="badge badge-success">Active</span></td>
                      <td>
                        <button class="btn btn-secondary btn-sm">Edit</button>
                        <button class="btn btn-ghost btn-sm" style="color:var(--danger);">Block</button>
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

export async function renderAdminSellers() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header" style="background:var(--graphite-900);color:#fff;">
      <div class="container">
        <h1>Seller Approvals & Verification</h1>
        <div class="breadcrumb">
          <a href="#/admin/dashboard" style="color:var(--lime-300);">Control Panel</a>
          <span class="separator">/</span>
          <span>Sellers</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/admin/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Overview</a>
              <a href="#/admin/sellers" class="sidebar-nav-item active">${getIcon('store')} Seller Approvals</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-6">Merchant Stores (${sellers.length})</h3>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Seller Store</th>
                    <th>Followers</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${sellers.map(s => `
                    <tr>
                      <td class="font-bold">${s.name}</td>
                      <td>${s.followers}</td>
                      <td>${s.rating} ★</td>
                      <td><span class="badge badge-success">Verified Merchant</span></td>
                      <td>
                        <button class="btn btn-outline btn-sm admin-verify-btn" data-seller="${s.name}">Verify Badges</button>
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

  app.querySelectorAll('.admin-verify-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-seller');
      events.emit('toast:show', {
        type: 'success',
        title: 'Merchant Verified',
        message: `${name} verification status renewed.`
      });
    });
  });
}
