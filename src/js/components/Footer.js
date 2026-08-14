// ============================================
// RAZDAR — Footer Component
// ============================================

import { getIcon } from '../utils/icons.js';
import events from '../core/events.js';

export class Footer {
  constructor() {
    this.container = document.getElementById('footer');
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.className = 'footer';
    this.container.innerHTML = `
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <!-- Brand Column -->
            <div class="footer-col brand-col">
              <div class="navbar-brand">
                <div class="brand-icon">R</div>
                <span class="brand-text">RAZDAR</span>
              </div>
              <p class="footer-brand-text">
                Your World. Your Choice. Premium global marketplace delivering next-generation tech, high fashion, lifestyle, and curated daily deals.
              </p>
              <div class="footer-social">
                <a href="#" aria-label="Facebook">FB</a>
                <a href="#" aria-label="Instagram">IG</a>
                <a href="#" aria-label="Twitter">TW</a>
                <a href="#" aria-label="LinkedIn">IN</a>
                <a href="#" aria-label="YouTube">YT</a>
              </div>
            </div>

            <!-- RAZDAR Info -->
            <div class="footer-col">
              <h4>RAZDAR</h4>
              <ul>
                <li><a href="#/about">About Us</a></li>
                <li><a href="#/careers">Careers</a></li>
                <li><a href="#/contact">Contact Us</a></li>
                <li><a href="#/blog">Official Blog</a></li>
                <li><a href="#/sustainability">Sustainability</a></li>
              </ul>
            </div>

            <!-- Customer Service -->
            <div class="footer-col">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#/faq">Help Center & FAQ</a></li>
                <li><a href="#/dashboard/orders">Shipping & Delivery</a></li>
                <li><a href="#/refund-policy">Returns & Refunds</a></li>
                <li><a href="#/dashboard/track-order">Track Order</a></li>
                <li><a href="#/support">Support Ticket</a></li>
              </ul>
            </div>

            <!-- Shopping -->
            <div class="footer-col">
              <h4>Shopping</h4>
              <ul>
                <li><a href="#/categories">All Categories</a></li>
                <li><a href="#/deals">Flash Deals</a></li>
                <li><a href="#/new-arrivals">New Arrivals</a></li>
                <li><a href="#/best-sellers">Best Sellers</a></li>
                <li><a href="#/coupons">Coupons & Offers</a></li>
              </ul>
            </div>

            <!-- Seller Hub -->
            <div class="footer-col">
              <h4>Seller Hub</h4>
              <ul>
                <li><a href="#/seller/register">Sell on RAZDAR</a></li>
                <li><a href="#/seller/dashboard">Seller Center</a></li>
                <li><a href="#/seller-policies">Seller Policies</a></li>
                <li><a href="#/fulfillment">RAZDAR Fulfillment</a></li>
              </ul>
            </div>
          </div>

          <!-- Newsletter Banner inside footer -->
          <div class="newsletter-section mt-12">
            <h2>Get the Best Deals in Your Inbox</h2>
            <p>Subscribe for secret flash sales, product drops, and 20% off your first purchase.</p>
            <form class="newsletter-form" id="newsletter-form">
              <input type="email" placeholder="Enter your email address..." required id="newsletter-input" />
              <button type="submit" class="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="container">
          <div class="footer-bottom-inner">
            <div class="footer-copyright">
              © 2026 <strong>RAZDAR Inc.</strong> All rights reserved. Your World. Your Choice.
            </div>
            <div style="display:flex;gap:var(--sp-4);font-size:12px;color:var(--text-tertiary);">
              <a href="#/privacy-policy">Privacy Policy</a>
              <a href="#/terms">Terms & Conditions</a>
              <a href="#/refund-policy">Refund Policy</a>
            </div>
            <div class="footer-payments">
              <span>VISA</span>
              <span>MasterCard</span>
              <span>PayPal</span>
              <span>ApplePay</span>
              <span>COD</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Newsletter submit listener
    const form = this.container.querySelector('#newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('#newsletter-input');
        if (input && input.value) {
          events.emit('toast:show', {
            type: 'success',
            title: 'Subscribed!',
            message: 'Thank you for subscribing to RAZDAR insider deals.'
          });
          input.value = '';
        }
      });
    }
  }
}

export default Footer;
