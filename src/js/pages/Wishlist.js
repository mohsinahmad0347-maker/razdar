// ============================================
// RAZDAR — Wishlist Page
// ============================================

import store from '../core/store.js';
import ProductCard from '../components/ProductCard.js';
import { getIcon } from '../utils/icons.js';
import products from '../data/products.js';

export async function renderWishlistPage() {
  const app = document.getElementById('app');

  const wishlistItems = store.getWishlist();

  app.innerHTML = `
    <div class="page-header">
      <div class="container">
        <h1>My Wishlist</h1>
        <div class="breadcrumb">
          <a href="#/">Home</a>
          <span class="separator">/</span>
          <span>Wishlist</span>
        </div>
      </div>
    </div>

    <div class="page-body">
      <div class="container">
        ${wishlistItems.length === 0 ? `
          <div class="empty-state">
            <div class="empty-state-icon">${getIcon('heart')}</div>
            <h3>Your Wishlist is Empty</h3>
            <p>Save products you love to your wishlist to track price changes and buy later.</p>
            <a href="#/shop" class="btn btn-primary btn-lg mt-4">Explore Products</a>
          </div>
        ` : `
          <div class="grid grid-products">
            ${wishlistItems.map(p => ProductCard.render(p)).join('')}
          </div>
        `}
      </div>
    </div>
  `;

  ProductCard.attachEvents(app, products);
}

export default renderWishlistPage;
