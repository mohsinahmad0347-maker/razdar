// ============================================
// RAZDAR — State Management Store (optimized)
// ============================================

import events from './events.js';

// Safe localStorage helpers — never throw, never block startup
function lsGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : fallback;
  } catch (_) { return fallback; }
}

function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
}

function lsRaw(key, fallback = null) {
  try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; }
}

class Store {
  constructor() {
    // Only read theme synchronously — everything else is lazily loaded on first access
    this.state = {
      theme: lsRaw('razdar_theme', 'dark'),
      role: lsRaw('razdar_role', 'customer'),
      // Lazy-load flags
      _cartLoaded: false,        _cart: null,
      _wishlistLoaded: false,    _wishlist: null,
      _compareLoaded: false,     _compare: null,
      _userLoaded: false,        _user: null,
      _notificationsLoaded: false, _notifications: null,
      _recentSearchesLoaded: false, _recentSearches: null,
      _recentlyViewedLoaded: false, _recentlyViewed: null,
    };
    this.initTheme();
  }

  // ── Lazy state accessors ──
  get cart() {
    if (!this.state._cartLoaded) {
      this.state._cart = lsGet('razdar_cart', []);
      this.state._cartLoaded = true;
    }
    return this.state._cart;
  }
  set cart(v) { this.state._cart = v; this.state._cartLoaded = true; }

  get wishlist() {
    if (!this.state._wishlistLoaded) {
      this.state._wishlist = lsGet('razdar_wishlist', []);
      this.state._wishlistLoaded = true;
    }
    return this.state._wishlist;
  }
  set wishlist(v) { this.state._wishlist = v; this.state._wishlistLoaded = true; }

  get compare() {
    if (!this.state._compareLoaded) {
      this.state._compare = lsGet('razdar_compare', []);
      this.state._compareLoaded = true;
    }
    return this.state._compare;
  }
  set compare(v) { this.state._compare = v; this.state._compareLoaded = true; }

  get user() {
    if (!this.state._userLoaded) {
      this.state._user = lsGet('razdar_user', null);
      this.state._userLoaded = true;
    }
    return this.state._user;
  }
  set user(v) { this.state._user = v; this.state._userLoaded = true; }

  get notifications() {
    if (!this.state._notificationsLoaded) {
      this.state._notifications = lsGet('razdar_notifications', [
        { id: 1, title: 'Welcome to RAZDAR!', text: 'Your World. Your Choice.', time: 'Just now', unread: true, icon: 'sparkles' },
        { id: 2, title: 'Flash Sale Live', text: 'Up to 60% off on Electronics!', time: '1h ago', unread: true, icon: 'zap' }
      ]);
      this.state._notificationsLoaded = true;
    }
    return this.state._notifications;
  }

  get recentSearches() {
    if (!this.state._recentSearchesLoaded) {
      this.state._recentSearches = lsGet('razdar_recent_searches',
        ['Smart Watch', 'Wireless Headphones', 'Sneakers', 'Mechanical Keyboard']);
      this.state._recentSearchesLoaded = true;
    }
    return this.state._recentSearches;
  }
  set recentSearches(v) { this.state._recentSearches = v; this.state._recentSearchesLoaded = true; }

  get recentlyViewed() {
    if (!this.state._recentlyViewedLoaded) {
      this.state._recentlyViewed = lsGet('razdar_recently_viewed', []);
      this.state._recentlyViewedLoaded = true;
    }
    return this.state._recentlyViewed;
  }
  set recentlyViewed(v) { this.state._recentlyViewed = v; this.state._recentlyViewedLoaded = true; }

