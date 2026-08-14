// ============================================
// RAZDAR — Admin Secure Login Page
// ============================================

import store from '../../core/store.js';
import users from '../../data/users.js';
import { getIcon } from '../../utils/icons.js';

export async function renderAdminLoginPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8">
          <div class="text-center mb-8">
            <span class="badge badge-danger mb-2">SUPER ADMIN PORTAL</span>
            <h2>RAZDAR Admin Portal</h2>
            <p class="text-secondary text-sm">Authorized personnel security login.</p>
          </div>

          <form id="admin-login-form">
            <div class="form-group mb-4">
              <label class="form-label">Admin Email</label>
              <input type="email" class="form-input" value="admin@razdar.com" required />
            </div>

            <div class="form-group mb-6">
              <label class="form-label">Security Password</label>
              <input type="password" class="form-input" value="admin123" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full">
              Authenticate & Launch Control Center ${getIcon('chevronRight')}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#admin-login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    store.login(users[2], 'admin');
    window.location.hash = '#/admin/dashboard';
  });
}

export default renderAdminLoginPage;
