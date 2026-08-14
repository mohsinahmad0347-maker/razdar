// ============================================
// RAZDAR — Customer Reviews & Settings Pages
// ============================================

import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';

export async function renderCustomerReviews() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>My Product Reviews</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>My Reviews</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/reviews" class="sidebar-nav-item active">${getIcon('star')} My Reviews</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Reviews Written by You</h3>
            <div class="card p-4 mb-4">
              <div class="flex items-center justify-between mb-2">
                <div class="font-bold text-sm">Apex Pro ANC Wireless Headphones</div>
                <div class="stars"><span class="star-filled">${getIcon('star')}</span><span class="star-filled">${getIcon('star')}</span><span class="star-filled">${getIcon('star')}</span><span class="star-filled">${getIcon('star')}</span><span class="star-filled">${getIcon('star')}</span></div>
              </div>
              <p class="text-sm text-secondary">"Absolute best sound quality I have ever experienced. The Lime Spark accents look sick!"</p>
              <div class="text-xs text-tertiary mt-2">Reviewed on Aug 11, 2026</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;
}

export async function renderCustomerSettings() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Account Settings</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Settings</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/settings" class="sidebar-nav-item active">${getIcon('tag')} Settings</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Password & Security</h3>
            <form id="settings-pw-form" class="mb-8">
              <div class="form-group mb-4">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-input" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">New Password</label>
                <input type="password" class="form-input" required />
              </div>
              <button type="submit" class="btn btn-primary">Update Password</button>
            </form>

            <h3 class="mb-4">Notification Preferences</h3>
            <div class="flex flex-col gap-3">
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span>Order Status Update Emails</span>
              </label>
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span>Flash Sale & Discount SMS Notifications</span>
              </label>
            </div>
          </main>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#settings-pw-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    events.emit('toast:show', {
      type: 'success',
      title: 'Password Updated',
      message: 'Your account password has been updated.'
    });
  });
}
