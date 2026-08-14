// ============================================
// RAZDAR — Product Card Component
// ============================================

import store from '../core/store.js';
import events from '../core/events.js';
import { getIcon } from '../utils/icons.js';
import { formatPrice } from '../utils/formatters.js';

export class ProductCard {
  static render(product) {
    const isWishlisted = store.isInWishlist(product.id);
    const mainImage = product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80';

    return `
      <div class="product-card" data-product-id="${product.id}">
        <!-- Image & Actions -->
        <div class="product-card-img">
          <a href="#/product/${product.id}">
            <img src="${mainImage}" alt="${product.name}" loading="lazy" />
          </a>
          
          <!-- Badges -->
          <div class="product-card-badges">
            ${product.discount ? `<span class="product-card-badge badge-sale">-${product.discount}%</span>` : ''}
            ${product.isNewArrival ? `<span class="product-card-badge badge-new">NEW</span>` : ''}
            ${product.isTrending ? `<span class="product-card-badge badge-hot">HOT</span>` : ''}
            ${product.freeShipping ? `<span class="product-card-badge badge-free-ship">FREE SHIP</span>` : ''}
          </div>

          <!-- Action Buttons (Wishlist, Compare, Quick View) -->
          <div class="product-card-actions">
            <button class="product-card-action ${isWishlisted ? 'wishlisted' : ''}" data-action="wishlist" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
              ${getIcon('heart')}
            </button>
            <button class="product-card-action" data-action="compare" title="Compare Product">
              ${getIcon('repeat')}
            </button>
            <button class="product-card-action" data-action="quickview" title="Quick View">
              ${getIcon('eye')}
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="product-card-body">
          <div class="product-card-category">${product.category}</div>
          <h3 class="product-card-name">
            <a href="#/product/${product.id}">${product.name}</a>
          </h3>
          
          <!-- Rating -->
          <div class="product-card-rating">
            <div class="stars">
              ${ProductCard.renderStars(product.rating || 5.0)}
            </div>
            <span class="review-count">(${product.reviewsCount || 0})</span>
          </div>

          <!-- Price -->
          <div class="product-card-price">
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>

          <!-- Stock -->
          <div class="product-card-stock ${product.inStock ? 'in-stock' : 'out-stock'}">
            ${product.inStock ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </div>
        </div>

        <!-- Footer / Cart Buttons -->
        <div class="product-card-footer">
          <button class="btn btn-cart-premium btn-full" data-action="add-cart">
            ${getIcon('shoppingBag')} Add to Cart
          </button>
        </div>
      </div>
    `;
  }

  static renderStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHtml += `<span class="star-filled">${getIcon('star')}</span>`;
      } else if (i === fullStars && hasHalf) {
        starsHtml += `<span class="star-half">${getIcon('star')}</span>`;
      } else {
        starsHtml += `<span class="star-empty">${getIcon('star')}</span>`;
      }
    }
    return starsHtml;
  }

  // AbortController per container to cleanly remove old listeners on re-render
  static _controllerMap = new WeakMap();

  static attachEvents(container, productsList) {
    // Abort (remove) any previously attached listener on this container
    if (ProductCard._controllerMap.has(container)) {
      ProductCard._controllerMap.get(container).abort();
    }

    const controller = new AbortController();
    ProductCard._controllerMap.set(container, controller);

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;

      const productId = card.getAttribute('data-product-id');
      const product = productsList.find(p => p.id === productId);
      if (!product) return;

      const wishlistBtn = e.target.closest('[data-action="wishlist"]');
      if (wishlistBtn) {
        e.preventDefault();
        store.toggleWishlist(product);
        const isNowWishlisted = store.isInWishlist(product.id);
        wishlistBtn.classList.toggle('wishlisted', isNowWishlisted);
        return;
      }

      const compareBtn = e.target.closest('[data-action="compare"]');
      if (compareBtn) {
        e.preventDefault();
        store.toggleCompare(product);
        return;
      }

      const quickviewBtn = e.target.closest('[data-action="quickview"]');
      if (quickviewBtn) {
        e.preventDefault();
        events.emit('modal:quickview', product);
        return;
      }

      const addCartBtn = e.target.closest('[data-action="add-cart"]');
      if (addCartBtn) {
        e.preventDefault();
        store.addToCart(product, 1);
        return;
      }
    }, { signal: controller.signal });
  }
}

export default ProductCard;
