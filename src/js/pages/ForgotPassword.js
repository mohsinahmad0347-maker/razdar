// ============================================
// RAZDAR — Forgot Password Page
// ============================================

import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export async function renderForgotPasswordPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-body">
      <div class="container container-sm">
        <div class="card p-8 text-center">
          <div class="navbar-brand justify-center mb-2">
            <div class="brand-icon">R</div>
            <span class="brand-text">RAZDAR</span>
          </div>
          <h2 class="mb-2">Reset Password</h2>
          <p class="text-secondary text-sm mb-6">Enter your registered email address and we'll send you an OTP verification code.</p>

          <form id="fp-form">
            <div class="form-group mb-6 text-left">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-input" placeholder="e.g. user@example.com" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full mb-4">
              Send Reset Code ${getIcon('chevronRight')}
            </button>
          </form>

          <a href="#/login" class="text-sm text-secondary link">Back to Login</a>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#fp-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    events.emit('toast:show', {
      type: 'success',
      title: 'Reset Code Sent',
      message: 'Check your email inbox for the password reset OTP code.'
    });
    window.location.hash = '#/login';
  });
}

export default renderForgotPasswordPage;
