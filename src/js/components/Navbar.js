// ============================================
// RAZDAR — Navbar Component
// ============================================

import store from '../core/store.js';
import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export class Navbar {
  constructor() {
    this.container = document.getElementById('navbar');
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();

    // Listen for state changes
    events.on('cart:updated', () => this.updateBadges());
    events.on('wishlist:updated', () => this.updateBadges());
    events.on('user:change', () => this.render());
  }

  render() {
    const user = store.getUser();
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlist().length;
    const currentTheme = store.state.theme;

    this.container.className = 'navbar';
    this.container.innerHTML = `
      <div class="navbar-inner">
        <!-- Logo -->
        <a href="#/" class="navbar-brand">
          <div class="brand-icon">R</div>
          <span class="brand-text">RAZDAR</span>
        </a>

        <!-- Desktop Navigation -->
        <ul class="navbar-nav">
          <li><a href="#/" class="nav-link">Home</a></li>
          <li><a href="#/shop" class="nav-link">Shop</a></li>
          <li><a href="#/categories" class="nav-link">Categories</a></li>
          <li><a href="#/deals" class="nav-link">Deals</a></li>
          <li><a href="#/new-arrivals" class="nav-link">New Arrivals</a></li>
          <li><a href="#/about" class="nav-link">About</a></li>
          <li><a href="#/contact" class="nav-link">Contact</a></li>
        </ul>

        <!-- Right Side Controls -->
        <div class="navbar-actions">
          <!-- Search -->
          <button class="navbar-action-btn" id="nav-search-btn" title="Search">
            ${getIcon('search')}
          </button>

          <!-- Wishlist -->
          <a href="#/wishlist" class="navbar-action-btn" title="Wishlist">
            ${getIcon('heart')}
            <span class="badge-count wishlist-count" style="${wishlistCount > 0 ? '' : 'display:none;'}">${wishlistCount}</span>
          </a>

          <!-- Cart -->
          <a href="#/cart" class="navbar-action-btn" title="Shopping Cart">
            ${getIcon('shoppingBag')}
            <span class="badge-count cart-count" style="${cartCount > 0 ? '' : 'display:none;'}">${cartCount}</span>
          </a>

          <!-- Notifications -->
          <div class="dropdown" id="notification-dropdown">
            <button class="navbar-action-btn" id="nav-notif-btn" title="Notifications">
              ${getIcon('bell')}
              <span class="badge-count">2</span>
            </button>
            <div class="notification-panel" id="notification-panel">
              <div class="notification-panel-header">
                <h4 style="margin:0;font-size:14px;">Notifications</h4>
                <span class="badge badge-primary">2 New</span>
              </div>
              <div class="notification-list">
                <div class="notification-item unread">
                  <div class="notification-icon" style="background:var(--primary-muted);color:var(--primary);">
                    ${getIcon('sparkles')}
                  </div>
                  <div class="notification-body">
                    <div class="notification-title">Welcome to RAZDAR</div>
                    <div class="notification-text">Your World. Your Choice. Enjoy premium shopping.</div>
                    <div class="notification-time">Just now</div>
                  </div>
                </div>
                <div class="notification-item unread">
                  <div class="notification-icon" style="background:var(--warning-bg);color:var(--warning);">
                    ${getIcon('zap')}
                  </div>
                  <div class="notification-body">
                    <div class="notification-title">Flash Sale Live</div>
                    <div class="notification-text">Up to 60% off on Next-Gen Electronics</div>
                    <div class="notification-time">1h ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- User Menu / Account -->
          ${user ? `
            <div class="dropdown" id="user-menu-dropdown">
              <button class="navbar-action-btn" id="user-menu-btn" title="Account">
                <div class="avatar avatar-sm avatar-initials">${user.name.charAt(0)}</div>
              </button>
              <div class="dropdown-menu">
                <div style="padding:var(--sp-2) var(--sp-3);border-bottom:1px solid var(--border-secondary);">
                  <div style="font-weight:600;font-size:14px;">${user.name}</div>
                  <div style="font-size:11px;color:var(--text-tertiary);">${user.email}</div>
                </div>
                <a href="#/dashboard" class="dropdown-item">${getIcon('user')} Dashboard</a>
                <a href="#/dashboard/orders" class="dropdown-item">${getIcon('shoppingBag')} My Orders</a>
                <a href="#/seller/dashboard" class="dropdown-item">${getIcon('store')} Seller Hub</a>
                <a href="#/admin/dashboard" class="dropdown-item">${getIcon('layoutDashboard')} Admin Panel</a>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" id="nav-logout-btn" style="color:var(--danger);width:100%;text-align:left;">
                  ${getIcon('logOut')} Logout
                </button>
              </div>
            </div>
          ` : `
            <a href="#/login" class="btn btn-primary btn-sm hide-sm" style="margin-left:var(--sp-2);">
              Sign In
            </a>
          `}

          <!-- Theme Toggle Switch -->
          <div class="theme-toggle" id="theme-toggle-btn" title="Toggle Light/Dark Theme"></div>

          <!-- Mobile Hamburger Toggle -->
          <button class="menu-toggle" id="mobile-menu-toggle">
            <div class="hamburger">
              <span></span><span></span><span></span>
            </div>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-overlay" id="mobile-overlay"></div>
      <div class="mobile-nav" id="mobile-nav">
        <div class="mobile-nav-header">
          <div class="navbar-brand">
            <div class="brand-icon">R</div>
            <span class="brand-text">RAZDAR</span>
          </div>
          <button class="btn-icon btn-ghost" id="mobile-close-btn">${getIcon('x')}</button>
        </div>
        <div class="mobile-nav-links">
          <a href="#/">${getIcon('home')} Home</a>
          <a href="#/shop">${getIcon('shoppingBag')} Shop</a>
          <a href="#/categories">${getIcon('grid')} Categories</a>
          <a href="#/deals">${getIcon('zap')} Deals</a>
          <a href="#/new-arrivals">${getIcon('sparkles')} New Arrivals</a>
          <a href="#/wishlist">${getIcon('heart')} Wishlist (${wishlistCount})</a>
          <a href="#/cart">${getIcon('shoppingBag')} Cart (${cartCount})</a>
          <div class="sidebar-nav-divider"></div>
          ${user ? `
            <a href="#/dashboard">${getIcon('user')} Customer Dashboard</a>
            <a href="#/seller/dashboard">${getIcon('store')} Seller Dashboard</a>
            <a href="#/admin/dashboard">${getIcon('layoutDashboard')} Admin Panel</a>
          ` : `
            <a href="#/login">${getIcon('user')} Login / Register</a>
            <a href="#/seller/register">${getIcon('store')} Sell on RAZDAR</a>
          `}
        </div>
        <div class="mobile-nav-footer">
          <p style="font-size:12px;color:var(--text-tertiary);text-align:center;">RAZDAR — Your World. Your Choice.</p>
        </div>
      </div>
    `;
  }

  updateBadges() {
    const cartBadge = this.container.querySelector('.cart-count');
    const wishlistBadge = this.container.querySelector('.wishlist-count');

    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlist().length;

    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
      cartBadge.classList.add('animate-bounce');
      setTimeout(() => cartBadge.classList.remove('animate-bounce'), 1000);
    }

    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistCount;
      wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    }
  }

  bindEvents() {
    // Throttled scroll effect — runs at most once per animation frame
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        this.container.classList.toggle('scrolled', window.scrollY > 20);
        scrollTicking = false;
      });
    }, { passive: true });

    // Delegated clicks
    this.container.addEventListener('click', (e) => {
      // Theme toggle
      if (e.target.closest('#theme-toggle-btn')) {
        store.toggleTheme();
      }

      // Search overlay open
      if (e.target.closest('#nav-search-btn')) {
        events.emit('search:open');
      }

      // Notification toggle
      const notifBtn = e.target.closest('#nav-notif-btn');
      if (notifBtn) {
        const panel = this.container.querySelector('#notification-panel');
        if (panel) panel.classList.toggle('active');
      }

      // User menu toggle
      const userBtn = e.target.closest('#user-menu-btn');
      if (userBtn) {
        const drop = this.container.querySelector('#user-menu-dropdown');
        if (drop) drop.classList.toggle('active');
      }

      // Logout button
      if (e.target.closest('#nav-logout-btn')) {
        store.logout();
        window.location.hash = '#/';
      }

      // Mobile menu toggle
      if (e.target.closest('#mobile-menu-toggle') || e.target.closest('#mobile-close-btn') || e.target.closest('#mobile-overlay')) {
        this.toggleMobileMenu();
      }

      // Mobile nav link click closes menu
      if (e.target.closest('.mobile-nav-links a')) {
        this.toggleMobileMenu(false);
      }
    });
  }

  toggleMobileMenu(forceState = null) {
    const mobileNav = this.container.querySelector('#mobile-nav');
    const overlay = this.container.querySelector('#mobile-overlay');
    const toggleBtn = this.container.querySelector('#mobile-menu-toggle');

    const isOpen = mobileNav?.classList.contains('active');
    const nextState = forceState !== null ? forceState : !isOpen;

    if (nextState) {
      mobileNav?.classList.add('active');
      overlay?.classList.add('active');
      toggleBtn?.classList.add('active');
      document.body.classList.add('no-scroll');
    } else {
      mobileNav?.classList.remove('active');
      overlay?.classList.remove('active');
      toggleBtn?.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }
}

export default Navbar;