  // ── Theme Management ──
  initTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.state.theme = newTheme;
    try { localStorage.setItem('razdar_theme', newTheme); } catch (_) {}
    document.documentElement.setAttribute('data-theme', newTheme);
    events.emit('theme:change', newTheme);
  }

  // ── Cart ──
  getCart() { return this.cart; }
  getCartCount() { return this.cart.reduce((t, i) => t + i.quantity, 0); }
  getCartSubtotal() { return this.cart.reduce((t, i) => t + i.price * i.quantity, 0); }

  addToCart(product, quantity = 1, selectedColor = null, selectedSize = null) {
    const idx = this.cart.findIndex(
      i => i.id === product.id && i.color === selectedColor && i.size === selectedSize
    );
    if (idx > -1) {
      this.cart[idx].quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity,
        color: selectedColor || product.colors?.[0] || null,
        size: selectedSize || product.sizes?.[0] || null
      });
    }
    this.saveCart();
    events.emit('cart:updated', this.cart);
    events.emit('toast:show', {
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your shopping cart.`
    });
  }

  updateCartQuantity(id, quantity, color = null, size = null) {
    const item = this.cart.find(i => i.id === id && i.color === color && i.size === size);
    if (!item) return;
    if (quantity <= 0) {
      this.removeFromCart(id, color, size);
    } else {
      item.quantity = quantity;
      this.saveCart();
      events.emit('cart:updated', this.cart);
    }
  }

  removeFromCart(id, color = null, size = null) {
    this.cart = this.cart.filter(i => !(i.id === id && i.color === color && i.size === size));
    this.saveCart();
    events.emit('cart:updated', this.cart);
    events.emit('toast:show', { type: 'info', title: 'Item Removed', message: 'Item was removed from your cart.' });
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    events.emit('cart:updated', this.cart);
  }

  saveCart() { lsSet('razdar_cart', this.cart); }

  // ── Wishlist ──
  getWishlist() { return this.wishlist; }
  isInWishlist(productId) { return this.wishlist.some(i => i.id === productId); }

  toggleWishlist(product) {
    if (this.isInWishlist(product.id)) {
      this.wishlist = this.wishlist.filter(i => i.id !== product.id);
      events.emit('toast:show', { type: 'info', title: 'Removed from Wishlist', message: `${product.name} removed from your saved items.` });
    } else {
      this.wishlist = [...this.wishlist, product];
      events.emit('toast:show', { type: 'success', title: 'Added to Wishlist', message: `${product.name} saved to your wishlist.` });
    }
    this.saveWishlist();
    events.emit('wishlist:updated', this.wishlist);
  }

  saveWishlist() { lsSet('razdar_wishlist', this.wishlist); }

  // ── Compare ──
  getCompare() { return this.compare; }

  toggleCompare(product) {
    if (this.compare.some(p => p.id === product.id)) {
      this.compare = this.compare.filter(p => p.id !== product.id);
    } else {
      if (this.compare.length >= 4) {
        events.emit('toast:show', { type: 'warning', title: 'Limit Reached', message: 'You can compare up to 4 products.' });
        return;
      }
      this.compare = [...this.compare, product];
    }
    lsSet('razdar_compare', this.compare);
    events.emit('compare:updated', this.compare);
  }

  // ── Auth ──
  getUser() { return this.user; }
  isLoggedIn() { return !!this.user; }

  login(userData, role = 'customer') {
    this.user = userData;
    this.state.role = role;
    lsSet('razdar_user', userData);
    try { localStorage.setItem('razdar_role', role); } catch (_) {}
    events.emit('user:change', userData);
    events.emit('toast:show', { type: 'success', title: 'Welcome Back!', message: `Signed in as ${userData.name}` });
  }

  logout() {
    this.user = null;
    this.state.role = 'customer';
    try {
      localStorage.removeItem('razdar_user');
      localStorage.setItem('razdar_role', 'customer');
    } catch (_) {}
    events.emit('user:change', null);
    events.emit('toast:show', { type: 'info', title: 'Signed Out', message: 'You have been successfully signed out.' });
  }

  // ── Recently Viewed ──
  addRecentlyViewed(product) {
    this.recentlyViewed = [product, ...this.recentlyViewed.filter(p => p.id !== product.id)].slice(0, 10);
    lsSet('razdar_recently_viewed', this.recentlyViewed);
  }

  // ── Search History ──
  addRecentSearch(term) {
    if (!term?.trim()) return;
    const clean = term.trim();
    this.recentSearches = [clean, ...this.recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 8);
    lsSet('razdar_recent_searches', this.recentSearches);
  }
}

export const store = new Store();
export default store;
