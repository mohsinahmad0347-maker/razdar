// ============================================
// RAZDAR — Mobile Bottom Navigation Component
// ============================================

import store from '../core/store.js';
import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';

export class BottomNav {
  constructor() {
    this.container = document.getElementById('bottom-nav');
    this.init();
  }

  init() {
    this.render();
    events.on('cart:updated', () => this.render());
    events.on('wishlist:updated', () => this.render());
  }

  render() {
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlist().length;
    const currentHash = window.location.hash || '#/';

    this.container.className = 'bottom-nav';
    this.container.innerHTML = `
      <div class="bottom-nav-inner">
        <a href="#/" class="bottom-nav-item ${currentHash === '#/' ? 'active' : ''}">
          ${getIcon('home')}
          <span>Home</span>
        </a>
        <a href="#/shop" class="bottom-nav-item ${currentHash.includes('#/shop') ? 'active' : ''}">
          ${getIcon('grid')}
          <span>Shop</span>
        </a>
        <a href="#/wishlist" class="bottom-nav-item ${currentHash.includes('#/wishlist') ? 'active' : ''}">
          ${getIcon('heart')}
          <span>Wishlist</span>
          ${wishlistCount > 0 ? `<span class="badge-count">${wishlistCount}</span>` : ''}
        </a>
        <a href="#/cart" class="bottom-nav-item ${currentHash.includes('#/cart') ? 'active' : ''}">
          ${getIcon('shoppingBag')}
          <span>Cart</span>
          ${cartCount > 0 ? `<span class="badge-count">${cartCount}</span>` : ''}
        </a>
        <a href="#/dashboard" class="bottom-nav-item ${currentHash.includes('#/dashboard') ? 'active' : ''}">
          ${getIcon('user')}
          <span>Account</span>
        </a>
      </div>
    `;
  }
}

export default BottomNav;
