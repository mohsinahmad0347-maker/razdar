// ============================================
// RAZDAR — Contact Page
// ============================================

import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export async function renderContactPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>Contact Us</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Contact</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        <div class="grid grid-2 gap-8 mb-12">
          <!-- Form -->
          <div class="card p-6">
            <h3 class="mb-4">Send Us a Message</h3>
            <form id="contact-form">
              <div class="form-group mb-4">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-input" placeholder="e.g. Mohsin Ahmad" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" placeholder="name@example.com" required />
              </div>
              <div class="form-group mb-4">
                <label class="form-label">Subject</label>
                <input type="text" class="form-input" placeholder="Order Inquiry, Feedback, etc." required />
              </div>
              <div class="form-group mb-6">
                <label class="form-label">Message</label>
                <textarea class="form-input" rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-full">
                Send Message ${getIcon('chevronRight')}
              </button>
            </form>
          </div>

          <!-- Contact Details Cards -->
          <div class="flex flex-col gap-4">
            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${getIcon('messageSquare')}</div>
              <div>
                <h4 style="font-size:16px;">Customer Support</h4>
                <p class="text-sm text-secondary">Our dedicated team is ready to help 24/7.</p>
                <div class="font-bold text-lime mt-2">support@razdar.com</div>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${getIcon('store')}</div>
              <div>
                <h4 style="font-size:16px;">Seller Partnership</h4>
                <p class="text-sm text-secondary">Want to sell your products on RAZDAR?</p>
                <div class="font-bold text-lime mt-2">sellers@razdar.com</div>
              </div>
            </div>

            <div class="card p-6 flex items-start gap-4">
              <div class="category-card-icon">${getIcon('truck')}</div>
              <div>
                <h4 style="font-size:16px;">Global HQ</h4>
                <p class="text-sm text-secondary">452 Innovation Blvd, Suite 300<br/>San Francisco, CA 94107, USA</p>
                <div class="font-bold text-lime mt-2">+1 (555) 234-5678</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  app.querySelector('#contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    events.emit('toast:show', {
      type: 'success',
      title: 'Message Sent!',
      message: 'Thank you for reaching out. We will get back to you within 24 hours.'
    });
    e.target.reset();
  });
}

export default renderContactPage;
