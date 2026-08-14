// ============================================
// RAZDAR — Seller Registration Page
// ============================================

import store from '../../core/store.js';
import events from '../../core/events.js';
import { getIcon } from '../../utils/icons.js';

export async function renderSellerRegisterPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Sell on RAZDAR — Become a Merchant</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Seller Registration</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container container-md">
        <div class="card p-8">
          <div class="text-center mb-8">
            <span class="badge badge-primary mb-2">MERCHANT HUB</span>
            <h2>Expand Your Business Worldwide</h2>
            <p class="text-secondary text-sm">Reach 100K+ active buyers on RAZDAR marketplace.</p>
          </div>

          <form id="seller-reg-form">
            <div class="form-group mb-4">
              <label class="form-label">Store / Business Name <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="e.g. Apex Tech Official" required />
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Owner Name <span class="required">*</span></label>
                <input type="text" class="form-input" placeholder="Owner Full Name" required />
              </div>
              <div class="form-group">
                <label class="form-label">Business Category <span class="required">*</span></label>
                <select class="form-input">
                  <option>Electronics & Audio</option>
                  <option>Mobiles & Accessories</option>
                  <option>Fashion & Apparel</option>
                  <option>Home & Living</option>
                  <option>Gaming Gear</option>
                </select>
              </div>
            </div>

            <div class="grid grid-2 gap-4 mb-4">
              <div class="form-group">
                <label class="form-label">Business Email <span class="required">*</span></label>
                <input type="email" class="form-input" placeholder="seller@business.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number <span class="required">*</span></label>
                <input type="tel" class="form-input" placeholder="+1 (555) 000-0000" required />
              </div>
            </div>

            <div class="form-group mb-6">
              <label class="form-label">Business Address <span class="required">*</span></label>
              <input type="text" class="form-input" placeholder="HQ Address, City, Country" required />
            </div>

            <button type="submit" class="btn btn-primary btn-xl btn-full">
              Submit Seller Application ${getIcon('chevronRight')}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#seller-reg-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    events.emit('toast:show', {
      type: 'success',
      title: 'Application Submitted!',
      message: 'Your seller merchant application has been received and is under review.'
    });
    store.login({ name: 'Apex Tech Official', email: 'seller@razdar.com', role: 'seller' }, 'seller');
    window.location.hash = '#/seller/dashboard';
  });
}

export default renderSellerRegisterPage;
