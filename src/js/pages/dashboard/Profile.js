// ============================================
// RAZDAR — Customer Profile Page
// ============================================

import store from '../../core/store.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';

export async function renderCustomerProfile() {
  const app = document.getElementById('app');

  const user = store.getUser() || { name: 'Mohsin Ahmad', email: 'customer@razdar.com', phone: '+1 (555) 234-5678' };

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>My Profile</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <a href="#/dashboard">Dashboard</a>
          <span class="separator">/</span>
          <span>Profile</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="dashboard-layout card">
          <aside class="dashboard-sidebar">
            <nav class="sidebar-nav">
              <a href="#/dashboard" class="sidebar-nav-item">${getIcon('layoutDashboard')} Dashboard</a>
              <a href="#/dashboard/profile" class="sidebar-nav-item active">${getIcon('user')} My Profile</a>
              <a href="#/dashboard/orders" class="sidebar-nav-item">${getIcon('shoppingBag')} My Orders</a>
            </nav>
          </aside>

          <main class="dashboard-content">
            <h3 class="mb-4">Edit Personal Information</h3>
            <form id="profile-form">
              <div class="form-group mb-4">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" value="${user.name}" required />
              </div>
              <div class="grid grid-2 gap-4 mb-4">
                <div class="form-group">
                  <label class="form-label">Email Address</label>
                  <input type="email" class="form-input" value="${user.email}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone Number</label>
                  <input type="tel" class="form-input" value="${user.phone || '+1 (555) 234-5678'}" required />
                </div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg mt-4">Save Changes</button>
            </form>
          </main>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#profile-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    events.emit('toast:show', {
      type: 'success',
      title: 'Profile Updated',
      message: 'Your personal information has been saved successfully.'
    });
  });
}

export default renderCustomerProfile;
