// ============================================
// RAZDAR — Register Page
// ============================================

import store from '../core/store.js';
import { getIcon } from '../utils/icons.js';

export async function renderRegisterPage() {
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
            <h2>Create Your Account</h2>
            <p class="text-secondary text-sm">Join RAZDAR for exclusive discounts and rewards.</p>
          </div>

          <form id="register-form">
            <div class="form-group mb-4">
              <label class="form-label">Full Name <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="e.g. Mohsin Ahmad" required />
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Email Address <span class="required">*</span></label>
                <input type="email" class="form-input" placeholder="name@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number <span class="required">*</span></label>
                <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Password <span class="required">*</span></label>
                <input type="password" class="form-input" placeholder="••••••••" required />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password <span class="required">*</span></label>
                <input type="password" class="form-input" placeholder="••••••••" required />
              </div>
            </div>

            <label class="checkbox-wrapper mb-6">
              <input type="checkbox" required checked />
              <span class="text-xs text-secondary">
                I agree to RAZDAR's <a href="#/terms" class="text-lime">Terms of Service</a> and <a href="#/privacy-policy" class="text-lime">Privacy Policy</a>.
              </span>
            </label>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Create Account ${getIcon('chevronRight')}
            </button>
          </form>

          <p class="text-center text-sm text-secondary">
            Already have an account? <a href="#/login" class="text-lime font-semibold">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#register-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.login({ name: 'New Customer', email: 'newuser@razdar.com', role: 'customer' });
    window.location.hash = '#/dashboard';
  });
}

export default renderRegisterPage;
