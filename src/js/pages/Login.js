// ============================================
// RAZDAR — Login Page
// ============================================

import store from '../core/store.js';
import users from '../data/users.js';
import { getIcon } from '../utils/icons.js';

export async function renderLoginPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="navbar-brand justify-center mb-2">
              <div class="brand-icon">R</div>
              <span class="brand-text">RAZDAR</span>
            </div>
            <h2>Sign In to Your Account</h2>
            <p class="text-secondary text-sm">Access your orders, wishlist, and rewards.</p>
          </div>

          <!-- Demo Account Selector for instant testing -->
          <div class="mb-6 p-4 rounded-xl" style="background:var(--primary-subtle);border:1px solid var(--primary-muted);">
            <div class="text-xs font-bold text-lime mb-2 uppercase">Quick Demo Login:</div>
            <div class="flex gap-2 flex-wrap">
              <button class="btn btn-secondary btn-sm" id="demo-customer">Customer Account</button>
              <button class="btn btn-secondary btn-sm" id="demo-seller">Seller Account</button>
              <button class="btn btn-secondary btn-sm" id="demo-admin">Admin Account</button>
            </div>
          </div>

          <form id="login-form">
            <div class="form-group mb-4">
              <label class="form-label">Email or Phone Number</label>
              <input type="email" id="login-email" class="form-input" placeholder="e.g. customer@razdar.com" value="customer@razdar.com" required />
            </div>

            <div class="form-group mb-4">
              <div class="flex flex-between">
                <label class="form-label">Password</label>
                <a href="#/forgot-password" class="text-xs text-lime">Forgot Password?</a>
              </div>
              <input type="password" id="login-password" class="form-input" value="123456" required />
            </div>

            <div class="flex flex-between items-center mb-6">
              <label class="checkbox-wrapper">
                <input type="checkbox" checked />
                <span class="text-sm">Remember me</span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Sign In ${getIcon('chevronRight')}
            </button>
          </form>

          <div class="separator my-6">OR</div>

          <p class="text-center text-sm text-secondary">
            Don't have an account? <a href="#/register" class="text-lime font-semibold">Register Now</a>
          </p>
        </div>
      </div>
    </div>
  `;

  // Attach submit handler
  app.querySelector('#login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = users[0]; // Customer
    store.login(user, 'customer');
    window.location.hash = '#/dashboard';
  });

  app.querySelector('#demo-customer')?.addEventListener('click', () => {
    store.login(users[0], 'customer');
    window.location.hash = '#/dashboard';
  });

  app.querySelector('#demo-seller')?.addEventListener('click', () => {
    store.login(users[1], 'seller');
    window.location.hash = '#/seller/dashboard';
  });

  app.querySelector('#demo-admin')?.addEventListener('click', () => {
    store.login(users[2], 'admin');
    window.location.hash = '#/admin/dashboard';
  });
}

export default renderLoginPage;
